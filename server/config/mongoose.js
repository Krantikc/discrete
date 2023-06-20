const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');

const config = require('./config');

// connect to mongo db
const { user, password, host, port, db } = config.mongo;
 const mongoUri = `mongodb+srv://${user}:${password}@${host}${port ? ':' + port : ''}/${db}`;

// With +srv - port is not supported
// const mongoUri = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}/${config.mongo.db}`;

// const mongoUri = 'mongodb://ds339968.mlab.com:39968/trektale';

//  const mongoUri = 'mongodb://localhost:27017/api?retryWrites=true&ssl=false';
console.log(config.mongo.user, config.mongo.password)
mongoose.connect(mongoUri, {
  // db: config.mongo.db,
  keepAlive: 1,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  connectTimeoutMS: 40000
});
mongoose.connection.on('connected', () => {
  console.log('MongoDB Connection was successful!!!!');
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
mongoose.connection.on('diconnected', () => {
  console.log('MongoDB Connection was disconnected!!!!');
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

