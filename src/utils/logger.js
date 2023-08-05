import winston from "winston";
import "winston-mongodb";
import config from '../config.js';

const getLogTransports = () => {
    const logTransports = [];

    if (config.NODE_ENV === 'prod') {
        logTransports.push(new winston.transports.Console({ level: "info" }));
    } else if (config.NODE_ENV === 'local') {
        logTransports.push(new winston.transports.File({
            filename: "./logs/logs.log",
            level: "debug",
        }));
    }

    logTransports.push(new winston.transports.File({
        filename: "./logs/errors.log",
        level: "error",
    }));

    return logTransports;
};

const logConfiguration = {
    transports: getLogTransports(),
};

const logger = winston.createLogger(logConfiguration);

logger.silly('mensaje con nivel silly');
logger.debug('mensaje con nivel debug');
logger.verbose('mensaje con nivel verbose');
logger.info('mensaje con nivel info');
logger.http('mensaje con nivel http');
logger.warn('mensaje con nivel warn');
logger.error('mensaje con nivel error');

export { logger };
