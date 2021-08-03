export interface IPersistable {
  createdAt: Date;
  updatedAt: Date;
}

export interface IEntity extends IPersistable {
  id: string;
}

export type Id = IEntity['id'];

export interface ObjectLiteral {
  [key: string]: any;
}
