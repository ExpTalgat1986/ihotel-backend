import { Module } from '@nestjs/common';
import { HotelServicesController } from './hotel-services.controller';
import { HotelServicesService } from './hotel-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelServiceEntity } from '../../common/entities/hotel-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelServiceEntity])],
  controllers: [HotelServicesController],
  providers: [HotelServicesService],
})
export class HotelServicesModule {}
