import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemSettingEntity } from '../../common/entities/system-setting.entity';
import { Repository } from 'typeorm';
import { SetSystemSettingsDto } from './dto/set-system-settings.dto';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { ChangeSystemSettingsDto } from './dto/change-system-settings.dto';

@Injectable()
export class SystemSettingsService {
  constructor(
    @InjectRepository(SystemSettingEntity) private readonly systemSettingsRepo: Repository<SystemSettingEntity>,
  ) {}

  async getSystemSettings() {
    return await this.systemSettingsRepo.findOne();
  }

  async changeSystemSettings(
    image: Express.Multer.File,
    changeSystemSettingsDto: ChangeSystemSettingsDto,
    savedImgFolder: string,
  ) {
    const systemSettings = await this.systemSettingsRepo.findOne();
    if (!systemSettings) {
      throw new HttpException('Системные настройки еще не созданы, необходимо сначала создать', HttpStatus.BAD_REQUEST);
    }

    if (image && image.size) {
      systemSettings.main_logo_url = `${savedImgFolder}/${image.filename}`;
    }

    Object.keys(changeSystemSettingsDto).forEach((key: string) => {
      systemSettings[key] = changeSystemSettingsDto[key];
    });

    return await this.systemSettingsRepo.save(systemSettings);
  }

  async setSystemSettings(
    image: Express.Multer.File,
    setSystemSettingsDto: SetSystemSettingsDto,
    savedImgFolder: string,
  ) {
    checkIsFileNotEmpty(image);
    const isSystemSettingsAlreadyCreated = await this.systemSettingsRepo.count();
    if (isSystemSettingsAlreadyCreated) {
      throw new HttpException('Системные настройки уже были заданы', HttpStatus.BAD_REQUEST);
    }

    return await this.systemSettingsRepo.save({
      ...setSystemSettingsDto,
      main_logo_url: `${savedImgFolder}/${image.filename}`,
    });
  }
}
