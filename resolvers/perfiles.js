export default {
    Query: {
        allPerfiles: async (parent, args, {models}) => {
            return await models.Perfil.find()
        },
        getPerfil: async (parent, args, {models}) => {
            return await models.Perfil.findOne(args)
        }
    },

    Mutation: {
        createPerfil: async (parent, args, {models, usuario, SECRET}) => {
            return await models.Perfil.create({...args, usuarioCreate: usuario})
        }
    }
};
