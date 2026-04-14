import { z } from 'zod';

/**
 * Zod schema for Create Bounty form validation.
 * Enforces strict constraints on all user inputs.
 */
export const bountySchema = z
  .object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters')
      .max(100, 'Title must not exceed 100 characters'),
    description: z
      .string()
      .min(20, 'Description must be at least 20 characters')
      .max(5000, 'Description must not exceed 5000 characters'),
    payoutAmount: z
      .number({ invalid_type_error: 'Payout amount is required' })
      .gt(0, 'Payout amount must be greater than 0')
      .max(1000000, 'Payout amount cannot exceed 1,000,000'),
    tokenType: z
      .string()
      .min(1, 'Token type is required')
      .default('XLM'),
    guildId: z
      .string()
      .min(1, 'Guild selection is required'),
    skills: z
      .array(z.string())
      .min(1, 'At least one skill tag is required')
      .default([]),
    deadline: z
      .string()
      .min(1, 'Deadline is required')
      .optional(),
  })
  .refine((data) => !data.deadline || new Date(data.deadline) > new Date(), {
    message: 'Deadline must be in the future',
    path: ['deadline'],
  });

export type BountyFormData = z.infer<typeof bountySchema>;

/** Default form values matching the schema shape */
export const bountyDefaultValues: BountyFormData = {
  title: '',
  description: '',
  payoutAmount: 0,
  tokenType: 'XLM',
  guildId: '',
  skills: [],
};
