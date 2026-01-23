import { Proposal, Vote, VotingStats, ProposalStatus, ProposalType, VoteChoice } from '@/types/ui'

// Mock Votes
export const mockVotes: Vote[] = [
  {
    id: 'vote-1',
    proposalId: 'proposal-1',
    voterId: 'user-1',
    voterAddress: 'GABC123...',
    choice: 'for',
    votingPower: 150,
    timestamp: '2024-10-15T10:30:00Z'
  },
  {
    id: 'vote-2',
    proposalId: 'proposal-1',
    voterId: 'user-2',
    voterAddress: 'GDEF456...',
    choice: 'for',
    votingPower: 200,
    timestamp: '2024-10-15T11:00:00Z'
  },
  {
    id: 'vote-3',
    proposalId: 'proposal-1',
    voterId: 'user-3',
    voterAddress: 'GGHI789...',
    choice: 'against',
    votingPower: 100,
    timestamp: '2024-10-15T12:00:00Z'
  },
  {
    id: 'vote-4',
    proposalId: 'proposal-1',
    voterId: 'user-4',
    voterAddress: 'GJKL012...',
    choice: 'abstain',
    votingPower: 50,
    timestamp: '2024-10-15T13:00:00Z'
  },
  {
    id: 'vote-5',
    proposalId: 'proposal-2',
    voterId: 'user-1',
    voterAddress: 'GABC123...',
    choice: 'for',
    votingPower: 150,
    timestamp: '2024-10-20T09:00:00Z'
  },
  {
    id: 'vote-6',
    proposalId: 'proposal-2',
    voterId: 'user-2',
    voterAddress: 'GDEF456...',
    choice: 'for',
    votingPower: 200,
    timestamp: '2024-10-20T10:00:00Z'
  },
  {
    id: 'vote-7',
    proposalId: 'proposal-3',
    voterId: 'user-1',
    voterAddress: 'GABC123...',
    choice: 'for',
    votingPower: 150,
    timestamp: '2024-10-25T08:00:00Z'
  },
  {
    id: 'vote-8',
    proposalId: 'proposal-3',
    voterId: 'user-3',
    voterAddress: 'GGHI789...',
    choice: 'for',
    votingPower: 100,
    timestamp: '2024-10-25T09:00:00Z'
  },
  {
    id: 'vote-9',
    proposalId: 'proposal-3',
    voterId: 'user-4',
    voterAddress: 'GJKL012...',
    choice: 'for',
    votingPower: 50,
    timestamp: '2024-10-25T10:00:00Z'
  },
  {
    id: 'vote-10',
    proposalId: 'proposal-4',
    voterId: 'user-2',
    voterAddress: 'GDEF456...',
    choice: 'against',
    votingPower: 200,
    timestamp: '2024-09-15T14:00:00Z'
  },
  {
    id: 'vote-11',
    proposalId: 'proposal-4',
    voterId: 'user-3',
    voterAddress: 'GGHI789...',
    choice: 'against',
    votingPower: 100,
    timestamp: '2024-09-15T15:00:00Z'
  }
]

// Helper function to calculate voting stats
export const calculateVotingStats = (votes: Vote[]): VotingStats => {
  const stats: VotingStats = {
    for: 0,
    against: 0,
    abstain: 0,
    total: votes.length,
    forPower: 0,
    againstPower: 0,
    abstainPower: 0,
    totalPower: 0
  }

  votes.forEach(vote => {
    stats.totalPower += vote.votingPower
    switch (vote.choice) {
      case 'for':
        stats.for++
        stats.forPower += vote.votingPower
        break
      case 'against':
        stats.against++
        stats.againstPower += vote.votingPower
        break
      case 'abstain':
        stats.abstain++
        stats.abstainPower += vote.votingPower
        break
    }
  })

  return stats
}

