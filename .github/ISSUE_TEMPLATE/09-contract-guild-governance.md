---
name: Implement Guild Governance & Voting Contract
about: Create a contract for guild proposals and democratic decision-making
title: "[CONTRACT] Implement Guild Governance Contract"
labels: contract, governance, high-priority
assignees: ''
---

## 🎯 Context & Impact

Guilds need democratic processes to make collective decisions about treasury spending, rule changes, member management, and strategic direction. A governance contract enables transparent, verifiable voting that gives members a voice in guild operations.

**Why this matters:**
- Enables true decentralized governance
- Empowers guild members in decision-making
- Creates transparent, auditable voting records
- Prevents centralized control abuse
- Builds community ownership and engagement

## 📋 Scope

Implement a Soroban smart contract that manages proposal creation, voting, and execution with flexible governance models.

**What's included:**
- Proposal creation with multiple types (treasury, membership, rule change)
- Voting mechanism with weighted votes
- Quorum and approval threshold enforcement
- Vote delegation
- Time-locked voting periods
- Automatic proposal execution
- Proposal cancellation
- Vote result calculation

**What's NOT included:**
- Token-based voting (reputation-based only for now)
- Quadratic voting (future enhancement)
- Multi-guild proposals

## 🛠️ Implementation Guidelines

### File Structure
Create the following files in the `contract/` directory:
```
contract/
├── src/
│   ├── governance/
│   │   ├── mod.rs
│   │   ├── proposals.rs
│   │   ├── voting.rs
│   │   ├── execution.rs
│   │   ├── types.rs
│   │   └── storage.rs
```

### Key Data Structures
Define:
- `Proposal` struct (id, guild_id, proposer, type, title, description, voting_start, voting_end, status, votes_for, votes_against, execution_payload)
- `ProposalType` enum (TreasurySpend, AddMember, RemoveMember, RuleChange, GeneralDecision)
- `ProposalStatus` enum (Draft, Active, Passed, Rejected, Executed, Cancelled, Expired)
- `Vote` struct (voter, proposal_id, decision, weight, timestamp)
- `VoteDecision` enum (For, Against, Abstain)
- `GovernanceConfig` struct (quorum_percentage, approval_threshold, voting_period_days, min_proposer_reputation)

### Core Functions to Implement
1. `create_proposal(env, guild_id, proposer, proposal_type, title, description, execution_data)` → proposal_id
2. `vote(env, proposal_id, voter, decision)` → bool
3. `delegate_vote(env, guild_id, delegator, delegate)` → bool
4. `undelegate_vote(env, guild_id, delegator)` → bool
5. `finalize_proposal(env, proposal_id)` → ProposalStatus
6. `execute_proposal(env, proposal_id)` → bool
7. `cancel_proposal(env, proposal_id, canceller)` → bool
8. `get_proposal(env, proposal_id)` → Proposal
9. `get_active_proposals(env, guild_id)` → Vec<Proposal>
10. `update_governance_config(env, guild_id, config)` → bool

### Voting Weight Calculation
Based on guild member roles:
- Owner: 10 votes
- Admin: 5 votes
- Member: 2 votes
- Contributor: 1 vote

### Default Governance Parameters
- Quorum: 30% of total voting weight
- Approval threshold: 60% of votes cast
- Voting period: 7 days
- Min proposer reputation: 0 (Members+ can propose)

### Constraints & Requirements
- Only guild members can create proposals
- Voting only during active voting period
- Cannot vote twice (unless vote changed)
- Quorum must be met for proposal to pass
- Proposal auto-expires if not executed within 3 days of passing
- Only guild owner can update governance config
- Execution payload validated before proposal passes

### Edge Cases to Handle
- Voting after deadline
- Changing vote mid-voting period
- Vote delegation chains (A→B→C)
- Proposal execution failure
- Quorum calculation with changing membership
- Concurrent proposal execution
- Malicious execution payloads
- Role changes during voting period

## ✅ Definition of Done

Your PR should include:

- [ ] Complete implementation of all 10 core functions
- [ ] Support for all 5 proposal types
- [ ] Weighted voting system
- [ ] Vote delegation mechanism
- [ ] Quorum and threshold enforcement
- [ ] Automatic proposal finalization
- [ ] Execution payload handling
- [ ] Comprehensive unit tests (>85% coverage)
- [ ] Integration tests with membership contract
- [ ] Security tests (vote manipulation, execution attacks)
- [ ] Event emission for all governance actions
- [ ] Inline documentation for all functions

## 🧪 Testing Requirements

Provide tests that cover:
1. Proposal creation for different types
2. Voting with different member roles
3. Vote weight calculation
4. Vote delegation and undelegation
5. Quorum validation
6. Approval threshold enforcement
7. Proposal finalization
8. Successful execution
9. Failed execution handling
10. Edge cases (expired proposals, concurrent votes, role changes)

## 📚 Resources

- [DAO Governance Best Practices](https://blog.aragon.org/writing-a-governance-system/)
- [Soroban Authorization](https://soroban.stellar.org/docs/learn/authorization)
- [Voting Mechanisms](https://vitalik.ca/general/2021/08/16/voting3.html)

## 🔍 Review Criteria

Your submission will be evaluated on:
- **Security**: Can voting be manipulated?
- **Correctness**: Is vote counting accurate?
- **Flexibility**: Can governance rules evolve?
- **UX**: Is the proposal flow intuitive?
- **Test Coverage**: Are all scenarios tested?
- **Code Quality**: Is it maintainable?

## 💡 Questions?

Comment on this issue if you need clarification on:
- Vote delegation logic
- Execution payload format
- Quorum calculations
- Integration with other contracts
