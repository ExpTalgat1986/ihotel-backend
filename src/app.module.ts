import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import ormConfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
