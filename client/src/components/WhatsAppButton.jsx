import { MessageCircle } from "lucide-react";
import { personalInfo as defaultInfo } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext.jsx";

const WhatsAppButton = () => {
  const { personalInfo: contextInfo } = usePortfolio();
  const info = contextInfo || defaultInfo;

  return (
    <a
      href={info.whatsapp || defaultInfo.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-lg shadow-emerald-500/30 p-3.5 sm:pr-5 transition-all duration-300 hover:scale-105"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline text-sm font-semibold">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
