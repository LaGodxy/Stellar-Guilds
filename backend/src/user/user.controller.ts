import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  UpdateUserProfileDto,
  ChangePasswordDto,
  SearchUserDto,
  AssignRoleDto,
  UserRole,
} from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get current authenticated user profile
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@Request() req: any) {
    return this.userService.getUserProfile(req.user.userId);
  }

  /**
   * Search and filter users (must come before :userId to avoid route conflicts)
   */
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async searchUsers(@Query() searchDto: SearchUserDto) {
    return this.userService.searchUsers(searchDto);
  }

  /**
   * Get user profile by ID (public)
   */
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getUserProfile(@Param('userId') userId: string) {
    return this.userService.getUserProfile(userId);
  }

  /**
   * Update current user profile
   */
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Request() req: any,
    @Body() updateDto: UpdateUserProfileDto,
  ) {
    return this.userService.updateUserProfile(req.user.userId, updateDto);
  }

  /**
   * Change current user password
   */
  @Post('me/change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Request() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(req.user.userId, changePasswordDto);
  }

  /**
   * Upload user avatar
   * Note: For file upload, use multipart/form-data
   * In a real scenario, integrate with cloud storage (AWS S3, Cloudinary)
   */
  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(@Request() req: any, @Body('avatarUrl') avatarUrl: string) {
    if (!avatarUrl) {
      throw new BadRequestException('avatarUrl is required');
    }
    const result = await this.userService.updateAvatar(req.user.userId, avatarUrl);
    return {
      avatarUrl: result.avatarUrl,
      message: 'Avatar updated successfully',
    };
  }

  /**
   * Deactivate current user account
   */
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deactivateAccount(@Request() req: any) {
    return this.userService.deactivateUser(req.user.userId);
  }

  /**
   * Get user details (admin or self)
   */
  @Get('details/:userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getUserDetails(@Param('userId') userId: string, @Request() req: any) {
    return this.userService.getUserDetails(userId, req.user.userId, req.user.role);
  }

  /**
   * Admin: Get users by role
   */
  @Get('role/:role')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @HttpCode(HttpStatus.OK)
  async getUsersByRole(
    @Param('role') role: UserRole,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.userService.getUsersByRole(
      role,
      skip ? parseInt(skip) : 0,
      take ? parseInt(take) : 20,
    );
  }

  /**
   * Admin: Assign role to user
   */
  @Patch(':userId/role')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  async assignRole(
    @Param('userId') userId: string,
    @Body() assignRoleDto: AssignRoleDto,
  ) {
    return this.userService.assignRole(userId, assignRoleDto);
  }

  /**
   * Admin: Reactivate user account
   */
  @Post(':userId/reactivate')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  async reactivateUser(@Param('userId') userId: string) {
    return this.userService.reactivateUser(userId);
  }
}
