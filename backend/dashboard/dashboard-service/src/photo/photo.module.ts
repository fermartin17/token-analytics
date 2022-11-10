import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {
  photoRepositoryProvider,
  photoRepositoryTokeProvider,
} from './photo.module.config';
import { PhotoController } from './photo.handler';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [photoRepositoryTokeProvider, photoRepositoryProvider],
})
export class PhotoModule {}
