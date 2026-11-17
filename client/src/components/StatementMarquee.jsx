import { Sparkle } from "lucide-react";

const words = ["Web Apps", "CRMs", "Booking Platforms", "E-commerce", "Business Websites", "Dashboards"];

/**
 * Large scrolling statement between sections. Purely decorative for sighted
 * users; screen readers get one plain sentence instead of the repeated track.
 */
const StatementMarquee = () => {
  const row = (hidden) => (
    <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
      {words.map((word, idx) => (
        <span key={word} className="flex items-center">
          <span className={`statement__word ${idx % 2 === 1 ? "statement__word--outline" : ""}`}>{word}</span>
          <Sparkle className="statement__sep" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="statement py-10 lg:py-14">
      <p className="sr-only">I build {words.join(", ").toLowerCase()}.</p>
      <div className="marquee statement__marquee" aria-hidden="true">
        <div className="marquee__track statement__track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
};

export default StatementMarquee;
