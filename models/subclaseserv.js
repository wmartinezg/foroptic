import mongoose from "mongoose";

const SubclaseServSchema = mongoose.Schema({
    codigoSubclaseServ: String,
    descrSubclaseServ: String,
    claseserv: {
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

const subclaseServModel = mongoose.model('subclasesserv', SubclaseServSchema); //subclasesserv es la coleccion en la bd
export default subclaseServModel;