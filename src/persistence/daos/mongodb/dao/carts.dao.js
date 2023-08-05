import { CartModel } from "../models/carts.model.js";
import {logger} from "../../../../utils/logger.js";

export default class CartDaoMongoDB {
  async getAllCarts() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      logger.error("Error al traer todos los carritos en mongodb")
    }
  }
  async getCartById(id) {
    try {
      const response = await CartModel.findById(id);
      return response.populate("products");
    } catch (error) {
      logger.error("Error al traer carrito por ID en mongodb")
    }
  }

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      logger.error("Error al crear carritos en mongodb")
    }
  }

  async updateCart(id, obj) {
    try {
      await CartModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      logger.error("Error al actualizar un carrito en mongodb")
    }
  }

  async deleteCart(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      logger.error("Error al eliminar un carrito en mongodb")
    }
  }
}