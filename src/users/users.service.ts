import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Types, ObjectId} from 'mongoose';
import * as mongoose from 'mongoose';
import { NOTFOUND } from 'dns';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(email: string, firstName: string, lastName: string, password: string, isAdmin?: boolean, isVIP?: boolean ){
        const user = await this.userModel.create({email, firstName, lastName, password, isAdmin, isVIP});
        return user.save()
    }

    async findOneById(_id: mongoose.Types.ObjectId ) {
        if (!_id) {
          return null;
        }
        return await this.userModel.findById(_id);
    }

    async findOneByStringId(reqUserId: string) {
        const foundUser =  await this.userModel.findOne({_id: new Types.ObjectId(reqUserId)});
        if(!foundUser){
            throw new NotFoundException('Cannot find user')
        }
        return foundUser;
    }

    findAll(){
        return this.userModel.find();
    }

    findByEmail(email: string){
        return this.userModel.findOne({email});
    }
    
}
