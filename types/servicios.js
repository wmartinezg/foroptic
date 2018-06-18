export default `

type Servicio {
    _id: ID!
    codigoServicio: String
    nombreResumido: String
    descripcionServicio: String
    subclaseserv: SubclaseServ
    fechaCreate: String
    usuarioCreate: Usuario
}

input iservicioEdit {
    nombreResumido: String
}

input iSubclaseServicio {
    _id: ID,
    codigoSubclaseServ: String,
    descrSubclaseServ: String,
    claseserv: iClaseServicio
}

input iServicio {
    codigoServicio: String!,
    nombreResumido: String!,
    descripcionServicio: String!,
    subclaseserv: iSubclaseServicio
    fechaCreate: String
}

type Query {
    allServicios(_id: ID, codigoServicio: String, nombreResumido: String, descripcionServicio: String): [Servicio]!
    getServicio(_id: ID!): Servicio!
}

type Mutation {
    createServicio(servicio: iServicio): Response!
    editServicio(_id: ID!, nombreResumido: String): Response!
}

`;

// editServicio(_id: ID!, servicio: iservicioEdit): Response!