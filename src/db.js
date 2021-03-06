const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const state = {
  db: null,
};

const connect = cb => {
  if (state.db) cb();
  else {
    MongoClient.connect(process.env.API_URL, mongoOptions, (err, client) => {
      // unable to get database connection pass error to CB
      if (err) cb(err);
      // Successfully got our database connection
      // Set database connection and call CB
      else {
        state.db = client.db(process.env.DB_NAME);
        cb();
      }
    });
  }
};

const getPrimaryKey = _id => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, connect, getPrimaryKey };
