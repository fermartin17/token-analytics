import { PairHourDataApr } from '../../uniswap/domain/pairHourData/pair.hour.data.apr';

export class FinancialCalculations {
  static apr(reserve: number, fee: number, date: Date): PairHourDataApr {
    const yearInHours: number = 365 * 24;
    const ratePercentage: number = fee / reserve;

    const apr: number = ratePercentage * yearInHours;

    return {
      date: date,
      value: apr,
    };
  }
}
