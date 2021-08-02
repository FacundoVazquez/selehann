import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddAssetsDto } from 'src/features/developers/application/dto/add-assets.dto';
import { AddLicensesDto } from 'src/features/developers/application/dto/add-license.dto';
import { DeveloperService } from 'src/features/developers/application/service/developer.service';
import {
  CreateDeveloperDto,
  DeleteManyDeveloperDto,
  DeleteOneDeveloperDto,
  FindManyDeveloperDto,
  FindOneDeveloperDto,
  UpdateDeveloperDto,
  DeveloperDto,
} from '../../../application/dto';

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
  async findMany(@Query() findManyDeveloperDto: FindManyDeveloperDto): Promise<DeveloperDto[]> {
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

  @Put(':id/assign/assets')
  async assignAssets(@Param() findOneDeveloperDto: FindOneDeveloperDto, @Body() addAssetsDto: AddAssetsDto): Promise<DeveloperDto> {
    return this.developerService.addAssets(findOneDeveloperDto, addAssetsDto);
  }

  @Put(':id/assign/licenses')
  async assignLicense(@Param() findOneDeveloperDto: FindOneDeveloperDto, @Body() addLicensesDto: AddLicensesDto): Promise<DeveloperDto> {
    return this.developerService.addLicenses(findOneDeveloperDto, addLicensesDto);
  }
}
