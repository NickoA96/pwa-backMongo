import ClientesModel from "../models/clientesModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {promisify} from "util";
dotenv.config();



//** metodos para el login **//


// Login con JWT //
export const loginJWT = async (req, res) => {
    const {email, password} = req.body;
    const cliente = await ClientesModel.findOne({email
    });
    if (!cliente) {
        res.json({"message": 'El usuario no se encuentra registrado'});
        return;
    }
    const validacion =  bcrypt.compareSync(password, cliente
        .password);
    if (!validacion) {
        return res.send ({"message": 'Contraseña incorrecta'});
    }
    const token = jwt.sign({
        id: cliente.id,
        email: cliente.email,
        nombre: cliente.nombre
    }, process.env.JWT_SECRETO, {
        expiresIn: '1h'
    });
    res.send ({token});
}

// autenticacion con JWT //
export const isAuth = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.send ({"message": 'No autorizado'});
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETO);
        const cliente = await ClientesModel.findById (decoded.id);
        if (!cliente) {
            return res.send ({"message": 'No autorizado'});
        }
        res.send ({"message": 'Autorizado'});
    } catch (error) {
        // console.log(error);
    }
}


//** metodos para el crud **//

//mostrar todos los clientes
export const getClientes = async (req, res) => {
    try {
        const clientes = await ClientesModel.find();
        res.json(clientes);
    } catch (error) {
        // console.log(error);

    }
}

//mostrar un cliente por id
export const getClienteById = async (req, res) => {
    try {
        const id = req.params.id;
        await ClientesModel.findById({_id : id}).then((cliente) => {
        res.status(200).json(cliente);
        });
    } catch (error) {
        res.json({message:"No se encontro el producto"});
    }
}

//crear un cliente
export const createCliente = async (req, res) => {
    try {
        const {email, password, nombre} = req.body;
        //comprobar si existe el email del cliente ya esta registrado sin findone
        const cliente = await ClientesModel.findOne({email
        });
        if (cliente) {
            res.json({"message": 'El usuario ya existe'});
            return;
        }
        //encriptar el password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await ClientesModel.create({
            email,
            password: hash,
            nombre
        });
        res.json({"message": 'Cliente creado'});
    } catch (error) {
        res.json(error);
    }
}

//actualizar un cliente
export const updateCliente = async (req, res) => {
    try {
        const {email, password, nombre} = req.body;
        const id = req.params.id;
        //comprobar si el email ya esta registrado con otro id de cliente
        const cliente = await ClientesModel.findOne({email, _id: {$ne: id}});
        if (cliente) {
            res.json({"message": 'El email ya esta registrado con otro usuario'});
            return;
        }
        //encriptar el password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await ClientesModel.updateOne({_id : id}, {
            email,
            password: hash,
            nombre
        });
        res.json({"message": 'Cliente actualizado'});
    } catch (error) {
        res.json(error);
    }
}


//eliminar un cliente
export const deleteCliente = async (req, res) => {
    //comprobar si existe el cliente
    try {
        const id = req.params.id;
        const cliente = await ClientesModel.findById({_id : id});
        if (!cliente) {
            res.json({"message": 'El usuario no existe'});
            return;
        }
        await ClientesModel.deleteOne({_id : id});
        res.json({"message": 'Usuario eliminado'});
    } catch (error) {
        res.json(error);
    }
}




