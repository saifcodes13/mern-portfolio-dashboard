import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { personalInfo as defaultInfo } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import Reveal from "./ui/Reveal.jsx";
import QuoteLink from "./ui/QuoteLink.jsx";

const points = ["Free 30-minute consultation", "Fixed quote & timeline", "Reply within 24 hours"];

/**
 * Conversion band. Rendered before the contact section on the home page and
 * at the bottom of every other public page (see Layout.jsx).
 */
const CtaBand = () => {
  const { personalInfo: contextInfo } = usePortfolio();
  const info = contextInfo || defaultInfo;

  return (
    <section aria-labelledby="cta-heading" className="relative py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal variant="scale">
          <div className="relative isolate overflow-hidden rounded-3xl border border-purple-400/20 bg-[#0e0b1a] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 text-center">
            {/* decorative glow + grid */}
            <div
              aria-hidden="true"
              className="absolute -z-10 inset-0 bg-[radial-gradient(60rem_24rem_at_50%_0%,rgba(124,58,237,0.38),transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="absolute -z-10 inset-0 bg-grid-pattern opacity-60 [mask-image:linear-gradient(180deg,#000,transparent_85%)]"
            />

            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] text-balance max-w-3xl mx-auto"
            >
              Have a project in mind? <span className="text-gradient">Let's scope it together.</span>
            </h2>
            <p className="mt-5 text-gray-300 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
              Tell me what you need and you'll get a clear plan, timeline, and fixed quote. The first consultation is free and there's no obligation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <QuoteLink className="btn btn-primary">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </QuoteLink>
              <a
                href={info.whatsapp || defaultInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaBand;
