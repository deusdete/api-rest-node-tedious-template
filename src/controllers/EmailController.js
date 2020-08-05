const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
  // pool: true,
  host: process.env.SMTP_HOST, 
  port: 465,
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS 
  },
  // tls: {
  //   rejectUnauthorized: false
  // }
});


module.exports = transport;
