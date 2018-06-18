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
                objErrors.push({path: 'codigoServicio', message: "El código ya existe"})
                break;
            default:
                objErrors.push({path: 'Desconocido', message: error.message})
        }
    };
       
    return objErrors;
}

export default {
    Query: {
        allServicios: async (parent, args, {models}) => {
            return await models.Servicio.find(args)
        },
        getServicio: async (parent, args, {models}) => {
            return await models.Servicio.findOne(args)
        }
    },

    Mutation: {
        createServicio: async (parent, args, {models, usuario}) => {
            // console.log(args.servicio)

            const otherErrors = []
            try{
                if (args.servicio.subclaseserv.descrSubclaseServ=="Seleccionar..."){
                    otherErrors.push({path: 'Subclase', message: 'Debe seleccionar la subclase'})
                };
                if(otherErrors.length==0){
                const tabla = await models.Servicio.create({...args.servicio, usuarioCreate: usuario})
                return {
                    success: tabla && tabla._id,  //para comprobar si el servicio nuevo tiene id nuevo en la bd
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



        // createServicio: async (parent, args, {models, usuario}) => {
        //     const serv = await models.Servicio.create({...args.servicio, usuarioCreate: usuario})
        //     return {
        //         success: serv && serv._id,  //para comprobar si el servicio nuevo tiene id nuevo en la bd
        //     };
        // },
        editServicio: async (parent, args, {models}) => {
            const servEd = await models.Servicio.update({...args._id, ...args.servicio.nombreResumido})
            // console.log(args._id)
            // console.log(args.servicio)
            // console.log(args.servicio.nombreResumido)
            // return {
            //     success: servEd && servEd._id,  //para comprobar si el servicio nuevo tiene id nuevo en la bd
            // };

            const otherErrors = []
            try{
                if(otherErrors.length==0){
                    const serv = await models.Servicio.update({...args._id, ...args.servicio})
                    console.log(serv)
                    return {
                        success: serv && serv._id  //para comprobar si el usuario nuevo tiene id nuevo en la bd
                    };
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

