import { PairHourDataApr } from '../../uniswap/domain/pairHourData/pair.hour.data.apr';
import { PairHourData } from '../../uniswap/domain/pairHourData/pair.hour.data';

export class FinancialCalculations {
  static apr(volume: number, liquidity: number, fee: number): PairHourDataApr {
    return {
      date: new Date(),
      value: '0',
    };
  }
}
