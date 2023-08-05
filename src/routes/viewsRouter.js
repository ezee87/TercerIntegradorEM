import { Router } from 'express';
import { getAllProductsCtr } from "../controllers/products.controllers.js";
import UserDao from '../persistence/daos/mongodb/dao/user.dao.js'
import { logger } from '../utils/logger.js'
const userDao = new UserDao()

const router = Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/local', (req, res) => {
  res.render('local');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/error-register', (req, res) => {
  res.render('errorRegister');
});

router.get('/error-login', (req, res) => {
  res.render('errorLogin');
});

router.get("/profile", async (req, res, next) => {
  try {
    const products = await getAllProductsCtr(req, res, next); // Obtener los productos

    res.render('profile', { products }); // Pasar directamente el array de productos
  } catch (error) {
    logger.error("Error al traer los productos para mostrar en /profile")
  }
});

router.get('/jwt', (req, res) => {
  res.render('jwt')
});

router.get("/loggerTest", (req, res) => {
  logger.error("Error en el endpoint de prueba");
  logger.info("Info en el endpoint de prueba")
  logger.debug("Debug en el endpoint de prueba")
});

export default router;
