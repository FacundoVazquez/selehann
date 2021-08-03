import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseMapping } from '../../application/mapping/licenses.mapping';
import { LicenseProfile } from '../../application/mapping/licenses.profile';
import { LicenseService } from '../../application/license.services';
import { License } from '../../domain/entities/license.entity';
import { LicenseController } from '../adapters/license.controller';

@Module({
  imports: [TypeOrmModule.forFeature([License])],
  controllers: [LicenseController],
  providers: [LicenseMapping, LicenseProfile, LicenseService],
  exports: [LicenseMapping, LicenseService, TypeOrmModule],
})
export class LicensesModule {}
