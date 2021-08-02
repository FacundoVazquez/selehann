import { Inject, Injectable } from '@nestjs/common';
import { userSchema } from 'src/features/users/infrastructure/repository/mongodb/schemas/user.schema';
import { IDeveloperRepository } from '../../domain/repository/developer.repository';
import { DEVELOPER_REPOSITORY } from '../../infrastructure/repository/developer.repository.provider';
import { CreateDeveloperDto, DeleteManyDeveloperDto, DeleteOneDeveloperDto, FindManyDeveloperDto, FindOneDeveloperDto, UpdateDeveloperDto } from '../dto';
import { AddAssetsDto } from '../dto/add-assets.dto';
import { AddLicensesDto } from '../dto/add-license.dto';
import { AssignResourceFailedException } from '../exceptions/developer.exception';
import { DeveloperMapping } from '../mapping/developer.mapping';

@Injectable()
export class DeveloperService {
  constructor(private readonly developerMapping: DeveloperMapping, @Inject(DEVELOPER_REPOSITORY) private readonly developerRepository: IDeveloperRepository) {}

  async createDeveloper(createDeveloperDto: CreateDeveloperDto) {
    console.log('*******************', createDeveloperDto);
    //const role = await this.roleRepository.findOne({ id: createDeveloperDto.role });
    const partialDeveloper = this.developerMapping.getDeveloperFromCreateDeveloper(createDeveloperDto);
    const developer = await this.developerRepository.create(partialDeveloper);
    const developerDto = this.developerMapping.getDeveloperDto(developer);
    return developerDto;
  }

  async findDeveloper(findOneDeveloperDto: FindOneDeveloperDto) {
    const filter = this.developerMapping.getDeveloperFromFindOneDeveloper(findOneDeveloperDto);
    const developer = await this.developerRepository.findOne(filter);
    const developerDto = this.developerMapping.getDeveloperDto(developer);
    return developerDto;
  }

  async findDevelopers(findManyDeveloperDto: FindManyDeveloperDto) {
    const filter = this.developerMapping.getDeveloperFromFindManyDeveloper(findManyDeveloperDto);
    const developers = await this.developerRepository.findMany(filter);
    console.log('FIND MANY', developers);
    const developersDto = developers.map((u) => this.developerMapping.getDeveloperDto(u));
    return developersDto;
  }

  async updateDeveloper(findOneDeveloperDto: FindOneDeveloperDto, updateDeveloperDto: UpdateDeveloperDto) {
    const id = findOneDeveloperDto.id;
    const developer = this.developerMapping.getDeveloperFromUpdateDeveloper(updateDeveloperDto);
    console.log('developer', developer);
    const developerDocument = await this.developerRepository.update(id, developer);
    return this.developerMapping.getDeveloperDto(developerDocument);
  }

  async deleteDeveloper(deleteOneDeveloperDto: DeleteOneDeveloperDto) {
    const id = deleteOneDeveloperDto.id;
    return this.developerRepository.delete(id);
  }

  async deleteDevelopers(deleteManyDeveloperDto: DeleteManyDeveloperDto) {
    const developer = this.developerMapping.getDeveloperFromDeleteManyDeveloper(deleteManyDeveloperDto);
    return this.developerRepository.deleteMany(developer);
  }

  async addAssets(findOneDeveloperDto: FindOneDeveloperDto, addAssetsDto: AddAssetsDto) {
    const id = findOneDeveloperDto.id;
    const assetIds = addAssetsDto.assetIds;

    try {
      console.log('bef', id, assetIds);
      const developer = await this.developerRepository.addAssets(id, assetIds);
      const result = this.developerMapping.getDeveloperDto(developer);
      console.log('after', result);
      return result;
    } catch (error) {
      throw new AssignResourceFailedException(error.message);
    }
  }

  async addLicenses(findOneDeveloperDto: FindOneDeveloperDto, addLicensesDto: AddLicensesDto) {
    const id = findOneDeveloperDto.id;
    const licenseIds = addLicensesDto.licenseIds;

    try {
      console.log('bef', id, licenseIds);
      const developer = await this.developerRepository.addLicenses(id, licenseIds);
      const result = this.developerMapping.getDeveloperDto(developer);
      console.log('after', developer);
      console.log('after', result);
      return result;
    } catch (error) {
      throw new AssignResourceFailedException(error.message);
    }
  }
}
