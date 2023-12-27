'use strict';

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);

/**
 * Establish database connection
 */
async function establishConnection() {
  await mongoClient.connect();

  return mongoClient.db('test').collection('simple');
}

module.exports = { establishConnection };
