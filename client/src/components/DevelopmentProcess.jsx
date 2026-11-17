import { workflowSteps } from "../data/portfolioData";
import { Search, Palette, Code2, Rocket } from "lucide-react";
import Section, { SectionHeader } from "./ui/Section.jsx";
import Reveal from "./ui/Reveal.jsx";

const stepIcons = [Search, Palette, Code2, Rocket];

const DevelopmentProcess = () => {
  return (
    <Section id="process" labelledBy="process-heading">
      <SectionHeader
        id="process-heading"
        eyebrow="Process"
        index="03"
        title="A clear path from"
        highlight="idea to launch"
        description="Four steps that keep you in the loop: a fixed scope up front, regular demos while I build, and a launch date you can plan around."
      />

      <div className="relative">
        {/* connecting line (desktop) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-500/0 via-purple-400/40 to-purple-500/0"
        />
      <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowSteps.map((step, idx) => {
          const IconComponent = stepIcons[idx] || Code2;
          return (
            <Reveal as="li" key={step.step} delay={idx * 110} className="relative h-full">
              <div className="surface lift h-full p-6 rounded-2xl group">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative p-3 rounded-xl bg-[#14121f] text-purple-300 border border-purple-500/25 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-4xl font-bold font-mono text-white/10 transition-colors duration-500 group-hover:text-purple-400/50"
                  >
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">
                  <span className="sr-only">Step {Number(step.step)}: </span>
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
      </div>
    </Section>
  );
};

export default DevelopmentProcess;
