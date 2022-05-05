import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMsgDto } from './dto/create-msg.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly msgService: MessagesService) {}

  @Get()
  getMessages(@Query('page') page: string) {
    return this.msgService.getMessages(page);
  }

  @Post()
  createMessage(@Body() createMsgDto: CreateMsgDto) {
    return this.msgService.createMessage(createMsgDto);
  }

  @Get('unread')
  getUnreadMessagesCount() {
    return this.msgService.getUnreadMessagesCount();
  }

  @Delete(':id')
  deleteMsg(@Param('id') id: string) {
    return this.msgService.deleteMsg(id);
  }
}
