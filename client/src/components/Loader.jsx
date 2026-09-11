import React from "react";
import { Loader2, Sparkles } from "lucide-react";

const Loader = ({ message = "Loading projects & data...", minHeight = "min-h-[400px]" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${minHeight} w-full text-center relative`}>
      {/* Glow effect */}
      <div className="absolute w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Animated glowing spinner container */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 animate-spin p-0.5 shadow-lg shadow-purple-600/30">
            <div className="w-full h-full bg-[#08080c] rounded-[14px]" />
          </div>
          <Sparkles className="w-6 h-6 text-purple-400 absolute animate-pulse" />
        </div>

        <p className="text-gray-300 font-medium text-sm sm:text-base animate-pulse tracking-wide mt-2">
          {message}
        </p>

        <div className="flex items-center gap-2 text-xs text-purple-400/80 font-mono">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Connecting to server API...</span>
        </div>
      </div>
    </div>
  );
};

export const ProjectSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-10 w-full animate-pulse">
      {[1, 2].map((n) => (
        <div
          key={n}
          className="glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between h-[480px]"
        >
          <div className="h-56 bg-white/5 w-full relative" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-white/10 rounded-md w-3/4" />
            <div className="h-4 bg-white/5 rounded-md w-full" />
            <div className="h-4 bg-white/5 rounded-md w-5/6" />
            <div className="flex gap-2 pt-4">
              <div className="h-6 bg-white/5 rounded-md w-16" />
              <div className="h-6 bg-white/5 rounded-md w-20" />
              <div className="h-6 bg-white/5 rounded-md w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
