import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  login?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  role?: string;
  @IsOptional()
  @IsBoolean()
  locked?: boolean;
}
