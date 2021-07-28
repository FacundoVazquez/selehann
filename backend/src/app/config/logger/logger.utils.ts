import { ObjectLiteral } from 'src/app/interfaces';

export function hideSensibilityData(data: ObjectLiteral, keysToHide: string[]) {
  const result: ObjectLiteral = {};
  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
    const value = data[keys[i]];
    const newValue = keysToHide.includes(keys[i]) ? '*****' : value;
    result[keys[i]] = newValue;
  }

  return result;
}
