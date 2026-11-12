"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  blur = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22, ...(blur ? { filter: "blur(12px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduceMotion ? 0 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let lenis: import("lenis").default | undefined;
    let gsap: typeof import("gsap").gsap | undefined;
    let scrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | undefined;
    let tick: ((time: number) => void) | undefined;

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([lenisModule, gsapModule, triggerModule]) => {
        if (disposed) return;
        lenis = new lenisModule.default({ duration: 1.05, smoothWheel: true, syncTouch: false });
        gsap = gsapModule.gsap;
        scrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(scrollTrigger);

        tick = (time: number) => lenis?.raf(time * 1000);
        lenis.on("scroll", scrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      },
    );

    return () => {
      disposed = true;
      if (lenis && gsap && scrollTrigger && tick) {
        lenis.off("scroll", scrollTrigger.update);
        gsap.ticker.remove(tick);
        // The page unloads its Lenis instance here; ScrollTrigger remains
        // registered globally for any future routes in this app session.
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
