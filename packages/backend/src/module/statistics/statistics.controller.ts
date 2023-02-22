import { ApiAuthPost, ApiController } from '../common/decorators';
import { StatisticsService } from './statistics.service';
import { StatisticsDto } from './dto';
import { Body } from '@nestjs/common';
import { ITransactionStatisticsResponse, TransactionStatisticsResponse } from './types';

@ApiController('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @ApiAuthPost('get-transaction/statistics', 'get all suggested items', [TransactionStatisticsResponse] )
  async getTransactionStatistics(@Body() data: StatisticsDto): Promise<ITransactionStatisticsResponse[]> {
    return await this.statisticsService.getTransactionStatistics(data);
  }
}
