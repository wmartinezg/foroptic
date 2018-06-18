export default `

type  SubclaseServ {
    _id: ID!
    codigoSubclaseServ: String,
    descrSubclaseServ: String,
    claseserv: ClaseServ
    fechaCreate: String
    usuarioCreate: Usuario
}

input iClaseServicio {
    _id: ID
    codigoClaseServ: String
    descrClaseServ: String
}

input iSubclaseServ {
    codigoSubclaseServ: String
    descrSubclaseServ: String
    claseserv: iClaseServicio
    fechaCreate: String
}

type Query {
    allSubclasesServ(_id: ID, codigoSubclaseServ: String, descrSubclaseServ: String): [SubclaseServ]!
    getSubclaseServ(_id: ID!): SubclaseServ!
}

type Mutation {
    createSubclaseServ(subclaseserv: iSubclaseServ): Response!
}

`;