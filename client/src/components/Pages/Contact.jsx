import React, { useEffect, useState } from "react";
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
import { fetchPersonalInfo, createContact } from "../../api/portfolioApi";
import { personalInfo as defaultInfo } from "../../data/portfolioData";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const [personalInfo, setPersonalInfo] = useState(() => {
    const cached = localStorage.getItem("personalInfo");
    return cached ? JSON.parse(cached) : defaultInfo;
  });

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
    "Full-Time Engineering Role",
  ];

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPersonalInfo();
        if (data) {
          setPersonalInfo(data);
          localStorage.setItem("personalInfo", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      }
    };
    loadData();
  }, []);

  const info = personalInfo || defaultInfo;

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
        text: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatusMessage({
        type: "error",
        text: "Failed to send message via server. You can also reach me directly at saifcodes13@gmail.com or WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#08080c] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let's <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
            Open for new opportunities, full-time engineering roles, and innovative collaborations. Whether you have a project idea or want to chat tech, feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Open to Opportunities Card */}
            <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 bg-purple-950/10 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/15 text-purple-400 rounded-xl border border-purple-500/30 flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-bold text-sm uppercase tracking-wide">
                      Open to Opportunities
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Full-Stack / Frontend
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Available for Interviews & Projects
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed pt-1">
                    Ready to contribute to high-impact teams with modern React.js, Node.js, and cloud engineering expertise.
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
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
              >
                {copiedField === "email" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Phone / Call
                  </div>
                  <a
                    href={`tel:${info.phone || "+919819803103"}`}
                    className="text-white text-sm sm:text-base font-medium hover:text-purple-400 transition-colors"
                  >
                    {info.phone || "+91 9819803103"}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(info.phone || "+919819803103", "phone")}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Copy Phone"
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
              href={info.whatsapp || "https://wa.me/919819803103"}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-emerald-500/30 flex items-center justify-between group"
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
                Open Chat ➔
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
                className="p-3 glass-panel rounded-xl text-gray-300 hover:text-purple-400 hover:border-purple-500/40 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={info.linkedin || "https://linkedin.com/in/saif-tandel"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-panel rounded-xl text-gray-300 hover:text-purple-400 hover:border-purple-500/40 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Column: Modern Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 relative">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Fill in the form below and I'll respond within 12 hours.
              </p>

              {statusMessage && (
                <div
                  className={`p-4 rounded-xl text-sm mb-6 ${
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
                    <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Smith"
                      className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Your Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Project / Service Type Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider block">
                    What Service or Project do you need?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((svc, sIdx) => (
                      <button
                        type="button"
                        key={sIdx}
                        onClick={() => handleServiceClick(svc)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                          selectedService === svc || formData.service === svc
                            ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105 border border-purple-400"
                            : "glass-panel text-gray-300 hover:text-white hover:border-purple-500/30"
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Subject / Project Title
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full-Stack Developer Role / Project Inquiry"
                    className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Message <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your opportunity, project or inquiry..."
                    className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-600/30 hover:scale-[1.01] disabled:opacity-50 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
