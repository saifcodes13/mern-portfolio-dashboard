import { UserRound, ReceiptText, MonitorPlay, ShieldCheck } from "lucide-react";
import { personalInfo as defaultInfo } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext.jsx";
import Section, { SectionHeader } from "./ui/Section.jsx";
import Reveal from "./ui/Reveal.jsx";

const reasons = [
  {
    icon: UserRound,
    title: "One person, start to finish",
    text: "Design, development and deployment are handled by me, so nothing gets lost in a hand-off.",
  },
  {
    icon: ReceiptText,
    title: "Fixed quotes, clear scope",
    text: "You know the price and exactly what's included before any work starts.",
  },
  {
    icon: MonitorPlay,
    title: "Progress you can see",
    text: "Regular demos of working software, not status reports.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    text: "Clean, documented code that you fully own, on infrastructure that stays online.",
  },
];

const About = () => {
  const { personalInfo: contextInfo } = usePortfolio();
  const info = contextInfo || defaultInfo;
  const name = info.name || "Saif Tandel";

  return (
    <Section id="about" labelledBy="about-heading" glow="center">
      <SectionHeader
        id="about-heading"
        eyebrow="About"
        index="04"
        title="You work directly with"
        highlight="the person who builds it"
      />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Statement */}
        <Reveal variant="left" className="lg:col-span-6">
          <p className="text-2xl sm:text-[1.75rem] lg:text-[2rem] font-medium text-white leading-[1.3] tracking-[-0.02em] text-pretty">
            I'm {name}, a full-stack developer based in Dubai. I've built{" "}
            <span className="text-gradient">booking platforms, hospital portals and sales CRMs</span>{" "}
            that real businesses run on every day.
          </p>
          <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl text-pretty">
            No account managers and no layers in between. You talk to me, I build it, and you see
            it take shape week by week. I hold a Bachelor of Engineering from the University of
            Mumbai and work with clients in the UAE, India and remotely worldwide.
          </p>
        </Reveal>

        {/* Reasons */}
        <ul className="lg:col-span-6 grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <Reveal as="li" key={reason.title} delay={idx * 80} className="bg-[#0b0b12] p-6 sm:p-7 group">
                <Icon
                  className="w-6 h-6 text-purple-300 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-lg font-semibold text-white tracking-tight">{reason.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{reason.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
};

export default About;
