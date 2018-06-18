import mongoose from "mongoose";

const PerfilSchema = mongoose.Schema({
    nombrePerfil: String,
    fechaCreate: {
        type: String,
        default: new Date
    },
    usuarioCreate: {
        type:{},
        required: true
    }
});

const perfilModel = mongoose.model('perfiles', PerfilSchema); //perfiles es la coleccion en la bd
export default perfilModel;