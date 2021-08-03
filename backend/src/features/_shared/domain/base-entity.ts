import { AutoMap } from '@automapper/classes';
import { IEntity } from 'src/app/interfaces';
import { Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Persistable } from './persistable';

export abstract class BaseEntity extends Persistable implements IEntity {
  @AutoMap()
  /*  @PrimaryColumn() */
  /*  @Generated('uuid') */
  @PrimaryGeneratedColumn()
  id: string;
}
