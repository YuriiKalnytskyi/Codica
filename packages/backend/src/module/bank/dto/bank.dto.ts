import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class BankDtoDTO {
  @ApiProperty({ example: 'monoBank', description: 'Represents the name of the bank' })
  @IsString()
  name: string;

  @ApiProperty({ example: '10000', description: 'Represents the starting capital' })
  @IsNumber()
  balance: number;
}
