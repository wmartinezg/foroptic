import mongoose from "mongoose";
import validate from 'mongoose-validator';

const ServicioSchema = mongoose.Schema({
    codigoServicio: {
        type: String,
        unique: true,
        required: [true, "El código es requerido"],
        validate: 
            validate({
                validator: 'isLength',
                arguments: [1,3],
                message: 'El contrato debe contener entre {ARGS[0]} y {ARGS[1]} caracteres'
            }),
    },
    nombreResumido: String,
    descripcionServicio: String,
    subclaseserv: {
        type:{},
        required: true
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

const servicioModel = mongoose.model('servicios', ServicioSchema); //servicios es la coleccion en la bd
export default servicioModel;