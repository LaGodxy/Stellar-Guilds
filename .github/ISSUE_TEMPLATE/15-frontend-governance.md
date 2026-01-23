---
name: Build Governance & Voting Interface (UI Only)
about: Create UI for proposal creation, voting, and governance participation using mock data
title: "[FRONTEND] Build Governance & Voting Interface"
labels: frontend, feature, governance, medium-priority
assignees: ''
---

## 🎯 Context & Impact

Democratic governance is the heart of decentralized guilds. This issue focuses on building the UI for the proposal and voting system, ensuring that the decision-making process is clear and engaging for members.

**Why this matters:**
- Finalizes the UX for creating and voting on guild proposals
- Establishes the layout for voting tally and results visualization
- Provides a clear interface for decentralized governance
- Enables testing of the voting flow before contract deployment

## 📋 Scope

Build a comprehensive governance interface for proposal management and voting using mock data.

**What's included:**
- Guild governance dashboard (Listing proposals)
- Proposal detail page with content and results
- "Create Proposal" form with multiple types (Treasury, Rule Change, etc.)
- Voting interface (For, Against, Abstain buttons)
- Results visualization (Quorum progress, Vote breakdown)
- Vote delegation UI placeholders
- Proposal status timeline

**What's NOT included:**
- On-chain voting execution
- Quorum calculation from contract data
- Real vote signing/verification

## 🛠️ Implementation Guidelines

### File Structure
Create these files in `frontend/src/` (Next.js App Router):
```
src/
├── app/
│   ├── guilds/
│   │   └── [id]/
│   │       └── governance/
│   │           ├── page.tsx              # Governance dashboard
│   │           ├── [proposalId]/
│   │           │   └── page.tsx          # Proposal detail & voting
│   │           └── create/
│   │               └── page.tsx          # Create proposal UI
├── features/governance/
│   ├── components/
│   │   ├── ProposalCard.tsx              # Proposal summary
│   │   ├── VotingPanel.tsx               # Vote buttons & power display
│   │   ├── ResultsChart.tsx              # For/Against breakdown
│   │   └── QuorumTracker.tsx             # Progress to quorum
│   └── types.ts
```

### Key Views to Implement

**1. Governance Dashboard (`app/guilds/[id]/governance/page.tsx`)**
- List of active and past proposals
- Stats: "Total Proposals", "Active Votes", "Your Voting Power"
- Filter by status (Active, Passed, Rejected)

**2. Proposal Detail (`app/guilds/[id]/governance/[proposalId]/page.tsx`)**
- **Header**: Title, Proposer, Deadline, Status Badge
- **Content**: Detailed description and execution payload preview
- **Voting**: Interface to cast a vote (Simulated)
- **Results**: Real-time (simulated) progress of votes and quorum

**3. Create Proposal (`app/guilds/[id]/governance/create/page.tsx`)**
- Form fields: Title, Description, Type, Execution Data (JSON/Text)
- "Simulate Execution" preview UI

### UI Logic & Mock Data
- Use `lib/mocks/governance.ts` for all data
- Use progress bars and charts (e.g., Recharts or simple CSS) to show vote distribution.

## ✅ Definition of Done

- [ ] Governance dashboard with proposal list implemented
- [ ] Proposal detail page with full description and timeline
- [ ] Functional-looking voting panel (simulated click responses)
- [ ] Quorum and results visualization (Charts/Bars)
- [ ] Proposal creation form with step-by-step UI
- [ ] Responsive design for voting on mobile
- [ ] Consistent governance-themed UI components

## 🧪 Testing Requirements

- Verify different status badges render correctly (Passed vs Rejected)
- Test the proposal creation form flow
- Check chart responsiveness on small screens
- Verify mock data displays correctly in the voting results

## 📚 Resources

- [Simple Progress Bars](https://flowbite.com/docs/components/progress/)
- [Snapshot (UI Reference)](https://snapshot.org/)
