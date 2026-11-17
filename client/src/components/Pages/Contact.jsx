import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { createContact } from "../../api/portfolioApi";
import { personalInfo as defaultInfo } from "../../data/portfolioData";
import { usePortfolio } from "../../context/PortfolioContext.jsx";
import Section, { SectionHeader } from "../ui/Section.jsx";
import Reveal from "../ui/Reveal.jsx";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const { personalInfo: contextInfo } = usePortfolio();
  const info = contextInfo || defaultInfo;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    service: "",
    message: "",
  });
  const [selectedService, setSelectedService] = useState("");

  const serviceOptions = [
    "Full-Stack Web App",
    "CRM & Dashboard",
    "Landing Page & UI/UX",
    "REST API & Backend",
    "Cloud & DevOps",
    "Something else",
  ];

  // Pre-select a service when arriving from /contact?service=...
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const svc = searchParams.get("service");
    if (svc) {
      setSelectedService(svc);
      setFormData((prev) => ({ ...prev, service: svc, subject: `Project Inquiry: ${svc}` }));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleServiceSelect = (e) => {
      if (e.detail && e.detail.service) {
        setSelectedService(e.detail.service);
        setFormData((prev) => ({
          ...prev,
          service: e.detail.service,
          subject: `Project Inquiry: ${e.detail.service}`,
        }));
      }
    };
    window.addEventListener("select-service", handleServiceSelect);
    return () => window.removeEventListener("select-service", handleServiceSelect);
  }, []);

  const handleServiceClick = (svc) => {
    setSelectedService(svc);
    setFormData((prev) => ({
      ...prev,
      service: svc,
      subject: `Project Inquiry: ${svc}`,
    }));
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await createContact(formData);
      setStatusMessage({
        type: "success",
        text: "Thanks! Your message is on its way. I'll reply within 24 hours, usually much sooner. Need a faster answer? Message me on WhatsApp.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        service: "",
        message: "",
      });
      setSelectedService("");
    } catch (error) {
      console.error(error);
      setStatusMessage({
        type: "error",
        text: `Sorry, your message couldn't be sent. Please email me at ${info.email || "saifcodes13@gmail.com"} or message me on WhatsApp so your inquiry isn't lost.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" labelledBy="contact-heading" glow="left">
      <SectionHeader
        id="contact-heading"
        index="07"
        eyebrow="Get In Touch"
        icon={MessageSquare}
        title="Let's Build"
        highlight="Your Project"
        description="Tell me what you need: a web app, CRM, dashboard, or website. You'll get a clear plan, timeline, and quote. The first consultation is free and there's no obligation."
      />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact Cards (5 cols) */}
          <Reveal variant="left" className="lg:col-span-5 space-y-5">
            
            {/* Availability Card */}
            <div className="surface p-6 rounded-2xl border border-purple-500/30 bg-purple-950/10 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/15 text-purple-400 rounded-xl border border-purple-500/30 flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-bold text-sm uppercase tracking-wide">
                      Taking New Projects
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Dubai & Remote
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Free 30-Minute Consultation
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed pt-1">
                    We'll scope your idea together and I'll send a fixed quote and timeline. No commitment needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="surface lift p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Email Address
                  </div>
                  <a
                    href={`mailto:${info.email || "saifcodes13@gmail.com"}`}
                    className="text-white text-sm sm:text-base font-medium hover:text-purple-400 transition-colors"
                  >
                    {info.email || "saifcodes13@gmail.com"}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(info.email || "saifcodes13@gmail.com", "email")}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Copy Email"
                aria-label="Copy email address"
              >
                {copiedField === "email" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="surface lift p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Phone / Call
                  </div>
                  <a
                    href={`tel:${info.phone ? info.phone.replace(/\s+/g, '') : "+971581702009"}`}
                    className="text-white text-sm sm:text-base font-medium hover:text-purple-400 transition-colors"
                  >
                    {info.phone || "+971 581702009"}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(info.phone || "+971 581702009", "phone")}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Copy Phone"
                aria-label="Copy phone number"
              >
                {copiedField === "phone" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* WhatsApp Quick Action */}
            <a
              href={info.whatsapp || "https://wa.me/971581702009"}
              target="_blank"
              rel="noopener noreferrer"
              className="surface lift p-5 rounded-2xl border border-emerald-500/30 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                    Instant Messaging
                  </div>
                  <div className="text-white text-sm sm:text-base font-medium group-hover:text-emerald-300 transition-colors">
                    Chat on WhatsApp
                  </div>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-medium bg-emerald-500/10 px-3 py-1 rounded-lg">
                Open Chat <span aria-hidden="true">➔</span>
              </span>
            </a>

            {/* Socials row */}
            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Social Profiles:
              </span>
              <a
                href={info.github || "https://github.com/saifcodes13"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 surface rounded-xl text-gray-300 hover:text-purple-400 hover:border-purple-500/40 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={info.linkedin || "https://linkedin.com/in/saif-tandel"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 surface rounded-xl text-gray-300 hover:text-purple-400 hover:border-purple-500/40 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

          </Reveal>

          {/* Right Column: Modern Contact Form (7 cols) */}
          <Reveal variant="right" delay={120} className="lg:col-span-7">
            <div className="surface p-6 sm:p-10 rounded-2xl relative shadow-2xl shadow-purple-950/30">
              <h3 className="text-2xl font-bold text-white mb-2">
                Get a Free Quote
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Takes under a minute. I reply within 24 hours, usually much sooner.
              </p>

              {statusMessage && (
                <div
                  role={statusMessage.type === "success" ? "status" : "alert"}
                  className={`hero-in p-4 rounded-xl text-sm mb-6 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/15 border border-red-500/30 text-red-300"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                    name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Smith"
                      className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none text-sm transition-[border-color,box-shadow] duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Your Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                    name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none text-sm transition-[border-color,box-shadow] duration-300"
                    />
                  </div>
                </div>

                {/* Project / Service Type Selector */}
                <div className="space-y-2.5" role="group" aria-labelledby="contact-service-label">
                  <span id="contact-service-label" className="text-xs font-medium text-gray-300 uppercase tracking-wider block">
                    What Service or Project do you need?
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((svc, sIdx) => (
                      <button
                        type="button"
                        key={sIdx}
                        onClick={() => handleServiceClick(svc)}
                        aria-pressed={selectedService === svc || formData.service === svc}
                        className={`text-xs px-3 py-2 rounded-lg font-medium transition-[background-color,border-color,color,box-shadow] duration-300 cursor-pointer ${
                          selectedService === svc || formData.service === svc
                            ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400"
                            : "surface text-gray-300 hover:text-white hover:border-purple-500/30"
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Subject / Project Title
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Booking website for my clinic"
                    className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none text-sm transition-[border-color,box-shadow] duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Message <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What are you building? Include goals, must-have features, timeline and budget range if you know them..."
                    className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none text-sm transition-[border-color,box-shadow] duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Get My Free Quote</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>

        </div>
    </Section>
  );
};

export default Contact;
