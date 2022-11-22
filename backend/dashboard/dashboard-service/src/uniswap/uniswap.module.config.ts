import { DataSource } from 'typeorm';
import { PairHourDataEntity } from './infrastructure/persistence/entities/pair.hour.data.entity';
import { UniswapV2ServiceImpl } from './service/uniswap.v2.service';
import { UploadPairHourDataUsecase } from './application/usecase/upload.pair.hour.data.usecase';
import { PairHourDataPostgresqlRepository } from './infrastructure/persistence/pair.hour.data.postgresql.repository';
import { FindAllPairHourDataUsecase } from "./application/usecase/find.all.pair.hour.data.usecase";

export const pairHourDataRepositoryTokeProvider = {
  inject: ['DATA_SOURCE'],
  provide: 'PAIR_HOUR_DATA_REPOSITORY_POSTGRESQL',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(PairHourDataEntity),
};

export const uniswapServiceProvider = {
  provide: 'UNISWAP_SERVICE',
  useClass: UniswapV2ServiceImpl,
};

export const uniswapUploadPairHourDataUsecaseProvider = {
  provide: 'UNISWAP_UPLOAD_PAIR_HOUR_DATA_USECASE',
  useClass: UploadPairHourDataUsecase,
};

export const pairHourDataRepositoryProvider = {
  provide: 'PAIR_HOUR_DATA_REPOSITORY',
  useClass: PairHourDataPostgresqlRepository,
};

export const uniswapFindAllPairHourDataUsecaseProvider = {
  provide: 'UNISWAP_FIND_ALL_PAIR_HOUR_DATA_USECASE',
  useClass: FindAllPairHourDataUsecase,
};
