import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ example: 'food', description: 'Represents the name of the category' })
  @IsString()
  name: string;
}
