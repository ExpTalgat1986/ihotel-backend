import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemSettingEntity } from '../../common/entities/system-setting.entity';
import { SystemSettingsController } from './system-settings.controller';
import { SystemSettingsService } from './system-settings.service';

@Module({
  providers: [SystemSettingsService],
  imports: [TypeOrmModule.forFeature([SystemSettingEntity])],
  controllers: [SystemSettingsController],
})
export class SystemSettingsModule {}
