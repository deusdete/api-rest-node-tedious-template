const response = require('../shared/response');
const dbContext = require('../db/dbContext');
const TYPES = require('tedious').TYPES;
const { validateLogin, validateRegistration } = require('../utils/validators');

module.exports = {
  async login (req, res) {
    let params = []
    const { email, password } = req.body;
    const { valid, erros } = validateLogin({email, password});

    if(!valid) return res.status(400).json(erros);

    //As an example, this procedure uses two fields @email and @password to login
    params.push({name: 'email', type: TYPES.VarChar, val: email});
    params.push({name: 'password', type: TYPES.VarChar, val: senha});

    dbContext.post('LoginProcedure', params, (err, data) => {
      if(err) return res.status(500).json(response(data, err));
      return res.json({...data[0]});
    }) 
  },

  async signup (req, res) {
    let params = []
    const data = req.body;
    const { valid, erros } = validateRegistration(data);

    if(!valid) return res.status(400).json(erros);

    //As an example, this procedure uses an @json field containing the user information for registration
    const jsonData = JSON.stringify(data);
    params.push({name: 'json', type: TYPES.VarChar, val: jsonData});
  
    dbContext.post('SignupProcedure', params, (err, data) => {
      if(err) return res.status(500).json(response(data, err));
      return res.json({...data[0]});
    }) 
  }
}