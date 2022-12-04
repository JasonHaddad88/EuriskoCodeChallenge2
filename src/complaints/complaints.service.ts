import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { User, UserDocument } from 'src/users/user.model';
import { Complaint } from './complaint.model';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { ComplaintDto } from './dtos/complaint.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import * as mongoose from 'mongoose'
import { UpdateComplaintDto } from './dtos/update-complaint.dto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class ComplaintsService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, 
    @InjectModel(Complaint.name) private complaintModel: Model<Complaint>,
    private readonly usersService: UsersService) {}

    async create(complaintDto: CreateComplaintDto, user: mongoose.Types.ObjectId){
      const complaint = new this.complaintModel(complaintDto);
      const filer = await this.userModel.findById(user)
      if(!filer){
          throw new NotFoundException('User not found')
      }
      complaint.user = filer.id;
      return complaint.save();
  }

    async update(id: mongoose.Types.ObjectId, status: Status){
        const complaint = await this.complaintModel.findById(id);
        if(!complaint){
            throw new NotFoundException('Could not find complaint')
        }
        complaint.status = status;
        return complaint.save()
    }

    async getAll(statuses?: string[]) {
        const statusList = Object.keys(Status);
        return await this.complaintModel.aggregate(
          [
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user',
            }
            
          },
          {
            $unwind: '$user',
          },
              
          {
            $match: {
              // $or: [
              //   { status: { statuses: {$exists: false } } },
              //   { status: { $in: statuses } }
              // ]
              status: statuses ? {$in: statuses} : {$in: statusList},
            },
          },
          {
            $sort: {
              createdAt: -1,
            }
          },
          {
          $group: {
          _id: null,
          VIP: { $push: {$cond: [{$eq: ['$user.isVIP', true]},'$$ROOT','']}},
          nonVIP: { $push: {$cond: [{$eq: ['$user.isVIP', false]},'$$ROOT','']}},
          } 
          },
          {
            $project: {
              "_id": 0,
              "VIP.title": 1,
              "VIP.complaintBody": 1,
              "VIP.createdAt": 1,
              "VIP.status": 1,
              "VIP.user.firstName": 1,
              "VIP.user.lastName": 1,
              "VIP.user.email": 1,
              "nonVIP.title": 1,
              "nonVIP.complaintBody": 1,
              "nonVIP.createdAt": 1,
              "nonVIP.status": 1,
              "nonVIP.user.firstName": 1,
              "nonVIP.user.lastName": 1,
              "nonVIP.user.email": 1,
            }
          }
          ]);

      }
      
    }
 
      


