import { lazy, Suspense } from "react";
import { aboutData, projects as defaultProjects } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import Reveal from "./ui/Reveal.jsx";
import CountUp from "./ui/CountUp.jsx";
import { getLinks } from "../utils/projects";

// Brand icons are ~10 kB gzip of SVG paths: load them as a separate chunk so
// they never delay first paint. The row height is reserved to avoid layout shift.
const TechMarquee = lazy(() => import("./TechMarquee.jsx"));

/**
 * Social proof directly under the hero: delivery stats (real numbers from the
 * project list and aboutData) and a marquee of the tech used in production.
 */
const TrustStrip = () => {
  const { projects: contextProjects } = usePortfolio();
  const list = (contextProjects && contextProjects.length > 0 ? contextProjects : defaultProjects).filter(
    (p) => p.active !== false
  );
  // round down to the nearest 5 so the "+" is always truthful
  const delivered = list.length >= 10 ? Math.floor(list.length / 5) * 5 : list.length;

  const crmStat = aboutData.stats.find((s) => /crm/i.test(s.label)) || aboutData.stats[0];
  // real, verifiable number: projects with a public live site
  const liveCount = list.filter((p) => getLinks(p).live).length;

  const stats = [
    { value: `${delivered}+`, label: "Projects Delivered" },
    crmStat && { value: crmStat.value, label: crmStat.label },
    { value: "24h", label: "Reply Time, Usually Faster" },
    liveCount > 0 && { value: `${liveCount}`, label: "Live Sites You Can Visit" },
  ].filter(Boolean);

  return (
    <section aria-label="Track record and technologies" className="relative py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
          {stats.map((stat, idx) => (
            <Reveal
              key={stat.label}
              delay={idx * 90}
              className="bg-[#0b0b12] px-4 py-7 sm:py-9 text-center flex flex-col-reverse justify-end gap-1.5"
            >
              <dt className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</dt>
              <dd className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                <CountUp value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal variant="fade" className="mt-10">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-6">
            Built with a production-proven stack
          </p>
          <div className="min-h-6">
            <Suspense fallback={null}>
              <TechMarquee />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TrustStrip;
