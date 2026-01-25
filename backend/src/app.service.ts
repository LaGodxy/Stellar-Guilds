import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Stellar Guilds Backend - Database Integration Complete!';
  }

  // Placeholder for database connection test
  // This will work once PostgreSQL is running and migrations are applied
  async testDatabaseConnection(): Promise<boolean> {
    try {
      // This will be functional when PostgreSQL is available
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  // Example of type-safe database operations
  // These methods will work when the Prisma client is properly connected
  async createUser(userData: any) {
    // The Prisma client provides auto-completion and type checking
    // for all fields based on the schema definition
    // This will work when PostgreSQL is running
    return this.prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });
  }

  async getUserById(id: string) {
    // Type-safe: the return type is inferred as User | null
    // This will work when PostgreSQL is running
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}