import { AutoMap } from '@automapper/classes';
import { Developer } from 'src/features/developers/domain/entities/developer.entity';
import { Persistable } from 'src/features/_shared/domain/persistable';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class License extends Persistable {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  software: string;

  @ManyToMany(() => Developer, (developer) => developer.licenses)
  developers: Developer[];
}
