import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import db from './db/db.js';

import productRoutes from './routes/Product.routes.js';
import clientesRoutes from './routes/Clientes.routes.js';


const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use ('/productos', productRoutes);
app.use ('/clientes', clientesRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

