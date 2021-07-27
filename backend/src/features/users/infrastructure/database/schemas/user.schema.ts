import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashPasswordAsync, verifyPassword } from 'src/app/config/crypto';
import { Role } from 'src/features/users/domain/roles/role.enum';
import { IUser } from 'src/features/users/domain/entity/user.entity';
import * as mongoosePaginate from 'mongoose-paginate';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as normalize from 'normalize-mongoose';
import { BaseDocument } from 'src/app/config/database/interfaces';
import { removeUndefinedProperties } from 'src/app/config/utils/objects.utils';

@Schema({ versionKey: false, timestamps: { createdAt: true, updatedAt: true } })
export class UserDocument extends BaseDocument implements IUser {
  @Prop({ required: true, index: 1 })
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

async function normalizeQuery() {
  const { id, ...rest } = this.getQuery() || {};
  const filter = removeUndefinedProperties({ _id: id, ...rest });
  this.setQuery(filter);
}

userSchema.pre(/find|findOne|findOneAndUpdate|deleteOne|deleteMany/, normalizeQuery);

userSchema.methods.verifyPassword = function (submittedPassword) {
  return verifyPassword(this.password, this.salt, submittedPassword);
};

export { userSchema };
