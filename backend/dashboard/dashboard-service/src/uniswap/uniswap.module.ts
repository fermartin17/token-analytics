import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {
  uniswapServiceProvider,
  pairHourDataRepositoryTokeProvider,
  uniswapUploadPairHourDataUsecaseProvider,
  pairHourDataRepositoryProvider,
  uniswapFindAllPairHourDataUsecaseProvider,
} from './uniswap.module.config';
import { UploadPairHourDataHandler } from './infrastructure/handlers/upload.pair.hour.data.handler';
import { FindAllPairHourDataDashboardHandler } from './infrastructure/handlers/find.all.pair.hour.data.dashboard.handler';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadPairHourDataHandler, FindAllPairHourDataDashboardHandler],
  providers: [
    pairHourDataRepositoryTokeProvider,
    uniswapServiceProvider,
    uniswapUploadPairHourDataUsecaseProvider,
    pairHourDataRepositoryProvider,
    uniswapFindAllPairHourDataUsecaseProvider,
  ],
})
export class UniswapModule {}
