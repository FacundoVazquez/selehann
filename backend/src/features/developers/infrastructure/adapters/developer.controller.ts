import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetDto } from 'src/features/assets/application/dto/asset.dto';
import { DeveloperService } from 'src/features/developers/application/developer.services';
import { LicenseDto } from 'src/features/licenses/application/dto/license.dto';
import { License } from 'src/features/licenses/domain/entities/license.entity';
import { Asset } from 'webpack';
import {
  CreateDeveloperDto,
  DeleteManyDeveloperDto,
  DeleteOneDeveloperDto,
  FindManyDeveloperDto,
  FindOneDeveloperDto,
  UpdateDeveloperDto,
  DeveloperDto,
} from '../../application/dto';
import { AssignResourceDto } from '../../application/dto/assign-resources.dto';
import { RevokeResourceDto } from '../../application/dto/revoke-resources.dto';
import { SetDeveloperStatusDto } from '../../application/dto/set-developer-status.dto';

@ApiTags('Developers')
@Controller({ path: 'developers', version: '1' })
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  async create(@Body() createDeveloperDto: CreateDeveloperDto): Promise<DeveloperDto> {
    return this.developerService.createDeveloper(createDeveloperDto);
  }

  @Get(':id')
  async findOne(@Param() findOneDeveloperDto: FindOneDeveloperDto): Promise<DeveloperDto> {
    return this.developerService.findDeveloper(findOneDeveloperDto);
  }

  @Get()
  async findMany(@Query() findManyDeveloperDto?: FindManyDeveloperDto): Promise<DeveloperDto[]> {
    return this.developerService.findDevelopers(findManyDeveloperDto);
  }

  @Put(':id')
  async update(@Param() findOneDeveloperDto: FindOneDeveloperDto, @Body() updateDeveloperDto: UpdateDeveloperDto): Promise<DeveloperDto> {
    return this.developerService.updateDeveloper(findOneDeveloperDto, updateDeveloperDto);
  }

  @Delete(':id')
  async delete(@Param() deleteOneDeveloperDto: DeleteOneDeveloperDto) {
    return this.developerService.deleteDeveloper(deleteOneDeveloperDto);
  }

  @Delete()
  async deleteMany(@Query() deleteManyDeveloperDto: DeleteManyDeveloperDto) {
    return this.developerService.deleteDevelopers(deleteManyDeveloperDto);
  }

  @Post('set/status')
  async setStatatusDevelopers(@Body() setDeveloperStatusDto: SetDeveloperStatusDto) {
    return this.developerService.setDeveloperStatus(setDeveloperStatusDto);
  }

  @Put(':id/assign/assets')
  async assignAssets(@Param() findOneDeveloperDto: FindOneDeveloperDto, @Body() assignResourceDto: AssignResourceDto): Promise<(AssetDto | LicenseDto)[]> {
    return this.developerService.assignResource(findOneDeveloperDto, assignResourceDto, 'assets');
  }

  @Put(':id/assign/licenses')
  async assignLicenses(@Param() findOneDeveloperDto: FindOneDeveloperDto, @Body() assignResourceDto: AssignResourceDto): Promise<(AssetDto | LicenseDto)[]> {
    return this.developerService.assignResource(findOneDeveloperDto, assignResourceDto, 'licenses');
  }

  @Put(':id/revoke/assets')
  async revokeAssets(@Param() findOneDeveloperDto: FindOneDeveloperDto, @Body() revokeResourceDto: RevokeResourceDto): Promise<(AssetDto | LicenseDto)[]> {
    return this.developerService.revokeResource(findOneDeveloperDto, revokeResourceDto, 'assets');
  }

  @Put(':id/revoke/licenses')
  async revokeLicenses(@Param() findOneDeveloperDto: FindOneDeveloperDto, @Body() revokeResourceDto: RevokeResourceDto): Promise<(AssetDto | LicenseDto)[]> {
    return this.developerService.revokeResource(findOneDeveloperDto, revokeResourceDto, 'licenses');
  }
}
