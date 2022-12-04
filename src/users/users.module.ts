import { Module, MiddlewareConsumer, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from '../config/jwtconfig.service'
import { AuthService } from './auth.service';
import { IsAuthMiddleware } from 'src/middleware/is-auth.middleware';
// import { CurrentUserMiddleware } from 'src/middleware/current-user.middleware';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]), UsersModule, 
  JwtModule.registerAsync({
    useClass: JwtConfigService,
  })],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(IsAuthMiddleware).exclude('/users/signup', 'users/login').forRoutes('*');
      // consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}

