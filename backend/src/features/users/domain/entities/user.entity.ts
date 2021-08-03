import { AutoMap } from '@automapper/classes';
import { hashPassword } from 'src/app/config/crypto';
import { BaseEntity } from 'src/features/_shared/domain/base-entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { HashPasswordException } from '../user.exceptions';
import { Role } from './role.entity';

@Entity()
export class User extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  salt: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @AutoMap()
  @RelationId((user: User) => user.role)
  @Column()
  roleId: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    // Attempt to hash password
    try {
      const { hash: password, salt } = hashPassword(this.password);

      this.password = password;
      this.salt = salt;
    } catch (err) {
      throw new HashPasswordException(err);
    }
  }
}
