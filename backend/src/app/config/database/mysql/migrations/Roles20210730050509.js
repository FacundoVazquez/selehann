const fs = require('fs');

class Roles20210730050509 {
  async up(queryRunner) {
    const data = fs.readFileSync(__dirname + '/../../_seeds/data/roles.json').toString();

    const seed = JSON.parse(data);

    await queryRunner.manager.save('Role', seed);
  }

  async down(queryRunner) {
    queryRunner.dropTable('Role');
  }
}

module.exports = {
  Roles20210730050509,
};
