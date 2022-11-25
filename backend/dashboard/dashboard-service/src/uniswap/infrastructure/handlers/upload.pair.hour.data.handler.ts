import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UploadPairHourDataUsecase } from '../../application/usecase/upload.pair.hour.data.usecase';
import { UploadPairHourDataDto } from './dto/upload.pair.hour.data.dto';
import { UploadPairHourDataCommand } from '../../application/command/upload.pair.hour.data.command';
import { FailToCreatePairHourDataError } from '../../errors/fail.to.create.pair.hour.data.error';

@Controller('uniswap')
export class UploadPairHourDataHandler {
  private readonly useCase: UploadPairHourDataUsecase;

  constructor(
    @Inject('UNISWAP_UPLOAD_PAIR_HOUR_DATA_USECASE')
    useCase: UploadPairHourDataUsecase,
  ) {
    this.useCase = useCase;
  }

  @Post('pair-hour-datas')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Res() res: Response,
    @Body() uploadPairHourDataDto: UploadPairHourDataDto,
  ) {
    const command: UploadPairHourDataCommand =
      UploadPairHourDataHandler.buildCommandFromDto(uploadPairHourDataDto);

    try {
      await this.useCase.execute(command);
      return res.send();
    } catch (error: unknown) {
      if (error instanceof FailToCreatePairHourDataError) {
        return res.status(500).send();
      }
    }
  }

  static buildCommandFromDto(
    uploadPairHourDataDto: UploadPairHourDataDto,
  ): UploadPairHourDataCommand {
    return {
      ...uploadPairHourDataDto,
    };
  }
}
