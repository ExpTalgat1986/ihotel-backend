import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { RoleEntity } from '../../common/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>) {}

  async findUserByPhone(phone: string): Promise<UserEntity | undefined> {
    return await this.usersRepo.findOne({ where: { phone_number: phone }, relations: ['role'] });
  }

  async findUserById(user_id: number): Promise<UserEntity | undefined> {
    return await this.usersRepo.findOne(user_id);
  }

  async getAllUsers() {
    return await this.usersRepo.find({ relations: ['role'] });
  }

  async createUser(payload: RegisterDto): Promise<UserEntity> {
    const user = this.usersRepo.create({ ...payload });
    const { id } = await this.usersRepo.save(user);
    return await this.usersRepo.findOne({ where: { id }, relations: ['role'] });
  }

  async getAllRoles() {
    return await getManager().find(RoleEntity);
  }

  async deleteUser(id: string) {
    return await this.usersRepo.delete(id);
  }
}
