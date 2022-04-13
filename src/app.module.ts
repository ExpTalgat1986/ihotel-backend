import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SystemSettingsModule } from './modules/system-settings/system-settings.module';
import { SectionsModule } from './modules/sections/sections.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdvertisementsModule } from './modules/advertisements/advertisements.module';
import ormConfig from '../ormconfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FoodCategoriesModule } from './modules/food-categories/food-categories.module';
import { FoodsModule } from './modules/foods/foods.module';
import { OrdersModule } from './modules/orders/orders.module';
import { HotelServicesModule } from './modules/hotel-services/hotel-services.module';
import { HsCategoriesModule } from './modules/hs-categories/hs-categories.module';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('static'),
      exclude: ['/api*'],
      serveRoot: '/static',
    }),
    AuthModule,
    UsersModule,
    SystemSettingsModule,
    SectionsModule,
    NotificationsModule,
    AdvertisementsModule,
    FoodCategoriesModule,
    FoodsModule,
    OrdersModule,
    HotelServicesModule,
    HsCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
