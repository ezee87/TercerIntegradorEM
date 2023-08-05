import mongoose from 'mongoose';
import 'dotenv/config'
import {logger} from "../../../utils/logger.js"

export const initMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_PROD || process.env.MONGO_LOCAL);
    logger.info("Conectado a la base de datos de MongoDB");
  } catch (error) {
    logger.error("Error al iniciar MongoDB")
  }
};