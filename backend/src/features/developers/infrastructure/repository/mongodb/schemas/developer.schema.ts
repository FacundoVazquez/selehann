import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as normalize from 'normalize-mongoose';
import * as mongoose from 'mongoose';
import { BaseDocument } from 'src/app/config/database/interfaces';
import { normalizeQuery } from 'src/app/config/database/mongo/mongo.utils';
import { IDeveloper } from 'src/features/developers/domain/entity/developer.entity';

@Schema({ versionKey: false, timestamps: { createdAt: true, updatedAt: true } })
export class DeveloperDocument extends BaseDocument implements IDeveloper {
  @Prop({ required: true, unique: true, index: 1 })
  fullname: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.String, ref: 'Asset' }] })
  assetIds: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.String, ref: 'License' }] })
  licenseIds: string[];

  addAssets: (assetIds: string[]) => void;
  deleteAssets: (assetIds: string[]) => void;
}

const developerSchema = SchemaFactory.createForClass(DeveloperDocument);

developerSchema.plugin(mongoosePaginate);
developerSchema.plugin(uniqueValidator);
developerSchema.plugin(normalize);

developerSchema.pre(/find|findOne|findOneAndUpdate|deleteOne|deleteMany/, normalizeQuery);

developerSchema.pre('validate', function (next) {
  this.active = true;
  return next();
});

developerSchema.pre('save', function (next) {
  if (this.active) {
    this.assetIds = [];
    this.licenseIds = [];
  }

  return next();
});

developerSchema.methods.addAsset = function (assetIds: string[]) {
  this.assetIds = [...this.assetIds, ...assetIds];
};

developerSchema.methods.deleteAsset = function (assetIds: string[]) {
  this.assetIds = this.assetIds.filter((id) => !assetIds.includes(id));
};

export { developerSchema };
