import { EnhancedBase } from './enhanced-base';
import { Entity, ManyToOne } from 'typeorm';

import { ApiColumn } from 'src/module/common/decorators';
import { Bank } from './bank.model';
import { TransactionEnum } from '../../module/transaction/types';
import { Category } from './category.model';

@Entity()
export class Transaction extends EnhancedBase {
  @ApiColumn({ example: 'monoBank', description: 'Represents the name of the bank' })
  amount: string;

  @ApiColumn(
    { example: 'profitable/consumable', description: 'Represents the type of expenditure' },
    { enum: TransactionEnum, default: TransactionEnum.CONSUMABLE }
  )
  type: string;

  @ManyToOne(() => Category, (category) => category.transaction, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  category: Category;

  @ManyToOne(() => Bank, (bank) => bank.transactions, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  bank: Bank;
}
