import * as mongoose from 'mongoose';

export const DeveloperSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});
