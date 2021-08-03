import { IPersistable } from 'src/app/interfaces';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

export abstract class Persistable implements IPersistable {
  @CreateDateColumn({ type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
