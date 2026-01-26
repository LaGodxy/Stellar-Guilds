import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// We'll import the actual PrismaClient when the database is connected
// For now, we'll create a temporary service that can be extended once types are available

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: any;

  constructor() {
    // Dynamically import PrismaClient to handle type issues
    const { PrismaClient } = require('@prisma/client');
    this.client = new PrismaClient();
  }

  async onModuleInit() {
    try {
      await this.client.$connect();
    } catch (error) {
      console.error('Database connection failed:', error);
      // In production, you might want to handle this differently
    }
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  // Expose all Prisma client methods
  get user() {
    return this.client.user;
  }

  get guild() {
    return this.client.guild;
  }

  get guildMembership() {
    return this.client.guildMembership;
  }

  get bounty() {
    return this.client.bounty;
  }

  get $queryRaw() {
    return this.client.$queryRaw;
  }

  get $executeRaw() {
    return this.client.$executeRaw;
  }

  get $connect() {
    return this.client.$connect;
  }

  get $disconnect() {
    return this.client.$disconnect;
  }

  get $transaction() {
    return this.client.$transaction;
  }
}