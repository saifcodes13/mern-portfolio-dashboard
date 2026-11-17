import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion, useInView } from "../hooks/useInView";

/**
 * Animated hero background: drifting aurora blobs + slow grid, plus a
 * cursor-follow spotlight on desktop. Everything animates with transform /
 * opacity only. CSS animations pause while the hero is off-screen (and the
 * browser already suspends them in hidden tabs); the spotlight only does work
 * in response to pointer events, one rAF-batched write per frame.
 */
const AuroraBackground = () => {
  const [rootRef, inView] = useInView({ once: false, rootMargin: "0px" });
  const spotRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const spot = spotRef.current;
    const host = root?.parentElement;
    if (!root || !spot || !host || !hasFinePointer() || prefersReducedMotion()) {
      return undefined;
    }

    let frame = 0;

    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect();
        spot.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0)`;
        root.dataset.spot = "on";
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      root.dataset.spot = "off";
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [rootRef]);

  return (
    <div ref={rootRef} className="aurora -z-10" data-paused={!inView} aria-hidden="true">
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__blob aurora__blob--4" />
      <div className="aurora__grid" />
      <div ref={spotRef} className="aurora__spotlight" />
    </div>
  );
};

export default AuroraBackground;
