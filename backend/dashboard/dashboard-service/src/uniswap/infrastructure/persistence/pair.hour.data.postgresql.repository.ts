import { Inject, Injectable } from '@nestjs/common';
import { PairHourDataEntity } from './entities/pair.hour.data.entity';
import { Repository } from 'typeorm';
import { PairHourData } from '../../domain/pairHourData/pair.hour.data';
import { CreatePairHourDataDto } from '../../domain/pairHourData/create.pair.hour.data.dto';
import { PairHourDataRepository } from '../../domain/pairHourData/pair.hour.data.repository';
import { FailToCreatePairHourDataError } from '../../errors/fail.to.create.pair.hour.data.error';
import { FailToObtainPairHourDataError } from '../../errors/fail.to.obtain.pair.hour.data.error';
import { FailToGetPairHourDatasError } from '../../errors/fail.to.get.pair.hour.datas.error';

@Injectable()
export class PairHourDataPostgresqlRepository
  implements PairHourDataRepository
{
  private readonly repository: Repository<PairHourDataEntity>;

  constructor(
    @Inject('PAIR_HOUR_DATA_REPOSITORY_POSTGRESQL')
    repository: Repository<PairHourDataEntity>,
  ) {
    this.repository = repository;
  }

  async create(
    createPairHourDataDto: CreatePairHourDataDto,
  ): Promise<PairHourData> {
    const entityToBeCreated: PairHourDataEntity = PairHourDataEntity.create(
      createPairHourDataDto,
    );

    try {
      const pairHourDataEntity: PairHourDataEntity = await this.repository.save(
        entityToBeCreated,
      );
      return pairHourDataEntity.toDomainModel();
    } catch (error: unknown) {
      throw new FailToCreatePairHourDataError();
    }
  }

  async findNewestPairHourDataByPairId(pairId: string): Promise<PairHourData> {
    try {
      const newestPairHourData = await this.repository
        .createQueryBuilder()
        .where('pair_id = :pairId', { pairId: pairId })
        .orderBy('hour_start_unix', 'DESC')
        .limit(1)
        .getOne();

      return newestPairHourData ? newestPairHourData.toDomainModel() : null;
    } catch (error: unknown) {
      throw new FailToObtainPairHourDataError();
    }
  }

  async findAllPairHourData(
    pairId: string,
    limit: number,
  ): Promise<PairHourData[]> {
    try {
      const pairHourDatas = await this.repository
        .createQueryBuilder()
        .where('pair_id = :pairId', { pairId: pairId })
        .orderBy('hour_start_unix', 'DESC')
        .limit(limit)
        .getMany();

      return pairHourDatas.map((elem) => elem.toDomainModel());
    } catch (error: unknown) {
      throw new FailToGetPairHourDatasError();
    }
  }
}
