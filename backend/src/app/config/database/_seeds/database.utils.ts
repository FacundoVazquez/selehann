import fs from 'fs';

export const loadSeed = (filename: string) => {
  const data = fs.readFileSync(__dirname + '/../../seeds/data/' + filename).toString();

  return JSON.parse(data);
};
