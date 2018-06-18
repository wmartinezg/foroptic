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
                objErrors.push({path: 'contrato', message: "El contrato ya existe"})
                break;
            default:
                objErrors.push({path: 'Desconocido', message: error.message})
        }
    };
       
    return objErrors;
}

export default {
    Query: {
        allClientes: async (parent, args, {models}) => {
            return await models.Cliente.find(args)
        },
        getCliente: async (parent, args, {models}) => {
            return await models.Cliente.findOne(args)
        }
    },

    Mutation: {
        createCliente: async (parent, args, {models, usuario}) => {
            console.log(args.cliente)
            
            const otherErrors = []
            try{
                if (args.cliente.ciudad.nombreCiudad=="Seleccionar..."){
                    otherErrors.push({path: 'Ciudad', message: 'Debe seleccionar la ciudad'})
                };
                if(otherErrors.length==0){
                const client = await models.Cliente.create({...args.cliente, usuarioCreate: usuario})
                return {
                    success: client && client._id,  //para comprobar si el cliente nuevo tiene id nuevo en la bd
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
        editCliente: async (parent, args, {models, usuario}) => {
            console.log(args._id)
            console.log(args.cliente)

            const otherErrors = []
            try{
                if (args.cliente.ciudad.nombreCiudad=="Seleccionar..."){
                    otherErrors.push({path: 'Ciudad', message: 'Debe seleccionar la ciudad'})
                };
                if(otherErrors.length==0){
                const client = await models.Cliente.update({...args._id, ...args.cliente})
                return {
                    success: client && client._id,  //para comprobar si el cliente nuevo tiene id nuevo en la bd
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
        deleteCliente: async (parent, args, {models}) => {
            // return await models.Cliente.remove(args)
            const otherErrors = []
            try{
                if(otherErrors.length==0){
                    console.log("entro delete resolvers")
                    return models.Cliente.remove(args)
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

