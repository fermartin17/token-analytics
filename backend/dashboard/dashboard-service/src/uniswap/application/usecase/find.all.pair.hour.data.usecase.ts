import { FindAllPairHourDataCommand } from '../command/find.all.pair.hour.data.command';
import { UseCase } from '../../../shared/usecase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PairHourDataRepository } from '../../domain/pairHourData/pair.hour.data.repository';
import { PairHourDataApr } from '../../domain/pairHourData/pair.hour.data.apr';
import { PairHourData } from '../../domain/pairHourData/pair.hour.data';
import { FinancialCalculations } from '../../../shared/utils/financial.calculations';
import { FailToGetPairHourDatasError } from '../../errors/fail.to.get.pair.hour.datas.error';

@Injectable()
export class FindAllPairHourDataUsecase
  implements UseCase<FindAllPairHourDataCommand, PairHourDataApr[]>
{
  private readonly pairHourDataRepository: PairHourDataRepository;

  private static readonly HOURS_BEFORE: number = 48;

  constructor(
    @Inject('PAIR_HOUR_DATA_REPOSITORY')
    pairHourDataRepository: PairHourDataRepository,
  ) {
    this.pairHourDataRepository = pairHourDataRepository;
  }

  async execute(
    findAllPairHourDataCommand: FindAllPairHourDataCommand,
  ): Promise<PairHourDataApr[]> {
    try {
      let pairHourDatas: PairHourData[] =
        await this.pairHourDataRepository.findAllPairHourData(
          findAllPairHourDataCommand.pairId,
          FindAllPairHourDataUsecase.HOURS_BEFORE,
        );

      pairHourDatas = pairHourDatas.reverse();

      return this.generatePairHourDataApr(
        pairHourDatas,
        findAllPairHourDataCommand.hourAverage,
      );
    } catch (error: unknown) {
      throw new FailToGetPairHourDatasError();
    }
  }

  private generatePairHourDataApr(
    pairHourDatas: PairHourData[],
    hourAverage: number,
  ): PairHourDataApr[] {
    const pairHourDataAverages: AprParams[] = [];

    let volumeUsdAverage: number;
    let reserveUsdAverage: number;
    let feeUsdAverage: number;

    for (
      let i = 0;
      i < pairHourDatas.length && i < FindAllPairHourDataUsecase.HOURS_BEFORE;
      i += hourAverage
    ) {
      volumeUsdAverage = 0;
      reserveUsdAverage = 0;
      feeUsdAverage = 0;

      let lastDate: Date;

      for (let z = 0; z < hourAverage && pairHourDatas[i + z]; z++) {
        volumeUsdAverage += pairHourDatas[i + z].hourlyVolumeUSD;
        reserveUsdAverage += pairHourDatas[i + z].reserveUSD;
        feeUsdAverage += pairHourDatas[i + z].feeUSD;
        lastDate = pairHourDatas[i + z].pairDataDate;
      }
      pairHourDataAverages.push({
        volumeUsdAverage: volumeUsdAverage / hourAverage,
        reserveUsdAverage: reserveUsdAverage / hourAverage,
        feeUsdAverage: feeUsdAverage / hourAverage,
        date: lastDate,
      });
    }

    return pairHourDataAverages.map((elem) =>
      FinancialCalculations.apr(
        elem.reserveUsdAverage,
        elem.feeUsdAverage,
        elem.date,
      ),
    );
  }
}

type AprParams = {
  volumeUsdAverage: number;
  reserveUsdAverage: number;
  feeUsdAverage: number;
  date: Date;
};
