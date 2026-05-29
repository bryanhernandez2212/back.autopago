import { IsString, MinLength, IsOptional, IsInt, IsIn, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, description: '1=ADMINISTRADOR, 2=VENDEDOR, 3=CAJERO', enum: [1, 2, 3] })
  @IsOptional()
  @IsInt()
  @IsIn([1, 2, 3])
  role?: number;
}
