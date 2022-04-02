import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../common/entities/order.entity';
import { Repository } from 'typeorm';
import { defaultPerPage, getPaginatedData } from '../../utils/pagination.util';
import { CreateOrderDto } from './dto/create-order.dto';
import { ChangeOrderDto } from './dto/change-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderEntity) private readonly ordersRepo: Repository<OrderEntity>) {}

  async getAllOrders(page: string) {
    const query = this.ordersRepo
      .createQueryBuilder('orders')
      .leftJoin('orders_statuses', 'order_status', '"order_status".id = "orders".order_status_id');
    return await getPaginatedData(query, page, defaultPerPage);
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const orderedProductsList = createOrderDto.order_list;
    if (!orderedProductsList.length) {
      throw new HttpException('Список заказа не может быть пустым', HttpStatus.BAD_REQUEST);
    }
    const totalSum = orderedProductsList.reduce((accumulate, order) => accumulate + order.price * order.quantity, 0);
    const order = this.ordersRepo.create({ ...createOrderDto, total_sum: totalSum });
    return await this.ordersRepo.save(order);
  }

  async changeOrder(id: string, changeOrderDto: ChangeOrderDto) {
    const order = await this.ordersRepo.findOne(id);
    if (!order) {
      throw new HttpException('Заказ с таким ID не существует в базе', HttpStatus.BAD_REQUEST);
    }

    Object.keys(changeOrderDto).forEach((key: string) => {
      order[key] = changeOrderDto[key];
    });

    return await this.ordersRepo.save(order);
  }

  async deleteOrder(id: string) {
    await this.ordersRepo.delete(id);
    return true;
  }
}
