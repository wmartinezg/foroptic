import bcrypt from 'bcrypt';
import auth from '../auth'
import {isAuthenticatedResolver} from "../permissions"

const formatErrors = (error, otherErrors) => {
    const errors = error.errors
    let objErrors = []
    if (errors){
        Object.entries(errors).map(error=>{
            const {path, message} = error[1]
            objErrors.push({path, message})
        })
    }
    objErrors = objErrors.concat(otherErrors);

    if (objErrors.length==0){
        switch(error.code){
            case 11000:
                objErrors.push({path: 'email', message: "El correo electrónico ya existe"})
                break;
            default:
                objErrors.push({path: 'Desconocido', message: error.message})
        }
    };
       
    return objErrors;
}

export default {
    Query: {
        // allUsuarios: async (parent, args, {models}) => {
        //     return await models.Usuario.find()
        // },
        allUsuarios: isAuthenticatedResolver.createResolver(
            (parent, args, {models}) => models.Usuario.find()
          ),
        // getUsuario: async (parent, args, {models}) => {
        //     return await models.Usuario.findOne(args)
        // }

        getUsuario: isAuthenticatedResolver.createResolver(
            (parent, args, {models}) => models.Usuario.findOne()
          )

    },

    Mutation: {
        login: async (parent, {email, claveDeAcceso}, {models:{Usuario}, SECRET}) => auth.login(email, claveDeAcceso, Usuario, SECRET),
        createUsuario: async (parent, {claveDeAcceso, ...args}, {models, usuario, SECRET}) => {
            const otherErrors = []
            try{
                if (args.usuario.claveDeAcceso.length<6){
                    otherErrors.push({path: 'Clave de acceso', message: 'La clave debe ser mayor o igual a 6 caracteres'})
                };
                if (args.usuario.perfil.nombrePerfil=="Seleccionar..."){
                    otherErrors.push({path: 'Perfil', message: 'Debe seleccionar el perfil'})
                };
                if(otherErrors.length==0){
                    const hashclaveDeAcceso = await bcrypt.hash(args.usuario.claveDeAcceso, 10)
                    const user = await models.Usuario.create({...args.usuario, claveDeAcceso: hashclaveDeAcceso, usuarioCreate: usuario})
                    return {
                        success: user && user._id,  //para comprobar si el usuario nuevo tiene id nuevo en la bd
                        errors: []
                    };
                }else{
                    return {
                        success: false,
                        errors: formatErrors(error, otherErrors)
                    }
                }
                }catch(error){
                    return {
                        success: false,
                        errors: formatErrors(error, otherErrors)
                    }
            }
        }
    }
};