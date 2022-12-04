import { Expose } from 'class-transformer';
import mongoose from 'mongoose';

export class UserDto {
  @Expose()
  id: mongoose.Types.ObjectId;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  isAdmin?: boolean;

  @Expose()
  isVIP?: boolean;

}
