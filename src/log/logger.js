const { addColors, createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, errors, printf } = format;
const config = require('./config');

addColors(config.colors);
const myFormat = printf( ({ level, message, timestamp , ...metadata}) => {
  let msg = `${timestamp} [${level}] : ${message} `  
  if(metadata) {
	  msg += JSON.stringify(metadata)
  }
  return msg
});

const logger = createLogger({
  levels: config.levels,
  format: combine(
    errors({ stack: true }),
    format.colorize({all: true}),
    format.splat(),
    format.json(),
    timestamp(),
    myFormat
  ),
});

if (process.env.NODE_ENV !== 'production') {

  logger.add(new transports.Console({
  }));
}

module.exports = logger