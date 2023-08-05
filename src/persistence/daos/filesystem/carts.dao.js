import fs from 'fs';
import { __dirname } from '../../path.js';
import {logger} from "../../../utils/logger.js"

const pathFile = 'carts.json';
const pathProductManager = 'products.json'

export const getMaxId = async () => {
  let maxId = 0;
  const carts = await getAllCarts();
  carts.map((cart) => {
    if (cart.id > maxId) maxId = cart.id;
  });
  return maxId;
};

export const getAllCarts = async() =>{
    try {
        if(fs.existsSync(pathFile)){
            const carts = await fs.promises.readFile(pathFile, 'utf-8');
            const cartsJSON = JSON.parse(carts);
            return cartsJSON; 
        } else {
            return []
        }
        
    } catch (error) {
        logger.error("Error al traer todos los carritos en filesystem")
    }
}

export const createCart = async(obj)=>{
    try {
        const cart = {
            id: await getMaxId() + 1,
            products: []
        };
        const cartsFile = await getAllCarts();
        cartsFile.push(cart);
        await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
        return cart;
    } catch (error) {
      logger.error("Error al crear carrito en filesystem")
    }
}

const getProducts = async() =>{
    const products = await fs.promises.readFile(pathProductManager, 'utf-8')
    const productsJSON = JSON.parse(products)
    return productsJSON
}

export const getCartById = async (id) => {
    try {
      const carts = await getAllCarts();
      const cart = carts.find((cart) => cart.id === parseInt(id));
      if (cart) {
        return cart;
      }
      return null;
    } catch (error) {
      logger.error("Error al traer carrito por id en filesystem")
      throw error;
    }
  };
  
  export const saveProductToCart = async (idCart, idProd) => {
    try {
      const carts = await getAllCarts();
  
      let cart;
      try {
        cart = await getCartById(idCart);
    
      } catch (error) {
        logger.error("Error al guardar un producto en carrito en filesystem")
        return;
      }
  
      if (!cart) {
        logger.error("El carrito buscado no existe en filesystem")
        return;
      }
  
      const productsFileExists = fs.existsSync(pathProductManager);
      if (!productsFileExists) {
        logger.error("El archivo products.js no existe en filesystem!")
        return;
      }
  
      const products = await getProducts();
      if (!products) {
        logger.error("No se encontraron productos en filesystem")
        return;
      }
  
      const product = products.find(product => product.id === parseInt(idProd));
      if (!product) {
        logger.error("No se encontro el producto con el ID buscado en filesystem")
        return;
      }
  
      const existingProduct = cart.products.find(product => product.id === parseInt(idProd));
      
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ id: idProd, quantity: 1 });
      }
      
      const updatedCarts = carts.map(c => {
        if (c.id === idCart) {
          return cart;
        } else {
          return c;
        }
      });
      
      await fs.promises.writeFile(pathFile, JSON.stringify(updatedCarts));
      
      return cart;
      
    } catch (error) {
      logger.error("Error al actualizar el carrito en filesystem")
      throw error;
    }

  }
    