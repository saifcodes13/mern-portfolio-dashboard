import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowDown, CheckCircle2, Clock, BadgeCheck, Globe } from "lucide-react";
import { personalInfo as defaultInfo, projects as defaultProjects } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import { prefersReducedMotion } from "../hooks/useInView";
import { getHost, getLinks, splitTitle } from "../utils/projects";
import AuroraBackground from "./AuroraBackground.jsx";

const ROTATE_MS = 4200;

// Short brand name: "Kare Kut - Premium Salon..." -> "Kare Kut",
// "BookEventz Enterprise Corporate CRM..." -> "BookEventz"
const brandOf = (project) => {
  const name = splitTitle(project.title).name.split(/\s+\(/)[0];
  return name.length > 22 ? name.split(/\s+/)[0] : name;
};

// Real client work with a live site, one per brand
const clientWork = (list) => {
  const seen = new Set();
  return (list || []).filter((p) => {
    if (p.active === false || !getLinks(p).live) return false;
    const brand = brandOf(p).toLowerCase();
    if (seen.has(brand)) return false;
    seen.add(brand);
    return true;
  });
};

// Showcase needs a real screenshot (skip stock photos)
const pickShowcase = (list) =>
  clientWork(list)
    .filter((p) => p.image && !/unsplash\.com/.test(p.image))
    .slice(0, 4);

const HeroShowcase = ({ items }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused || prefersReducedMotion()) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [items.length, paused]);

  if (items.length === 0) return null;
  const current = items[index];
  const next = items[(index + 1) % items.length];
  const currentLive = getLinks(current).live;

  return (
    <div
      className="hero-showcase relative mx-auto w-full max-w-xl lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Glow behind the frames */}
      <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-fuchsia-500/20 blur-3xl -z-10" aria-hidden="true" />

      {/* Back frame: peeks the next project for depth */}
      {items.length > 1 && (
        <div className="hero-frame hero-frame--back" aria-hidden="true">
          <img src={next.image} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
        </div>
      )}

      {/* Front browser frame */}
      <figure className="hero-frame hero-frame--front">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-[#0d0d16]">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2 flex-1 min-w-0 truncate rounded-md bg-white/5 px-3 py-1 text-[11px] font-mono text-gray-400">
            {getHost(currentLive)}
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-[#0d0d16] overflow-hidden">
          {items.map((p, i) => (
            <img
              key={p.id || p._id || p.title}
              src={p.image}
              alt={i === index ? `${splitTitle(p.title).name} website built by Saif Tandel` : ""}
              aria-hidden={i !== index}
              width="900"
              height="563"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className={`hero-shot absolute inset-0 w-full h-full object-cover object-top ${i === index ? "is-active" : ""}`}
            />
          ))}
        </div>
        <figcaption className="sr-only">
          {splitTitle(current.title).name}: {splitTitle(current.title).subtitle}
        </figcaption>
      </figure>

      {/* Floating card: current project (desktop) */}
      <a
        href={currentLive}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-float hero-float--a hidden sm:flex"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">Live client project</span>
          <span key={index} className="hero-float__title block truncate text-[13px] font-semibold text-white">
            {splitTitle(current.title).name}
          </span>
        </span>
        <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
      </a>

      {/* Floating card: delivery stat */}
      <div className="hero-float hero-float--b hidden sm:flex">
        <span className="grid place-items-center w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-400/30 text-purple-300 shrink-0">
          <BadgeCheck className="w-4 h-4" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-[13px] font-semibold text-white">Built end-to-end</span>
          <span className="block text-[11px] text-gray-400">Design → code → launch</span>
        </span>
      </div>

      {/* Slide controls */}
      {items.length > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {items.map((p, i) => (
            <button
              key={p.id || p._id || p.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${splitTitle(p.title).name}`}
              aria-pressed={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === index ? "w-8 bg-purple-400" : "w-3 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  const { personalInfo: contextInfo, projects } = usePortfolio();
  const info = contextInfo || defaultInfo;
  const name = info.name || "Saif Tandel";

  const showcase = useMemo(() => {
    const fromContext = pickShowcase(projects);
    return fromContext.length ? fromContext : pickShowcase(defaultProjects);
  }, [projects]);

  const clientNames = useMemo(() => {
    const fromContext = clientWork(projects);
    return (fromContext.length ? fromContext : clientWork(defaultProjects)).slice(0, 6).map(brandOf);
  }, [projects]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20 min-h-[min(100svh,54rem)] flex items-center"
    >
      <AuroraBackground />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="hero-in" style={{ "--d": "0ms" }}>
              <p className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-full surface border-emerald-500/25 text-xs font-medium">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300 font-semibold">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Available
                </span>
                <span className="text-gray-300">Taking new projects · Dubai & remote</span>
              </p>
            </div>

            <h1
              id="hero-heading"
              className="hero-in mt-6 text-4xl leading-[1.1] sm:text-5xl sm:leading-[1.08] xl:text-[3.25rem] font-semibold tracking-[-0.03em] text-white text-balance"
              style={{ "--d": "80ms" }}
            >
              Websites & web apps that{" "}
              <span className="text-gradient hero-gradient-text whitespace-nowrap">grow your business</span>
            </h1>

            <p
              className="hero-in mt-5 text-[15px] sm:text-base text-gray-400 max-w-[34rem] mx-auto lg:mx-0 leading-[1.65] text-pretty"
              style={{ "--d": "160ms" }}
            >
              I'm {name}, a freelance full-stack developer in Dubai. I build fast, custom
              sites and platforms, from booking pages to CRMs, on a fixed quote and a clear timeline.
            </p>

            <div
              className="hero-in mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
              style={{ "--d": "240ms" }}
            >
              <a href="#contact" className="btn btn-primary">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#projects" className="btn btn-ghost">
                See My Work
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <ul
              className="hero-in mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[13px] text-gray-400"
              style={{ "--d": "300ms" }}
            >
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                Free consultation
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                Fixed-price quotes
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                Reply within 24h
              </li>
            </ul>

            {clientNames.length > 0 && (
              <div
                className="hero-in mt-9 pt-5 border-t border-white/[0.08] max-w-[34rem] mx-auto lg:mx-0 overflow-hidden"
                style={{ "--d": "380ms" }}
              >
                <p className="text-[10.5px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                  Recent client work
                </p>
                {/* Dots sit in each name's left gutter; the negative margin + overflow-hidden clip them at line starts */}
                <p className="mt-2.5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 lg:gap-x-0 gap-y-1.5 lg:-ml-6 text-sm font-medium text-gray-400">
                  {clientNames.map((n) => (
                    <span
                      key={n}
                      className="relative transition-colors duration-300 hover:text-white lg:pl-6 lg:before:absolute lg:before:left-2.5 lg:before:top-1/2 lg:before:h-1 lg:before:w-1 lg:before:-translate-y-1/2 lg:before:rounded-full lg:before:bg-white/20"
                    >
                      {n}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>

          {/* Showcase */}
          <div className="lg:col-span-6 hero-in" style={{ "--d": "220ms" }}>
            <HeroShowcase items={showcase} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
