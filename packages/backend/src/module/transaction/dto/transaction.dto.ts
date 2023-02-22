import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsUUID } from 'class-validator';
import { Transaction } from '../../../db/models';

export class TransactionDto {
  @ApiProperty({
    example: '03adea8e-0578-4b4e-b779-bdcbd32e40d0',
    description: 'Represents the id of the bank'
  })
  @IsUUID()
  bankId: string;

  @ApiProperty({
    example: '03adea8e-0578-4b4e-b779-bdcbd32e40d0',
    description: 'Represents the id of the category'
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: '1000 op -1000', description: '' })
  @IsString()
  amount: string;
}

export class TransactionPaginateDTO {
  @ApiProperty({ example: [], description: 'Represents array of the transaction' })
  @IsArray()
  transactions: Transaction[];

  @ApiProperty({ example: 10, description: 'Represents number transaction' })
  @IsNumber()
  count: number;
}
