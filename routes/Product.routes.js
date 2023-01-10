import express from 'express';
const router = express.Router();


import { getProducts,  deleteProduct, createProduct, getProductById, updateProduct, createProduct2 } from '../controllers/products.controllers.js';

router.get('/productos', getProducts);
router.get ('/productos/:id', getProductById);
router.post('/productos', createProduct2 );
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);



export default router;

