import { Injectable } from '@nestjs/common';
import { BaseAuthService } from '../common/services/base-auth.service';
import { StatisticsDto } from './dto';
import { Bank, Transaction } from '../../db/models';
import { Between } from 'typeorm';
import { transform } from './utils';
import { ITransactionStatisticsResponse } from './types';

@Injectable()
export class StatisticsService extends BaseAuthService {

  async getTransactionStatistics(data: StatisticsDto): Promise<ITransactionStatisticsResponse[]>  {
    const statistics =  await Transaction.find({
      where: {
        createdAt: Between(new Date(data.fromPeriod), new Date(data.toPeriod))
      },
      relations: ['category']
    });

    return transform(statistics)
  };
}
