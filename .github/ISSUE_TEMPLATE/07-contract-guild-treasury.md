---
name: Implement Guild Treasury Contract
about: Create a contract for managing guild funds and financial operations
title: "[CONTRACT] Implement Guild Treasury Contract"
labels: contract, core-feature, high-priority
assignees: ''
---

## 🎯 Context & Impact

Guilds need a secure, transparent way to manage collective funds. A treasury contract enables guilds to pool resources, fund bounties, pay contributors, and track financial activity on-chain without centralized control.

**Why this matters:**
- Enables decentralized financial management
- Provides transparency for all guild transactions
- Supports multi-signature operations for security
- Automates treasury operations (budgets, allowances)
- Creates trust through on-chain accountability

## 📋 Scope

Implement a Soroban smart contract that manages guild financial operations with multi-sig security.

**What's included:**
- Treasury initialization for guilds
- Deposit and withdrawal operations
- Multi-signature transaction approval
- Budget allocation to projects/bounties
- Allowance system for admins
- Transaction history and accounting
- Support for multiple token types
- Emergency withdrawal mechanisms

**What's NOT included:**
- DeFi integration (yield farming, staking)
- Cross-chain treasury management
- Tax/compliance reporting

## 🛠️ Implementation Guidelines

### File Structure
Create the following files in the `contract/` directory:
```
contract/
├── src/
│   ├── treasury/
│   │   ├── mod.rs
│   │   ├── management.rs
│   │   ├── multisig.rs
│   │   ├── types.rs
│   │   └── storage.rs
```

### Key Data Structures
Define:
- `Treasury` struct (guild_id, balance_xlm, token_balances, total_deposits, total_withdrawals, signers)
- `Transaction` struct (id, tx_type, amount, token, recipient, approvals, status, created_at)
- `TransactionType` enum (Deposit, Withdrawal, BountyFunding, MilestonePayment, AllowanceGrant)
- `TransactionStatus` enum (Pending, Approved, Executed, Rejected)
- `Budget` struct (category, allocated_amount, spent_amount, period)

### Core Functions to Implement
1. `initialize_treasury(env, guild_id, signers, approval_threshold)` → treasury_id
2. `deposit(env, treasury_id, depositor, amount, token)` → bool
3. `propose_withdrawal(env, treasury_id, proposer, recipient, amount, token, reason)` → tx_id
4. `approve_transaction(env, tx_id, approver)` → bool
5. `execute_transaction(env, tx_id)` → bool
6. `set_budget(env, treasury_id, category, amount, period)` → bool
7. `get_balance(env, treasury_id, token)` → u128
8. `get_transaction_history(env, treasury_id, limit)` → Vec<Transaction>
9. `grant_allowance(env, treasury_id, admin, amount, token)` → bool
10. `emergency_pause(env, treasury_id, signer)` → bool

### Constraints & Requirements
- Minimum 2-of-3 multi-sig for withdrawals above threshold
- Owner can update signers and threshold
- Approval threshold: 50-100% of signers
- Cannot withdraw more than budget allocation
- Allowances automatically renewed per period
- All transactions logged and queryable
- Emergency pause stops all operations except approved ones

### Edge Cases to Handle
- Insufficient treasury balance
- Expired transactions (auto-reject after 7 days)
- Signer removal mid-approval process
- Duplicate approvals by same signer
- Allowance overdraft attempts
- Budget period rollover
- Token transfer failures
- Emergency pause during transaction execution

## ✅ Definition of Done

Your PR should include:

- [ ] Complete implementation of all 10 core functions
- [ ] Multi-signature approval workflow
- [ ] Budget tracking and enforcement
- [ ] Transaction history and queries
- [ ] Support for XLM and custom tokens
- [ ] Emergency controls
- [ ] Comprehensive unit tests (>85% coverage)
- [ ] Integration tests with bounty/milestone contracts
- [ ] Security tests (unauthorized access, replay attacks)
- [ ] Event emission for all treasury operations
- [ ] Inline documentation for all functions

## 🧪 Testing Requirements

Provide tests that cover:
1. Treasury initialization with signers
2. Deposit operations
3. Multi-sig withdrawal approval flow
4. Budget allocation and enforcement
5. Allowance grants and usage
6. Transaction execution
7. Emergency pause functionality
8. Transaction history queries
9. Edge cases (insufficient funds, expired transactions)
10. Security scenarios (unauthorized approvals, signer manipulation)

## 📚 Resources

- [Soroban Token Interface](https://soroban.stellar.org/docs/reference/interfaces/token-interface)
- [Multi-Signature Wallets](https://gnosis-safe.io/)
- [Treasury Management Best Practices](https://medium.com/immunefi/dao-treasury-management-best-practices-4c1d2e1b0b5e)

## 🔍 Review Criteria

Your submission will be evaluated on:
- **Security**: Are multi-sig controls properly enforced?
- **Correctness**: Is accounting accurate?
- **Flexibility**: Can treasury rules be updated?
- **Performance**: Are queries optimized?
- **Test Coverage**: Are all scenarios tested?
- **Code Quality**: Is it maintainable?

## 💡 Questions?

Comment on this issue if you need clarification on:
- Multi-sig approval logic
- Budget enforcement rules
- Emergency controls
- Token handling
