import mongoose from 'mongoose';
import config from '../config.js'
import { logger } from '../utils/logger.js'

let MONGO_URL = '';

switch (config.NODE_ENV) {
    case 'dev':
        MONGO_URL = config.MONGO_LOCAL;
        logger.info("Entorno de produccion dev")
        break;
    case 'qa':
        MONGO_URL = config.MONGO_QA;
        logger.info("Entorno de produccion qa")
        break;
    case 'prod':
        MONGO_URL = config.MONGO_PROD;
        logger.info("Entorno de produccion prod")
        break;
    default:
        MONGO_URL = config.MONGO_PROD;
        logger.info("Entorno de produccion prod")
        break;
}

try {
    await mongoose.connect(MONGO_URL);
} catch (error) {
    logger.error("Error al conectar al servidor Moongose")
}