import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "./useInView";

/**
 * Pointer-driven 3D tilt. Writes CSS variables consumed by the `.tilt`
 * class (see index.css). No-op on touch devices and with reduced motion.
 */
export function useTilt(max = 5) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;

    let frame = 0;

    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return ref;
}
