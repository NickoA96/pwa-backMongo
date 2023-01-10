import express from 'express';
const router = express.Router();

// Controllers
import {  createCliente, getClienteById, getClientes, deleteCliente, updateCliente,loginJWT, isAuth } from '../controllers/clientes.controllers.js';

router.get('/clientes', getClientes);
router.get ('/clientes/:id', getClienteById);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);
router.post('/clientes/login', loginJWT);
router.get('/clientes/admin', isAuth);



export default router;
