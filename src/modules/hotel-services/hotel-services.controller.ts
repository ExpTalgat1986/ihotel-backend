import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HotelServicesService } from './hotel-services.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions, HOTEL_SERVICE_IMG_PATH } from '../../utils/file-upload.utils';
import { CreateHotelServiceDto } from './dto/create-hotel-service.dto';
import { ChangeHotelServiceDto } from './dto/change-hotel-service.dto';

@Controller('hotel-services')
export class HotelServicesController {
  constructor(private readonly hotelServicesService: HotelServicesService) {}

  @Get()
  getHotelServices() {
    return this.hotelServicesService.getAllHotelServices();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(HOTEL_SERVICE_IMG_PATH)))
  createFood(@UploadedFile() file: Express.Multer.File, @Body() createHs: CreateHotelServiceDto) {
    return this.hotelServicesService.createHotelService(file, createHs, HOTEL_SERVICE_IMG_PATH);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions(HOTEL_SERVICE_IMG_PATH)))
  changeFood(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() changeHs: ChangeHotelServiceDto,
  ) {
    return this.hotelServicesService.changeHs(id, file, changeHs, HOTEL_SERVICE_IMG_PATH);
  }

  @Delete(':id')
  deleteFood(@Param('id') id: string) {
    return this.hotelServicesService.deleteHs(id);
  }
}
