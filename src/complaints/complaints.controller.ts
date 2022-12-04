import { Get, Patch, Delete, Body, Controller, Param, Post, UseGuards , Query, Request } from '@nestjs/common';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { AuthService } from 'src/users/auth.service';
import { ComplaintsService } from './complaints.service';
import { UsersService } from 'src/users/users.service';
import { UserDecorator } from 'src/decorators/current-user.decorator';
import * as mongoose from 'mongoose';
import { UpdateComplaintDto } from './dtos/update-complaint.dto';
import { AccessGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { ComplaintDto } from './dtos/complaint.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';



@Controller('complaints')
// @Serialize(ComplaintDto)
export class ComplaintsController {
    constructor(private authService: AuthService, private complaintsService: ComplaintsService, private usersService: UsersService) {}

    @Post('/create')
    @UseGuards(AccessGuard)
    @Roles('client')
    async createComplaint(@Body() body: CreateComplaintDto, @UserDecorator() currentUser: mongoose.Types.ObjectId){
        return await this.complaintsService.create(body, currentUser);
    }

    @Patch('/update/:id')
    @UseGuards(AccessGuard)
    @Roles('admin')
    updateComplaint(@Param('id') id: mongoose.Types.ObjectId, @Body() body: UpdateComplaintDto){
        return this.complaintsService.update(id, body.status);
    }

    @Get('/all')
    @UseGuards(AccessGuard)
    @Roles('admin')
    async getAllComplaints(@Query('statuses') statuses?: string){
      if(statuses){
        const newStatuses = statuses.split(',');
        return this.complaintsService.getAll(newStatuses);
      }
      return this.complaintsService.getAll();
    }
}
