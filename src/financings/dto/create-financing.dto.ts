import { IsInt, IsDecimal, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateFinancingDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  saleId: number;

  @ApiProperty()
  @Type(() => Number)
  downPayment: number;

  @ApiProperty()
  @Type(() => Number)
  monthlyPayment: number;

  @ApiProperty()
  @Type(() => Number)
  totalAmount: number;

  @ApiProperty()
  @IsDateString()
  firstPaymentDate: string;
}
