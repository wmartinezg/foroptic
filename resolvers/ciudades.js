export default {
    Query: {
        allCiudades: async (parent, args, {models}) => {
            return await models.Ciudad.find()
        },
        getCiudad: async (parent, args, {models}) => {
            return await models.Ciudad.findOne(args)
        }
    },

    Mutation: {
        createCiudad: async (parent, args, {models, usuario}) => {
            return await models.Ciudad.create({...args, usuarioCreate: usuario})
        }
    }
};