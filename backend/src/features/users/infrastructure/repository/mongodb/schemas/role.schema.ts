import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as normalize from 'normalize-mongoose';
import { BaseDocument } from 'src/app/config/database/interfaces';
import { normalizeQuery } from 'src/app/config/database/mongo/mongo.utils';
import { IRole } from 'src/features/users/domain/entity/role.entity';
import { Role as RoleEnum } from 'src/features/_shared/domain/roles/role.enum';

@Schema({ versionKey: false, timestamps: { createdAt: true, updatedAt: true } })
export class RoleDocument extends BaseDocument implements IRole {
  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true, type: String })
  role: RoleEnum;
}

const roleSchema = SchemaFactory.createForClass(RoleDocument);

roleSchema.plugin(uniqueValidator);
roleSchema.plugin(normalize);

roleSchema.pre(/find|findOne|findOneAndUpdate|deleteOne|deleteMany/, normalizeQuery);

export { roleSchema };
