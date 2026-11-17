import {
  Code,
  Layout,
  Server,
  Sparkles,
  Cloud,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { servicesData } from "../data/portfolioData";
import Section, { SectionHeader } from "./ui/Section.jsx";
import Reveal from "./ui/Reveal.jsx";

// Maps each service card to the matching option in the contact form
const serviceToInquiry = {
  "fullstack-dev": "Full-Stack Web App",
  "crm-dashboards": "CRM & Dashboard",
  "api-integrations": "REST API & Backend",
  "uiux-websites": "Landing Page & UI/UX",
  "cloud-devops": "Cloud & DevOps",
};

const iconMap = {
  code: Code,
  layout: Layout,
  server: Server,
  sparkles: Sparkles,
  cloud: Cloud,
  wrench: Wrench,
};

const Services = () => {
  const navigate = useNavigate();

  const handleInquire = (service) => {
    const inquiry = serviceToInquiry[service.id] || "Something else";
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Custom event to pre-select service in Contact form
      window.dispatchEvent(
        new CustomEvent("select-service", { detail: { service: inquiry } })
      );
    } else {
      // Standalone /services page: no contact section to scroll to
      navigate(`/contact?service=${encodeURIComponent(inquiry)}`);
    }
  };

  return (
    <Section id="services" labelledBy="services-heading" glow="left">
      <SectionHeader
        id="services-heading"
        eyebrow="Services"
        index="02"
        title="Everything you need to"
        highlight="launch and grow online"
        description="From first idea to live product. One developer handles design, build and deployment, so nothing gets lost between teams."
      />

      {/* Numbered service rows */}
      <ul className="border-t border-white/10">
        {servicesData.map((service, idx) => {
          const IconComponent = iconMap[service.icon] || Layers;
          return (
            <Reveal as="li" key={service.id} delay={Math.min(idx, 3) * 70}>
              <article className="service-row group">
                <span className="service-row__index" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <IconComponent className="w-5 h-5 text-purple-300 shrink-0" aria-hidden="true" />
                    <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-white tracking-[-0.02em] leading-tight">
                      {service.title}
                    </h3>
                    {service.badge && <span className="pill text-purple-200">{service.badge}</span>}
                  </div>
                  <p className="mt-3 text-gray-400 text-[0.9375rem] leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleInquire(service)}
                  aria-label={`Get a quote for ${service.title}`}
                  className="service-row__cta"
                >
                  <span className="lg:sr-only">Get a Quote</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
};

export default Services;
