import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsUUID,
  IsArray,
  IsEnum,
  IsBoolean,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export enum UserRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

// Get user profile (public)
export class UserProfileDto {
  id!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  bio?: string;
  avatarUrl?: string;
  profileBio?: string;
  profileUrl?: string;
  discordHandle?: string;
  twitterHandle?: string;
  createdAt!: Date;
  role!: UserRole;
}

// Update user profile
export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  profileBio?: string;

  @IsOptional()
  @IsString()
  profileUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  discordHandle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  twitterHandle?: string;
}

// Change password
export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  currentPassword!: string;

  @IsString()
  @MinLength(8)
  newPassword!: string;

  @IsString()
  @MinLength(8)
  confirmPassword!: string;
}

// Assign role to user
export class AssignRoleDto {
  @IsEnum(UserRole)
  role!: UserRole;
}

// Search and filter users
export class SearchUserDto {
  @IsOptional()
  @IsString()
  query?: string; // Search by username, email, firstName, lastName

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  take?: number;
}

// Paginated user response
export class PaginatedUsersDto {
  data!: UserProfileDto[];
  total!: number;
  skip!: number;
  take!: number;
}

// Avatar upload response
export class AvatarUploadResponseDto {
  avatarUrl!: string;
  message!: string;
}

// Role and Permission DTOs
export class PermissionDto {
  id!: string;
  name!: string;
  description?: string;
}

export class RoleDto {
  id!: string;
  name!: string;
  description?: string;
  permissions?: PermissionDto[];
}

// User details (including sensitive info, admin only)
export class UserDetailsDto extends UserProfileDto {
  email!: string;
  walletAddress?: string;
  isActive!: boolean;
  lastLoginAt?: Date;
  updatedAt!: Date;
}
