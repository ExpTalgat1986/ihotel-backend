import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ChangeOrderDto } from './dto/change-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('unhandled')
  getUnhandledOrdersCount() {
    return this.ordersService.getUnhandledOrdersCount();
  }

  @Get()
  getAllOrders(@Query('page') page: string) {
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

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
