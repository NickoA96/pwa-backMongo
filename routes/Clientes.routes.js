import express from 'express';
const router = express.Router();

// Controllers
import {  createCliente, getClienteById, getClientes, deleteCliente, updateCliente,loginJWT, isAuth } from '../controllers/clientes.controllers.js';

router.get('/', getClientes);
router.get ('/:id', getClienteById);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);
router.post('/login', loginJWT);
router.get('/admin', isAuth);



export default router;
