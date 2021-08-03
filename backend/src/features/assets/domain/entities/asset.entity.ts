import { AutoMap } from '@automapper/classes';
import { Developer } from 'src/features/developers/domain/entities/developer.entity';
import { AssetType } from 'src/features/_shared/domain/assets/asset.enum';
import { Persistable } from 'src/features/_shared/domain/persistable';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Asset extends Persistable {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  brand: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  model: string;

  @AutoMap()
  @Column({ type: 'enum', enum: AssetType, nullable: false, unique: false })
  type: AssetType;

  @ManyToMany(() => Developer, (developer) => developer.assets)
  developers: Developer[];
}
