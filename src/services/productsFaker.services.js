import { ProductsModel } from '../persistence/daos/mongodb/models/products.model.js';
import {generateProduct} from '../utils/productsFaker.utils.js';
import {logger} from "../utils/logger.js"

export const createProductsFakerMock = async (cant = 100) => {
  const productsArray = []
  for (let i = 0; i < cant; i++) {
    const product = generateProduct();
    productsArray.push(product);
  }
  const products = await ProductsModel.create(productsArray)
  return products;
};

export const getProductsFaker = async() => {
  try {
    const products = await ProductsModel.find({});
    return products;
  } catch (error) {
    logger.error("Error en el servicio de traer productos faker")
  }
};