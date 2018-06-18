export default `

type ClaseServ {
    _id: ID
    codigoClaseServ: String
    descrClaseServ: String
    fechaCreate: String
    usuarioCreate: Usuario
}

input iClaseServ {
    codigoClaseServ: String,
    descrClaseServ: String,
    fechaCreate: String
}

type Query {
    allClasesServ: [ClaseServ]!
    getClaseServ(_id: ID!): ClaseServ!
}

type Mutation {
    createClaseServ(claseserv: iClaseServ): Response!
    editClaseServ(_id: ID!, descrClaseServ: String!): Response!
    deleteClaseServ(_id: ID!): Response!
}

`;