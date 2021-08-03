import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LicenseService } from 'src/features/licenses/application/license.services';
import { LicenseDto } from '../../application/dto/license.dto';
import { FindManyLicensesByDeveloper } from '../../application/dto/find-many-licenses-by-developer.dto';
import { FindManyLicensesDto } from '../../application/dto/find-many-licenses.dto';

@ApiTags('Licenses')
@Controller({ path: 'licenses', version: '1' })
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get()
  async findMany(@Query() findManyLicensesDto: FindManyLicensesDto): Promise<LicenseDto[]> {
    return this.licenseService.findLicenses(findManyLicensesDto);
  }

  @Get('by/developer/:id')
  async findByUser(@Param() findManyLicensesByDeveloper: FindManyLicensesByDeveloper): Promise<LicenseDto[]> {
    return this.licenseService.findLicensesByUser(findManyLicensesByDeveloper);
  }
}
