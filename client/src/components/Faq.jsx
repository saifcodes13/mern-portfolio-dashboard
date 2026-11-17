import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import Section from "./ui/Section.jsx";
import Reveal from "./ui/Reveal.jsx";
import QuoteLink from "./ui/QuoteLink.jsx";

const faqs = [
  {
    q: "How much does a website or web app cost?",
    a: "It depends on what you need, so I don't quote blind. After a free consultation you get a fixed quote with everything included, and the price doesn't change unless the scope does.",
  },
  {
    q: "How long will my project take?",
    a: "A landing page can be live within a couple of weeks. Larger platforms and CRMs take longer. Your quote comes with a timeline, and you see working progress along the way.",
  },
  {
    q: "Do you work with clients outside Dubai?",
    a: "Yes. I'm based in Dubai and work with clients across the UAE, India and worldwide. Everything can be handled remotely over calls, WhatsApp and email.",
  },
  {
    q: "Will I be able to update the site myself?",
    a: "Yes. Where your project needs it, you get an admin panel to manage content, products, bookings or leads without touching code.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A short description of what you want to build, any examples you like, and your content or branding if you have it. If you're not sure yet, we'll work it out together on the first call.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Bug fixes, updates and ongoing maintenance are available after launch. We agree what's included when you get your quote.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const Faq = () => {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq" labelledBy="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <p className="kicker">
            <span className="kicker__index">06</span>
            <span className="kicker__line" aria-hidden="true" />
            <span>FAQ</span>
          </p>
          <h2
            id="faq-heading"
            className="mt-5 text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold text-white tracking-[-0.03em] leading-[1.06] text-balance"
          >
            Questions, <span className="text-gradient">answered</span>
          </h2>
          <p className="mt-5 text-gray-400 text-base lg:text-[1.0625rem] leading-relaxed max-w-md">
            Not sure where to start? These are the things clients usually ask before a first call.
          </p>
          <QuoteLink className="btn btn-ghost mt-8">
            Ask me anything
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </QuoteLink>
        </Reveal>

        <ul className="lg:col-span-7 border-t border-white/10">
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <Reveal as="li" key={item.q} delay={Math.min(idx, 3) * 60} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    id={`faq-button-${idx}`}
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    className="group w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer"
                  >
                    <span
                      className={`text-lg sm:text-xl font-medium tracking-tight transition-colors duration-300 ${
                        isOpen ? "text-white" : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`faq-icon grid place-items-center w-9 h-9 shrink-0 rounded-full border ${
                        isOpen
                          ? "bg-purple-600 border-purple-500 text-white rotate-45"
                          : "border-white/15 text-gray-300 group-hover:border-purple-400/50"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-button-${idx}`}
                  className="faq-panel"
                  data-open={isOpen}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-gray-400 text-base leading-relaxed max-w-2xl">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
};

export default Faq;
