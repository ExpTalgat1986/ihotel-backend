import { Body, Controller, Get, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SystemSettingsService } from './system-settings.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions, MAIN_LOGO_IMAGE_PATH } from '../../utils/file-upload.utils';
import { SetSystemSettingsDto } from './dto/set-system-settings.dto';
import { ChangeSystemSettingsDto } from './dto/change-system-settings.dto';

@Controller('system-settings')
export class SystemSettingsController {
  constructor(private readonly systemSettingsService: SystemSettingsService) {}

  @Get()
  getSystemSettings() {
    return this.systemSettingsService.getSystemSettings();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(MAIN_LOGO_IMAGE_PATH)))
  setSystemSettings(@UploadedFile() file: Express.Multer.File, @Body() setSystemSettingsDto: SetSystemSettingsDto) {
    return this.systemSettingsService.setSystemSettings(file, setSystemSettingsDto, MAIN_LOGO_IMAGE_PATH);
  }

  @Put()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(MAIN_LOGO_IMAGE_PATH)))
  changeSystemSettings(
    @UploadedFile() file: Express.Multer.File,
    @Body() changeSystemSettingsDto: ChangeSystemSettingsDto,
  ) {
    return this.systemSettingsService.changeSystemSettings(file, changeSystemSettingsDto, MAIN_LOGO_IMAGE_PATH);
  }
}
