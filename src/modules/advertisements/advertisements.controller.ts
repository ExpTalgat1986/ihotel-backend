import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ADVERTISEMENT_BANNER_IMG_PATH, createMulterOptions } from '../../utils/file-upload.utils';
import { CreateAdDto } from './dto/create-ad.dto';
import { ChangeAdDto } from './dto/change-ad.dto';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly adService: AdvertisementsService) {}

  @Get()
  getAllAds() {
    return this.adService.getAllAds();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(ADVERTISEMENT_BANNER_IMG_PATH)))
  createAd(@UploadedFile() file: Express.Multer.File, @Body() createAdDto: CreateAdDto) {
    return this.adService.createAd(file, createAdDto, ADVERTISEMENT_BANNER_IMG_PATH);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions(ADVERTISEMENT_BANNER_IMG_PATH)))
  changeAd(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() changeAdDto: ChangeAdDto) {
    return this.adService.changeAd(id, file, changeAdDto, ADVERTISEMENT_BANNER_IMG_PATH);
  }

  @Delete(':id')
  deleteAd(@Param('id') id: string) {
    return this.adService.deleteAd(id);
  }
}
