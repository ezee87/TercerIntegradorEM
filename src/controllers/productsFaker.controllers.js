import * as productsFakerService from "../services/productsFaker.services.js";
import { logger } from '../utils/logger.js'

export const createProductsFaker = async (req, res) => {
  const { cant } = req.query;
  try {
    const response = await productsFakerService.createProductsFakerMock(cant);
    res.status(200).json({ users: response });
  } catch (error) {
    logger.error("Error al crear productos faker")
  }
};

export const getProductsFaker = async (req, res) => {
  try {
    const response = await productsFakerService.getProductsFaker();
    res.status(200).json({ users: response });
  } catch (error) {
    logger.error("Error al traer productos faker")
  }
};