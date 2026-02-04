import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

import { fetchPersonalInfo, createContact } from "../../api/portfolioApi";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(() => {
    const cached = localStorage.getItem("personalInfo");
    return cached ? JSON.parse(cached) : null;
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPersonalInfo();
        setPersonalInfo(data);
        localStorage.setItem("personalInfo", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      }
    };

    loadData();
  }, []);

  if (!personalInfo) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContact(formData);

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* CONTACT INFO */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Get In <span className="text-purple-400">Touch</span>
            </h2>

            <p className="text-gray-400 mb-8">
              Feel free to reach out. I usually respond within 12 hours.
            </p>

            <div className="space-y-5">
              <div className="flex gap-4">
                <Mail className="text-purple-400" />
                <span className="text-white">{personalInfo.email}</span>
              </div>

              <div className="flex gap-4">
                <Phone className="text-purple-400" />
                <span className="text-white">{personalInfo.phone}</span>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-purple-400" />
                <span className="text-white">{personalInfo.location}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a href={personalInfo.github} target="_blank" rel="noreferrer">
                <Github className="text-gray-400 hover:text-purple-400" />
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="text-gray-400 hover:text-purple-400" />
              </a>
            </div>
          </div>

          {/* CONTACT FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#0a0a0a] p-8 rounded-xl border border-purple-500/20 space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#111111] text-white px-4 py-3 rounded-md border border-purple-500/20 focus:border-purple-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#111111] text-white px-4 py-3 rounded-md border border-purple-500/20 focus:border-purple-500 outline-none"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-[#111111] text-white px-4 py-3 rounded-md border border-purple-500/20 focus:border-purple-500 outline-none resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-md transition hover:scale-105 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
