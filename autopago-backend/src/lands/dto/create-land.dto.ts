import { IsString, IsOptional, IsBoolean, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLandDto {
  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  measurements?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  area?: number;

  @ApiProperty()
  @Type(() => Number)
  price: number;

  @ApiProperty({ required: false, description: 'URLs de fotos separadas por comas' })
  @IsOptional()
  @IsString()
  photos?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
