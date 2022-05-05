import { Module } from '@nestjs/common';
import { OrderStatusesService } from './order-statuses.service';
import { OrderStatusesController } from './order-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersStatusEntity } from '../../common/entities/orders-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersStatusEntity])],
  providers: [OrderStatusesService],
  controllers: [OrderStatusesController],
})
export class OrderStatusesModule {}
