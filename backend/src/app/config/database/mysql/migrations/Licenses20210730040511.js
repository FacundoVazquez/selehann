const fs = require('fs');

class Licenses20210730050511 {
  async up(queryRunner) {
    const data = fs.readFileSync(__dirname + '/../../_seeds/data/licenses.json').toString();

    const seed = JSON.parse(data);

    await queryRunner.manager.save('License', seed);
  }

  async down(queryRunner) {
    queryRunner.dropTable('License');
  }
}

module.exports = {
  Licenses20210730050511,
};
