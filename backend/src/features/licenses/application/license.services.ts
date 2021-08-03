import { Injectable } from '@nestjs/common';
import { Developer } from 'src/features/developers/domain/entities/developer.entity';
import { License } from 'src/features/licenses/domain/entities/license.entity';
import { EntityManager, In } from 'typeorm';
import { FindManyLicensesByDeveloper } from './dto/find-many-licenses-by-developer.dto';
import { FindManyLicensesDto } from './dto/find-many-licenses.dto';

import { LicenseMapping } from './mapping/licenses.mapping';

@Injectable()
export class LicenseService {
  constructor(private readonly manager: EntityManager, private readonly licenseMapping: LicenseMapping) {}

  async findLicenses(findManyLicensesDto: FindManyLicensesDto) {
    const licenses = await this.manager.find(License, findManyLicensesDto);

    const licensesDto = licenses.map((u) => this.licenseMapping.getLicenseDto(u));
    return licensesDto;
  }

  async findLicensesByUser(findManyLicensesByDeveloper: FindManyLicensesByDeveloper) {
    const licenses = await this.manager.createQueryBuilder().relation(Developer, 'licenses').of(findManyLicensesByDeveloper.id).loadMany<License>();

    const licensesDto = licenses.map((u) => this.licenseMapping.getLicenseDto(u));
    return licensesDto;
  }
}
