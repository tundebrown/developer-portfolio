"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlineArrowsPointingOut } from "react-icons/hi2";

/* In-card screenshot carousel. Clicking the image opens the lightbox at the
   current slide. Desktop shots fill the frame from the top; mobile shots are
   letterboxed so they aren't cropped. */
export default function MediaCarousel({ images, name, onOpen, sizes, priority = false, className = "" }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const item = images[index];
  const many = images.length > 1;

  const go = (dir) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className={`group relative overflow-hidden bg-surface-2 ${className}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.button
          key={item.src}
          type="button"
          onClick={() => onOpen(index)}
          aria-label={`Open ${name} screenshots, showing ${index + 1} of ${images.length}: ${item.alt}`}
          className="absolute inset-0 cursor-zoom-in"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={sizes}
            priority={priority && index === 0}
            placeholder={item.blurDataURL ? "blur" : "empty"}
            blurDataURL={item.blurDataURL}
            className={`${item.kind === "mobile" ? "object-contain py-3" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-[1.015]`}
          />
        </motion.button>
      </AnimatePresence>

      <span className="glass pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        <HiOutlineArrowsPointingOut size={12} aria-hidden="true" /> Expand
      </span>

      {many && (
        <>
          <span className="glass pointer-events-none absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 font-mono text-[0.7rem] tabular-nums text-fg">
            {index + 1}/{images.length}
          </span>
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={`Previous ${name} screenshot`}
              className="neu-button grid h-9 w-9 place-items-center rounded-full"
            >
              <HiChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={`Next ${name} screenshot`}
              className="neu-button grid h-9 w-9 place-items-center rounded-full"
            >
              <HiChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
