'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bountySchema,
  bountyDefaultValues,
  type BountyFormData,
} from '@/lib/schemas/bountySchema';

/**
 * BountyFormScaffold — Form component with Zod validation + React Hook Form.
 *
 * Prevents submission until all fields pass validation.
 * Shows red error text under fields on blur or submit.
 */
export default function BountyFormScaffold({
  onSubmit,
}: {
  onSubmit: (data: BountyFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<BountyFormData>({
    resolver: zodResolver(bountySchema),
    mode: 'onBlur',
    defaultValues: bountyDefaultValues,
  });

  const onValid = (data: BountyFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate>
      {/* Title */}
      <div className="field-group">
        <label htmlFor="bounty-title">Title</label>
        <input
          id="bounty-title"
          type="text"
          placeholder="e.g. Build a landing page for our guild"
          {...register('title')}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <span className="error-text" role="alert">
            {errors.title.message}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="field-group">
        <label htmlFor="bounty-description">Description</label>
        <textarea
          id="bounty-description"
          placeholder="Describe what needs to be built..."
          rows={5}
          {...register('description')}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <span className="error-text" role="alert">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Payout Amount */}
      <div className="field-group">
        <label htmlFor="bounty-payout">Payout Amount</label>
        <input
          id="bounty-payout"
          type="number"
          step="any"
          min={0}
          placeholder="0.00"
          {...register('payoutAmount', { valueAsNumber: true })}
          aria-invalid={!!errors.payoutAmount}
        />
        {errors.payoutAmount && (
          <span className="error-text" role="alert">
            {errors.payoutAmount.message}
          </span>
        )}
      </div>

      {/* Token Type */}
      <div className="field-group">
        <label htmlFor="bounty-token">Token Type</label>
        <select
          id="bounty-token"
          {...register('tokenType')}
          aria-invalid={!!errors.tokenType}
        >
          <option value="XLM">XLM (Stellar)</option>
          <option value="USDC">USDC</option>
          <option value="ETH">Ethereum</option>
        </select>
        {errors.tokenType && (
          <span className="error-text" role="alert">
            {errors.tokenType.message}
          </span>
        )}
      </div>

      {/* Guild ID */}
      <div className="field-group">
        <label htmlFor="bounty-guild">Guild</label>
        <input
          id="bounty-guild"
          type="text"
          placeholder="Select a guild..."
          {...register('guildId')}
          aria-invalid={!!errors.guildId}
        />
        {errors.guildId && (
          <span className="error-text" role="alert">
            {errors.guildId.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Submitting...' : 'Create Bounty'}
      </button>
    </form>
  );
}
