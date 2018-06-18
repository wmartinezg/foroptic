export default `

type Perfil {
    _id: ID!
    nombrePerfil: String!
    fechaCreate: String
    usuarioCreate: Usuario
}

type Query {
    allPerfiles: [Perfil]!
    getPerfil(_id: ID!): Perfil!
}

type Mutation {
    createPerfil(
        nombrePerfil: String!,
        fechaCreate: String
    ): Perfil!
}

`;