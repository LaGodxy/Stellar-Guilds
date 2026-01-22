import React from "react";
import { Stats } from "../types";
import { CheckCircle2, Coins, TrendingUp } from "lucide-react";

interface StatsOverviewProps {
  stats: Stats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Bounties Completed
            </p>
            <p className="text-xl font-bold text-gray-900">
              {stats.bountiesCompleted}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-yellow-100 p-2 text-yellow-600">
            <Coins className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Earned</p>
            <p className="text-xl font-bold text-gray-900">
              {stats.totalEarned} XLM
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-100 p-2 text-green-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Success Rate</p>
            <p className="text-xl font-bold text-gray-900">
              {stats.successRate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
