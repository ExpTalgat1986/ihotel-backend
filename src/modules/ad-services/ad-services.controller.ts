import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AD_SERVICE_IMG_PATH, createMulterOptions } from '../../utils/file-upload.utils';
import { AdServicesService } from './ad-services.service';
import { CreateAdServiceDto } from './dto/create-ad-service.dto';
import { ChangeAdServiceDto } from './dto/change-ad-service.dto';

@Controller('ad-services')
export class AdServicesController {
  constructor(private readonly adServicesService: AdServicesService) {}

  @Get()
  getFoodsList() {
    return this.adServicesService.getAdServices();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(AD_SERVICE_IMG_PATH)))
  createFood(@UploadedFile() file: Express.Multer.File, @Body() createAdServiceDto: CreateAdServiceDto) {
    return this.adServicesService.createAdService(file, createAdServiceDto, AD_SERVICE_IMG_PATH);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions(AD_SERVICE_IMG_PATH)))
  changeFood(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() changeAdServiceDto: ChangeAdServiceDto,
  ) {
    return this.adServicesService.changeAdService(id, file, changeAdServiceDto, AD_SERVICE_IMG_PATH);
  }

  @Delete(':id')
  deleteFood(@Param('id') id: string) {
    return this.adServicesService.deleteAdService(id);
  }
}
