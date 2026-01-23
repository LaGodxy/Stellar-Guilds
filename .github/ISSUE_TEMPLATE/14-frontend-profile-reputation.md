---
name: Build User Profile & Reputation Dashboard (UI Only)
about: Create UI for user profiles, reputation tiers, and achievement showcases using mock data
title: "[FRONTEND] Build User Profile & Reputation Dashboard"
labels: frontend, feature, medium-priority
assignees: ''
---

## 🎯 Context & Impact

The profile is the contributor's identity in Stellar Guilds. This issue focuses on building a visually compelling dashboard that showcases reputation, earnings, and achievements using mock data to finalize the gamification elements.

**Why this matters:**
- Creates a sense of progression for contributors
- Finalizes the reputation tier visualization (Bronze to Diamond)
- Establishes the layout for achievements and badges
- Provides a hub for users to track their activity

## 📋 Scope

Build a comprehensive user profile system with reputation tracking and activity history using mock data.

**What's included:**
- Public profile page view
- User settings/edit profile UI
- Reputation score visualization (Progress bars, Tiers)
- Achievement/Badge grid
- Contribution statistics dashboard (Total Earned, Success Rate)
- Activity timeline (History of joined guilds, finished bounties)
- Tier-based UI styling (Glows, Borders, Icons)

**What's NOT included:**
- Fetching reputation from smart contracts
- Real-time achievement triggers
- Wallet-based profile metadata (use mock data)

## 🛠️ Implementation Guidelines

### File Structure
Create these files in `frontend/src/` (Next.js App Router):
```
src/
├── app/
│   ├── profile/
│   │   ├── [address]/
│   │   │   └── page.tsx          # Public profile view
│   │   └── settings/
│   │       └── page.tsx          # Profile edit UI
├── features/profile/
│   ├── components/
│   │   ├── ReputationCard.tsx    # Tier & Score display
│   │   ├── AchievementGrid.tsx   # Badge showcase
│   │   ├── ActivityTimeline.tsx  # History feed
│   │   └── StatsOverview.tsx     # Earnings & KPIs
│   └── types.ts
```

### Key Views to Implement

**1. Public Profile (`app/profile/[address]/page.tsx`)**
- **Header**: Avatar, Username/Address, Reputation Tier
- **Reputation**: Large visualization of current points and progress to next tier
- **Achievements**: Grid of earned badges with tooltips
- **Statistics**: Cards showing "Bounties Completed", "Total XLM Earned", "Success Rate"

**2. Activity Timeline (`features/profile/components/ActivityTimeline.tsx`)**
- Chronological list of events: "Joined [Guild]", "Completed [Bounty]", "Won [Dispute]"
- Icons for each activity type

**3. Profile Settings (`app/profile/settings/page.tsx`)**
- Form to edit display name, bio, social links, and avatar URL

### Reputation Visualization
Implement specific styles for tiers:
- **Bronze/Silver**: Clean, simple
- **Gold/Platinum**: Gradients and subtle glows
- **Diamond**: Special animated borders or unique icons

## ✅ Definition of Done

- [ ] Public profile page with all sections implemented
- [ ] Reputation tier visualization (Progress to next tier)
- [ ] Achievement grid with "locked" and "unlocked" states
- [ ] Contribution statistics dashboard
- [ ] Profile settings form with UI feedback
- [ ] Mobile-responsive profile layout
- [ ] All components populated with realistic mock data

## 🧪 Testing Requirements

- Verify tier styling changes based on mock score
- Test timeline scrolling and layout
- Check achievement tooltips/details on hover
- Ensure profile settings form handles different input lengths

## 📚 Resources

- [Lucide Icons for Badges](https://lucide.dev/)
- [Tailwind Gradient Generator](https://hypercolor.dev/)
