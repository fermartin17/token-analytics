import { UseCase } from '../../../shared/usecase.interface';
import { UploadPairHourDataCommand } from '../command/upload.pair.hour.data.command';
import { Inject, Injectable } from '@nestjs/common';
import { UniswapService } from '../../domain/uniswap.service.interface';
import { PairHourDataRepository } from '../../domain/pairHourData/pair.hour.data.repository';
import { PairHourDataFetch } from '../../domain/pairHourData/pair.hour.data.fetch';
import { CreatePairHourDataDto } from '../../domain/pairHourData/create.pair.hour.data.dto';
import { PairHourData } from '../../domain/pairHourData/pair.hour.data';

@Injectable()
export class UploadPairHourDataUsecase
  implements UseCase<UploadPairHourDataCommand, void>
{
  private readonly uniswapService: UniswapService;
  private readonly pairHourDataRepository: PairHourDataRepository;

  private static readonly HOURS_BEFORE: number = 48;

  constructor(
    @Inject('UNISWAP_SERVICE') uniswapService: UniswapService,
    @Inject('PAIR_HOUR_DATA_REPOSITORY')
    pairHourDataRepository: PairHourDataRepository,
  ) {
    this.uniswapService = uniswapService;
    this.pairHourDataRepository = pairHourDataRepository;
  }

  async execute(command: UploadPairHourDataCommand): Promise<void> {
    try {
      const pairHourDatas: PairHourDataFetch[] =
        await this.uniswapService.getPairHourDataByPairIdAndFromWhen(
          command.pairId,
          UploadPairHourDataUsecase.calculateEpochFromDate(),
        );

      let pairHourDataToBeCreated: CreatePairHourDataDto;

      for (const pairHourData of pairHourDatas) {
        pairHourDataToBeCreated = {
          ...pairHourData,
          pairId: command.pairId,
          pairDataDate: UploadPairHourDataUsecase.calculateDateFromEpoch(
            pairHourData.hourStartUnix,
          ),
          feeUSD: PairHourData.generateFee(),
        };

        await this.pairHourDataRepository.create(pairHourDataToBeCreated);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  static calculateEpochFromDate(): number {
    const currentDate: Date = new Date();
    currentDate.setHours(
      currentDate.getHours() - UploadPairHourDataUsecase.HOURS_BEFORE,
    );
    return Math.round(currentDate.getTime() / 1000);
  }

  static calculateDateFromEpoch(epoch: number): Date {
    return new Date(epoch * 1000);
  }
}
