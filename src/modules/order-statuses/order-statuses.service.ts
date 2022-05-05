import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersStatusEntity } from '../../common/entities/orders-status.entity';
import { Repository } from 'typeorm';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';

@Injectable()
export class OrderStatusesService {
  constructor(
    @InjectRepository(OrdersStatusEntity) private readonly orderStatusesRepo: Repository<OrdersStatusEntity>,
  ) {}

  async getAllStatuses() {
    return this.orderStatusesRepo.find();
  }

  async createOrderStatus(createOrderStatus: CreateOrderStatusDto) {
    const orderStatus = this.orderStatusesRepo.create({ title: createOrderStatus.title });
    return await this.orderStatusesRepo.save(orderStatus);
  }

  async changeOrderStatus(createOrderStatus: CreateOrderStatusDto, id: string) {
    const orderStatus = await this.orderStatusesRepo.findOne(id);
    if (!orderStatus) throw new NotFoundException();
    orderStatus.title = createOrderStatus.title;
    return await this.orderStatusesRepo.save(orderStatus);
  }

  async deleteOrderStatus(id: string) {
    await this.orderStatusesRepo.delete(id);
    return true;
  }
}
