import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';


@Injectable()
export class AccessGuard implements CanActivate {
constructor(@Inject(UsersService) private usersService: UsersService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const expectedRoles = this.reflector.get<string>('expectedRoles', context.getHandler())
    const foundUser = await this.usersService.findOneById(request.user);
    if(!foundUser){
        throw new NotFoundException('Could not find user')
    }
    if((foundUser.isAdmin ? 'admin' : 'client') === expectedRoles){
      return true;
    }
    return false;
  }

}