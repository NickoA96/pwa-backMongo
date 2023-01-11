import ProductModel from "../models/productsModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//** configuracion de multer **//

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploads = multer({storage: storage})




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
    uploads.single('img');
    try {
        const product = new ProductModel(req.body);
        await product.save();
        res.json({"message": 'Producto creado'});
    } catch (error) {
        res.json(error);
    }
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



