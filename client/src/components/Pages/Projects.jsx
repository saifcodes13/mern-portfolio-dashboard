import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects as defaultProjects } from "../../data/portfolioData";
import Loader from "../Loader.jsx";
import { usePortfolio } from "../../context/PortfolioContext.jsx";
import { useQuote } from "../../hooks/useQuote";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  getCategory,
  getInquiryService,
  getLinks,
  getProjectKey,
} from "../../utils/projects";
import Section, { SectionHeader } from "../ui/Section.jsx";
import Reveal from "../ui/Reveal.jsx";
import { ProjectCard, ShowcaseCard } from "../ProjectCard.jsx";

const SHOWCASE_COUNT = 3;
const HOME_GRID_COUNT = 6;

const Projects = () => {
  const { projects: contextProjects, loading: contextLoading } = usePortfolio();
  const isHome = useLocation().pathname === "/";
  const [filter, setFilter] = useState("all");
  const requestQuote = useQuote();

  const projectsList =
    contextProjects && contextProjects.length > 0 ? contextProjects : defaultProjects;
  const loading = contextLoading && projectsList.length === 0;

  const list = useMemo(
    () => projectsList.filter((p) => p.active !== false),
    [projectsList]
  );

  // Showcase = projects flagged `featured`, topped up from the rest of the list
  const { showcase, rest } = useMemo(() => {
    // Real client work leads: a live site with a real screenshot (not a stock
    // photo). Within that, `featured` projects come first. Anything else only
    // tops up the showcase when there isn't enough client work.
    const isClientWork = (p) =>
      Boolean(getLinks(p).live) && p.image && !/unsplash\.com/.test(p.image);
    const client = list.filter(isClientWork);
    const others = list.filter((p) => !isClientWork(p));
    const byFeatured = (items) => [
      ...items.filter((p) => p.featured === true),
      ...items.filter((p) => p.featured !== true),
    ];
    const top = [...byFeatured(client), ...byFeatured(others)].slice(
      0,
      Math.min(SHOWCASE_COUNT, list.length)
    );
    return { showcase: top, rest: list.filter((p) => !top.includes(p)) };
  }, [list]);

  // Only offer filters for categories that actually exist in the data
  const tabs = useMemo(() => {
    const present = new Set(list.map(getCategory));
    return [
      { id: "all", label: "All Projects", count: list.length },
      ...CATEGORY_ORDER.filter((id) => present.has(id)).map((id) => ({
        id,
        label: CATEGORY_META[id].label,
        count: list.filter((p) => getCategory(p) === id).length,
      })),
    ];
  }, [list]);

  const handleQuote = (project) => requestQuote(getInquiryService(project));

  const showAll = filter === "all";
  const gridProjects = isHome
    ? rest.slice(0, HOME_GRID_COUNT)
    : showAll
      ? rest
      : list.filter((p) => getCategory(p) === filter);
  const hiddenCount = isHome ? list.length - showcase.length - gridProjects.length : 0;

  // heading levels: page/section title -> sub-heading -> card
  const subHeading = isHome ? "h3" : "h2";
  const SubHeading = subHeading;
  const cardHeading = isHome ? "h4" : "h3";

  return (
    <Section id="projects" labelledBy="projects-heading" glow="right">
      <SectionHeader
        id="projects-heading"
        eyebrow="Selected Work"
        index="01"
        title="Real products, live for"
        highlight="real clients"
        description="Booking platforms, CRMs, e-commerce stores and business websites, in production for clients in the UAE, India and beyond."
      />

      {loading ? (
        <Loader message="Fetching portfolio projects..." minHeight="min-h-[350px]" />
      ) : (
        <>
          {/* Category filter (standalone /projects page) */}
          {!isHome && tabs.length > 2 && (
            <Reveal className="mb-12 lg:mb-16">
              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap justify-center gap-2 sm:gap-3"
              >
                {tabs.map((tab) => {
                  const active = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(tab.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-[background-color,border-color,color,transform] duration-300 ease-out border ${
                        active
                          ? "bg-purple-600 border-purple-400/60 text-white shadow-lg shadow-purple-600/30"
                          : "bg-white/[0.04] border-white/10 text-gray-300 hover:text-white hover:border-purple-400/40"
                      }`}
                    >
                      {tab.label}
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                          active ? "bg-white/20" : "bg-white/[0.06] text-gray-400"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          )}

          {/* Featured showcase */}
          {(isHome || showAll) && showcase.length > 0 && (
            <div className="space-y-16 lg:space-y-28">
              {showcase.map((project, idx) => (
                <Reveal key={getProjectKey(project, idx)} variant={idx % 2 === 1 ? "right" : "left"}>
                  <ShowcaseCard
                    project={project}
                    index={idx}
                    onQuote={handleQuote}
                    headingLevel={subHeading}
                  />
                </Reveal>
              ))}
            </div>
          )}

          {/* Remaining projects */}
          {gridProjects.length > 0 && (
            <div className={(isHome || showAll) && showcase.length > 0 ? "mt-20 lg:mt-32" : ""}>
              {(isHome || showAll) && showcase.length > 0 && (
                <Reveal className="flex items-end justify-between gap-4 mb-8">
                  <SubHeading className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    More Projects
                  </SubHeading>
                  {isHome && (
                    <Link
                      to="/projects"
                      className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-purple-300 hover:text-white transition-colors duration-300"
                    >
                      View all {list.length} projects
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </Reveal>
              )}

              {/* key on filter so cards re-run their reveal when the filter changes */}
              <div key={filter} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                {gridProjects.map((project, idx) => (
                  <Reveal key={getProjectKey(project, idx)} delay={(idx % 3) * 90} className="h-full">
                    <ProjectCard
                      project={project}
                      onQuote={handleQuote}
                      headingLevel={(isHome || showAll) && showcase.length > 0 ? cardHeading : subHeading}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {isHome && (
            <Reveal className="mt-12 text-center">
              <Link to="/projects" className="btn btn-ghost">
                {hiddenCount > 0 ? `View all ${list.length} projects` : "Browse all projects"}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
          )}
        </>
      )}
    </Section>
  );
};

export default Projects;
