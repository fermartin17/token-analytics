import { Inject, Injectable } from '@nestjs/common';
import { PairHourDataEntity } from './entities/pair.hour.data.entity';
import { Repository } from 'typeorm';
import { PairHourData } from '../../domain/pairHourData/pair.hour.data';
import { CreatePairHourDataDto } from '../../domain/pairHourData/create.pair.hour.data.dto';
import { PairHourDataRepository } from '../../domain/pairHourData/pair.hour.data.repository';

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
    } catch (error: any) {
      console.log(error);
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
      console.log(error);
    }
  }
}
