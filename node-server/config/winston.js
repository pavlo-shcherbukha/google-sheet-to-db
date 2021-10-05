//var appRoot = require('app-root-path');
var winston = require('winston');
const { createLogger, format, transports } = require('winston');

const { combine, timestamp,  printf, json } = format;
//const { combine, timestamp,  printf, json } = jformat;
const myFormat = combine(  timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
                           printf(({ level, message, label, state,timestamp }) => {
                                 return `[${timestamp}] [${level}] [${label}] [${state}] ${message}`;
                                 })
                        );

const jFormat =  combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),json());

const lhostname = process.env.HOSTNAME||'localhost' ;


// define the custom settings for each transport (file, console)
//hostname
var options = {
  file: {
    level: 'info',
    filename: './logs/app-' + lhostname + '.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: jFormat,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: myFormat,
  },
};



// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({


  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;