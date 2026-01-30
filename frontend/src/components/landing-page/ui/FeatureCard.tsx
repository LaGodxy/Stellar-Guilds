import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type AccentColor = "violet" | "cyan" | "amber" | "rose" | "blue";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  accentColor?: AccentColor;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  accentColor = "violet",
}: FeatureCardProps) {
  const colorClasses: Record<AccentColor, string> = {
    violet:
      "from-violet-500/20 to-violet-600/5 group-hover:from-violet-500/30 border-violet-500/20 group-hover:border-violet-500/40",
    cyan: "from-cyan-500/20 to-cyan-600/5 group-hover:from-cyan-500/30 border-cyan-500/20 group-hover:border-cyan-500/40",
    amber:
      "from-amber-500/20 to-amber-600/5 group-hover:from-amber-500/30 border-amber-500/20 group-hover:border-amber-500/40",
    rose: "from-rose-500/20 to-rose-600/5 group-hover:from-rose-500/30 border-rose-500/20 group-hover:border-rose-500/40",
    blue: "from-blue-500/20 to-blue-600/5 group-hover:from-blue-500/30 border-blue-500/20 group-hover:border-blue-500/40",
  };

  const iconColors: Record<AccentColor, string> = {
    violet: "text-violet-400 group-hover:text-violet-300",
    cyan: "text-cyan-400 group-hover:text-cyan-300",
    amber: "text-amber-400 group-hover:text-amber-300",
    rose: "text-rose-400 group-hover:text-rose-300",
    blue: "text-blue-400 group-hover:text-blue-300",
  };

  const glowColors: Record<AccentColor, string> = {
    violet: "group-hover:shadow-violet-500/20",
    cyan: "group-hover:shadow-cyan-500/20",
    amber: "group-hover:shadow-amber-500/20",
    rose: "group-hover:shadow-rose-500/20",
    blue: "group-hover:shadow-blue-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className={`
        relative h-full p-6 rounded-2xl border backdrop-blur-sm
        bg-gradient-to-br ${colorClasses[accentColor]}
        transition-all duration-500 ease-out
        group-hover:-translate-y-2 group-hover:shadow-2xl ${glowColors[accentColor]}
      `}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />

        <div
          className={`
          w-14 h-14 rounded-xl flex items-center justify-center mb-5
          bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50
          group-hover:scale-110 transition-transform duration-300
        `}
        >
          <Icon
            className={`w-7 h-7 ${iconColors[accentColor]} transition-colors duration-300`}
          />
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>

        <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
