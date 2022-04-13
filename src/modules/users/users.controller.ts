import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserEntity } from '../../common/entities/user.entity';
import { userToResponseDto } from '../../common/response-dto/user.to-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@GetUser() user: UserEntity) {
    return userToResponseDto(user);
  }

  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('roles')
  getAllRoles() {
    return this.usersService.getAllRoles();
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
