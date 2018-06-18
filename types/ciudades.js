export default `

type Ciudad {
    _id: ID!
    codigoCiudad: String!
    nombreCiudad: String!
    fechaCreate: String
    usuarioCreate: Usuario
}

type Query {
    allCiudades: [Ciudad]!
    getCiudad(_id: ID!): Ciudad!
}

type Mutation {
    createCiudad(
        codigoCiudad: String!,
        nombreCiudad: String!,
        fechaCreate: String
    ): Ciudad!
}

`;