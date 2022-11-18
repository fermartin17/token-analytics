import { IsString, Length } from '@nestjs/class-validator';

export class UploadPairHourDataDto {
  @IsString()
  @Length(42, 42)
  pairId: string;
}
