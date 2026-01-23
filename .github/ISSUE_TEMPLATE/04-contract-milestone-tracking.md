---
name: Implement Milestone Tracking Contract
about: Create a contract for managing project milestones and phased payments
title: "[CONTRACT] Implement Milestone Tracking Contract"
labels: contract, core-feature, medium-priority
assignees: ''
---

## 🎯 Context & Impact

Complex projects cannot be completed in a single payment cycle. Contributors need milestone-based payments that release funds as work progresses. This contract enables phased project execution with automatic payment releases tied to verified milestones.

**Why this matters:**
- Enables long-term, multi-phase projects
- Reduces risk for both guilds and contributors
- Provides clear progress tracking on-chain
- Automates payment releases without manual intervention

## 📋 Scope

Implement a Soroban smart contract that manages project milestones and conditional payment releases.

**What's included:**
- Project creation with multiple milestones
- Milestone definition (description, payment amount, deadline)
- Milestone completion submission
- Verification and approval workflow
- Automatic payment release upon approval
- Progress tracking and reporting
- Support for sequential and parallel milestones

**What's NOT included:**
- Reputation integration (future enhancement)
- Dispute resolution (separate issue)
- Automatic verification (requires oracle, future)

## 🛠️ Implementation Guidelines

### File Structure
Create the following files in the `contract/` directory:
```
contract/
├── src/
│   ├── milestone/
│   │   ├── mod.rs
│   │   ├── tracker.rs
│   │   ├── types.rs
│   │   └── storage.rs
```

### Key Data Structures
Define:
- `Project` struct (id, guild_id, contributor, total_amount, created_at, status)
- `Milestone` struct (id, project_id, title, description, payment_amount, deadline, status, proof_url)
- `MilestoneStatus` enum (Pending, InProgress, Submitted, Approved, Rejected, Expired)
- `ProjectStatus` enum (Active, Completed, Cancelled)
- Storage for projects and milestones

### Core Functions to Implement
1. `create_project(env, guild_id, contributor, milestones, total_amount)` → project_id
2. `add_milestone(env, project_id, title, description, amount, deadline)` → milestone_id
3. `start_milestone(env, milestone_id, contributor)` → bool
4. `submit_milestone(env, milestone_id, proof_url)` → bool
5. `approve_milestone(env, milestone_id, approver)` → bool
6. `reject_milestone(env, milestone_id, approver, reason)` → bool
7. `get_project_progress(env, project_id)` → (completed, total, percentage)
8. `get_milestone(env, milestone_id)` → Milestone
9. `release_milestone_payment(env, milestone_id)` → bool

### Constraints & Requirements
- Milestones can be sequential (block next until current complete) or parallel
- Only guild admins can approve/reject milestones
- Payment only releases after approval
- Expired milestones can be extended by guild
- Total milestone payments cannot exceed project budget
- Milestone order enforcement for sequential projects
- Proof of work required for submission

### Edge Cases to Handle
- Submitting milestone before starting
- Approving unsubmitted milestone
- Deadline extensions
- Partial project cancellation
- Out-of-order completion for parallel milestones
- Insufficient project funds for payment
- Multiple submissions (versioning)
- Milestone deletion/modification constraints

## ✅ Definition of Done

Your PR should include:

- [ ] Complete implementation of all 9 core functions
- [ ] Support for both sequential and parallel milestone flows
- [ ] Deadline tracking and expiration logic
- [ ] Payment release integration
- [ ] Comprehensive unit tests (>80% coverage)
- [ ] Integration tests for full project lifecycle
- [ ] Edge case tests for all failure scenarios
- [ ] Event emission for milestone state changes
- [ ] Inline documentation for all public functions
- [ ] Gas optimization for milestone queries

## 🧪 Testing Requirements

Provide tests that cover:
1. Creating projects with multiple milestones
2. Sequential milestone completion flow
3. Parallel milestone completion flow
4. Submission and approval workflow
5. Rejection and resubmission
6. Payment release after approval
7. Deadline handling and expiration
8. Progress calculation accuracy
9. Permission checks (only admins approve)
10. Project cancellation scenarios

## 📚 Resources

- [Soroban Time/Ledger](https://soroban.stellar.org/docs/learn/environment)
- [Soroban Storage Patterns](https://soroban.stellar.org/docs/how-to-guides/storage)
- [State Machine Design](https://en.wikipedia.org/wiki/Finite-state_machine)

## 🔍 Review Criteria

Your submission will be evaluated on:
- **Correctness**: Does the milestone flow work properly?
- **Flexibility**: Can it handle different project types?
- **Security**: Are approvals properly gated?
- **UX**: Is progress tracking clear and accurate?
- **Test Coverage**: Are all flows tested?
- **Code Quality**: Is state management clean?

## 💡 Questions?

Comment on this issue if you need clarification on:
- Sequential vs parallel milestone logic
- Deadline extension mechanisms
- Proof submission requirements
- Payment integration approach
