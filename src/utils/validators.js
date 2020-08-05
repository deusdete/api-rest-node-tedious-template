const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(email.match(regEx)) return true;
  else return false;
}
const isEmpty = (string) => {
  console.log(string)
  if(string.trim() === '') return true
  else return false
}

const validateRegistration = (data) => {
  let erros = {}
  if(isEmpty(data.email)){
    erros.email = 'It must not be empty';
  }else if(!isEmail(data.email)){
    erros.email =  'Must be a valid email';
  }

  if(isEmpty(data.password)){
    erros.password = 'It must not be empty'
  }else if(data.password !== data.confirmaSenha){
    erros.confirmPassword = 'Password must match'
  }

  return {
    erros,
    valid: Object.keys(erros).length === 0 ? true : false
  }
}

const validateLogin = (data) => {
  let erros = {}
  if(isEmpty(data.email)){
    erros.email = 'It must not be empty';
  }else if(!isEmail(data.email)){
    erros.email =  'Must be a valid email';
  }

  if(isEmpty(data.senha)){
    erros.password = 'It must not be empty'
  }

  return {
    erros,
    valid: Object.keys(erros).length === 0 ? true : false
  }
}

module.exports = { validateRegistration, validateLogin, isEmpty }
