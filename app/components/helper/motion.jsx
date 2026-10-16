"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/* ── Shared easing ── */
export const easing = [0.22, 1, 0.36, 1];

const transitionIn = { duration: 0.5, ease: easing };
const transitionOut = { duration: 0.3, ease: easing };

const makeVariants = (hidden, visible) => ({
  hidden: { ...hidden, transition: transitionOut },
  visible: { ...visible, transition: transitionIn },
});

export const fadeUpVariants = makeVariants({ opacity: 0, y: 28 }, { opacity: 1, y: 0 });
export const fadeLeftVariants = makeVariants({ opacity: 0, x: -32 }, { opacity: 1, x: 0 });
export const fadeRightVariants = makeVariants({ opacity: 0, x: 32 }, { opacity: 1, x: 0 });
export const itemVariants = makeVariants({ opacity: 0, y: 18 }, { opacity: 1, y: 0 });

// Opacity-only fallback for users who prefer reduced motion.
const fadeOnly = makeVariants({ opacity: 0 }, { opacity: 1 });

export const containerVariants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/* Reveal once: content stays put after it has been seen, so long pages don't
   keep re-animating while scrolling back up. */
function useReveal(margin = "-80px 0px") {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });
  return { ref, isInView };
}

function useVariants(variants) {
  return useReducedMotion() ? fadeOnly : variants;
}

export function SectionWrapper({ children, className = "", as = "div" }) {
  const { ref, isInView } = useReveal();
  const variants = useVariants(fadeUpVariants);
  const Comp = motion[as];
  return (
    <Comp
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function StaggerContainer({ children, className = "", as = "div" }) {
  const { ref, isInView } = useReveal("-60px 0px");
  const Comp = motion[as];
  return (
    <Comp
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className = "", as = "div" }) {
  const variants = useVariants(itemVariants);
  const Comp = motion[as];
  return (
    <Comp variants={variants} className={className}>
      {children}
    </Comp>
  );
}

function Fade({ children, className, delay, base }) {
  const { ref, isInView } = useReveal("-60px 0px");
  const variants = useVariants(base);
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ ...transitionIn, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeLeft({ children, className = "", delay = 0 }) {
  return <Fade className={className} delay={delay} base={fadeLeftVariants}>{children}</Fade>;
}

export function FadeRight({ children, className = "", delay = 0 }) {
  return <Fade className={className} delay={delay} base={fadeRightVariants}>{children}</Fade>;
}

/* Eyebrow + title. `align` lets sections opt into left-aligned headings. */
export function SectionHeading({ eyebrow, title, description, className = "", align = "left", as = "h2" }) {
  const { ref, isInView } = useReveal("-60px 0px");
  const variants = useVariants(itemVariants);
  const Title = motion[as];
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col gap-3 ${alignment} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {eyebrow && (
        <motion.p variants={variants} className="eyebrow flex items-center gap-2">
          <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
          {eyebrow}
        </motion.p>
      )}
      <Title
        variants={variants}
        className="text-3xl font-extrabold tracking-tight text-fg lg:text-4xl"
      >
        {title}
      </Title>
      {description && (
        <motion.p variants={variants} className="max-w-2xl text-[0.95rem] leading-relaxed text-fg-muted">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
