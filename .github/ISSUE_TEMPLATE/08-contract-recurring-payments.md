---
name: Implement Recurring Payment (Subscription) Contract
about: Create a contract for automated recurring payments to ongoing contributors
title: "[CONTRACT] Implement Recurring Payment Contract"
labels: contract, payments, medium-priority
assignees: ''
---

## 🎯 Context & Impact

Many projects need ongoing contributors (maintainers, moderators, core devs) who should receive regular, predictable compensation. Manual monthly payments are tedious and unreliable. This contract automates recurring payments, ensuring contributors are paid consistently.

**Why this matters:**
- Enables sustainable long-term projects
- Attracts full-time contributors
- Automates payroll for DAOs
- Provides predictable income for contributors
- Reduces administrative overhead

## 📋 Scope

Implement a Soroban smart contract that manages automated recurring payments with flexible schedules and cancellation options.

**What's included:**
- Subscription creation with payment schedule
- Automated payment execution (triggered externally or by anyone)
- Multiple frequency options (weekly, biweekly, monthly)
- Payment history tracking
- Subscription cancellation and modification
- Balance sufficiency checks
- Support for XLM and custom tokens
- Failed payment handling

**What's NOT included:**
- Automatic blockchain triggers (require external executor)
- Variable payment amounts (dynamic subscriptions)
- Payment advance/arrears handling

## 🛠️ Implementation Guidelines

### File Structure
Create the following files in the `contract/` directory:
```
contract/
├── src/
│   ├── subscription/
│   │   ├── mod.rs
│   │   ├── recurring.rs
│   │   ├── types.rs
│   │   └── storage.rs
```

### Key Data Structures
Define:
- `Subscription` struct (id, guild_id, recipient, amount, token, frequency, start_date, next_payment_date, status, payments_made)
- `PaymentFrequency` enum (Weekly, Biweekly, Monthly)
- `SubscriptionStatus` enum (Active, Paused, Cancelled, InsufficientFunds)
- `Payment` struct (subscription_id, amount, timestamp, status)
- Storage for subscriptions and payment history

### Core Functions to Implement
1. `create_subscription(env, guild_id, recipient, amount, token, frequency, start_date)` → subscription_id
2. `execute_payment(env, subscription_id, executor)` → bool
3. `pause_subscription(env, subscription_id)` → bool
4. `resume_subscription(env, subscription_id)` → bool
5. `cancel_subscription(env, subscription_id)` → bool
6. `update_amount(env, subscription_id, new_amount)` → bool
7. `get_subscription(env, subscription_id)` → Subscription
8. `get_payment_history(env, subscription_id)` → Vec<Payment>
9. `get_due_subscriptions(env, current_timestamp)` → Vec<u64>
10. `batch_execute_payments(env, subscription_ids: Vec<u64>)` → Vec<bool>

### Constraints & Requirements
- Only guild admins can create/modify subscriptions
- Anyone can trigger payment execution (if due)
- Payment only executes if: due date reached + sufficient balance
- Next payment date auto-updates after successful payment
- Failed payments don't stop subscription (retry next attempt)
- Cancellation stops future payments but doesn't refund
- Pause preserves next payment date
- Resume recalculates next payment from current date

### Edge Cases to Handle
- Insufficient treasury balance at payment time
- Subscription start date in the past
- Payment execution before due date (should fail)
- Multiple payment attempts in same period
- Cancellation during payment execution
- Frequency changes mid-subscription
- Token transfer failures
- Very long-running subscriptions (overflow protection)

## ✅ Definition of Done

Your PR should include:

- [ ] Complete implementation of all 10 core functions
- [ ] Support for all 3 payment frequencies
- [ ] Automated next payment date calculation
- [ ] Batch payment execution optimization
- [ ] Payment history tracking
- [ ] Comprehensive unit tests (>80% coverage)
- [ ] Integration tests with treasury contract
- [ ] Time-based testing (simulate date progression)
- [ ] Failed payment handling tests
- [ ] Event emission for all payment events
- [ ] Inline documentation for all functions

## 🧪 Testing Requirements

Provide tests that cover:
1. Creating subscriptions with different frequencies
2. Payment execution when due
3. Payment rejection before due date
4. Insufficient balance handling
5. Subscription pause/resume
6. Subscription cancellation
7. Amount updates mid-subscription
8. Batch payment execution
9. Payment history tracking
10. Edge cases (date arithmetic, concurrent executions)

## 📚 Resources

- [Soroban Ledger/Time](https://soroban.stellar.org/docs/learn/environment)
- [Subscription Payment Patterns](https://stripe.com/docs/billing/subscriptions/overview)
- [Token Interface](https://soroban.stellar.org/docs/reference/interfaces/token-interface)

## 🔍 Review Criteria

Your submission will be evaluated on:
- **Reliability**: Do payments execute correctly?
- **Date Handling**: Is date arithmetic accurate?
- **Security**: Can subscriptions be manipulated?
- **Gas Efficiency**: Is batch execution optimized?
- **Test Coverage**: Are time-based scenarios tested?
- **Code Quality**: Is logic clear?

## 💡 Questions?

Comment on this issue if you need clarification on:
- Payment execution triggers
- Date calculation logic
- Failed payment retry mechanism
- Integration with treasury contract
