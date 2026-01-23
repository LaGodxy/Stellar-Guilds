import React from "react";
import { Achievement } from "../types";
import { Award, Shield, Gem, Lock } from "lucide-react";
import { clsx } from "clsx";

interface AchievementGridProps {
  achievements: Achievement[];
}

const iconMap: Record<string, React.ElementType> = {
  Award: Award,
  Shield: Shield,
  Gem: Gem,
};

export const AchievementGrid: React.FC<AchievementGridProps> = ({
  achievements,
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-shadow duration-300 hover:shadow-xl">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Achievements</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {achievements.map((achievement) => {
          const Icon = iconMap[achievement.icon] || Award;
          
          return (
            <div
              key={achievement.id}
              className={clsx(
                "group relative flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all",
                achievement.unlocked
                  ? "border-blue-100 bg-blue-50/50 hover:border-blue-300 hover:bg-blue-50"
                  : "border-gray-200 bg-gray-50 grayscale"
              )}
              title={achievement.description}
            >
              <div
                className={clsx(
                  "mb-3 rounded-full p-3 shadow-sm",
                  achievement.unlocked
                    ? "bg-white text-blue-600"
                    : "bg-gray-200 text-gray-400"
                )}
              >
                {achievement.unlocked ? (
                  <Icon className="h-6 w-6" />
                ) : (
                  <Lock className="h-6 w-6" />
                )}
              </div>
              <h4
                className={clsx(
                  "text-sm font-semibold",
                  achievement.unlocked ? "text-gray-900" : "text-gray-500 blur-[0.5px]"
                )}
              >
                {achievement.name}
              </h4>
              
              {/* Tooltip on hover */}
              <div className="absolute -top-12 left-1/2 hidden -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100 whitespace-nowrap z-10">
                {achievement.description}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
