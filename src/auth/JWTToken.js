const jwt = require('jsonwebtoken')
require('dotenv').config();
const sign = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY);
  return token;
}
const verify = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
}

module.exports = {
  sign,
  verify
}