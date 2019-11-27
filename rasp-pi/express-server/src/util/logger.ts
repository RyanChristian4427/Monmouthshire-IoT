import winston from 'winston';

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: 'error'
        }),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' })
    ]
};

const logger = winston.createLogger(options);

export default logger;
