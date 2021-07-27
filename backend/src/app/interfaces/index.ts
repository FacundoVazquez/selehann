export interface Persistable {
  createdAt: string;
  updatedAt: string;
}

export interface Entity extends Persistable {
  id: string;
}

export interface ObjectLiteral {
  [key: string]: any;
}

export type Id = Entity['id'];

export interface IRepository<T extends Entity> {
  create(entity: Partial<T>): Promise<T>;
  findOne(entity: Partial<T>): Promise<T>;
  findMany(entity: Partial<T>): Promise<T[]>;
  update(id: Id, entity: Partial<T>): Promise<T>;
  delete(id: Id): Promise<boolean>;
  deleteMany(entity: Partial<T>): Promise<boolean>;
}
