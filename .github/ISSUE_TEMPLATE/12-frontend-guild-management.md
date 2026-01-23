---
name: Build Guild Management Interface (UI Only)
about: Create UI for guild creation, member management, and guild dashboard using mock data
title: "[FRONTEND] Build Guild Management Interface"
labels: frontend, feature, high-priority
assignees: ''
---

## 🎯 Context & Impact

Guilds are the core organizational unit of Stellar Guilds. This issue focuses on building the entire UI flow for managing guilds using mock data. This allows us to finalize the UX and design before the smart contracts are ready for integration.

**Why this matters:**
- Finalizes the user journey for guild creation and management
- Establishes the visual identity for community hubs
- Provides a "live" prototype for feedback
- Enables parallel development of the contract layer

## 📋 Scope

Build a complete guild management interface with creation, member management, and dashboard views using mock data.

**What's included:**
- Guild discovery/listing page
- Guild creation form with UI validation
- Guild dashboard (Detail page)
- Member management UI (list, roles, invite)
- Guild settings UI
- Activity feed visualization
- Search and filter UI logic
- Responsive design for all views

**What's NOT included:**
- Connection to Soroban smart contracts
- Real wallet transactions
- Permanent data storage (use mock data/local state)

## 🛠️ Implementation Guidelines

### File Structure
Create these files in `frontend/src/` (Next.js App Router):
```
src/
├── app/
│   ├── guilds/
│   │   ├── page.tsx              # Guild discovery listing
│   │   ├── [id]/
│   │   │   ├── page.tsx          # Guild dashboard/detail
│   │   │   └── settings/
│   │   │       └── page.tsx      # Guild settings UI
│   │   └── create/
│   │       └── page.tsx          # Create guild wizard
├── features/guilds/
│   ├── components/
│   │   ├── GuildCard.tsx         # Guild preview card
│   │   ├── GuildForm.tsx         # Create/Edit form
│   │   ├── MemberList.tsx        # Member management list
│   │   ├── RoleBadge.tsx         # Colored badges for roles
│   │   └── GuildStats.tsx        # Quick stats visualization
│   └── types.ts                  # Guild-specific UI types
```

### Key Views to Implement

**1. Guild Discovery (`app/guilds/page.tsx`)**
- Grid of `GuildCard` components
- Search bar and category filters
- "Create Guild" call-to-action

**2. Create Guild Wizard (`app/guilds/create/page.tsx`)**
- Multi-step or single-page form
- Fields: Name, Description, Logo URL, Initial Members
- Visual feedback for "simulated" creation

**3. Guild Dashboard (`app/guilds/[id]/page.tsx`)**
Tabs/Sections:
- **Overview**: Description and guild metadata
- **Members**: List of members with roles (Owner, Admin, Member)
- **Activity**: Simulated timeline of recent events

**4. Member Management (`features/guilds/components/MemberList.tsx`)**
- UI for changing roles (dropdowns)
- UI for removing members (danger buttons)
- "Invite Member" modal placeholder

### UI Logic & Mock Data
- Use `lib/mocks/guilds.ts` to populate all views
- Use React state or Zustand to handle "simulated" updates (e.g., adding a member updates the local UI list)

## ✅ Definition of Done

- [ ] All 4 main pages implemented with clean UI
- [ ] Responsive grid for guild discovery
- [ ] Guild creation form with validation states
- [ ] Member list with role-based styling
- [ ] Guild settings page with editable fields
- [ ] Smooth navigation between guild views
- [ ] All views populated with realistic mock data
- [ ] Mobile-responsive layouts tested

## 🧪 Testing Requirements

- Verify navigation flow (List -> Detail -> Settings)
- Ensure form validation prevents empty submissions
- Check responsive behavior on mobile screens
- Verify mock data renders correctly across components

## 📚 Resources

- [Tailwind UI Patterns](https://tailwindcss.com/docs/grid-template-columns)
- [Lucide Icons](https://lucide.dev/icons)
