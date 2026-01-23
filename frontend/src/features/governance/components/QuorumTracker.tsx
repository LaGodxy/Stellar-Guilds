'use client'

import React from 'react'
import { Clock, Target } from 'lucide-react'
import { Proposal } from '@/types/ui'
import { Card } from '@/components/ui/Card'
import { calculateQuorumProgress } from '@/lib/mocks/governance'
import { cn } from '@/lib/utils'

interface QuorumTrackerProps {
  proposal: Proposal
}

const formatTimeRemaining = (endDate: string): string => {
  const end = new Date(endDate)
  const now = new Date()
  const diff = end.getTime() - now.getTime()

  if (diff <= 0) return 'Ended'

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export const QuorumTracker: React.FC<QuorumTrackerProps> = ({ proposal }) => {
  const progress = calculateQuorumProgress(proposal)
  const currentPower = proposal.votingStats.totalPower
  const quorumThreshold = proposal.quorumThreshold
  const isActive = proposal.status === 'active'
  const timeRemaining = formatTimeRemaining(proposal.endDate)

  const getProgressColor = () => {
    if (progress >= 100) return 'bg-green-500'
    if (progress >= 75) return 'bg-gold-500'
    if (progress >= 50) return 'bg-gold-400'
    return 'bg-stellar-slate'
  }

  return (
    <Card title="Quorum Progress" className="w-full">
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-gold-500" />
              <span className="text-stellar-slate">Quorum Threshold</span>
            </div>
            <span className="text-stellar-white font-semibold">
              {quorumThreshold.toLocaleString()}
            </span>
          </div>
          
          <div className="w-full h-4 bg-stellar-navy rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500 flex items-center justify-end pr-2",
                getProgressColor()
              )}
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {progress > 15 && (
                <span className="text-xs font-medium text-white">
                  {progress.toFixed(1)}%
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stellar-slate">
            <span>Current: {currentPower.toLocaleString()}</span>
            <span className={cn(
              progress >= 100 ? "text-green-400" : "text-stellar-slate"
            )}>
              {progress >= 100 ? 'Quorum Reached' : `${(quorumThreshold - currentPower).toLocaleString()} remaining`}
            </span>
          </div>
        </div>

        {/* Time Remaining */}
        {isActive && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-stellar-navy border border-stellar-lightNavy">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gold-500" />
              <span className="text-sm text-stellar-slate">Time Remaining</span>
            </div>
            <span className="text-sm font-semibold text-stellar-white">
              {timeRemaining}
            </span>
          </div>
        )}

        {/* Status Info */}
        {!isActive && (
          <div className="p-3 rounded-lg bg-stellar-navy border border-stellar-lightNavy text-center">
            <p className="text-sm text-stellar-slate">
              {proposal.status === 'passed' && 'Proposal passed'}
              {proposal.status === 'rejected' && 'Proposal rejected'}
              {proposal.status === 'executed' && 'Proposal executed'}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
