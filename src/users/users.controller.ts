import { Controller, Post, Body, Get } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import * as mongoose from 'mongoose';
import { request } from 'http';
import { User } from './user.model';
import { UserDecorator } from 'src/decorators/current-user.decorator';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() body: CreateUserDto){
        return this.authService.signup(body.email, body.firstName, body.lastName, body.password, body.isAdmin, body.isVIP);
    }

    @Post('/login')
    async login(@Body() body: LoginUserDto) {
        return this.authService.login(body.email, body.password);
    }

}
