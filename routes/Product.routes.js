import express from 'express';
const router = express.Router();


import { getProducts,  deleteProduct, createProduct, getProductById, updateProduct, createProduct2 } from '../controllers/products.controllers.js';

router.get('/clientes', getProducts);
router.get ('/clientes/:id', getProductById);
router.post('/clientes', createProduct2 );
router.put('/clientes/:id', updateProduct);
router.delete('/clientes/:id', deleteProduct);



export default router;

