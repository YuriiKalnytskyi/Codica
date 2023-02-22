import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export interface ITransactionStatisticsResponse {
  name: string
  amount: string
}

export class TransactionStatisticsResponse {
  @ApiProperty({ example: 'fod' })
  @IsString()
  name: string;

  @ApiProperty({ example: '100' })
  @IsString()
  amount: string;
}

