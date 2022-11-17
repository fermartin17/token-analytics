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

  @Column({ name: 'fee_usd', nullable: true })
  feeUSD: number;

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
    entity.feeUSD = pairHourDataToBeCreated.feeUSD;
    entity.pairDataDate = pairHourDataToBeCreated.pairDataDate;

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
      feeUSD: this.feeUSD,
    });
  }
}
