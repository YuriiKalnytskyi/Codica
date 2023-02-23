import { Injectable } from '@nestjs/common';

import { IdDTO } from '../common/dtos';
import { BaseAuthService } from '../common/services/base-auth.service';
import { BankDtoDTO } from './dto';
import { Bank } from '../../db/models';
import { ErrorHandler } from '../common/errors';

@Injectable()
export class BankService extends BaseAuthService {
  async createBank(data: BankDtoDTO): Promise<IdDTO> {
    const bank = await Bank.findOne({ where: { ...data } });

    if (bank) ErrorHandler({ message: 'ALREADY_EXIST_BANK' });

    const newBank = Bank.create({ ...data });

    const res = await Bank.save(newBank);

    return { id: res.id };
  };

  async getBankById(id: string): Promise<Bank> {
    const bank = await Bank.findOne({ where: { id } });

    if (!bank) ErrorHandler({ message: 'ALREADY_EXIST_BANK_NOT_EXIST' });

    return bank;
  };

  async getAllBank(): Promise<Bank[]> {
    const banks = await Bank.find();

    if (!banks.length) ErrorHandler({ message: 'ALREADY_EXIST_BANK_NOT_EXIST' });

    return banks;
  };

  async modifyBank(id: string, data: Partial<BankDtoDTO>): Promise<IdDTO> {
    const bank = await Bank.findOne({ where: { id } });

    if (!bank) ErrorHandler({ message: 'ALREADY_EXIST_BANK_NOT_EXIST' });

    Object.assign(bank, data);
    const res = await Bank.save(bank);

    return { id: res.id };
  };

  async deleteBankById(id: string): Promise<IdDTO> {
    const bank = await Bank.findOne({ where: { id }, relations:['transactions'] });

    if (bank.transactions.length) ErrorHandler({ message: 'DELETION_NOT_POSSIBLE' });

    await Bank.delete({ id });

    return { id: id };
  };
}