// Mock Proposals
export const mockProposals: Proposal[] = [
  {
    id: 'proposal-1',
    guildId: 'guild-1',
    title: 'Increase Treasury Allocation for Development',
    description: 'This proposal seeks to increase the treasury allocation for development initiatives by 20%. The additional funds will be used to accelerate the development of new features and improve the platform infrastructure. We believe this investment will significantly enhance our competitive position in the market.',
    type: 'treasury',
    status: 'active',
    proposerId: 'user-1',
    proposerAddress: 'GABC123...',
    proposerName: 'stellar_dev',
    createdAt: '2024-10-10T08:00:00Z',
    startDate: '2024-10-15T00:00:00Z',
    endDate: '2024-11-15T23:59:59Z',
    quorum: 3,
    quorumThreshold: 500,
    executionData: JSON.stringify({
      action: 'transfer',
      amount: 50000,
      currency: 'XLM',
      recipient: 'guild-treasury'
    }, null, 2),
    votes: mockVotes.filter(v => v.proposalId === 'proposal-1'),
    votingStats: calculateVotingStats(mockVotes.filter(v => v.proposalId === 'proposal-1'))
  },
  {
    id: 'proposal-2',
    guildId: 'guild-1',
    title: 'Update Membership Requirements',
    description: 'Proposal to update the minimum reputation score required for guild membership from 50 to 75. This change will help maintain the quality of our community and ensure that new members have demonstrated commitment to the platform.',
    type: 'rule-change',
    status: 'active',
    proposerId: 'user-2',
    proposerAddress: 'GDEF456...',
    proposerName: 'cosmic_builder',
    createdAt: '2024-10-18T10:00:00Z',
    startDate: '2024-10-20T00:00:00Z',
    endDate: '2024-11-20T23:59:59Z',
    quorum: 2,
    quorumThreshold: 400,
    executionData: JSON.stringify({
      action: 'update_rule',
      rule: 'membership_requirement',
      value: 75
    }, null, 2),
    votes: mockVotes.filter(v => v.proposalId === 'proposal-2'),
    votingStats: calculateVotingStats(mockVotes.filter(v => v.proposalId === 'proposal-2'))
  },
  {
    id: 'proposal-3',
    guildId: 'guild-1',
    title: 'Appoint New Admin Member',
    description: 'Proposal to appoint user-5 as a new admin member. This individual has shown exceptional leadership and technical expertise, and we believe they will be a valuable addition to the admin team.',
    type: 'membership',
    status: 'passed',
    proposerId: 'user-1',
    proposerAddress: 'GABC123...',
    proposerName: 'stellar_dev',
    createdAt: '2024-10-22T09:00:00Z',
    startDate: '2024-10-25T00:00:00Z',
    endDate: '2024-11-10T23:59:59Z',
    quorum: 3,
    quorumThreshold: 300,
    executionData: JSON.stringify({
      action: 'add_admin',
      userId: 'user-5',
      address: 'GMNO345...'
    }, null, 2),
    votes: mockVotes.filter(v => v.proposalId === 'proposal-3'),
    votingStats: calculateVotingStats(mockVotes.filter(v => v.proposalId === 'proposal-3'))
  },
  {
    id: 'proposal-4',
    guildId: 'guild-1',
    title: 'Reduce Bounty Reward Multiplier',
    description: 'Proposal to reduce the bounty reward multiplier from 1.5x to 1.2x. This change was proposed to better align rewards with market conditions.',
    type: 'rule-change',
    status: 'rejected',
    proposerId: 'user-2',
    proposerAddress: 'GDEF456...',
    proposerName: 'cosmic_builder',
    createdAt: '2024-09-10T14:00:00Z',
    startDate: '2024-09-15T00:00:00Z',
    endDate: '2024-10-15T23:59:59Z',
    quorum: 2,
    quorumThreshold: 400,
    executionData: JSON.stringify({
      action: 'update_rule',
      rule: 'bounty_multiplier',
      value: 1.2
    }, null, 2),
    votes: mockVotes.filter(v => v.proposalId === 'proposal-4'),
    votingStats: calculateVotingStats(mockVotes.filter(v => v.proposalId === 'proposal-4'))
  },
  {
    id: 'proposal-5',
    guildId: 'guild-1',
    title: 'General Platform Improvements Discussion',
    description: 'This is a general proposal to discuss and prioritize platform improvements. We invite all members to share their ideas and vote on which improvements should be prioritized.',
    type: 'general',
    status: 'active',
    proposerId: 'user-3',
    proposerAddress: 'GGHI789...',
    proposerName: 'blockchain_master',
    createdAt: '2024-10-28T11:00:00Z',
    startDate: '2024-10-30T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
    quorum: 0,
    quorumThreshold: 500,
    votes: [],
    votingStats: calculateVotingStats([])
  }
]

// Mock voting power for current user
export const mockUserVotingPower = 150

// Helper functions
export const getProposalById = (id: string): Proposal | undefined => {
  return mockProposals.find(p => p.id === id)
}

export const getProposalsByGuildId = (guildId: string): Proposal[] => {
  return mockProposals.filter(p => p.guildId === guildId)
}

export const getVotesForProposal = (proposalId: string): Vote[] => {
  return mockVotes.filter(v => v.proposalId === proposalId)
}

export const calculateQuorumProgress = (proposal: Proposal): number => {
  if (proposal.quorumThreshold === 0) return 0
  const currentPower = proposal.votingStats.totalPower
  return Math.min((currentPower / proposal.quorumThreshold) * 100, 100)
}

export const getUserVote = (proposalId: string, userId: string = 'user-1'): Vote | undefined => {
  return mockVotes.find(v => v.proposalId === proposalId && v.voterId === userId)
}

export const getProposalsByStatus = (status: ProposalStatus | 'all'): Proposal[] => {
  if (status === 'all') return mockProposals
  return mockProposals.filter(p => p.status === status)
}
