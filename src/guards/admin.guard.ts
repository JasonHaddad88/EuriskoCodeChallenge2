import { CanActivate, ExecutionContext, NotFoundException, Inject } from '@nestjs/common';
import { NotFoundError, Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.model';
import * as mongoose from 'mongoose';
import { type } from 'os';
import { ReadableStreamBYOBRequest } from 'node:stream/web';
import { UserDecorator } from 'src/decorators/current-user.decorator';
import { InjectConnection } from '@nestjs/mongoose';


export class AdminGuard implements CanActivate {
    constructor(@Inject(UsersService) private usersService: UsersService) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const foundUser = await this.usersService.findOneById(request.user);
        if(!foundUser){
            throw new NotFoundException('Could not find user')
        }

        if(!foundUser.isAdmin){
            return false;
        }
        return true;
    }
}