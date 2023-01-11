import express from 'express';
const router = express.Router();


import { getProducts,  deleteProduct, createProduct, getProductById, updateProduct } from '../controllers/products.controllers.js';

router.get('/productos', getProducts);
router.get ('/productos/:id', getProductById);
router.post('/productos', createProduct );
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);



export default router;

