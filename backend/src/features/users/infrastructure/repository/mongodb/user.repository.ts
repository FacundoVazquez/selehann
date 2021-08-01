import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Id } from 'src/app/interfaces';
import { UserMapping } from 'src/features/users/application/mapping/user.mapping';
import { Role } from 'src/features/users/domain/entity/role.entity';
import { User } from 'src/features/users/domain/entity/user.entity';
import { IUserRepository } from 'src/features/users/domain/repository/user.repository';
import { RoleDocument } from './schemas/role.schema';
import { UserDocument } from './schemas/user.schema';

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

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    private readonly userMapping: UserMapping,
  ) {}

  async create(entity: Partial<User>): Promise<User> {
    const submittedUser = new this.userModel({ ...entity });
    const result = (await submittedUser.save())?.toJSON();
    const user = this.userMapping.getUser(result);
    return user;
  }

  async findOne(entity: Partial<User>): Promise<User> {
    const result = (await this.userModel.findOne(entity).populate('role'))?.toJSON();
    const user = this.userMapping.getUser(result);
    return user;
  }

  async findMany(entity: Partial<User>): Promise<User[]> {
    const users = (await this.userModel.find({ ...entity })).map((u) => this.userMapping.getUser(u.toJSON()));
    return users;
  }

  async update(id: Id, entity: Partial<User>): Promise<User> {
    const result = (await this.userModel.findOneAndUpdate({ id }, entity, { returnOriginal: false }))?.toJSON();
    const user = this.userMapping.getUser(result);
    return user;
  }

  async delete(id: Id): Promise<boolean> {
    const result = await this.userModel.deleteOne({ id });
    return result.ok === 1;
  }

  async deleteMany(entity: Partial<User>): Promise<boolean> {
    const result = await this.userModel.deleteMany(entity);
    return result.ok === 1;
  }
}
