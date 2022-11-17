import { PairHourDataFetch } from './pairHourData/pair.hour.data.fetch';

export interface UniswapService {
  getPairHourDataByPairIdAndFromWhen(
    pairId: string,
    dateFrom: number,
  ): Promise<PairHourDataFetch[]>;
}
