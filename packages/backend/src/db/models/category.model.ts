import { EnhancedBase } from './enhanced-base';
import { Entity, OneToMany } from 'typeorm';

import { ApiColumn } from 'src/module/common/decorators';
import { Transaction } from './transaction.model';

@Entity()
export class Category extends EnhancedBase {
  @ApiColumn({ example: 'food', description: 'Displays the transaction category' })
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category, {
    nullable: true,
    cascade: ['remove']
  })
  transaction: Transaction;
}
