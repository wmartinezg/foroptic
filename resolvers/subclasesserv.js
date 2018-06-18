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
                objErrors.push({path: 'codigoSubclaseServ', message: "La subclase de servicio ya existe"})
                break;
            default:
                objErrors.push({path: 'Desconocido', message: error.message})
        }
    };
       
    return objErrors;
}

export default {
    Query: {
        allSubclasesServ: async (parent, args, {models}) => {
            return await models.SubclaseServ.find(args)
        },
        getSubclaseServ: async (parent, args, {models}) => {
            return await models.SubclaseServ.findOne(args)
        }
    },

    Mutation: {
        createSubclaseServ: async (parent, args, {models, usuario}) => {
            const otherErrors = []
            try{
                console.log("entro tray")
                if (args.subclaseserv.claseserv.descrClaseServ=="Seleccionar..."){
                    otherErrors.push({path: 'Clase', message: 'Debe seleccionar la clase'})
                };
                if(otherErrors.length==0){
                const tabla = await models.SubclaseServ.create({...args.subclaseserv, usuarioCreate: usuario})
                return {
                    success: tabla && tabla._id,  //para comprobar si el subclaseserv nuevo tiene id nuevo en la bd
                    errors: []
                };
            }else{
                return {
                    success: false,
                    errors: formatErrors(error, otherErrors)
                }
            }
            }catch(error){
                console.log("entro catch")
                return {
                    success: false,
                    errors: formatErrors(error, otherErrors)
                }
            };
        }
    }
};

