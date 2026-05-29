import { IsInt, IsOptional, IsDecimal, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  saleId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  installmentId?: number;

  @ApiProperty()
  @Type(() => Number)
  amount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  receiptNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
