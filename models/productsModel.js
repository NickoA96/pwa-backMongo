import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
    nombre: {type:String, required:true},
    descripcion: {type:String, required:true},
    precio: {type:String, required:true},
    img: {
        data: Buffer,
        contentType: String,
    },
    },
    {
    collection: "productos",
    }
);



export default mongoose.model("ProductModel", productSchema);



    