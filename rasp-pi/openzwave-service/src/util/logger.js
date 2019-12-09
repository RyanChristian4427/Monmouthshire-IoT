import winston from 'winston';

const logFormat = winston.format.printf((log) => {
    return `${log.level}: ${JSON.stringify(log.message, null, 4)}`;
});

const options = {
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(winston.format.colorize(), logFormat)
        }),
        new winston.transports.File({
			filename: '/home/pi/logs/iot/app.log',
            level: 'info',
            format: winston.format.combine(winston.format.colorize(), logFormat),
            timestamp: true
        }),
    ]
};

const logger = winston.createLogger(options);

export default logger;
