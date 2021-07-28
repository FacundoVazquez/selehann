import { removeUndefinedProperties } from '../../utils/objects.utils';

export async function normalizeQuery() {
  const { id, ...rest } = this.getQuery() || {};
  const filter = removeUndefinedProperties({ _id: id, ...rest });
  this.setQuery(filter);
}
