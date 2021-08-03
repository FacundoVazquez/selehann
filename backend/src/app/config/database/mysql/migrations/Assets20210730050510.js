//const loadSeed = require('../../_seeds/database.utils.ts');
/* import { MigrationInterface, QueryRunner } from 'typeorm';
import { loadSeed } from ''; */
const fs = require('fs');

class Assets20210730050510 {
  async up(queryRunner) {
    const data = fs.readFileSync(__dirname + '/../../_seeds/data/assets.json').toString();

    const seed = JSON.parse(data);

    await queryRunner.manager.save('Asset', seed);
  }

  async down(queryRunner) {
    queryRunner.dropTable('Asset');
  }
}

module.exports = {
  Assets20210730050510,
};
