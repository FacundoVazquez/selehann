/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');

module.exports = {
  async up(db, client) {
    const data = fs.readFileSync(__dirname + '/../../seeds/data/roles.json');
    const plainObject = JSON.parse(data);

    await db.collection('roles').insertMany(plainObject);
  },

  async down(db, client) {
    await db.collection('roles').drop();
  },
};

/* 
import fs from 'fs';
import classTransformer from 'class-transformer';

import { MigrationInterface } from 'mongo-migrate-ts';
import { Db } from 'mongodb';
import { Role } from 'src/features/users/domain/entity/role.entity';

export class MyMigration implements MigrationInterface {
  async up(db: Db): Promise<any> {
    console.log('up...........');
    const data = fs.readFileSync(__dirname + '/../../seeds/data/roles.json', 'utf-8');
    const plainObject = JSON.parse(data);
    const roles = classTransformer.plainToClass(plainObject, Role);

    console.log(plainObject);
    //   console.log(roles);

    await db.collection('roles').insertMany(roles as any);
  }

  async down(db: Db): Promise<any> {
    await db.collection('roles').drop();
  }
} */

/* const fs = require('fs');
//const classTransformer = require('class-transformer');
const Role = require('src/features/users/domain/entity/role.entity.ts');
import { RoleDocument } from 'src/features/users/infrastructure/repository/mongodb/schemas/role.schema';

module.exports = {
  async up(db, client) {
    console.log('up...........');
    const data = fs.readFileSync(__dirname + '/../../seeds/data/roles.json', 'utf-8');
    const plainObject = JSON.parse(data);
    //   const roles = classTransformer.plainToClass(plainObject, Role);

    new RoleDocument() {
      Role
    }

    console.log(plainObject);
    //   console.log(roles);

    await db.collection('roles').insertMany(plainObject);
  },

  async down(db, client) {
    await db.collection('roles').deleteMany();
  },
};
 */
