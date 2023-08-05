import { MessagesModel } from "./models/messages.model.js";
import {logger} from "../../../../utils/logger.js";

export default class MessagesDaoMongoDB {
  async getAllMessages() {
    try {
      const response = await MessagesModel.find({});
      return response;
    } catch (error) {
      logger.error("Error al traer todos los mensagges en mongodb")
    }
  }

  async getMessageById(id) {
    try {
      const response = await MessagesModel.findById(id);
      return response;
    } catch (error) {
      logger.error("Error al traer un message por Id en mongodb")
    }
  }

  async createMessage(obj) {
    try {
      const response = await MessagesModel.create(obj);
      return response;
    } catch (error) {
      logger.error("Error al crear un message en mongodb")
    }
  }

  async updateMessage(id, obj) {
    try {
      await MessagesModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      logger.error("Error al actualizar un message en mongodb")
    }
  }

  async deleteMessage(id) {
    try {
      const response = await MessagesModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      logger.error("Error al eliminar un message en mongodb")
    }
  }
}