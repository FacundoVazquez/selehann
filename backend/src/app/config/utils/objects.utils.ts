import { Dictionary } from '@automapper/types';
import { pickBy } from 'lodash';

export function removeUndefinedProperties(obj: Dictionary<unknown>) {
  return pickBy(obj, (v) => v !== undefined);
}
