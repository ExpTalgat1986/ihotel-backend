import { Body, Controller, Post } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SendFcmDto } from './dto/send-fcm.dto';

@Controller('fcm')
export class FcmController {
  @Post()
  async sendNotification(@Body() sendFcmDto: SendFcmDto) {
    const topic = 'ALL';

    const message = {
      topic: topic,
      data: {
        title: sendFcmDto.type === 'MESSAGE' ? 'Новое сообщение' : 'Новый заказ',
        message: sendFcmDto.message,
      },
    };
    await admin.messaging().send(message);
    return true;
  }
}
