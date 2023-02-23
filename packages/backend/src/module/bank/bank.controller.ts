import { Body, Param } from '@nestjs/common';

import { ApiAuthDelete, ApiAuthPost, ApiAuthPut, ApiController, ApiGet } from '../common/decorators';
import { IdDTO } from '../common/dtos';
import { BankDtoDTO } from './dto';
import { BankService } from './bank.service';
import { Bank } from '../../db/models';

@ApiController('bank')
export class BankController {
  constructor(private bankService: BankService) {};

  @ApiAuthPost('create-bank', 'creation of a bank', IdDTO)
  async createBank(@Body() data: BankDtoDTO): Promise<IdDTO> {
    return await this.bankService.createBank(data);
  };

  @ApiGet('/:id', 'get bank by id', Bank)
  async getBankById(@Param('id') id: string): Promise<Bank> {
    return await this.bankService.getBankById(id);
  };

  @ApiGet('get-all/bank', 'get all bank', [Bank])
  async getAllBank(): Promise<Bank[]> {
    return await this.bankService.getAllBank();
  };

  @ApiAuthPut('modify/:id', 'modify bank by id', IdDTO)
  async modifyBank(@Param('id') id: string, @Body() data: Partial<BankDtoDTO>): Promise<IdDTO> {
    return await this.bankService.modifyBank(id, data);
  };

  @ApiAuthDelete('/:id', 'delete bank by id', IdDTO)
  async deleteBankById(@Param('id') id: string): Promise<IdDTO> {
    return await this.bankService.deleteBankById(id);
  };
}
