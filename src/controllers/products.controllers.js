import Controllers from "./class.controllers.js";
import ProductService, {
  addProductToCartService,
} from "../services/products.services.js";
import { createResponse } from "../utils.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

const productService = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }

  getProdById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getProdById(id);
      if (!item) return httpResponse.Ok(res, "Producto eliminado");
      else return httpResponse.Ok(res, item);
    } catch (error) {
      next(error);
    }
  };

  createProd = async (req, res, next) => {
    try {
      const newItem = await this.service.createProd(req.body);
      if (!newItem) return httpResponse.NotFound(res, "Validacion erronea!");
      else return httpResponse.Ok(res, newItem);
    } catch (error) {
      next(error.message);
    }
  };

  addProductToCartCtr = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { prodId } = req.params;
      const newProduct = await addProductToCartService(cartId, prodId);
      res.json(newProduct);
    } catch (error) {
      next(error);
    }
  };
}

/* export const getAllProductsCtr = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await service.getAllProductsService(page, limit);
    // res.json(response);
    const nextPage = response.hasNextPage
      ? `http://localhost:8080/products?page=${response.nextPage}`
      : null;
    const prevPage = response.hasPrevPage
      ? `http://localhost:8080/products?page=${response.prevPage}`
      : null;
    res.json({
      results: response.docs,
      info: {
        count: response.totalDocs,
        pages: response.totalPages,
        next: nextPage,
        prev: prevPage,
      },
    });
  } catch (error) {
    next(error);
  }
};
 */

export const getAllProductsCtr = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await service.getAllProductsService(page, limit);
    const products = response.docs; // Obtener los productos de la respuesta

    return products;
  } catch (error) {
    next(error);
  }
};

export const updateProductCtr = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    const { name, description, price, stock } = req.body;
    await service.getProductByIdService(prodId);
    const docUpd = await service.updateProductService(prodId, {
      name,
      description,
      price,
      stock,
    });
    res.json(docUpd);
  } catch (error) {
    next(error);
  }
};
export const deleteProductCtr = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    await service.deleteProductService(prodId);
    return httpResponse.Ok(res, "Item eliminado");
  } catch (error) {
    next(error);
  }
};

export const delProductCartController = async (req, res, next) => {
  try {
    const { cartId, prodId } = req.params;
    const product = await service.deleteProductCartService(cartId, prodId);
    if (product) {
      return httpResponse.Ok(res, "Item eliminado");
    } else {
      return httpResponse.NotFound(res, "Item no encontrado!");
    }
  } catch (error) {
    next(error);
  }
};

export const filtrarPorCategorias = async (req, res, next) => {
  try {
    const { category } = req.query
    const response = await service.filtrarPorCategorias(category);
    res.json(response);
  } catch (error) {
    next(error)
  }
}

export const ordenarPorPrecios = async (req, res, next) => {
  try {
    const response = await service.ordenarPorPrecios();
    res.json(response);
  } catch (error) {
    next(error)
  }
}