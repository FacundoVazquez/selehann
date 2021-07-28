import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as normalize from 'normalize-mongoose';
import { hashPasswordAsync, verifyPassword } from 'src/app/config/crypto';
import { BaseDocument } from 'src/app/config/database/interfaces';
import { normalizeQuery } from 'src/app/config/database/mongo/mongo.utils';
import { IUser } from 'src/features/users/domain/entity/user.entity';
import { Role } from 'src/features/users/domain/roles/role.enum';

@Schema({ versionKey: false, timestamps: { createdAt: true, updatedAt: true } })
export class UserDocument extends BaseDocument implements IUser {
  @Prop({ required: true, unique: true, index: 1 })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true, enum: Object.values(Role), type: String })
  role: Role;

  validatePassword: (submittedPassword: string) => boolean;
}

const userSchema = SchemaFactory.createForClass(UserDocument);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(uniqueValidator);
userSchema.plugin(normalize);

userSchema.pre('validate', function (next) {
  if (this.isModified('password') || this.isNew) {
    hashPasswordAsync(this.password, (error, hash, salt) => {
      if (error) return next(error);

      this.password = hash;
      this.salt = salt;

      next();
    });
  } else {
    return next();
  }
});

userSchema.pre(/find|findOne|findOneAndUpdate|deleteOne|deleteMany/, normalizeQuery);

userSchema.methods.validatePassword = function (submittedPassword) {
  return verifyPassword(this.password, this.salt, submittedPassword);
};

export { userSchema };
