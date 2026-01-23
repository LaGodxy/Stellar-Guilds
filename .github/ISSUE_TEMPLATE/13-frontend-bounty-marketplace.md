---
name: Build Bounty Marketplace Interface (UI Only)
about: Create UI for browsing, creating, and claiming bounties using mock data
title: "[FRONTEND] Build Bounty Marketplace Interface"
labels: frontend, feature, high-priority
assignees: ''
---

## 🎯 Context & Impact

The bounty marketplace is where contributors find work. This issue focuses on building a high-fidelity marketplace UI using mock data, ensuring the discovery and submission experience is seamless before contract integration.

**Why this matters:**
- Establishes the core earning experience for users
- Finalizes the bounty discovery and filtering UX
- Creates the work submission interface
- Allows for design iterations on the most visited part of the app

## 📋 Scope

Build a comprehensive bounty marketplace with discovery, detail, and creation views using mock data.

**What's included:**
- Bounty marketplace listing with advanced filters
- Bounty detail page with requirements and status
- "Create Bounty" form for guild admins
- "Claim Bounty" and "Submit Work" UI flows
- Reward display with token icons
- Status badges (Open, Claimed, Completed, Under Review)
- My Bounties dashboard UI

**What's NOT included:**
- Escrow contract integration
- Real-time blockchain status updates
- File uploads to IPFS (use URL fields for now)

## 🛠️ Implementation Guidelines

### File Structure
Create these files in `frontend/src/` (Next.js App Router):
```
src/
├── app/
│   ├── bounties/
│   │   ├── page.tsx              # Marketplace listing
│   │   ├── [id]/
│   │   │   └── page.tsx          # Bounty detail & actions
│   │   ├── create/
│   │   │   └── page.tsx          # Create bounty form
│   │   └── my-bounties/
│   │       └── page.tsx          # Contributor/Admin dashboard
├── features/bounties/
│   ├── components/
│   │   ├── BountyCard.tsx        # Marketplace item
│   │   ├── BountyFilters.tsx     # Filter sidebar/bar
│   │   ├── SubmissionForm.tsx    # Work submission UI
│   │   └── BountyStatus.tsx      # Status indicators
│   └── types.ts
```

### Key Views to Implement

**1. Marketplace Listing (`app/bounties/page.tsx`)**
- Search bar for bounty titles
- Filters: Reward range, Token type, Status, Guild
- Sorting: Newest, Highest Reward, Expiring Soon

**2. Bounty Detail (`app/bounties/[id]/page.tsx`)**
- Full description with rich text (Markdown support)
- Acceptance criteria list
- "Claim" button (simulated state change)
- Submission area for claimed bounties

**3. Create Bounty (`app/bounties/create/page.tsx`)**
- Form fields: Title, Description, Reward Amount, Token, Deadline
- Guild selection (from user's joined guilds)

**4. My Bounties (`app/bounties/my-bounties/page.tsx`)**
- Tabs: "Active", "Completed", "Created"
- Quick view of progress and earnings

### UI Logic & Mock Data
- Use `lib/mocks/bounties.ts` for all data
- Simulate the "Claim" and "Submit" actions using local toast notifications and state updates.

## ✅ Definition of Done

- [ ] Marketplace listing with functional filters (UI logic)
- [ ] Bounty detail page with clear call-to-actions
- [ ] Work submission form UI
- [ ] Create bounty form with validation
- [ ] "My Bounties" dashboard with tabbed navigation
- [ ] Reward visualization (Amount + Token icon)
- [ ] Responsive design for mobile browsing
- [ ] No console errors

## 🧪 Testing Requirements

- Test all filter combinations (UI should react to filter changes)
- Verify form validation on the creation page
- Check detail page layout with long descriptions
- Test mobile view for the marketplace grid

## 📚 Resources

- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Tailwind Form Patterns](https://tailwindcss.com/docs/forms-plugin)
