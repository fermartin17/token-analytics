export interface CreatePairHourDataDto {
  id?: number;
  pairId: string;
  hourStartUnix: number;
  hourlyVolumeUSD: number;
  reserveUSD: number;
  feeUSD: number;
  pairDataDate: Date;
}
