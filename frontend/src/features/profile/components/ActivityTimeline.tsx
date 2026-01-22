import React from "react";
import { ActivityItem } from "../types";
import { Users, Hammer, Scale } from "lucide-react";

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

const activityIcons = {
  guild: Users,
  bounty: Hammer,
  dispute: Scale,
};

const activityColors = {
  guild: "bg-purple-100 text-purple-600",
  bounty: "bg-orange-100 text-orange-600",
  dispute: "bg-red-100 text-red-600",
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full transition-shadow duration-300 hover:shadow-xl">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Activity</h3>
      <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="relative space-y-6 pl-4 border-l-2 border-gray-100">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type] || Users;
            
            return (
              <div key={activity.id} className="relative pl-2">
                {/* Timeline Dot */}
                <div className={`absolute -left-[25px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-sm ${activityColors[activity.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
          
          {activities.length === 0 && (
            <p className="text-sm text-gray-500 italic">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
};
