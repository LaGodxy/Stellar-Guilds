'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, User, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { Proposal, ProposalType, ProposalStatus } from '@/types/ui'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface ProposalCardProps {
  proposal: Proposal
  guildId: string
}

const getTypeLabel = (type: ProposalType): string => {
  const labels: Record<ProposalType, string> = {
    treasury: 'Treasury',
    'rule-change': 'Rule Change',
    membership: 'Membership',
    general: 'General'
  }
  return labels[type]
}

const getStatusConfig = (status: ProposalStatus) => {
  const configs: Record<ProposalStatus, { label: string; color: string; icon: React.ReactNode }> = {
    draft: { label: 'Draft', color: 'bg-stellar-slate text-stellar-white', icon: <Loader2 size={14} /> },
    active: { label: 'Active', color: 'bg-gold-500 text-stellar-navy', icon: <Clock size={14} /> },
    passed: { label: 'Passed', color: 'bg-green-500 text-white', icon: <CheckCircle2 size={14} /> },
    rejected: { label: 'Rejected', color: 'bg-red-500 text-white', icon: <XCircle size={14} /> },
    executed: { label: 'Executed', color: 'bg-green-600 text-white', icon: <CheckCircle2 size={14} /> }
  }
  return configs[status]
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, guildId }) => {
  const statusConfig = getStatusConfig(proposal.status)
  const isActive = proposal.status === 'active'
  const deadline = new Date(proposal.endDate)
  const now = new Date()
  const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Link href={`/guilds/${guildId}/governance/${proposal.id}`}>
      <Card className="hover:shadow-card-hover transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded-md bg-stellar-lightNavy text-stellar-slate">
                {getTypeLabel(proposal.type)}
              </span>
              <span className={cn(
                "text-xs px-2 py-1 rounded-md flex items-center gap-1",
                statusConfig.color
              )}>
                {statusConfig.icon}
                {statusConfig.label}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-stellar-white mb-2 line-clamp-2">
              {proposal.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-stellar-slate mb-4 line-clamp-2">
          {proposal.description}
        </p>

        <div className="flex items-center justify-between text-xs text-stellar-slate mb-4">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{proposal.proposerName}</span>
          </div>
          {isActive && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{daysRemaining > 0 ? `${daysRemaining}d left` : 'Ending soon'}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stellar-lightNavy">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-green-400 font-medium">{proposal.votingStats.for}</span>
              <span className="text-stellar-slate">For</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-400 font-medium">{proposal.votingStats.against}</span>
              <span className="text-stellar-slate">Against</span>
            </div>
          </div>
          <div className="text-xs text-stellar-slate">
            {proposal.votingStats.total} votes
          </div>
        </div>
      </Card>
    </Link>
  )
}
