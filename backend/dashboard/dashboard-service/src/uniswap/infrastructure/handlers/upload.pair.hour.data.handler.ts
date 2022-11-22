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
  @HttpCode(HttpStatus.OK)
  async create(
    @Res() res: Response,
    @Body() uploadPairHourDataDto: UploadPairHourDataDto,
  ) {
    const command: UploadPairHourDataCommand =
      UploadPairHourDataHandler.buildCommandFromDto(uploadPairHourDataDto);

    console.log('command', command);
    try {
      await this.useCase.execute(command);
      return res.setHeader('resource-id', 1111).send();
    } catch (error: unknown) {
      console.log(error);
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
