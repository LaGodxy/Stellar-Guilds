import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🛠️  Starting seed script for Stellar Guilds...');

  // Clean existing data in dependency order
  await prisma.bountyPayout.deleteMany();
  await prisma.bountyApplication.deleteMany();
  await prisma.bountyMilestone.deleteMany();
  await prisma.bounty.deleteMany();
  await prisma.guildMembership.deleteMany();
  await prisma.guild.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'owner@stellar.io',
        username: 'owner1',
        password: 'password',
        firstName: 'Guild',
        lastName: 'Owner',
        bio: 'Owner of the first guild',
      },
    }),
    prisma.user.create({
      data: {
        email: 'contributor@stellar.io',
        username: 'contributor1',
        password: 'password',
        firstName: 'Contributor',
        lastName: 'One',
        bio: 'Contributor to guild bounties',
      },
    }),
  ]);

  const [owner, contributor] = users;

  // Create guilds
  const guilds = await Promise.all([
    prisma.guild.create({
      data: {
        name: 'PrivacyGuard',
        slug: 'privacyguard',
        description: 'Focused on privacy protocols and zero-knowledge research',
        ownerId: owner.id,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=privacy',
        bannerUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=privacy-hero',
      },
    }),
    prisma.guild.create({
      data: {
        name: 'StellarDesign',
        slug: 'stellardesign',
        description: 'Design-first tooling for cross-chain dApps',
        ownerId: owner.id,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=design',
        bannerUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=design-hero',
      },
    }),
  ]);

  // create memberships for owner + contributor
  const membershipOps: Array<Promise<any>> = [];

  for (const guild of guilds) {
    membershipOps.push(
      prisma.guildMembership.create({
        data: {
          userId: owner.id,
          guildId: guild.id,
          role: 'OWNER',
          status: 'APPROVED',
          joinedAt: new Date(),
        },
      }),
    );

    membershipOps.push(
      prisma.guildMembership.create({
        data: {
          userId: contributor.id,
          guildId: guild.id,
          role: 'MEMBER',
          status: 'APPROVED',
          joinedAt: new Date(),
        },
      }),
    );
  }

  await Promise.all(membershipOps);

  // Create bounties attached to guilds (open, in progress/claimed, completed)
  const bountyTemplate: Array<Prisma.BountyCreateInput> = [
    {
      title: 'Implement Zero-Knowledge Proof for Voting',
      description:
        'Build a robust ZK-proof system using Circom for a DAO governance module. Ensure privacy and scalability.',
      status: 'OPEN',
      rewardAmount: new Prisma.Decimal(5000),
      rewardToken: 'USDC',
      deadline: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      creatorId: owner.id,
      guildId: guilds[0].id,
    },
    {
      title: 'Optimize Landing Page Hero Animation',
      description:
        'Improve Three.js hero animation performance and add responsive behavior.',
      status: 'IN_PROGRESS',
      rewardAmount: new Prisma.Decimal(1200),
      rewardToken: 'STR',
      deadline: new Date(Date.now() + 14 * 24 * 3600 * 1000),
      creatorId: owner.id,
      assigneeId: contributor.id,
      guildId: guilds[1].id,
    },
    {
      title: 'Complete Audit for On-Chain Treasury Workflow',
      description:
        'Review all smart-contract hooks and treasury flows for edge cases and replay attack resistance.',
      status: 'COMPLETED',
      rewardAmount: new Prisma.Decimal(7500),
      rewardToken: 'STELLAR',
      deadline: new Date(Date.now() - 2 * 24 * 3600 * 1000),
      creatorId: owner.id,
      assigneeId: contributor.id,
      guildId: guilds[0].id,
    },
  ];

  const bounties = await Promise.all(
    bountyTemplate.map((bounty) => prisma.bounty.create({ data: bounty })),
  );

  console.log(`✅ Seed completed: ${users.length} users, ${guilds.length} guilds, ${bounties.length} bounties created.`);
  console.log('🎉 Finished Prisma seed script.');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
