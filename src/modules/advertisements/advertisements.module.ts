import { Module } from '@nestjs/common';
import { AdvertisementsController } from './advertisements.controller';
import { AdvertisementsService } from './advertisements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisingBannerEntity } from '../../common/entities/advertising-banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisingBannerEntity])],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
})
export class AdvertisementsModule {}
