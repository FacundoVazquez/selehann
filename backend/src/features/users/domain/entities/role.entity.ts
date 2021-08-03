import { AutoMap } from '@automapper/classes';
import { Persistable } from 'src/features/_shared/domain/persistable';
import { Column, Entity, JoinColumn, ManyToOne, RelationId, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role extends Persistable {
  @AutoMap()
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false, unique: true })
  id: string;

  @AutoMap()
  @Column({ type: 'boolean', nullable: false, default: true })
  active: boolean;

  @AutoMap()
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
