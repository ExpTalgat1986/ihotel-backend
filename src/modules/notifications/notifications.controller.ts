import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ChangeNotificationDto } from './dto/change-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getAllNotifications() {
    return this.notificationsService.getAllNotifications();
  }

  @Post()
  createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Put(':id')
  changeNotification(@Param('id') id: string, @Body() changeNotificationDto: ChangeNotificationDto) {
    return this.notificationsService.changeNotification(id, changeNotificationDto);
  }

  @Delete(':id')
  deleteNotification(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }
}
