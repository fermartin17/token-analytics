export interface PairHourDataFields {
  id: number;
  pairId: string;
  hourStartUnix: number;
  hourlyVolumeUSD: number;
  reserveUSD: number;
  feeUSD: number;
  pairDataDate: Date;
}
