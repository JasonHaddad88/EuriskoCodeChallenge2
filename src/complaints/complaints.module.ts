import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsService } from './complaints.service';
import { Complaint, ComplaintSchema } from './complaint.model';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/user.model';
import { ComplaintsController } from './complaints.controller';
import { AuthService } from 'src/users/auth.service';
import { JwtService } from '@nestjs/jwt';
import { IsAuthMiddleware } from 'src/middleware/is-auth.middleware';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Complaint.name, schema: ComplaintSchema }]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema }]),
      ], 
      providers: [ComplaintsService, UsersService, AuthService, JwtService],
      controllers: [ComplaintsController],
      exports: [ComplaintsService],
})
export class ComplaintsModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(IsAuthMiddleware).exclude('/users/login', '/users/signup').forRoutes('*');
      // consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
