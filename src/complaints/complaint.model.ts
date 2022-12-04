import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.model';
import { Status } from 'src/enums/status.enum';

export type ComplaintDocument = Complaint & Document;

@Schema({timestamps: true})
export class Complaint{
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    complaintBody: string;

    @Prop({required: true, enum: Status, default: Status.PENDING})
    status: Status;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}


const ComplaintSchema = SchemaFactory.createForClass(Complaint);

ComplaintSchema.index({ _id: 1, status: 1, createdAt: 1 });
export { ComplaintSchema };