"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Shared easing ── */
export const easing = [0.25, 0.46, 0.45, 0.94];

/* ── Transition configs ── */
const transitionIn  = { duration: 0.5, ease: easing };
const transitionOut = { duration: 0.35, ease: easing };

/* ── Variants factory — different in/out transitions ── */
const makeVariants = (hidden, visible) => ({
  hidden: { ...hidden, transition: transitionOut },
  visible: { ...visible, transition: transitionIn },
});

export const fadeUpVariants = makeVariants(
  { opacity: 0, y: 40,  filter: "blur(8px)" },
  { opacity: 1, y: 0,   filter: "blur(0px)" }
);

export const fadeInVariants = makeVariants(
  { opacity: 0, filter: "blur(6px)" },
  { opacity: 1, filter: "blur(0px)" }
);

export const fadeLeftVariants = makeVariants(
  { opacity: 0, x: -44, filter: "blur(6px)" },
  { opacity: 1, x: 0,   filter: "blur(0px)" }
);

export const fadeRightVariants = makeVariants(
  { opacity: 0, x: 44,  filter: "blur(6px)" },
  { opacity: 1, x: 0,   filter: "blur(0px)" }
);

export const containerVariants = {
  hidden:  { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05  } },
};

export const itemVariants = makeVariants(
  { opacity: 0, y: 24,  filter: "blur(6px)" },
  { opacity: 1, y: 0,   filter: "blur(0px)" }
);

/* ── useScrollInView — shared hook, no `once` ── */
function useScrollInView(margin = "-80px 0px") {
  const ref = useRef(null);
  // once: false  →  re-fires every time element enters/leaves viewport
  const isInView = useInView(ref, { once: false, margin });
  return { ref, isInView };
}

/* ──────────────────────────────────────────
   SectionWrapper
   Single element fade-up on enter, fade-down on leave
─────────────────────────────────────────── */
export function SectionWrapper({ children, className = "", delay = 0 }) {
  const { ref, isInView } = useScrollInView("-80px 0px");

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   StaggerContainer
   Staggers children in on enter, reverse-staggers out on leave
─────────────────────────────────────────── */
export function StaggerContainer({ children, className = "" }) {
  const { ref, isInView } = useScrollInView("-60px 0px");

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   StaggerItem
   Must be a direct child of StaggerContainer
─────────────────────────────────────────── */
export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={itemVariants}
      style={{ willChange: "opacity, transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   FadeLeft / FadeRight
   For two-column layouts
─────────────────────────────────────────── */
export function FadeLeft({ children, className = "", delay = 0 }) {
  const { ref, isInView } = useScrollInView("-60px 0px");

  return (
    <motion.div
      ref={ref}
      variants={fadeLeftVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={isInView
        ? { ...transitionIn,  delay }
        : { ...transitionOut, delay: 0 }
      }
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

export function FadeRight({ children, className = "", delay = 0 }) {
  const { ref, isInView } = useScrollInView("-60px 0px");

  return (
    <motion.div
      ref={ref}
      variants={fadeRightVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={isInView
        ? { ...transitionIn,  delay }
        : { ...transitionOut, delay: 0 }
      }
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   SectionHeading
   Eyebrow + title stagger in/out together
─────────────────────────────────────────── */
export function SectionHeading({ eyebrow, title, className = "" }) {
  const { ref, isInView } = useScrollInView("-60px 0px");

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col items-center gap-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <span className="h-px w-5 bg-indigo-500/50" />
        <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-indigo-400/70">
          {eyebrow}
        </span>
        <span className="h-px w-5 bg-indigo-500/50" />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-2xl lg:text-3xl font-extrabold text-slate-100 tracking-tight"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}