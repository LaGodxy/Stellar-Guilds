'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from 'sonner';
import { CheckCircle2, Clock, Link as LinkIcon, FileText, Send } from 'lucide-react';

const applicationSchema = z.object({
  timeline: z.string().min(1, 'Proposed timeline is required'),
  experienceUrl: z.string().url('Must be a valid URL'),
  proposalNotes: z.string().min(1, 'Proposal notes are required'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface BountyApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  bountyId: string;
  bountyTitle: string;
}

export function BountyApplicationForm({
  isOpen,
  onClose,
  bountyId,
  bountyTitle,
}: BountyApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ApplicationFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log('Bounty application submitted:', {
      bountyId,
      bountyTitle,
      ...data,
    });

    toast.success('Application Submitted', {
      description: 'Your application has been encrypted and sent to the guild for review.',
      icon: <CheckCircle2 className="text-violet-500" size={18} />,
    });

    setSubmitted(true);
    reset();
  };

  const handleClose = () => {
    reset();
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Bounty Application"
      size="lg"
    >
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Bounty context */}
          <div className="bg-stellar-navy/50 rounded-xl p-4 border border-stellar-slate/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-violet-500 mb-1">
              Applying for
            </p>
            <p className="text-sm font-semibold text-stellar-white leading-snug">
              {bountyTitle}
            </p>
          </div>

          {/* Timeline field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-stellar-slate">
              <Clock size={14} className="text-violet-500" />
              Proposed Timeline
            </label>
            <input
              {...register('timeline')}
              type="text"
              placeholder="e.g., 3 days, 1 week, 2 sprints"
              className="flex h-11 w-full rounded-md border border-stellar-slate bg-transparent px-3 py-2 text-sm placeholder:text-stellar-slate/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            />
            {errors.timeline && (
              <p className="text-xs text-red-400">{errors.timeline.message}</p>
            )}
          </div>

          {/* Experience URL field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-stellar-slate">
              <LinkIcon size={14} className="text-violet-500" />
              Relevant Experience Cache (URL)
            </label>
            <input
              {...register('experienceUrl')}
              type="url"
              placeholder="https://github.com/your-username/your-project"
              className="flex h-11 w-full rounded-md border border-stellar-slate bg-transparent px-3 py-2 text-sm placeholder:text-stellar-slate/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            />
            {errors.experienceUrl && (
              <p className="text-xs text-red-400">{errors.experienceUrl.message}</p>
            )}
          </div>

          {/* Proposal Notes field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-stellar-slate">
              <FileText size={14} className="text-violet-500" />
              Proposal Notes (Markdown)
            </label>
            <textarea
              {...register('proposalNotes')}
              placeholder="Describe your approach, relevant experience, and how you plan to solve this bounty..."
              rows={6}
              className="flex min-h-[120px] w-full rounded-md border border-stellar-slate bg-transparent px-3 py-2 text-sm placeholder:text-stellar-slate/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors"
            />
            {errors.proposalNotes && (
              <p className="text-xs text-red-400">{errors.proposalNotes.message}</p>
            )}
          </div>

          {/* Submit button */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 bg-white/5 border border-stellar-slate text-stellar-lightSlate text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-violet-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Encrypting...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-violet-500" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-stellar-white">
              Application Sent!
            </h3>
            <p className="text-sm text-stellar-slate max-w-xs mx-auto leading-relaxed">
              Your application has been encrypted and delivered to the guild. You will be notified of any updates.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="mt-4 px-8 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-violet-400 transition-all"
          >
            Back to Bounty
          </button>
        </div>
      )}
    </Modal>
  );
}
