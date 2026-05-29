import { IsString, IsInt, IsOptional, IsBoolean, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  year: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vin?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  mileage?: number;

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
