import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Id } from 'src/app/interfaces';
import { DeveloperNotFoundException } from 'src/features/developers/application/exceptions/developer.exception';
import { DeveloperMapping } from 'src/features/developers/application/mapping/developer.mapping';
import { Developer } from 'src/features/developers/domain/entity/developer.entity';
import { IDeveloperRepository as IDeveloperRepository } from 'src/features/developers/domain/repository/developer.repository';
import { DeveloperDocument } from './schemas/developer.schema';

@Injectable()
export class DeveloperRepository implements IDeveloperRepository {
  constructor(@InjectModel(Developer.name) private readonly developerModel: Model<DeveloperDocument>, private readonly developerMapping: DeveloperMapping) {}

  async create(entity: Partial<Developer>): Promise<Developer> {
    const submittedDeveloper = new this.developerModel({ ...entity });
    const result = (await submittedDeveloper.save())?.toJSON();
    const developer = this.developerMapping.getDeveloper(result);
    return developer;
  }

  async findOne(entity: Partial<Developer>): Promise<Developer> {
    const result = (await this.developerModel.findOne(entity).populate('role'))?.toJSON();
    const developer = this.developerMapping.getDeveloper(result);
    return developer;
  }

  async findMany(entity: Partial<Developer>): Promise<Developer[]> {
    const developers = (await this.developerModel.find({ ...entity })).map((u) => this.developerMapping.getDeveloper(u.toJSON()));
    return developers;
  }

  async update(id: Id, entity: Partial<Developer>): Promise<Developer> {
    const result = (await this.developerModel.findOneAndUpdate({ id }, { ...entity }, { returnOriginal: false, omitUndefined: true }))?.toJSON();
    console.log('resultado: ', result);
    const developer = this.developerMapping.getDeveloper(result);
    return developer;
  }

  async delete(id: Id): Promise<boolean> {
    const result = await this.developerModel.deleteOne({ id });
    return result.ok === 1;
  }

  async deleteMany(entity: Partial<Developer>): Promise<boolean> {
    const result = await this.developerModel.deleteMany(entity);
    return result.ok === 1;
  }

  async addAssets(id: Id, assetIds: string[]): Promise<Developer> {
    const developer = (
      await this.developerModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { assetIds: { $each: assetIds } },
        },
        { returnOriginal: false },
      )
    )?.toJSON();

    if (!developer) throw new DeveloperNotFoundException();

    return developer;
  }

  async addLicenses(id: Id, licenseIds: string[]): Promise<Developer> {
    const developer = (
      await this.developerModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { licenseIds: { $each: licenseIds } },
        },
        { returnOriginal: false },
      )
    )?.toJSON();

    if (!developer) throw new DeveloperNotFoundException();

    return developer;
  }
}

// Lookup
/*     const u = await this.userModel
      .aggregate<User>()
      .match({
        roleId,
      })
      .lookup({
        from: 'roles',
        localField: 'roleId',
        foreignField: '_id',
        as: 'role',
      })
      .unwind({
        path: '$role',
      }).match;
    console.log('u', u);

    console.log('************************ END'); */
