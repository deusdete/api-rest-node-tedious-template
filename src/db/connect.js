const Connection = require('tedious').Connection;
require('dotenv').config();
const logger = require('../log/logger')

const config = {
  server: process.env.SERVER_IP,
  authentication: {
    type: 'default',
    options:{
      userName: process.env.USER,
      password: process.env.PASS
    }
  },
  options: {
    database: process.env.DATABASE,
    port: 10025,
    trustServerCertificate: true,
    rowCollectionOnDone: true,
    useColumnNames: false,
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
    useUTC: false,
    language: 'portuguese',
    datefirst:1,
    dateFormat: 'dmy',
    debug:{
      packet: true,
      data: true,
      payload: true,
    },
    maxRetriesOnTransientErrors: 5,
    requestTimeout: 300000
  }
}
const connection = new Connection(config);
connection.on('connect', function (err) {
  logger.info('Conectando ao banco de dados...')
  if(err) { 
    logger.error('Database connection error:', err)
  }
  else logger.info('Conectado')
})
module.exports = connection;