import { PairHourDataFields } from './pair.hour.data.interface';

export type PairHourDataParams = PairHourDataFields;

export class PairHourData implements PairHourDataFields {
  private _id: number;
  private _pairId: string;
  private _hourStartUnix: number;
  private _hourlyVolumeUSD: number;
  private _reserveUSD: number;
  private _feeUSD: number;
  private _reserve0: number;
  private _reserve1: number;
  private _pairDataDate: Date;

  constructor(pairHourDataParams: PairHourDataParams) {
    this._id = pairHourDataParams.id;
    this._pairId = pairHourDataParams.pairId;
    this._pairDataDate = pairHourDataParams.pairDataDate;
    this._hourlyVolumeUSD = pairHourDataParams.hourlyVolumeUSD;
    this._reserveUSD = pairHourDataParams.reserveUSD;
    this._feeUSD = pairHourDataParams.feeUSD;
    this._hourStartUnix = pairHourDataParams.hourStartUnix;
    this._reserve0 = pairHourDataParams.reserve0;
    this._reserve1 = pairHourDataParams.reserve1;
  }

  get id(): number {
    return this._id;
  }

  get pairId(): string {
    return this._pairId;
  }

  get hourStartUnix(): number {
    return this._hourStartUnix;
  }

  get hourlyVolumeUSD(): number {
    return this._hourlyVolumeUSD;
  }

  get reserveUSD(): number {
    return this._reserveUSD;
  }

  get feeUSD(): number {
    return this._feeUSD;
  }

  get pairDataDate(): Date {
    return this._pairDataDate;
  }

  get reserve0(): number {
    return this._reserve0;
  }

  get reserve1(): number {
    return this._reserve1;
  }

  static generateFee(volume: number): number {
    const feePercentageUniswap = 0.3;
    const volumeWithoutFeeDiscountTotalPercentage = 100;

    return (
      volume *
      (volumeWithoutFeeDiscountTotalPercentage /
        (volumeWithoutFeeDiscountTotalPercentage - feePercentageUniswap) -
        1)
    );
  }
}
