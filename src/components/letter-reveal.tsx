"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const lineVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.018 } },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(9px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

export function LetterReveal({ text, className = "" }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={className}
      aria-hidden="true"
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.75 }}
      variants={reduceMotion ? undefined : lineVariants}
    >
      {Array.from(text).map((character, index) => (
        <motion.span
          className="mentor-heading-letter"
          key={`${character}-${index}`}
          variants={reduceMotion ? undefined : letterVariants}
        >
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
    </motion.span>
  );
}
