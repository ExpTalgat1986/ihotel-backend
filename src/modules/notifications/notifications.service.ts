import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../../common/entities/notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ChangeNotificationDto } from './dto/change-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity) private readonly notificationsRepo: Repository<NotificationEntity>,
  ) {}

  async getAllNotifications() {
    return await this.notificationsRepo.find();
  }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    return await this.notificationsRepo.save(createNotificationDto);
  }

  async changeNotification(id: string, changeNotificationDto: ChangeNotificationDto) {
    const notification = await this.notificationsRepo.findOne(id);
    if (!notification) throw new HttpException('Уведомление с таким ID не найден в базе', HttpStatus.BAD_REQUEST);
    Object.keys(changeNotificationDto).forEach((key: string) => {
      notification[key] = changeNotificationDto[key];
    });
    return await this.notificationsRepo.save(notification);
  }

  async deleteNotification(id: string) {
    await this.notificationsRepo.delete(id);
    return true;
  }
}
