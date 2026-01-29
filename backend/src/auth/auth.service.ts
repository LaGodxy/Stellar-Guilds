import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ethers } from 'ethers';
import {
  RegisterDto,
  LoginDto,
  WalletAuthDto,
  RefreshTokenDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly refreshTokenSecret: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.jwtSecret =
      this.configService.get<string>('JWT_SECRET') || 'your-secret-key';
    this.refreshTokenSecret =
      this.configService.get<string>('REFRESH_TOKEN_SECRET') ||
      'your-refresh-secret-key';
  }

  /**
   * Register a new user with email and password
   */
  async register(registerDto: RegisterDto) {
    const { email, username, password, firstName, lastName, walletAddress } =
      registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or username already exists',
      );
    }

    // Validate wallet address if provided
    if (walletAddress && !this.isValidWalletAddress(walletAddress)) {
      throw new BadRequestException('Invalid wallet address');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        ...(walletAddress && { walletAddress }),
      },
    });

    // Generate tokens
    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      user.walletAddress || undefined,
      user.role,
    );

    // Save refresh token to database
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        walletAddress: user.walletAddress || undefined,
      },
    };
  }

  /**
   * Login user with email and password
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      user.walletAddress || undefined,
      user.role,
    );

    // Save refresh token to database
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        walletAddress: user.walletAddress || undefined,
      },
    };
  }

  /**
   * Authenticate user using wallet signature (Web3)
   */
  async walletAuth(walletAuthDto: WalletAuthDto) {
    const { walletAddress, message, signature } = walletAuthDto;

    // Validate wallet address format
    if (!this.isValidWalletAddress(walletAddress)) {
      throw new BadRequestException('Invalid wallet address');
    }

    // Verify signature
    const signerAddress = await this.verifySignature(message, signature);
    if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new UnauthorizedException('Invalid signature');
    }

    // Find or create user
    let user = await this.prisma.user.findFirst({
      where: { walletAddress },
    });

    if (!user) {
      // Create new user with wallet
      const username = `user_${walletAddress.slice(-6).toLowerCase()}`;
      user = await this.prisma.user.create({
        data: {
          email: `${username}@wallet.local`,
          username,
          password: await bcrypt.hash(Math.random().toString(), 10), // Random password for wallet users
          firstName: 'Wallet',
          lastName: 'User',
          walletAddress,
        },
      });
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      user.walletAddress || undefined,
      user.role,
    );

    // Save refresh token to database
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        walletAddress: user.walletAddress || undefined,
      },
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.refreshTokenSecret,
      });

      // Find user and verify refresh token
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } =
        await this.generateTokens(
          user.id,
          user.email,
          user.walletAddress || undefined,
          user.role,
        );

      // Save new refresh token
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });

      return {
        accessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          walletAddress: user.walletAddress || undefined,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Logout user by invalidating refresh token
   */
  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return { message: 'Logged out successfully' };
  }

  /**
   * Generate access and refresh tokens
   */
  private async generateTokens(
    userId: string,
    email: string,
    walletAddress?: string,
    role?: string,
  ) {
    const payload = {
      sub: userId,
      email,
      role: role || 'USER',
      ...(walletAddress && { walletAddress }),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.jwtSecret,
      expiresIn: 900, // 15 minutes in seconds
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: 604800, // 7 days in seconds
    });

    return { accessToken, refreshToken };
  }

  /**
   * Verify wallet signature using ethers.js
   */
  private verifySignature(message: string, signature: string): string {
    try {
      const signerAddress = ethers.verifyMessage(message, signature);
      return signerAddress;
    } catch (error) {
      throw new UnauthorizedException('Invalid signature');
    }
  }

  /**
   * Validate Ethereum wallet address format
   */
  private isValidWalletAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * Get current user by ID
   */
  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        walletAddress: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
