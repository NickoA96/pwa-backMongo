import ProductModel from "../models/productsModel.js";

import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//** configuracion de multer **//

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage})

export const uploadFile = upload.single('img');



//** metodos para el crud **//

//mostrar todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        // console.log(error);
    }
}
//mostrar un producto por id

export const getProductById = async (req, res) => {

    try {
        const id = req.params.id;
        await ProductModel.findById ({_id:id}).then((product) => {
            res.status(200).json(product);
        });
    } catch (error) {
        res.json({message:"No se encontro el producto"});
    }
}


//crear un producto


export const createProduct = async (req, res) => {
    //subir la imagen a la carpeta public y guardar la ruta en la base de datos
    uploadFile(req, res, async (error) => {
        if (error) {
            res.json(error);
        } else {
            try {
                const {nombre, descripcion, precio, cantidad} = req.body;
                const img = req.file.filename;
                await ProductModel.create({
                    nombre,
                    img,
                    descripcion,
                    precio,
                    cantidad
                });
                res.json({"message": 'Producto creado'});
            } catch (error) {
                res.json(error);
            }
        }
    })
}


//actualizar un producto

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await ProductModel.updateOne( {_id :id }, req.body).then( res => {
            // console.log(res);
        });
        res.json({"message": 'Producto actualizado'});
    } catch (error) {
        res.json(error);
    }
}

//borrar un producto

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await ProductModel.deleteOne({_id :id }).then( res => {
            // console.log(res);
        });
        res.json({"message": 'Producto eliminado'});
    } catch (error) {
        res.json(error);
    }
}



