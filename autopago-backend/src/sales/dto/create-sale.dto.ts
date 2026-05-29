import { IsInt, IsOptional, IsIn, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSaleDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  clientId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  sellerId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  vehicleId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  landId?: number;

  @ApiProperty({ enum: ['CONTADO', 'FINANCIAMIENTO'] })
  @IsIn(['CONTADO', 'FINANCIAMIENTO'])
  paymentType: string;

  @ApiProperty()
  @Type(() => Number)
  totalAmount: number;
}
