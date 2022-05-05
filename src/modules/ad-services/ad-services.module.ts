import { Module } from '@nestjs/common';
import { AdServicesService } from './ad-services.service';
import { AdServicesController } from './ad-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalServiceEntity } from '../../common/entities/additional-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalServiceEntity])],
  providers: [AdServicesService],
  controllers: [AdServicesController],
})
export class AdServicesModule {}
