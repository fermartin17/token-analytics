import { DataSource } from 'typeorm';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

export const photoRepositoryTokeProvider = {
  inject: ['DATA_SOURCE'],
  provide: 'PHOTO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
};

export const photoRepositoryProvider = {
  provide: 'PHOTO_SERVICE',
  useClass: PhotoService,
};
