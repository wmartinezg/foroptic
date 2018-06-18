
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
        console.log(error)
        switch(error.code){
            case 11000:
                objErrors.push({path: 'codigoClaseServ', message: "La clase de servicio ya existe"})
                break;
            default:
                objErrors.push({path: 'Desconocido', message: error.message})
        }
    };
       
    return objErrors;
}

export default {
    Query: {
        allClasesServ: async (parent, args, {models}) => {
            return await models.ClaseServ.find(args)
        },
        getClaseServ: async (parent, args, {models}) => {
            return await models.ClaseServ.findOne(args)
        }
    },

    Mutation: {
        createClaseServ: async (parent, args, {models, usuario}) => {
            const otherErrors = []
            try{
                if(otherErrors.length==0){
                const tabla = await models.ClaseServ.create({...args.claseserv, usuarioCreate: usuario})
                return {
                    success: tabla && tabla._id,  //para comprobar si el claseserv nuevo tiene id nuevo en la bd
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
            };
        },
        editClaseServ: async (parent, args, {models}) => {
            const otherErrors = []
            try{
                if(otherErrors.length==0){
                    console.log(args)
                    return await models.ClaseServ.update({args})
                    // const serv = await models.ClaseServ.update({args})
                    // console.log(serv)
                    // return {
                    //     success: serv && serv._id  //para comprobar si el usuario nuevo tiene id nuevo en la bd
                    // };
                }else{
                    return {
                        success: false
                    }
                }
                }catch(error){
                    return {
                        success: false,
                    }
            }
        },
        deleteClaseServ: async (parent, args, {models}) => {
            // return await models.ClaseServ.remove(args)
            const otherErrors = []
            try{
                if(otherErrors.length==0){
                    console.log("entro delete resolvers")
                    return models.ClaseServ.remove(args)
//elimina la clase pero retorna error porque debe retornar true
                }else{
                    return {
                        success: false
                    }
                }
            }catch(error){
                return {
                    success: false,
                }
            }
        }
    }
};

