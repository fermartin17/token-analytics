import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FindAllPairHourDataQueryParam } from './req/find.all.pair.hour.data.query.param';
import { FindAllPairHourDataParam } from './req/find.all.pair.hour.data.param';
import { FindAllPairHourDataCommand } from '../../application/command/find.all.pair.hour.data.command';
import { FindAllPairHourDataUsecase } from '../../application/usecase/find.all.pair.hour.data.usecase';
import { PairHourDataApr } from '../../domain/pairHourData/pair.hour.data.apr';
import { FindAllPairHourDataPresenterDto } from './dto/find.all.pair.hour.data.presenter.dto';

@Controller('uniswap')
export class FindAllPairHourDataDashboardHandler {
  private readonly useCase: FindAllPairHourDataUsecase;

  constructor(
    @Inject('UNISWAP_FIND_ALL_PAIR_HOUR_DATA_USECASE')
    useCase: FindAllPairHourDataUsecase,
  ) {
    this.useCase = useCase;
  }

  @Get('pair-hour-datas/pairs/:pairId')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Res() res: Response,
    @Param() findAllPairHourDataParam: FindAllPairHourDataParam,
    @Query() findAllPairHourDataQueryParam: FindAllPairHourDataQueryParam,
  ) {
    const command: FindAllPairHourDataCommand =
      FindAllPairHourDataDashboardHandler.buildCommandFromParams(
        findAllPairHourDataParam,
        findAllPairHourDataQueryParam,
      );

    console.log('command', command);
    try {
      const pairHourDataApr: PairHourDataApr[] = await this.useCase.execute(
        command,
      );

      const findAllPairHourDataPresenterDto: FindAllPairHourDataPresenterDto[] =
        pairHourDataApr.map((elem) => {
          return { ...elem };
        });

      return res.send(findAllPairHourDataPresenterDto);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  static buildCommandFromParams(
    findAllPairHourDataParam: FindAllPairHourDataParam,
    findAllPairHourDataQueryParam: FindAllPairHourDataQueryParam,
  ): FindAllPairHourDataCommand {
    return {
      ...findAllPairHourDataParam,
      hourAverage: parseInt(findAllPairHourDataQueryParam.hour_average),
    };
  }
}
