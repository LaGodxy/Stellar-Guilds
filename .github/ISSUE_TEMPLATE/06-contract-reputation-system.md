---
name: Implement Reputation & Incentive Contract
about: Create a contract for tracking contributor reputation and incentive rewards
title: "[CONTRACT] Implement Reputation & Incentive Contract"
labels: contract, gamification, medium-priority
assignees: ''
---

## 🎯 Context & Impact

Contributors need recognition for their work, and guilds need data to identify reliable talent. A reputation system creates long-term incentives, increases platform stickiness, and helps match the right contributors with the right tasks.

**Why this matters:**
- Incentivizes quality work over time
- Helps guilds identify top contributors
- Creates progression paths for contributors
- Enables reputation-gated opportunities (premium bounties)
- Builds a merit-based ecosystem

## 📋 Scope

Implement a Soroban smart contract that tracks contributor reputation, awards achievements, and manages reputation-based incentives.

**What's included:**
- Reputation score tracking per contributor
- Achievement/badge system
- Reputation gain from completed tasks
- Reputation decay for failures/disputes
- Reputation tiers (Bronze, Silver, Gold, Platinum)
- Query functions for reputation-based filtering
- Incentive multipliers based on reputation

**What's NOT included:**
- NFT badge minting (future enhancement)
- Cross-guild reputation (future)
- Reputation marketplace (future)

## 🛠️ Implementation Guidelines

### File Structure
Create the following files in the `contract/` directory:
```
contract/
├── src/
│   ├── reputation/
│   │   ├── mod.rs
│   │   ├── scoring.rs
│   │   ├── achievements.rs
│   │   ├── types.rs
│   │   └── storage.rs
```

### Key Data Structures
Define:
- `ReputationProfile` struct (address, score, tier, tasks_completed, success_rate, achievements)
- `ReputationTier` enum (Bronze, Silver, Gold, Platinum, Diamond)
- `Achievement` struct (id, name, description, points, criteria)
- `ReputationEvent` enum (TaskCompleted, TaskFailed, DisputeWon, DisputeLost, MilestoneAchieved)
- Storage for profiles and achievements

### Core Functions to Implement
1. `initialize_profile(env, address)` → Profile
2. `update_reputation(env, address, event, value)` → new_score
3. `award_achievement(env, address, achievement_id)` → bool
4. `get_reputation(env, address)` → ReputationProfile
5. `get_tier(env, address)` → ReputationTier
6. `calculate_incentive_multiplier(env, address)` → u32 (e.g., 100 = 1.0x, 150 = 1.5x)
7. `get_top_contributors(env, guild_id, limit)` → Vec<Address>
8. `check_achievement_eligibility(env, address, achievement_id)` → bool
9. `get_achievements(env, address)` → Vec<Achievement>

### Reputation Calculation Logic
Define scoring rules:
- Task completion: +10 to +50 (based on complexity)
- Milestone completion: +20 to +100
- Dispute won: +5
- Dispute lost: -20
- Task failed/cancelled: -10
- Time decay: -1% per month of inactivity
- Success rate bonus: up to +50% for >95% success

### Tier Thresholds
- Bronze: 0-99 points
- Silver: 100-499 points
- Gold: 500-1499 points
- Platinum: 1500-4999 points
- Diamond: 5000+ points

### Incentive Multipliers
- Bronze: 1.0x
- Silver: 1.1x
- Gold: 1.25x
- Platinum: 1.5x
- Diamond: 2.0x

### Constraints & Requirements
- Reputation cannot go below 0
- Only authorized contracts can update reputation
- Achievement awards must be verifiable
- Tier changes trigger events
- Efficient querying for large contributor sets
- Prevent reputation gaming

### Edge Cases to Handle
- First-time contributors (initial reputation)
- Negative reputation overflow
- Rapid tier changes
- Achievement spam prevention
- Inactive contributor handling
- Reputation reset requests
- Invalid event types

## ✅ Definition of Done

Your PR should include:

- [ ] Complete implementation of all 9 core functions
- [ ] Reputation calculation logic with all event types
- [ ] Tier system with automatic upgrades/downgrades
- [ ] Achievement award system
- [ ] Incentive multiplier calculation
- [ ] Comprehensive unit tests (>80% coverage)
- [ ] Integration tests with bounty/milestone contracts
- [ ] Gas-optimized queries for leaderboards
- [ ] Event emission for all reputation changes
- [ ] Inline documentation for scoring logic

## 🧪 Testing Requirements

Provide tests that cover:
1. Profile initialization
2. Reputation updates from various events
3. Tier calculation and upgrades
4. Achievement eligibility and awards
5. Incentive multiplier calculation
6. Leaderboard queries
7. Edge cases (overflow, underflow, gaming attempts)
8. Time decay simulation
9. Success rate calculations
10. Integration with task completion

## 📚 Resources

- [Soroban Storage Optimization](https://soroban.stellar.org/docs/how-to-guides/storage)
- [Gamification Design](https://www.gamified.uk/user-types/)
- [Reputation Systems](https://en.wikipedia.org/wiki/Reputation_system)

## 🔍 Review Criteria

Your submission will be evaluated on:
- **Fairness**: Is the scoring system balanced?
- **Gaming Resistance**: Can reputation be easily exploited?
- **Performance**: Are queries efficient?
- **Flexibility**: Can scoring rules be adjusted?
- **Test Coverage**: Are edge cases tested?
- **Code Quality**: Is logic clear and maintainable?

## 💡 Questions?

Comment on this issue if you need clarification on:
- Scoring algorithm details
- Tier threshold adjustments
- Achievement criteria
- Integration points with other contracts
