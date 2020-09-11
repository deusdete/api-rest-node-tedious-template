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
    useColumnNames: false
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