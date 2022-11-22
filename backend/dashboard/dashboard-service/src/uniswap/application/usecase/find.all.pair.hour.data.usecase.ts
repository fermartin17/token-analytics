import { FindAllPairHourDataCommand } from '../command/find.all.pair.hour.data.command';
import { UseCase } from '../../../shared/usecase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PairHourDataRepository } from '../../domain/pairHourData/pair.hour.data.repository';
import { PairHourDataApr } from '../../domain/pairHourData/pair.hour.data.apr';
import { PairHourData } from '../../domain/pairHourData/pair.hour.data';
import { FinancialCalculations } from '../../../shared/utils/financial.calculations';

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

      const pairHourDataAverages: AprParams[] = [];

      let volumeUsdAverage: number;
      let reserveUsdAverage: number;
      let feeUsdAverage: number;

      for (
        let i = 0;
        i < FindAllPairHourDataUsecase.HOURS_BEFORE;
        i += findAllPairHourDataCommand.hourAverage
      ) {
        volumeUsdAverage = 0;
        reserveUsdAverage = 0;
        feeUsdAverage = 0;

        for (let z = 0; z < pairHourDatas.length; z++) {
          volumeUsdAverage += pairHourDatas[i + z].hourlyVolumeUSD;
          reserveUsdAverage += pairHourDatas[i + z].reserveUSD;
          feeUsdAverage += pairHourDatas[i + z].feeUSD;
        }
        pairHourDataAverages.push({
          volumeUsdAverage:
            volumeUsdAverage / findAllPairHourDataCommand.hourAverage,
          reserveUsdAverage:
            reserveUsdAverage / findAllPairHourDataCommand.hourAverage,
          feeUsdAverage: feeUsdAverage / findAllPairHourDataCommand.hourAverage,
        });
      }

      return pairHourDataAverages.map((elem) =>
        FinancialCalculations.apr(
          elem.volumeUsdAverage,
          elem.reserveUsdAverage,
          elem.feeUsdAverage,
        ),
      );
    } catch (error: unknown) {
      console.log(error);
    }
  }
}

type AprParams = {
  volumeUsdAverage: number;
  reserveUsdAverage: number;
  feeUsdAverage: number;
};
