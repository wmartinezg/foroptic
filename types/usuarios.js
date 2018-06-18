export default `

type Error{
    path: String!
    message: String!
  }

type Usuario {
    _id: ID!
    email: String!
    nombreUsuario: String!
    claveDeAcceso: String!
    thumbnail: String
    perfil: Perfil
    fechaCreate: String
    usuarioCreate: Usuario
}

type Query {
    allUsuarios: [Usuario]!
    getUsuario(_id: ID!): Usuario!
}

input iPerfil {
    _id: ID!
    nombrePerfil: String!
}

input iUsuario {
    email: String!
    nombreUsuario: String!
    claveDeAcceso: String!
    thumbnail: String
    perfil: iPerfil
    fechaCreate: String
}

type Response {
    success: Boolean!
    token: String
    errors: [Error]
    ok: String
  }

type Mutation {
    login(email: String!, claveDeAcceso: String!): Response!
    createUsuario(usuario: iUsuario): Response!
}

`;