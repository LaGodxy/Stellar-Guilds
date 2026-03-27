import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { BountyService } from './bounty.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../mailer/mailer.service';

const mockPrisma = () => {
  const prisma = {
    bounty: {
      findUnique: jest.fn(),
      updateMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  prisma.$transaction.mockImplementation(async (callback) => callback(prisma));

  return prisma;
};

const mockMailer = () => ({
  sendInviteEmail: jest.fn(),
  sendRevokeEmail: jest.fn(),
});

describe('BountyService', () => {
  let service: BountyService;
  let prisma: ReturnType<typeof mockPrisma>;
  let mailer: ReturnType<typeof mockMailer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BountyService,
        { provide: PrismaService, useFactory: mockPrisma },
        { provide: MailerService, useFactory: mockMailer },
      ],
    }).compile();

    service = module.get(BountyService);
    prisma = module.get(PrismaService);
    mailer = module.get(MailerService);
  });

  describe('submitWork', () => {
    it('transitions an assigned active bounty to IN_REVIEW', async () => {
      const bounty = {
        id: 'bounty-1',
        title: 'Build API endpoint',
        assigneeId: 'worker-1',
        creatorId: 'creator-1',
        creator: { email: 'creator@example.com' },
        status: 'IN_PROGRESS',
      };

      prisma.bounty.findUnique
        .mockResolvedValueOnce(bounty)
        .mockResolvedValueOnce({ ...bounty, status: 'IN_REVIEW' });
      prisma.bounty.updateMany.mockResolvedValue({ count: 1 });
      mailer.sendRevokeEmail.mockResolvedValue(undefined);

      const result = await service.submitWork(
        'bounty-1',
        'https://example.com/submission',
        'worker-1',
      );

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.bounty.updateMany).toHaveBeenCalledWith({
        where: {
          id: 'bounty-1',
          assigneeId: 'worker-1',
          status: 'IN_PROGRESS',
        },
        data: {
          status: 'IN_REVIEW',
        },
      });
      expect(result.bounty.status).toBe('IN_REVIEW');
      expect(mailer.sendRevokeEmail).toHaveBeenCalled();
    });

    it('throws 403 when a non-assigned user submits work', async () => {
      prisma.bounty.findUnique.mockResolvedValue({
        id: 'bounty-1',
        title: 'Build API endpoint',
        assigneeId: 'worker-1',
        creatorId: 'creator-1',
        creator: { email: 'creator@example.com' },
        status: 'IN_PROGRESS',
      });

      await expect(
        service.submitWork(
          'bounty-1',
          'https://example.com/submission',
          'intruder-1',
        ),
      ).rejects.toThrow(ForbiddenException);

      expect(prisma.$transaction).not.toHaveBeenCalled();
      expect(prisma.bounty.updateMany).not.toHaveBeenCalled();
    });
  });
});
