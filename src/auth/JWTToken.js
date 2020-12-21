const jwt = require('jsonwebtoken')
require('dotenv').config();
const sign = (data, env) => {
  const token = jwt.sign(data, env);
  return token;
}
const verify = (token, env) => {
  const decoded = jwt.verify(token, env);
  return decoded;
}

module.exports = {
  sign,
  verify
}