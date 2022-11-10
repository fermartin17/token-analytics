import { Controller, Get, Inject } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  private readonly photoService: PhotoService;

  constructor(@Inject('PHOTO_SERVICE') photoService: PhotoService) {
    this.photoService = photoService;
  }

  @Get()
  public async getAll() {
    return await this.photoService.findAll();
  }
}
