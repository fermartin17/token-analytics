import { DataSource } from 'typeorm';
import { PairHourDataEntity } from './infrastructure/persistence/entities/pair.hour.data.entity';
import { UniswapServiceImpl } from './service/uniswap.service';
import { UploadPairHourDataUsecase } from './application/usecase/upload.pair.hour.data.usecase';
import { PairHourDataPostgresqlRepository } from './infrastructure/persistence/pair.hour.data.postgresql.repository';

export const pairHourDataRepositoryTokeProvider = {
  inject: ['DATA_SOURCE'],
  provide: 'PAIR_HOUR_DATA_REPOSITORY_POSTGRESQL',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(PairHourDataEntity),
};

export const uniswapServiceProvider = {
  provide: 'UNISWAP_SERVICE',
  useClass: UniswapServiceImpl,
};

export const uniswapUploadPairHourDataUsecaseProvider = {
  provide: 'UNISWAP_UPLOAD_PAIR_HOUR_DATA_USECASE',
  useClass: UploadPairHourDataUsecase,
};

export const pairHourDataRepositoryProvider = {
  provide: 'PAIR_HOUR_DATA_REPOSITORY',
  useClass: PairHourDataPostgresqlRepository,
};
