import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID} from 'class-validator';

export class StatisticsDto {

  @ApiProperty({
    example: '03adea8e-0578-4b4e-b779-bdcbd32e40d0',
    description: 'Represents the id of the category'
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: '1000 op -1000', description: '' })
  @IsString()
  fromPeriod: string;

  @ApiProperty({ example: '1000 op -1000', description: '' })
  @IsString()
  toPeriod: string;

}

