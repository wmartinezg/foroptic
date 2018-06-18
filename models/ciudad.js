import mongoose from "mongoose";

const CiudadSchema = mongoose.Schema({
    codigoCiudad: String,
    nombreCiudad: String,
    fechaCreate: {
        type: String,
        default: new Date
    },
    usuarioCreate: {
        type:{},
        required: true
    }
});

const ciudadModel = mongoose.model('ciudades', CiudadSchema); //ciudades es la coleccion en la bd
export default ciudadModel;