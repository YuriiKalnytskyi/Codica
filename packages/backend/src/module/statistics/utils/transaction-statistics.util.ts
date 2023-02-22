import {  ITransactionStatisticsResponse } from '../types';
import { Transaction } from '../../../db/models';

export function transform(data: Transaction[]): ITransactionStatisticsResponse[] {
  return  data.map((d)=> {
    return {
      name: d.category.name,
      amount: d.amount
    }
  })
}
