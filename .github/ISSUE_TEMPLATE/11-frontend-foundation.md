---
name: Setup Frontend Foundation with Next.js + TypeScript + Tailwind
about: Initialize the frontend project with modern tooling and architecture (UI Focused)
title: "[FRONTEND] Setup Frontend Foundation"
labels: frontend, setup, high-priority
assignees: ''
---

## 🎯 Context & Impact

Before building any features, we need a solid frontend foundation. This issue focuses on setting up the Next.js environment, Tailwind CSS styling, and the overall UI architecture using TypeScript. This sets the standard for all future development and ensures a consistent developer experience.

**Why this matters:**
- Provides a fast, modern development environment with Next.js App Router
- Establishes UI consistency and design system standards
- Enables efficient parallel development of feature pages
- Creates a scalable folder structure for components and state

## 📋 Scope

Initialize a production-ready Next.js frontend with UI tooling and basic layout.

**What's included:**
- Project initialization with Next.js 14+ + TypeScript
- Tailwind CSS setup with custom design system/theme
- UI Project folder structure (App Router)
- Component architecture (Atomic Design or similar)
- Global state management setup (Zustand) for UI states
- Environment configuration (.env)
- ESLint + Prettier configuration
- Essential UI layout (Header, Footer, Sidebar, Navigation)
- Mock data utilities for parallel feature development

**What's NOT included:**
- Smart contract integration (Soroban/Stellar)
- Wallet connection logic
- Real-time data fetching from blockchain

## 🛠️ Implementation Guidelines

### Initialize Project
```bash
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --import-alias "@/*"
cd frontend
npm install
```

### Required Dependencies
Install these packages:
```bash
# UI & Styling
npm install lucide-react # icon library
npm install clsx tailwind-merge # utility for dynamic classes

# State Management (UI State only)
npm install zustand

# Form & Validation
npm install react-hook-form zod @hookform/resolvers

# Dev Tools
npm install -D eslint-config-prettier
```

### Folder Structure
Create this structure in `frontend/src` (App Router):
```
src/
├── app/
│   ├── layout.tsx         # Root layout with UI providers
│   ├── page.tsx           # Home page
│   └── not-found.tsx      # 404 page
├── components/
│   ├── ui/                # Reusable UI components (Button, Input, Card, Modal)
│   ├── layout/            # Layout components (Header, Footer, Sidebar)
│   └── shared/            # Common shared components
├── features/              # Feature-specific UI components
├── hooks/                 # Custom React hooks for UI logic
├── lib/                   # Utility functions and mock data generators
│   ├── mocks/             # Mock data for all features
│   └── utils.ts
├── store/                 # Global UI state (Zustand)
│   ├── sidebarStore.ts
│   └── themeStore.ts
└── types/                 # TypeScript type definitions
    └── ui.ts
```

### Core Files to Implement

**1. Root Layout (`app/layout.tsx`)**
- Root HTML/Body structure
- Global Navigation wrapper
- Font configuration (Inter or similar)

**2. UI Design System (`tailwind.config.ts`)**
Define a custom theme for Stellar Guilds:
- Primary colors: Deep Space/Stellar theme (Navy, Cyan, White)
- Secondary colors: Gold/Silver (for tiers)
- Custom spacing and typography

**3. Reusable UI Components**
Implement high-quality, reusable components:
- `Button`: Multiple variants (Primary, Outline, Ghost, Danger)
- `Input`: Accessible form inputs with error states
- `Card`: Standard container for guild/bounty items
- `Modal`: For forms and confirmations

**4. Layout Components**
- `Header`: Logo and placeholder for navigation
- `Sidebar`: Collapsible navigation for main features (Guilds, Bounties, Governance, Profile)

**5. Mock Data Utility (`lib/mocks/index.ts`)**
- Create helper functions to generate realistic mock data for Guilds, Bounties, and Profiles to be used in upcoming UI tasks.

## ✅ Definition of Done

- [ ] Next.js 14+ Project initialized with TypeScript
- [ ] Tailwind CSS configured with custom "Stellar Guilds" theme
- [ ] Folder structure implemented as specified
- [ ] Global Layout (Header, Sidebar, Footer) functional
- [ ] Reusable UI components (Button, Input, Card) implemented
- [ ] Home page with a clean "Welcome" UI
- [ ] Responsive design (Mobile + Desktop)
- [ ] Mock data system ready for feature development
- [ ] No ESLint errors or TypeScript warnings

## 📚 Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
