import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ChangeOrderDto } from './dto/change-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAllOrders(@Param('page') page: string) {
    return this.ordersService.getAllOrders(page);
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Put(':id')
  changeOrderData(@Param('id') id: string, @Body() changeOrderDto: ChangeOrderDto) {
    return this.ordersService.changeOrder(id, changeOrderDto);
  }
}
