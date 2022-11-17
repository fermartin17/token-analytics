import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {
  uniswapServiceProvider,
  pairHourDataRepositoryTokeProvider,
  uniswapUploadPairHourDataUsecaseProvider,
  pairHourDataRepositoryProvider,
} from './uniswap.module.config';
import { UploadPairHourDataHandler } from './infrastructure/handlers/upload.pair.hour.data.handler';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadPairHourDataHandler],
  providers: [
    pairHourDataRepositoryTokeProvider,
    uniswapServiceProvider,
    uniswapUploadPairHourDataUsecaseProvider,
    pairHourDataRepositoryProvider,
  ],
})
export class UniswapModule {}
