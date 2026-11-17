import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "../../hooks/useInView";

/**
 * Animated counter for stat values such as "20+", "100%" or "24h".
 * Renders the final value by default, so it is correct without JS animation
 * and under prefers-reduced-motion; counts up once when scrolled into view.
 */
const CountUp = ({ value, duration = 1500, className = "" }) => {
  const text = String(value ?? "");
  const match = text.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? parseInt(match[2], 10) : null;

  const [ref, inView] = useInView();
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!inView || target === null || prefersReducedMotion()) return undefined;

    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {match ? `${match[1]}${current ?? target}${match[3]}` : text}
    </span>
  );
};

export default CountUp;
