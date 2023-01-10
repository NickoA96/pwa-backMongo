import mongoose from "mongoose";
import { Schema } from "mongoose";

const clientesSchema = new Schema({
    nombre: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    
    },
    {
    collection: "clientes",
    },
);



export default mongoose.model("ClientesModel", clientesSchema);

