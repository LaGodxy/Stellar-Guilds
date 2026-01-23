'use client'

import React, { useState } from 'react'
import { CheckCircle2, XCircle, Minus, Zap } from 'lucide-react'
import { Proposal, VoteChoice } from '@/types/ui'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getUserVote, mockUserVotingPower } from '@/lib/mocks/governance'
import { cn } from '@/lib/utils'

interface VotingPanelProps {
  proposal: Proposal
  userId?: string
  onVote?: (choice: VoteChoice) => void
}

export const VotingPanel: React.FC<VotingPanelProps> = ({ 
  proposal, 
  userId = 'user-1',
  onVote 
}) => {
  const [selectedChoice, setSelectedChoice] = useState<VoteChoice | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const userVote = getUserVote(proposal.id, userId)
  const isActive = proposal.status === 'active'
  const canVote = isActive && !userVote && !hasVoted

  const handleVote = async (choice: VoteChoice) => {
    if (!canVote || isSubmitting) return

    setIsSubmitting(true)
    setSelectedChoice(choice)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setHasVoted(true)
    setIsSubmitting(false)
    
    if (onVote) {
      onVote(choice)
    }
  }

  const currentVote = userVote?.choice || selectedChoice

  return (
    <Card title="Cast Your Vote" className="w-full">
      <div className="space-y-4">
        {/* Voting Power Display */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-stellar-navy border border-stellar-lightNavy">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-gold-500" />
            <span className="text-sm text-stellar-slate">Your Voting Power</span>
          </div>
          <span className="text-lg font-semibold text-gold-400">
            {mockUserVotingPower}
          </span>
        </div>

        {/* Vote Buttons */}
        {isActive ? (
          <div className="space-y-3">
            {canVote ? (
              <>
                <Button
                  variant="primary"
                  className={cn(
                    "w-full h-14 flex items-center justify-center gap-2",
                    currentVote === 'for' && "ring-2 ring-gold-500"
                  )}
                  onClick={() => handleVote('for')}
                  disabled={isSubmitting}
                  isLoading={isSubmitting && selectedChoice === 'for'}
                  leftIcon={<CheckCircle2 size={20} />}
                >
                  Vote For
                </Button>
                <Button
                  variant="danger"
                  className={cn(
                    "w-full h-14 flex items-center justify-center gap-2",
                    currentVote === 'against' && "ring-2 ring-red-500"
                  )}
                  onClick={() => handleVote('against')}
                  disabled={isSubmitting}
                  isLoading={isSubmitting && selectedChoice === 'against'}
                  leftIcon={<XCircle size={20} />}
                >
                  Vote Against
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-14 flex items-center justify-center gap-2",
                    currentVote === 'abstain' && "ring-2 ring-stellar-slate"
                  )}
                  onClick={() => handleVote('abstain')}
                  disabled={isSubmitting}
                  isLoading={isSubmitting && selectedChoice === 'abstain'}
                  leftIcon={<Minus size={20} />}
                >
                  Abstain
                </Button>
              </>
            ) : (
              <div className="p-4 rounded-lg bg-stellar-navy border border-stellar-lightNavy">
                {userVote || hasVoted ? (
                  <div className="flex items-center justify-center gap-2">
                    {currentVote === 'for' && <CheckCircle2 size={20} className="text-green-400" />}
                    {currentVote === 'against' && <XCircle size={20} className="text-red-400" />}
                    {currentVote === 'abstain' && <Minus size={20} className="text-stellar-slate" />}
                    <span className="text-stellar-white font-medium">
                      You voted <span className="capitalize">{currentVote}</span>
                    </span>
                  </div>
                ) : (
                  <p className="text-stellar-slate text-center">
                    You have already voted on this proposal
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-stellar-navy border border-stellar-lightNavy text-center">
            <p className="text-stellar-slate">
              This proposal is no longer active
            </p>
            {userVote && (
              <p className="text-sm text-stellar-slate mt-2">
                Your vote: <span className="capitalize text-stellar-white">{userVote.choice}</span>
              </p>
            )}
          </div>
        )}

        {/* Info Text */}
        {canVote && (
          <p className="text-xs text-stellar-slate text-center">
            Your vote will be recorded immediately. This is a simulation.
          </p>
        )}
      </div>
    </Card>
  )
}
