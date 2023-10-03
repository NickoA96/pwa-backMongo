import mongoose from 'mongoose';
import dotenv from 'dotenv';
mongoose.set('strictQuery', false);
dotenv.config();


const URL = process.env.MONGOATLAS

const db = mongoose.connect(URL)

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to ' + URL)
// })

// mongoose.connection.on('error', (err) => {
//     console.log('Mongoose connection error: ' + err)
// })


export default db;

