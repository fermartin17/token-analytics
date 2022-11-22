export interface PairHourDataFields {
  id: number;
  pairId: string;
  hourStartUnix: number;
  hourlyVolumeUSD: number;
  reserveUSD: number;
  reserve0: number;
  reserve1: number;
  feeUSD: number;
  pairDataDate: Date;
}
