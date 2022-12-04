import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Types} from 'mongoose';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from './users.service';
import { isBoolean } from 'class-validator';


const bcrypt = require('bcryptjs');


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async signup(email: string, firstName: string, lastName: string, password: string, isAdmin?: boolean, isVIP?: boolean ){
    const user = await this.usersService.findByEmail(email);
    if(user){
      throw new BadRequestException('Email in use.');
    }
    password = await bcrypt.hash(password, 12);
    return this.usersService.create(email, firstName, lastName, password, isAdmin, isVIP);
  }

  async login(email: string, password: string, isAdmin?: boolean, isVIP?: boolean){
    let loadedUser;
    let user = await this.usersService.findByEmail(email);
    if(!user){
      throw new NotFoundException('No user with this email could be found.');
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual){
      throw new BadRequestException('Email and password do not match');
    }
    const payload = {_id: loadedUser._id.toString(), email: loadedUser.email};
    const token = this.jwtService.sign(payload,
      {secret: 'secretkey',
      expiresIn: '1h' }
    );

    return [ token, payload ];
  }


}