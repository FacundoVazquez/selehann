import * as mongoose from 'mongoose';

/*
const uri = 'mongodb+srv://admin:admin@cluster0.ohs1t.mongodb.net/test?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(async (err) => {
    const users = client.db('test').collection('users');
    //await users.insertOne({ hello: 'world' }).then((r) => console.log(r));
    // perform actions on the collection object
    client.close();
  });
  */

/* 
const uri = 'mongodb+srv://admin:admin@cluster0.ohs1t.mongodb.net/test';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(uri, { useNewUrlParser: true }).then((mongoose) => {
        console.log('Connection ready! *******************************');
        return mongoose;
      }),
  },
];
 */
