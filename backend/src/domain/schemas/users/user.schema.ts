import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: { createdAt: true, updatedAt: true } })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Object.values(Role) })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
