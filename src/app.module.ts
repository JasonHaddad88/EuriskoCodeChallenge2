import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComplaintsModule } from './complaints/complaints.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigModule } from './config/mongoconfig.module';
import { MongoConfigService } from './config/mongoconfig.service';

@Module({
  imports: [ComplaintsModule, UsersModule, MongoConfigModule, 
  MongooseModule.forRootAsync({
    inject: [MongoConfigService],
    useFactory: async (mongoConfigService: MongoConfigService) => mongoConfigService.getMongoConfig(),
  }),],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    }),
  }],
})
export class AppModule {}
