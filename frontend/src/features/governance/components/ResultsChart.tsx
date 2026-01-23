'use client'

import React from 'react'
import { CheckCircle2, XCircle, Minus } from 'lucide-react'
import { VotingStats } from '@/types/ui'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface ResultsChartProps {
  stats: VotingStats
  showPower?: boolean
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ stats, showPower = false }) => {
  const total = showPower ? stats.totalPower : stats.total
  
  if (total === 0) {
    return (
      <Card title="Voting Results" className="w-full">
        <div className="text-center py-8">
          <p className="text-stellar-slate">No votes cast yet</p>
        </div>
      </Card>
    )
  }

  const forPercent = total > 0 ? ((showPower ? stats.forPower : stats.for) / total) * 100 : 0
  const againstPercent = total > 0 ? ((showPower ? stats.againstPower : stats.against) / total) * 100 : 0
  const abstainPercent = total > 0 ? ((showPower ? stats.abstainPower : stats.abstain) / total) * 100 : 0

  const BarSegment = ({ 
    label, 
    value, 
    count, 
    percentage, 
    color, 
    icon 
  }: { 
    label: string
    value: number
    count: number
    percentage: number
    color: string
    icon: React.ReactNode
  }) => {
    if (percentage === 0) return null

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-stellar-white">{label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stellar-slate">
              {count} {showPower ? `(${value} power)` : ''}
            </span>
            <span className="text-sm font-semibold text-stellar-white w-12 text-right">
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="w-full h-6 bg-stellar-navy rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-500 flex items-center justify-end pr-2", color)}
            style={{ width: `${percentage}%` }}
          >
            {percentage > 10 && (
              <span className="text-xs font-medium text-white">
                {percentage.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card title="Voting Results" className="w-full">
      <div className="space-y-4">
        <BarSegment
          label="For"
          value={stats.forPower}
          count={stats.for}
          percentage={forPercent}
          color="bg-green-500"
          icon={<CheckCircle2 size={16} className="text-green-400" />}
        />
        <BarSegment
          label="Against"
          value={stats.againstPower}
          count={stats.against}
          percentage={againstPercent}
          color="bg-red-500"
          icon={<XCircle size={16} className="text-red-400" />}
        />
        <BarSegment
          label="Abstain"
          value={stats.abstainPower}
          count={stats.abstain}
          percentage={abstainPercent}
          color="bg-stellar-slate"
          icon={<Minus size={16} className="text-stellar-slate" />}
        />

        <div className="pt-4 border-t border-stellar-lightNavy">
          <div className="flex items-center justify-between text-sm">
            <span className="text-stellar-slate">Total</span>
            <span className="text-stellar-white font-semibold">
              {stats.total} votes
              {showPower && ` • ${stats.totalPower.toLocaleString()} power`}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
