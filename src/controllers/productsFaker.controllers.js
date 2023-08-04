import * as productsFakerService from "../services/productsFaker.services.js";

export const createProductsFaker = async (req, res) => {
  const { cant } = req.query;
  try {
    const response = await productsFakerService.createProductsFakerMock(cant);
    res.status(200).json({ users: response });
  } catch (error) {
    console.log(error);
  }
};

export const getProductsFaker = async (req, res) => {
  try {
    const response = await productsFakerService.getProductsFaker();
    res.status(200).json({ users: response });
  } catch (error) {
    console.log(error);
  }
};