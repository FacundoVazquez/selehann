import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Role } from 'src/features/_shared/domain/roles/role.enum';
import { IDeveloper, Developer } from '../../domain/entity/developer.entity';
import {
  CreateDeveloperDto,
  DeleteManyDeveloperDto,
  DeleteOneDeveloperDto,
  FindManyDeveloperDto,
  FindOneDeveloperDto,
  UpdateDeveloperDto,
  DeveloperDto,
} from '../dto';

@Injectable()
export class DeveloperMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getDeveloper(developer: IDeveloper): Developer {
    const c = plainToClass(Developer, developer);
    console.log('Class:', c);
    return plainToClass(Developer, developer);
  }

  getDeveloperDto(developer: Developer): DeveloperDto {
    return this.mapper.map(developer, DeveloperDto, Developer);
  }

  getDeveloperFromCreateDeveloper(dto: CreateDeveloperDto): Partial<Developer> {
    return this.mapper.map(dto, Developer, CreateDeveloperDto);
  }

  getDeveloperFromFindOneDeveloper(dto: FindOneDeveloperDto): Partial<Developer> {
    return this.mapper.map(dto, Developer, FindOneDeveloperDto);
  }

  getDeveloperFromFindManyDeveloper(dto: FindManyDeveloperDto): Partial<Developer> {
    return this.mapper.map(dto, Developer, FindManyDeveloperDto);
  }

  getDeveloperFromDeleteOneDeveloper(dto: DeleteOneDeveloperDto): Partial<Developer> {
    return this.mapper.map(dto, Developer, DeleteOneDeveloperDto);
  }

  getDeveloperFromDeleteManyDeveloper(dto: DeleteManyDeveloperDto): Partial<Developer> {
    return this.mapper.map(dto, Developer, DeleteManyDeveloperDto);
  }

  getDeveloperFromUpdateDeveloper(dto: UpdateDeveloperDto): Partial<Developer> {
    return this.mapper.map(dto, Developer, UpdateDeveloperDto);
  }
}
