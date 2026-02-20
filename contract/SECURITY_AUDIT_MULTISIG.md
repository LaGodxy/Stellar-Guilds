# MultiSig Security Audit Notes

## Scope

This review covers the multi-signature framework implemented under:

- `src/multisig/types.rs`
- `src/multisig/storage.rs`
- `src/multisig/registrar.rs`
- `src/multisig/policy.rs`
- `src/multisig/signing.rs`
- `src/lib.rs` multisig integration entrypoints

## Threat Model

- **Single key compromise**: one signer is compromised.
- **Owner key compromise**: owner key is compromised and attacker attempts policy bypass.
- **Replay attempts**: repeated operation execution or stale operation replay.
- **Timeout abuse**: old operations executed after governance intent has changed.
- **Privilege escalation**: unauthorized signer rotation or threshold mutation.

## Controls Implemented

### 1) M-of-N authorization

- `ms_register_account` enforces threshold bounds:
  - `threshold <= signer_count`
  - `threshold >= ceil(signer_count / 2)`
- owner is auto-included in signer set.

### 2) Safe account validation

- signer-bound checks are enforced before propose/sign.
- frozen accounts block operation proposal/signing.

### 3) Policy-based controls

- operation-level policies include:
  - minimum signatures
  - require all signers
  - require owner signature
  - bounded timeout
- timeout is clamped to `[24h, 48h]`.

### 4) Emergency controls

- owner can forcibly expire operation (`ms_emergency_expire_operation`).
- owner can override timeout (`ms_emergency_extend_timeout`) within safe bounds.

### 5) Replay resistance

- account nonce is consumed at proposal creation.
- operation records nonce snapshot.
- operation can only transition from `Pending` once (`Executed`, `Expired`, or `Cancelled`).

### 6) Key management

- owner-only signer add/remove/rotate/update-threshold.
- signer rotation supported for key compromise recovery.

## Integration Security

- Governance execution can be gated by multisig (`ms_execute_governance_proposal`).
- Treasury withdrawal proposal can be gated by multisig (`ms_propose_treasury_withdrawal`).
- Legacy single-signature flows remain available for backward compatibility.

## Residual Risks

- **On-chain signature payload binding**: operation `description` is free-form text; strict payload-hash binding is not yet implemented.
- **Large account scans**: account/operation listing uses linear scan by ID counter and may need indexing optimization at higher scale.
- **Policy granularity**: operation type categories are coarse; some deployments may require finer policy classes.

## Recommended Next Hardening Steps

1. Add payload hash fields to `MultiSigOperation` and verify exact call-parameter binding.
2. Add event-indexed storage maps for constant-time pending-op lookups.
3. Add circuit-breaker role distinct from owner (separation of duties).
4. Add formal property tests for state transitions (`Pending -> {Executed,Expired,Cancelled}` only).
