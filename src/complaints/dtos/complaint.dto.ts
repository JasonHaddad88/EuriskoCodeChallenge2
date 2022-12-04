import { IsDate, IsMongoId, IsString } from "class-validator";
import { Expose } from "class-transformer";
import mongoose from "mongoose";

import { Status } from 'src/enums/status.enum';
import { User } from "src/users/user.model";

export class ComplaintDto {

    @Expose()
    id: mongoose.Schema.Types.ObjectId;

    @Expose()
    title: string;

    @Expose()
    complaintBody: string;

    @Expose()
    status: string;

    @Expose()
    user: mongoose.Types.ObjectId;
}