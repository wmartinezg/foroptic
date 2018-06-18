import mongoose from "mongoose";
import validate from 'mongoose-validator';

const UsuarioSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "El campo usuario es requerido"],
        validate: 
            validate({
                validator: 'isEmail',
                message: 'Por favor digite un email válido'
            }),
    },
    nombreUsuario: {
        type: String,
        validate:
            validate({
                validator: 'isLength',
                arguments: [2,40],
                message: 'El nombre del usuario debe contener entre {ARGS[0]} y {ARGS[1]} caracteres'
            })
    },
    claveDeAcceso: String,
    thumbnail: String,
    perfil: {
        type:{},
        required: false
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

const usuarioModel = mongoose.model('usuarios', UsuarioSchema); //usuarios es la coleccion en la bd
export default usuarioModel;