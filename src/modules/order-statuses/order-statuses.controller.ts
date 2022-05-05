import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderStatusesService } from './order-statuses.service';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';

@Controller('order-statuses')
export class OrderStatusesController {
  constructor(private readonly orderStatusesService: OrderStatusesService) {}

  @Get()
  getAllStatuses() {
    return this.orderStatusesService.getAllStatuses();
  }

  @Post()
  createOrderStatus(@Body() createOrderStatus: CreateOrderStatusDto) {
    return this.orderStatusesService.createOrderStatus(createOrderStatus);
  }

  @Put(':id')
  changeOrderStatus(@Body() createOrderStatus: CreateOrderStatusDto, @Param('id') id: string) {
    return this.orderStatusesService.changeOrderStatus(createOrderStatus, id);
  }

  @Delete(':id')
  deleteOrderStatus(@Param('id') id: string) {
    return this.orderStatusesService.deleteOrderStatus(id);
  }
}
