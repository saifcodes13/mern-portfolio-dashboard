import { useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Github, Sparkles } from "lucide-react";
import { useTilt } from "../hooks/useTilt";
import {
  CATEGORY_META,
  getCategory,
  getHost,
  getLinks,
  getOutcome,
  splitTitle,
} from "../utils/projects";

/**
 * Screenshot inside a browser-style frame. Falls back to a generated
 * gradient mockup when a project has no image or the image fails to load.
 */
const ProjectVisual = ({ project, eager = false, sizes }) => {
  const [failed, setFailed] = useState(false);
  const { name } = splitTitle(project.title);
  const { live } = getLinks(project);
  const host = live ? getHost(live) : "";
  const showImage = Boolean(project.image) && !failed;

  return (
    <div className="relative overflow-hidden rounded-t-[inherit] bg-[#0d0d16]">
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-4 h-9 border-b border-white/[0.07] bg-white/[0.03]" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        {host && (
          <span className="ml-3 px-3 py-0.5 rounded-md bg-white/[0.05] text-[10px] font-mono text-gray-400 truncate max-w-[60%]">
            {host}
          </span>
        )}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        {showImage ? (
          <img
            src={project.image}
            alt={`Screenshot of ${name}${project.tagline ? `: ${project.tagline}` : ""}`}
            width={900}
            height={563}
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div
            role="img"
            aria-label={`${name} project preview`}
            className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.45),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(79,70,229,0.4),transparent_55%)]"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-60" />
            <span className="relative text-2xl sm:text-3xl font-bold tracking-tight text-white/90 px-6 text-center text-balance">
              {name}
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#0b0b12]/70 to-transparent pointer-events-none"
        />
      </div>
    </div>
  );
};

const TechPills = ({ techStack, max }) => {
  if (!Array.isArray(techStack) || techStack.length === 0) return null;
  const shown = techStack.slice(0, max);
  const extra = techStack.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
      {shown.map((tech) => (
        <li key={tech} className="pill">
          {tech}
        </li>
      ))}
      {extra > 0 && <li className="pill text-gray-500">+{extra}</li>}
    </ul>
  );
};

const ProjectLinks = ({ project, name }) => {
  const { live, code } = getLinks(project);
  if (!live && !code) return null;
  return (
    <>
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost">
          Live Site
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">: {name} (opens in a new tab)</span>
        </a>
      )}
      {code && (
        <a href={code} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost">
          <Github className="w-4 h-4" aria-hidden="true" />
          Code
          <span className="sr-only">: {name} source (opens in a new tab)</span>
        </a>
      )}
    </>
  );
};

/** Large featured card: screenshot on one side, story on the other. */
export const ShowcaseCard = ({ project, index = 0, onQuote, headingLevel = "h3" }) => {
  const Heading = headingLevel;
  const tiltRef = useTilt(3);
  const { name, subtitle } = splitTitle(project.title);
  const category = CATEGORY_META[getCategory(project)];
  const outcome = getOutcome(project);
  const flip = index % 2 === 1;

  return (
    <article className="group grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div
          ref={tiltRef}
          className="tilt relative rounded-2xl border border-white/10 bg-[#0b0b12] shadow-2xl shadow-black/50"
        >
          <div className="tilt__glare" aria-hidden="true" />
          <div className="rounded-[inherit] overflow-hidden">
            <ProjectVisual project={project} sizes="(min-width: 1024px) 56vw, 100vw" />
          </div>
        </div>
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
          <span className="text-purple-300">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-white/15" aria-hidden="true" />
          <span className="uppercase tracking-[0.14em]">{category.label}</span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 font-sans font-semibold">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        <Heading className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.15] text-balance">
          {name}
        </Heading>
        {subtitle && <p className="mt-1.5 text-gray-400 text-sm sm:text-base">{subtitle}</p>}

        {outcome && (
          <p className="mt-4 text-purple-200 text-base sm:text-lg font-medium leading-snug text-pretty">
            {outcome}
          </p>
        )}

        {project.description && (
          <p className="mt-3 text-gray-400 text-sm sm:text-[0.95rem] leading-relaxed line-clamp-4">
            {project.description}
          </p>
        )}

        {Array.isArray(project.highlights) && project.highlights.length > 0 && (
          <ul className="mt-4 space-y-2">
            {project.highlights.slice(0, 2).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <TechPills techStack={project.techStack} max={7} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ProjectLinks project={project} name={name} />
        </div>

        <button
          type="button"
          onClick={() => onQuote(project)}
          className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors duration-300 cursor-pointer text-left"
        >
          <span>
            Want something like this? <span className="underline underline-offset-4 decoration-purple-400/50">Get a quote</span>
          </span>
          <ArrowRight
            className="w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
};

/** Compact card for the project grid, with pointer tilt + glare on desktop. */
export const ProjectCard = ({ project, onQuote, headingLevel = "h3" }) => {
  const Heading = headingLevel;
  const tiltRef = useTilt(5);
  const { name, subtitle } = splitTitle(project.title);
  const category = CATEGORY_META[getCategory(project)];
  const outcome = getOutcome(project);

  return (
    <article
      ref={tiltRef}
      className="tilt group relative h-full flex flex-col rounded-2xl border border-white/10 bg-[#0b0b12]"
    >
      <div className="tilt__glare" aria-hidden="true" />
      <ProjectVisual project={project} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-purple-300/90">
          {category.label}
        </p>
        <Heading className="mt-2 text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
          {name}
        </Heading>
        {subtitle && <p className="mt-0.5 text-sm text-gray-400">{subtitle}</p>}

        {outcome && (
          <p className="mt-3 text-sm text-gray-300 leading-relaxed line-clamp-3">{outcome}</p>
        )}

        <div className="mt-4">
          <TechPills techStack={project.techStack} max={4} />
        </div>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.07]">
            <ProjectLinks project={project} name={name} />
            <button
              type="button"
              onClick={() => onQuote(project)}
              className="group/cta ml-auto inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Get a quote like this
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
