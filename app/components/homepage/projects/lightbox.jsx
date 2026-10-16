"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const FOCUSABLE = 'button, [href], [tabindex]:not([tabindex="-1"])';

/* Full-screen screenshot viewer. Glass chrome over a dimmed canvas;
   keyboard (← → Esc, Tab trapped), swipe and thumbnail navigation. */
export default function Lightbox({ images, startIndex = 0, projectName, onClose }) {
  const [[index, direction], setPage] = useState([startIndex, 0]);
  const dialogRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const item = images[index];

  const paginate = useCallback(
    (dir) => setPage(([cur]) => [(cur + dir + images.length) % images.length, dir]),
    [images.length],
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.querySelector("[data-autofocus]")?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "Escape") onClose();
      else if (e.key === "Tab") {
        const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [paginate, onClose]);

  const slide = reduceMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (dir) => ({ x: dir > 0 ? "12%" : dir < 0 ? "-12%" : 0, opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
        exit: (dir) => ({ x: dir > 0 ? "-12%" : "12%", opacity: 0, transition: { duration: 0.2 } }),
      };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} screenshots`}
      className="fixed inset-0 z-[100] grid grid-rows-[auto_1fr_auto]"
    >
      <motion.div
        className="absolute inset-0 bg-canvas/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      <div className="glass-strong relative z-10 m-3 flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-fg">{projectName}</p>
          <p className="truncate text-xs text-fg-muted" aria-live="polite">
            {index + 1} / {images.length} · {item.alt}
          </p>
        </div>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close screenshots"
          className="neu-button grid h-9 w-9 shrink-0 place-items-center rounded-full"
        >
          <IoClose size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="relative z-10 overflow-hidden" onClick={onClose}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 px-4 py-2 sm:px-20"
            drag={images.length > 1 && !reduceMotion ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) paginate(1);
              if (info.offset.x > 60) paginate(-1);
            }}
          >
            <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                quality={85}
                className="object-contain select-none"
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
              aria-label="Previous screenshot"
              className="neu-button absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full sm:grid"
            >
              <HiChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
              aria-label="Next screenshot"
              className="neu-button absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full sm:grid"
            >
              <HiChevronRight size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="glass-strong relative z-10 m-3 flex gap-2 overflow-x-auto rounded-2xl p-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setPage(([cur]) => [i, i > cur ? 1 : -1])}
              aria-label={`Show screenshot ${i + 1}: ${img.alt}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border-2 transition-opacity duration-150 ${
                i === index ? "border-accent opacity-100" : "border-transparent opacity-55 hover:opacity-90"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="72px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
