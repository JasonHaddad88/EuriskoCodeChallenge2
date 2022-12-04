import { IsEmail, IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
  
  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;

  @IsBoolean()
  @IsOptional()
  isVIP: boolean;
}