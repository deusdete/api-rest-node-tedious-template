module.exports = function(data, error, status = 500){
  if(error){
    return {
      errors: error,
      status: status
    };
  }
  else
  return data;
}