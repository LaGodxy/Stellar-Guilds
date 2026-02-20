# Migration Guide: Single-Signature to MultiSig

## Goal

Migrate sensitive operations from single-signer execution to a gated multisig workflow without breaking existing integrations.

## Migration Strategy

Use a phased rollout:

1. **Deploy and initialize multisig accounts** per guild/treasury.
2. **Set operation policies** for required operation types.
3. **Switch callers to multisig-gated entrypoints** for high-risk actions.
4. **Keep legacy entrypoints active** during transition.
5. **Disable legacy paths operationally** after confidence window.

## Step-by-Step

### 1) Create multisig account

Call:

- `ms_register_account(owner, signers, threshold, guild_id, timeout_seconds)`

Recommended:

- signer count: 3-5
- threshold: 2-of-3 or 3-of-5
- timeout: 24h for critical actions, 48h for governance updates

### 2) Configure policies

Call:

- `ms_set_policy(account_id, operation_type, min_signatures, require_all_signers, timeout_seconds, require_owner_signature, caller)`

Suggested defaults:

- `TreasuryWithdrawal`: owner signature required, min 2
- `GovernanceUpdate`: min 2 or require all signers for highly privileged proposals
- `EmergencyAction`: owner signature required, 24h timeout

### 3) Use gated integrations

Treasury:

- Execute multisig operation (`TreasuryWithdrawal` type), then call:
  - `ms_propose_treasury_withdrawal(...)`

Governance:

- Execute multisig operation (`GovernanceUpdate` type), then call:
  - `ms_execute_governance_proposal(...)`

### 4) Keep backward compatibility

Legacy functions are intentionally not removed.

- Existing single-signature functions still work during migration.
- Move clients to multisig-gated entrypoints incrementally.

### 5) Rollback plan

If migration issues occur:

1. Continue using legacy entrypoints temporarily.
2. Freeze compromised multisig accounts (`ms_freeze_account`).
3. Rotate affected signer keys (`ms_rotate_signer`).
4. Re-open operations after policy correction.

## Operational Runbook

1. Propose operation: `ms_propose_operation`
2. Collect signatures: `ms_sign_operation`
3. Execute operation: `ms_execute_operation`
4. Handle timeout:
   - `ms_check_and_expire`
   - `ms_sweep_expired`
   - emergency: `ms_emergency_expire`

## Post-Migration Validation

- Verify treasury flow works via multisig gate.
- Verify governance execution requires multisig gate.
- Verify expired operations cannot execute.
- Verify signer rotation and threshold updates behave as expected.
