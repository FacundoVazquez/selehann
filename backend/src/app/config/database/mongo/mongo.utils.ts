import { removeUndefinedProperties } from '../../utils/objects.utils';

interface MongoUriRequiredParts {
  scheme: string;
  username: string;
  password: string;
}

export function buildMongoConnectionUri(partialUri: string, parts: MongoUriRequiredParts) {
  return partialUri.replace(/\{.+?\}/gi, (value) => {
    const chuck = value.replace('{', '').replace('}', '').toLowerCase();
    return parts[chuck];
  });
}

export async function normalizeQuery() {
  const { id, ...rest } = this.getQuery() || {};
  // console.log('getQuery', this.getQuery());
  const filter = removeUndefinedProperties({ _id: id, ...rest });
  this.setQuery(filter);
}
