'use client'

import React, { useState } from 'react'
import { Users, UserPlus, UserCheck, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface VoteDelegationProps {
  proposalId: string
  userVotingPower: number
}

export const VoteDelegation: React.FC<VoteDelegationProps> = ({ 
  proposalId, 
  userVotingPower 
}) => {
  const [delegateAddress, setDelegateAddress] = useState('')
  const [isDelegated, setIsDelegated] = useState(false)
  const [delegatedTo, setDelegatedTo] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelegate = async () => {
    if (!delegateAddress.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setIsDelegated(true)
    setDelegatedTo(delegateAddress)
    setIsSubmitting(false)
  }

  const handleUndelegate = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setIsDelegated(false)
    setDelegatedTo(null)
    setDelegateAddress('')
    setIsSubmitting(false)
  }

  return (
    <Card title="Vote Delegation" className="w-full">
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-stellar-navy border border-stellar-lightNavy">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-stellar-slate">
              Delegate your voting power to another member. They will vote on your behalf for this proposal.
            </p>
          </div>
        </div>

        {isDelegated && delegatedTo ? (
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck size={16} className="text-green-400" />
                <span className="text-sm font-medium text-green-400">Delegated</span>
              </div>
              <p className="text-sm text-stellar-slate">
                Your voting power ({userVotingPower}) is delegated to:
              </p>
              <p className="text-sm font-mono text-stellar-white mt-1 break-all">
                {delegatedTo}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleUndelegate}
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Remove Delegation
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              label="Delegate Address"
              placeholder="Enter Stellar address (e.g., GABC123...)"
              value={delegateAddress}
              onChange={(e) => setDelegateAddress(e.target.value)}
              helperText="Enter the address of the member you want to delegate to"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleDelegate}
              disabled={!delegateAddress.trim() || isSubmitting}
              isLoading={isSubmitting}
              leftIcon={<UserPlus size={18} />}
            >
              Delegate Vote
            </Button>
          </div>
        )}

        <div className="pt-3 border-t border-stellar-lightNavy">
          <div className="flex items-center gap-2 text-xs text-stellar-slate">
            <Users size={14} />
            <span>Delegation is proposal-specific and can be revoked at any time</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
