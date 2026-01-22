import { UserProfile, Achievement, ActivityItem, Stats } from "./types";

export const mockUser: UserProfile = {
  address: "GABX...9KLM",
  displayName: "Tybravo",
  avatarUrl: "https://i.pravatar.cc/150?img=11",
  bio: "Open-source contributor & Stellar ecosystem builder.",
  tier: "Gold",
  reputationScore: 720,
  nextTierScore: 1000,
};

export const mockStats: Stats = {
  bountiesCompleted: 18,
  totalEarned: 540,
  successRate: 92,
};

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "First Bounty",
    description: "Completed your first bounty",
    icon: "Award",
    unlocked: true,
  },
  {
    id: "2",
    name: "Guild Veteran",
    description: "Joined 5 guilds",
    icon: "Shield",
    unlocked: true,
  },
  {
    id: "3",
    name: "Diamond Rank",
    description: "Reach Diamond tier",
    icon: "Gem",
    unlocked: false,
  },
];

export const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "guild",
    title: "Joined Stellar Builders Guild",
    timestamp: "2025-01-12",
  },
  {
    id: "2",
    type: "bounty",
    title: "Completed Reputation Dashboard UI",
    timestamp: "2025-01-20",
  },
];
