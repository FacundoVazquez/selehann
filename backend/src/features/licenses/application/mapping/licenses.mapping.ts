import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { License } from '../../domain/entities/license.entity';
import { LicenseDto } from '../dto/license.dto';
import { FindManyLicensesDto } from '../dto/find-many-licenses.dto';

@Injectable()
export class LicenseMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getLicenseDto(license: License): LicenseDto {
    return this.mapper.map(license, LicenseDto, License);
  }

  getLicenseFromFindManyLicense(dto: FindManyLicensesDto): Partial<License> {
    return this.mapper.map(dto, License, FindManyLicensesDto);
  }
}
