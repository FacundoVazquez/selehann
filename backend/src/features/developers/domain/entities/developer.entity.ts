import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/features/_shared/domain/base-entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Asset } from '../../../assets/domain/entities/asset.entity';
import { License } from '../../../licenses/domain/entities/license.entity';

@Entity()
export class Developer extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  fullname: string;

  @AutoMap()
  @Column({ type: 'boolean', nullable: false, default: true })
  active: boolean;

  @ManyToMany(() => Asset, (asset) => asset.id, { eager: true, cascade: true })
  @JoinTable({ name: 'DeveloperAssetMap', joinColumn: { name: 'developerId' }, inverseJoinColumn: { name: 'assetId' } })
  assets: Asset[];

  @ManyToMany(() => License, (license) => license.id, { eager: true, cascade: true })
  @JoinTable({ name: 'DeveloperLicenseMap', joinColumn: { name: 'developerId' }, inverseJoinColumn: { name: 'licenseId' } })
  licenses: License[];
}
