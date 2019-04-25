import winston from 'winston';

const { NODE_ENV, LOG_LEVEL } = process.env;
const DEV = NODE_ENV !== 'production';
const TEST = NODE_ENV === 'test';
const level = LOG_LEVEL || (TEST ? 'test' : 'info');
// const { combine, timestamp, label, printf } = format;

// var options = {
//     file: {
//       level: 'info',
//       filename: `./logs/app.log`,
//       handleExceptions: true,
//       json: true,
//       maxsize: 5242880, // 5MB
//       maxFiles: 5,
//       colorize: false,
//     },
//     console: {
//       level: 'debug',
//       handleExceptions: true,
//       json: false,
//       colorize: true,
//     },
//   };
  
//   // instantiate a new Winston Logger with the settings defined above
//   var logger = new winston.Logger({
//     transports: [
//       new winston.transports.File(options.file),
//       new winston.transports.Console(options.console)
//     ],
//     exitOnError: false, // do not exit on handled exceptions
//   });
  
//   // create a stream object with a 'write' function that will be used by `morgan`
//   logger.stream = {
//     write: function(message, encoding) {
//       // use the 'info' log level so the output will be picked up by both transports (file and console)
//       logger.info(message);
//     },
//   };
  


export const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level,
        colorize: DEV
      })
    ]
  });
