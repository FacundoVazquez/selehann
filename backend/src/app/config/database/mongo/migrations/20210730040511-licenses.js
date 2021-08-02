/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');

module.exports = {
  async up(db, client) {
    const data = fs
      .readFileSync(__dirname + '/../../seeds/data/licenses.json')
      .toString()
      .replace(/"id"/g, '"_id"');

    const plainObject = JSON.parse(data);

    await db.collection('licenses').insertMany(plainObject);
  },

  async down(db, client) {
    await db.collection('licenses').drop();
  },
};
