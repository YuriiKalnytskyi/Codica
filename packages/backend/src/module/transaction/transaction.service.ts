import { Injectable } from '@nestjs/common';

import { BaseAuthService } from '../common/services/base-auth.service';
import { Bank, Category, Transaction } from '../../db/models';
import { TransactionDto, TransactionPaginateDTO } from './dto';
import { ErrorHandler } from '../common/errors';
import { TransactionEnum } from './types';
import { IdDTO } from '../common/dtos';

@Injectable()
export class TransactionService extends BaseAuthService {
  private pageSize = 5;

  async createTransaction(data: TransactionDto): Promise<IdDTO> {
    const bank = await Bank.findOne({ where: { id: data.bankId } });

    if (!bank) ErrorHandler({ message: 'ALREADY_EXIST_BANK_NOT_EXIST' });

    const category = await Category.findOne({ where: { id: data.categoryId } });

    if (!category) ErrorHandler({ message: 'ALREADY_EXIST_CATEGORY_NOT_EXIST' });

    const type = +data.amount < 0 ? TransactionEnum.CONSUMABLE : TransactionEnum.PROFITABLE;

    const balance = bank.balance + +data.amount;

    if (balance < 0) ErrorHandler({ message: 'INSUFFICIENT_FUNDS' });

    Object.assign(bank, { balance });
    const newBank = await Bank.save(bank);
    const newTransaction = Transaction.create({ ...data, bank: newBank, category, type });
    const res = await Transaction.save(newTransaction);

    return { id: res.id };
  }

  async getAllTransaction(page: string): Promise<TransactionPaginateDTO> {
    const transactions = await Transaction.find({
      skip: (+page - 1) * this.pageSize,
      take: this.pageSize,
      order: { createdAt: 'ASC' },
      relations: ['category']
    });

    const count = await Transaction.count();

    return { transactions, count };
  }

  async deleteTransactionById(id: string): Promise<IdDTO> {
    const transaction = await Transaction.findOne({where: { id }, relations:['bank']});

    const bank = transaction.bank
    const balance =  +bank.balance - +transaction.amount

    Object.assign(bank, { balance });

    await Bank.save(bank);
    await Transaction.delete({ id });

    return { id };
  }
}
