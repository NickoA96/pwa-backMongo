import express from 'express';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import db from './db/db.js';

const PORT = process.env.PORT 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import productRoutes from './routes/Product.routes.js';
import clientesRoutes from './routes/Clientes.routes.js';


const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use (express.static(path.join(__dirname, 'public')));

    //configurar middleware multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage: storage})

const uploadFile = upload.single('img');
    //-------------------//


app.use ('/', productRoutes);
app.use ('/', clientesRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

