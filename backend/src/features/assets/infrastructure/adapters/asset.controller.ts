import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetService } from 'src/features/assets/application/asset.services';
import { AssetDto } from '../../application/dto/asset.dto';
import { FindManyAssetsByDeveloper } from '../../application/dto/find-many-assets-by-developer.dto';
import { FindManyAssetsDto } from '../../application/dto/find-many-assets.dto';

@ApiTags('Assets')
@Controller({ path: 'assets', version: '1' })
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  async findMany(@Query() findManyAssetsDto: FindManyAssetsDto): Promise<AssetDto[]> {
    console.log('aaaaaaaa');
    return this.assetService.findAssets(findManyAssetsDto);
  }

  @Get('by/developer/:id')
  async findByUser(@Param() findManyAssetsByDeveloper: FindManyAssetsByDeveloper): Promise<AssetDto[]> {
    console.log('bbbbbbbbbbbbb');
    return this.assetService.findAssetsByUser(findManyAssetsByDeveloper);
  }
}
