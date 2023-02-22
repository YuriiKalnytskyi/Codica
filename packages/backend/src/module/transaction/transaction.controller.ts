import { Body, Param, Query } from '@nestjs/common';
import { ApiAuthDelete, ApiAuthGet, ApiAuthPost, ApiController } from '../common/decorators';
import { IdDTO } from '../common/dtos';
import { TransactionService } from './transaction.service';
import { TransactionDto, TransactionPaginateDTO } from './dto';

@ApiController('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiAuthPost('create-transaction', 'creation of a bank', IdDTO)
  async createTransaction(@Body() data: TransactionDto): Promise<IdDTO> {
    return await this.transactionService.createTransaction(data);
  }

  @ApiAuthGet('get-all/transaction', 'get all suggested items', TransactionPaginateDTO)
  async getAllTransaction(@Query('page') page: string): Promise<TransactionPaginateDTO> {
    return await this.transactionService.getAllTransaction(page);
  }

  @ApiAuthDelete('/:id', 'delete transaction by id', IdDTO)
  async deleteTransactionById(@Param('id') id: string): Promise<IdDTO> {
    return await this.transactionService.deleteTransactionById(id);
  }
}
