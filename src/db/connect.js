const Connection = require('tedious').Connection;
require('dotenv').config();

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
  if(err) console.error('Database connection error: ',err);
  else console.log('Connected');
})
module.exports = connection;