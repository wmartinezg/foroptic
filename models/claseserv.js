import mongoose from "mongoose";

const ClaseServSchema = mongoose.Schema({
    codigoClaseServ: String,
    descrClaseServ: String,
    fechaCreate: {
        type: String,
        default: new Date
    },
    usuarioCreate: {
        type:{},
        required: true
    }
});

const claseServModel = mongoose.model('clasesserv', ClaseServSchema); //clasesserv es la coleccion en la bd
export default claseServModel;