import { Injectable } from '@nestjs/common';
import { AssetMapping } from 'src/features/assets/application/mapping/asset.mapping';
import { Asset } from 'src/features/assets/domain/entities/asset.entity';

import { LicenseMapping } from 'src/features/licenses/application/mapping/licenses.mapping';
import { License } from 'src/features/licenses/domain/entities/license.entity';
import { EntityManager, In } from 'typeorm';

import { AssignResourceException, CreateDeveloperException, RevokeResourceException, SetDeveloperStatusException } from '../domain/developer.exceptions';
import { Developer } from '../domain/entities/developer.entity';
import {
  CreateDeveloperDto,
  DeleteManyDeveloperDto,
  DeleteOneDeveloperDto,
  DeveloperDto,
  FindManyDeveloperDto,
  FindOneDeveloperDto,
  UpdateDeveloperDto,
} from './dto';
import { AssignResourceDto } from './dto/assign-resources.dto';
import { RevokeResourceDto } from './dto/revoke-resources.dto';
import { SetDeveloperStatusDto } from './dto/set-developer-status.dto';
import { DeveloperMapping } from './mapping/developer.mapping';

@Injectable()
export class DeveloperService {
  constructor(
    private readonly manager: EntityManager,
    private readonly developerMapping: DeveloperMapping,
    private readonly assetMapping: AssetMapping,
    private readonly licenseMapping: LicenseMapping,
  ) {}

  async createDeveloper(createDeveloperDto: CreateDeveloperDto) {
    //const role = await this.roleRepository.findOne({ id: createDeveloperDto.role });
    //const partialDeveloper = this.developerMapping.getDeveloperFromCreateDeveloper(createDeveloperDto);
    const developer = this.manager.create(Developer, { ...createDeveloperDto });

    try {
      await this.manager.save(developer);
    } catch (err) {
      throw new CreateDeveloperException(err.stack);
    }

    const developerDto = this.developerMapping.getDeveloperDto(developer);
    return developerDto;
  }

  async findDeveloper(findOneDeveloperDto: FindOneDeveloperDto) {
    // const filter = this.developerMapping.getDeveloperFromFindOneDeveloper(findOneDeveloperDto);
    const developer = await this.manager.findOne(Developer, { ...findOneDeveloperDto });

    const developerDto = this.developerMapping.getDeveloperDto(developer);
    return developerDto;
  }

  async findDevelopers(findManyDeveloperDto: FindManyDeveloperDto) {
    //const filter = this.developerMapping.getDeveloperFromFindManyDeveloper(findManyDeveloperDto);
    const developers = await this.manager.find(Developer, { ...findManyDeveloperDto });

    const developersDto = developers.map((u) => this.developerMapping.getDeveloperDto(u));
    return developersDto;
  }

  async updateDeveloper(findOneDeveloperDto: FindOneDeveloperDto, updateDeveloperDto: UpdateDeveloperDto) {
    // const developer = this.developerMapping.getDeveloperFromUpdateDeveloper(updateDeveloperDto);
    const id = findOneDeveloperDto.id;

    const developer = await this.manager.save(Developer, { id, ...updateDeveloperDto });

    return this.developerMapping.getDeveloperDto(developer);
  }

  async deleteDeveloper(deleteOneDeveloperDto: DeleteOneDeveloperDto) {
    const id = deleteOneDeveloperDto.id;
    return this.manager.delete(Developer, { id });
  }

  async deleteDevelopers(deleteManyDeveloperDto: DeleteManyDeveloperDto) {
    // const developer = this.developerMapping.getDeveloperFromDeleteManyDeveloper(deleteManyDeveloperDto);
    return this.manager.delete(Developer, { ...deleteManyDeveloperDto });
  }

  async setDeveloperStatus(setDeveloperStatusDto: SetDeveloperStatusDto) {
    const { active, developerIds } = setDeveloperStatusDto;
    let developers: Developer[] = null;

    try {
      if (active) {
        await this.manager
          .createQueryBuilder()
          .update(Developer)
          .set({ active })
          .where({ id: In(developerIds) })
          .execute();
      }

      developers = await this.manager.findByIds(Developer, developerIds);

      if (!active) {
        developers = developers.map((d) => ({ ...d, active, assets: [], licenses: [] }));
        developers = await this.manager.save(Developer, developers);
      }

      const result = developers.map((d) => this.developerMapping.getDeveloperDto(d));
      return result;
    } catch (err) {
      throw new SetDeveloperStatusException(err.message);
    }
  }

  async assignResource(findOneDeveloperDto: FindOneDeveloperDto, assignResourceDto: AssignResourceDto, propertyPath: string) {
    const id = findOneDeveloperDto.id;
    const resourceIds = assignResourceDto.resourceIds;

    try {
      await this.manager.createQueryBuilder().relation(Developer, propertyPath).of(id).add(resourceIds);

      /*       const developer = await this.manager.findOne(Developer, id);
      const result = this.developerMapping.getDeveloperDto(developer);
      return result; */

      return this.mapResources(id, propertyPath);
    } catch (error) {
      throw new AssignResourceException(error.message);
    }
  }

  async revokeResource(findOneDeveloperDto: FindOneDeveloperDto, revokeResourceDto: RevokeResourceDto, propertyPath: string) {
    const id = findOneDeveloperDto.id;
    const resourceIds = revokeResourceDto.resourceIds;

    try {
      await this.manager.createQueryBuilder().relation(Developer, propertyPath).of(id).remove(resourceIds);

      return this.mapResources(id, propertyPath);
    } catch (error) {
      throw new RevokeResourceException(error.message);
    }
  }

  private async mapResources(developerId: string, propertyPath: string) {
    const resources = await this.manager.createQueryBuilder().relation(Developer, propertyPath).of(developerId).loadMany<Asset | License>();

    const result = resources.map((res) => {
      if (res instanceof Asset) return this.assetMapping.getAssetDto(res);
      else return this.licenseMapping.getLicenseDto(res);
    });

    return result;
  }
}
