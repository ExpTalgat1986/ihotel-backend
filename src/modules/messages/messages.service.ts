import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../../common/entities/message.entity';
import { Repository } from 'typeorm';
import { defaultPerPage, getPaginatedData } from '../../utils/pagination.util';
import { CreateMsgDto } from './dto/create-msg.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(MessageEntity) private readonly msgRepo: Repository<MessageEntity>) {}

  async getMessages(page: string) {
    const unReadMessages = await this.msgRepo.find({ where: { is_read: false } });
    if (unReadMessages && unReadMessages.length) {
      unReadMessages.forEach((msg) => {
        msg.is_read = true;
      });
      await this.msgRepo.save(unReadMessages);
    }
    const query = this.msgRepo.createQueryBuilder('messages').orderBy('messages.created_at', 'DESC');
    return await getPaginatedData(query, page, defaultPerPage);
  }

  async createMessage(createMsgDto: CreateMsgDto) {
    await this.msgRepo.save({ ...createMsgDto });
    return true;
  }

  async getUnreadMessagesCount() {
    return await this.msgRepo.count({ where: { is_read: false } });
  }

  async deleteMsg(id: string) {
    await this.msgRepo.delete(id);
    return true;
  }
}
