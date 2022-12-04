import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true})
    password: string;
    
    @Prop({default: false})
    isAdmin?: boolean;

    @Prop({default: false})
    isVIP?: boolean;
}



const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ _id: 1, email: 1, isAdmin: 1, isVIP: 1 });
export { UserSchema };