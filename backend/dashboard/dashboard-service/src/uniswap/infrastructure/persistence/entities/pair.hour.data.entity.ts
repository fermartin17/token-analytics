import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PairHourData } from '../../../domain/pairHourData/pair.hour.data';
import { CreatePairHourDataDto } from '../../../domain/pairHourData/create.pair.hour.data.dto';

@Entity({ name: 'pair_hour_data' })
export class PairHourDataEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'pair_id', nullable: false })
  pairId: string;

  @Column({ name: 'hour_start_unix', nullable: false })
  hourStartUnix: number;

  @Column({ name: 'hourly_volume_usd', nullable: false })
  hourlyVolumeUSD: string;

  @Column({ name: 'reserve_usd', nullable: false })
  reserveUSD: string;

  @Column({ name: 'fee_usd', nullable: false })
  feeUSD: string;

  @Column({ name: 'reserve_0', nullable: false })
  reserve0: string;

  @Column({ name: 'reserve_1', nullable: false })
  reserve1: string;

  @Column({ name: 'pair_data_date', nullable: false })
  pairDataDate: Date;

  static create(
    pairHourDataToBeCreated: CreatePairHourDataDto,
  ): PairHourDataEntity {
    const entity = new this();

    entity.pairId = pairHourDataToBeCreated.pairId;
    entity.hourlyVolumeUSD = pairHourDataToBeCreated.hourlyVolumeUSD.toString();
    entity.hourStartUnix = pairHourDataToBeCreated.hourStartUnix;
    entity.reserveUSD = pairHourDataToBeCreated.reserveUSD.toString();
    entity.feeUSD = pairHourDataToBeCreated.feeUSD.toString();
    entity.pairDataDate = pairHourDataToBeCreated.pairDataDate;
    entity.reserve0 = pairHourDataToBeCreated.reserve0.toString();
    entity.reserve1 = pairHourDataToBeCreated.reserve1.toString();

    return entity;
  }

  toDomainModel(): PairHourData {
    return new PairHourData({
      id: this.id,
      pairId: this.pairId,
      pairDataDate: this.pairDataDate,
      hourStartUnix: this.hourStartUnix,
      hourlyVolumeUSD: parseInt(this.hourlyVolumeUSD),
      reserveUSD: parseInt(this.reserveUSD),
      reserve0: parseInt(this.reserve0),
      reserve1: parseInt(this.reserve1),
      feeUSD: parseInt(this.feeUSD),
    });
  }
}
