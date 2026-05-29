import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ine?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  curp?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rfc?: string;
}
