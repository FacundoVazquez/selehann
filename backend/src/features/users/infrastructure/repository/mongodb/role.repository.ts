import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Id } from 'src/app/interfaces';
import { RoleMapping } from 'src/features/users/application/mapping/role.mapping';
import { Role } from 'src/features/users/domain/entity/role.entity';
import { IRoleRepository } from 'src/features/users/domain/repository/user.repository';
import { RoleDocument } from './schemas/role.schema';
import { Role as RoleEnum } from 'src/features/_shared/domain/roles/role.enum';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>, private readonly roleMapping: RoleMapping) {}

  async create(entity: Partial<Role>): Promise<Role> {
    const submittedRole = new this.roleModel(entity);
    const result = (await submittedRole.save())?.toJSON();
    const role = this.roleMapping.getRole(result);
    return role;
  }

  async findOne(entity: Partial<Role>): Promise<Role> {
    console.log(entity);
    const result = (await this.roleModel.findOne(entity))?.toJSON();
    console.log('*******************', result);
    const role = this.roleMapping.getRole(result);
    return role;
  }

  async findMany(entity: Partial<Role>): Promise<Role[]> {
    console.log(entity);
    const roles = (await this.roleModel.find(entity))?.map((u) => this.roleMapping.getRole(u.toJSON()));
    return roles;
  }

  async update(id: Id, entity: Partial<Role>): Promise<Role> {
    const result = (await this.roleModel.findOneAndUpdate({ id: id as RoleEnum }, entity, { returnOriginal: false }))?.toJSON();
    const role = this.roleMapping.getRole(result);
    return role;
  }

  async delete(id: Id): Promise<boolean> {
    const result = await this.roleModel.deleteOne({ id: id as RoleEnum });
    return result.ok === 1;
  }

  async deleteMany(entity: Partial<Role>): Promise<boolean> {
    const result = await this.roleModel.deleteMany(entity);
    return result.ok === 1;
  }
}
