export type ReputationTier =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond";

export interface UserProfile {
  address: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  tier: ReputationTier;
  reputationScore: number;
  nextTierScore: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface ActivityItem {
  id: string;
  type: "guild" | "bounty" | "dispute";
  title: string;
  timestamp: string;
}

export interface Stats {
  bountiesCompleted: number;
  totalEarned: number;
  successRate: number;
}
