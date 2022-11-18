import { CreatePairHourDataDto } from './create.pair.hour.data.dto';
import { PairHourData } from './pair.hour.data';

export interface PairHourDataRepository {
  create(createPairHourDataDto: CreatePairHourDataDto): Promise<PairHourData>;
  findNewestPairHourDataByPairId(pairId: string): Promise<PairHourData>;
}
