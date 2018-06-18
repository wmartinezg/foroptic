import mongoose from "mongoose";
import validate from 'mongoose-validator';

const ClienteSchema = mongoose.Schema({
    contrato: {
        type: String,
        unique: true,
        required: [true, "El campo contrato es requerido"],
        validate: 
            validate({
                validator: 'isLength',
                arguments: [1,10],
                message: 'El contrato debe contener entre {ARGS[0]} y {ARGS[1]} caracteres'
            }),
    },
    nombreCliente: {
        type: String,
        validate:
            validate({
                validator: 'isLength',
                arguments: [2,40],
                message: 'El nombre del cliente debe contener entre {ARGS[0]} y {ARGS[1]} caracteres'
            })
    },
    apellidoCliente: {
        type: String,
        validate:
            validate({
                validator: 'isLength',
                arguments: [2,40],
                message: 'El apellido del cliente debe contener entre {ARGS[0]} y {ARGS[1]} caracteres'
            })
    },
    ciudad: {
        type:{},
        required: true
    },
    servicios: {
        type: [],
        default: []
    },
    fechaCreate: {
        type: String,
        default: new Date
    },
    usuarioCreate: {
        type:{},
        required: true
    }
});

const clienteModel = mongoose.model('clientes', ClienteSchema); //clientes es la coleccion en la bd
export default clienteModel;