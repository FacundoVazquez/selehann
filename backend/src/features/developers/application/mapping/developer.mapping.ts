import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Developer } from '../../domain/entities/developer.entity';
import {
  CreateDeveloperDto,
  DeleteManyDeveloperDto,
  DeleteOneDeveloperDto,
  DeveloperDto,
  FindManyDeveloperDto,
  FindOneDeveloperDto,
  UpdateDeveloperDto,
} from '../dto';

@Injectable()
export class DeveloperMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getDeveloper(developer: Developer): Developer {
    const c = plainToClass(Developer, developer);

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
