---
name: Implement Guild Membership Contract
about: Create the core contract for managing guild creation and membership
title: "[CONTRACT] Implement Guild Membership Contract"
labels: contract, core-feature, high-priority
assignees: ''
---

## 🎯 Context & Impact

Guilds are the foundation of the Stellar Guilds platform. Without a robust membership contract, we cannot support decentralized communities, voting, or role-based permissions. This contract will enable users to create guilds, add members, assign roles, and manage permissions on-chain.

**Why this matters:**
- Enables decentralized governance for communities
- Creates the foundation for all other guild-related features
- Allows transparent membership tracking on the blockchain

## 📋 Scope

Implement a Soroban smart contract that handles guild creation and membership management.

**What's included:**
- Guild initialization with name, description, and owner
- Member addition/removal with role assignments
- Role-based permission system (Owner, Admin, Member, Contributor)
- Member lookup and enumeration
- Guild metadata storage
- Event emission for membership changes

**What's NOT included:**
- Voting mechanisms (separate issue)
- Treasury management (separate issue)
- Staking requirements (future enhancement)

## 🛠️ Implementation Guidelines

### File Structure
Create the following files in the `contract/` directory:
```
contract/
├── src/
│   ├── guild/
│   │   ├── mod.rs
│   │   ├── membership.rs
│   │   ├── types.rs
│   │   └── storage.rs
│   └── lib.rs (update imports)
```

### Key Data Structures
You'll need to define:
- `Guild` struct (guild_id, name, description, owner, created_at)
- `Member` struct (address, role, joined_at)
- `Role` enum (Owner, Admin, Member, Contributor)
- Storage maps for guilds and members

### Core Functions to Implement
1. `create_guild(env, name, description, owner)` → guild_id
2. `add_member(env, guild_id, address, role)` → bool
3. `remove_member(env, guild_id, address)` → bool
4. `update_role(env, guild_id, address, new_role)` → bool
5. `get_member(env, guild_id, address)` → Member
6. `get_all_members(env, guild_id)` → Vec<Member>
7. `is_member(env, guild_id, address)` → bool
8. `has_permission(env, guild_id, address, required_role)` → bool

### Constraints & Requirements
- Only guild owner can add/remove admins
- Admins can add/remove members and contributors
- Members cannot modify guild structure
- Guild IDs must be unique
- Use Soroban SDK storage efficiently
- Emit events for all state changes

### Edge Cases to Handle
- Attempting to add duplicate members
- Removing the last owner (should fail)
- Self-removal of members
- Permission checks for all operations
- Maximum member limits (consider gas limits)

## ✅ Definition of Done

Your PR should include:

- [ ] Complete implementation of all 8 core functions
- [ ] Comprehensive unit tests (>80% coverage)
- [ ] Edge case tests for all failure scenarios
- [ ] Event emission tests
- [ ] Integration test showing full guild lifecycle
- [ ] Inline documentation for all public functions
- [ ] Gas optimization considerations documented
- [ ] No compiler warnings

## 🧪 Testing Requirements

Provide tests that cover:
1. Creating a guild successfully
2. Adding members with different roles
3. Permission checks (positive and negative cases)
4. Removing members
5. Updating roles
6. Querying member lists
7. Attempting unauthorized operations
8. Edge cases (duplicate adds, invalid addresses, etc.)

## 📚 Resources

- [Soroban Smart Contracts](https://soroban.stellar.org/docs)
- [Soroban Storage Examples](https://soroban.stellar.org/docs/how-to-guides/storage)
- [Soroban Events](https://soroban.stellar.org/docs/learn/events)

## 🔍 Review Criteria

Your submission will be evaluated on:
- **Correctness**: Does it work as specified?
- **Security**: Are permissions properly enforced?
- **Test Coverage**: Are edge cases handled?
- **Code Quality**: Is it readable and maintainable?
- **Gas Efficiency**: Is storage access optimized?
- **Documentation**: Are functions well-documented?

## 💡 Questions?

Comment on this issue if you need clarification on:
- Specific permission hierarchies
- Storage optimization strategies
- Testing approaches
