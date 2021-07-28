export function parseBoolean(value: unknown, strict = true) {
  const stringValue = value?.toString()?.toLowerCase();

  if (strict && stringValue !== 'true' && stringValue !== 'false') throw new Error(`Unable to parse value (${value}) to boolean type`);

  return stringValue === 'true';
}
