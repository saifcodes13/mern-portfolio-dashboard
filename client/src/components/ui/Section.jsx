import { useLocation } from "react-router-dom";
import Reveal from "./Reveal.jsx";

/**
 * Shared section shell. The same components render as sections on the home
 * page and as standalone routes, so:
 *  - on "/" the section heading is an <h2> (the hero owns the <h1>)
 *  - on a standalone route the heading becomes the page <h1> and the section
 *    gets extra top padding to clear the fixed header.
 */
const Section = ({ id, labelledBy, glow = "none", className = "", children }) => {
  const isHome = useLocation().pathname === "/";

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate overflow-hidden ${
        isHome ? "py-20 lg:py-28" : "pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-[70vh]"
      } ${className}`}
    >
      {isHome && <div className="section-divider" aria-hidden="true" />}
      {glow !== "none" && (
        <div
          aria-hidden="true"
          className={`section-glow -z-10 ${
            glow === "left" ? "-left-64 top-10" : glow === "right" ? "-right-64 top-24" : "left-1/2 -translate-x-1/2 -top-40"
          }`}
        />
      )}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

/**
 * Editorial section header: numbered kicker + large left-aligned heading,
 * with the supporting line set in a second column on desktop.
 * `index` (e.g. "01") only shows on the home page, where sections are a sequence.
 */
export const SectionHeader = ({
  id,
  eyebrow,
  index,
  title,
  highlight,
  description,
  as,
  className = "",
}) => {
  const isHome = useLocation().pathname === "/";
  const Heading = as || (isHome ? "h2" : "h1");

  return (
    <Reveal className={`mb-12 lg:mb-16 grid lg:grid-cols-12 gap-x-10 gap-y-5 items-end ${className}`}>
      <div className="lg:col-span-7">
        {eyebrow && (
          <p className="kicker">
            {isHome && index && <span className="kicker__index">{index}</span>}
            <span className="kicker__line" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
        )}
        <Heading
          id={id}
          className="mt-5 text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold text-white tracking-[-0.03em] leading-[1.06] text-balance"
        >
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </Heading>
      </div>
      {description && (
        <p className="lg:col-span-5 lg:pb-2 text-gray-400 text-base lg:text-[1.0625rem] leading-relaxed text-pretty max-w-xl">
          {description}
        </p>
      )}
    </Reveal>
  );
};

export default Section;
