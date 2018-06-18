export default `

type  Cliente {
    _id: ID!
    contrato: String!
    nombreCliente: String!
    apellidoCliente: String!
    ciudad: Ciudad!
    servicios: [Servicio]
    fechaCreate: String
    usuarioCreate: Usuario
}

input iCiudad {
    _id: ID!
    codigoCiudad: String!
    nombreCiudad: String!
}

input iServicios {
    _id: ID
    codigoServicio: String
    nombreResumido: String
    descripcionServicio: String
    subclaseserv: iSubclaseServicio
}

input iCliente {
    contrato: String!
    nombreCliente: String!
    apellidoCliente: String!
    ciudad: iCiudad
    servicios: iServicios
    fechaCreate: String
}

type Query {
    allClientes(_id: ID, contrato: String, nombreCliente: String, apellidoCliente: String, codigoClaseServ: String, codigoSubclaseServ: String): [Cliente]!
    getCliente(_id: ID!): Cliente!
}

type Mutation {
    createCliente(cliente: iCliente): Response!
    editCliente(_id: ID!, cliente: iCliente): Response!
    deleteCliente(_id: ID!): Response!
}

`;