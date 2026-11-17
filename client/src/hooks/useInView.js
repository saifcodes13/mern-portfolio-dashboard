import { useEffect, useRef, useState } from "react";

const supportsIO =
  typeof window !== "undefined" && "IntersectionObserver" in window;

/**
 * Tracks whether an element is in the viewport.
 * If IntersectionObserver is unavailable the element is treated as in view
 * from the first render, so nothing can stay hidden.
 */
export function useInView({ once = true, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(!supportsIO);

  useEffect(() => {
    const el = ref.current;
    if (!el || !supportsIO) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return [ref, inView];
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
