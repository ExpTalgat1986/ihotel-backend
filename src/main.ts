import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const PORT = process.env.SERVER_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  // Set the config options
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true });
  await app.listen(PORT);
}
bootstrap();
