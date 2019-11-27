import winston from 'winston';

const logFormat = winston.format.printf((log) => {
    return `${log.level}: ${JSON.stringify(log.message, null, 4)}`;
});

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(winston.format.colorize(), logFormat)
        }),
    ]
};

const logger = winston.createLogger(options);

export default logger;
