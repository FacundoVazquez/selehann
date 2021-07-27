import { Entity } from 'src/app/interfaces';
import { Document } from 'mongoose';

export abstract class BaseDocument extends Document implements Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
