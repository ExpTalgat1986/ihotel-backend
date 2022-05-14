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
import { OrderStatusesModule } from './modules/order-statuses/order-statuses.module';
import { AdServicesModule } from './modules/ad-services/ad-services.module';
import { AdServiceCategoriesModule } from './modules/ad-service-categories/ad-service-categories.module';
import { MessagesModule } from './modules/messages/messages.module';
import { FcmModule } from './modules/fcm/fcm.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('static'),
      exclude: ['/api*'],
      serveRoot: '/static',
    }),
    ConfigModule.forRoot(),
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
    OrderStatusesModule,
    AdServicesModule,
    AdServiceCategoriesModule,
    MessagesModule,
    FcmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
