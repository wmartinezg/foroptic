import gpl from 'graphql-tag';

export default {
    query:{
        allUsuarios: gpl `{
            allUsuarios{
              _id
              email
              nombreUsuario
              perfil{
                _id
                nombrePerfil
              }
            }
          }
        `,
        allPerfiles: gpl `{
            allPerfiles{
                _id
                nombrePerfil
            }
        }
        `,
        allClientes: gpl `
            query ($_id: ID, $contrato: String, $nombreCliente: String, $apellidoCliente: String, $codigoClaseServ: String, $codigoSubclaseServ: String){
                allClientes(_id: $_id, contrato: $contrato, nombreCliente: $nombreCliente, apellidoCliente: $apellidoCliente, codigoClaseServ: $codigoClaseServ, codigoSubclaseServ: $codigoSubclaseServ) {
                _id
                contrato
                nombreCliente
                apellidoCliente
                ciudad{
                  _id
                  codigoCiudad
                  nombreCiudad
                }
                servicios{
                  _id
                  codigoServicio
                  nombreResumido
                  descripcionServicio
                  subclaseserv{
                      _id
                      codigoSubclaseServ
                      claseserv{
                          _id
                          codigoClaseServ
                      }
                  }
                }
            }
        }
        `,
        allServicios: gpl `
            query ($codigoServicio: String, $nombreResumido: String, $descripcionServicio: String){
                allServicios(codigoServicio: $codigoServicio, nombreResumido: $nombreResumido, descripcionServicio: $descripcionServicio) {
                _id
                codigoServicio
                nombreResumido
                descripcionServicio
                subclaseserv{
                    _id
                    codigoSubclaseServ
                    descrSubclaseServ
                    claseserv{
                        _id
                        codigoClaseServ
                        descrClaseServ
                    }
                }
            }
        }
        `,
        allCiudades: gpl `{
            allCiudades{
                _id
                codigoCiudad
                nombreCiudad
            }
        }
        `,
        allClasesServ: gpl `{
            allClasesServ{
                _id
                codigoClaseServ
                descrClaseServ
            }
        }
        `,
        allSubclasesServ: gpl `
            query ($codigoSubclaseServ: String, $descrSubclaseServ: String){
                allSubclasesServ(codigoSubclaseServ: $codigoSubclaseServ, descrSubclaseServ: $descrSubclaseServ) {
                _id
                codigoSubclaseServ
                descrSubclaseServ
                claseserv{
                  _id
                  codigoClaseServ
                  descrClaseServ
                }
            }
        }
        `,
    },

    mutation:{
        login: gpl`
            mutation($email: String!, $claveDeAcceso: String!){
                login(email: $email, claveDeAcceso: $claveDeAcceso) {
                success
                token
                errors{
                    path
                    message
                }
                }
            }
        `,
        createUsuario: gpl`
            mutation($email: String!, $nombreUsuario: String!, $claveDeAcceso: String!, $_id: ID!, $nombrePerfil: String!){
                createUsuario(
                usuario:{
                    email:$email,
                    nombreUsuario:$nombreUsuario,
                    claveDeAcceso:$claveDeAcceso,
                    perfil:{
                    _id: $_id,
                    nombrePerfil: $nombrePerfil
                    }
                }
                ){
                success
                errors{
                    path
                    message
                  }                
                }
            }
            `,
            createCliente: gpl`
                mutation($contrato: String!, $nombreCliente: String!, $apellidoCliente: String!, $_idCiudad: ID!, $codigoCiudad: String!, $nombreCiudad: String!, $_idServicio: ID, $codigoServicio: String, $nombreResumido: String, $descripcionServicio: String, $_idSubclaseServ: ID, $codigoSubclaseServ: String, $descrSubclaseServ: String, $_idClaseServ: ID, $codigoClaseServ: String, $descrClaseServ: String){
                    createCliente(
                    cliente:{
                        contrato: $contrato,
                        nombreCliente: $nombreCliente,
                        apellidoCliente: $apellidoCliente,
                        ciudad:{
                            _id: $_idCiudad,
                            codigoCiudad: $codigoCiudad,
                            nombreCiudad: $nombreCiudad
                        },
                        servicios:{
                            _id: $_idServicio,
                            codigoServicio: $codigoServicio,
                            nombreResumido: $nombreResumido,
                            descripcionServicio: $descripcionServicio,
                            subclaseserv:{
                                _id: $_idSubclaseServ,
                                codigoSubclaseServ: $codigoSubclaseServ,
                                descrSubclaseServ: $descrSubclaseServ
                                claseserv:{
                                    _id: $_idClaseServ,
                                    codigoClaseServ: $codigoClaseServ,
                                    descrClaseServ: $descrClaseServ
                                },
                            },
                            }
                    }
                    ){
                    success
                    errors{
                        path
                        message
                        }                
                    }
                }
            `,
            editCliente: gpl`
                mutation($_id: String! ,$contrato: String!, $nombreCliente: String!, $apellidoCliente: String!, $_idCiudad: ID!, $codigoCiudad: String, $nombreCiudad: String, $_idServicio: ID, $codigoServicio: String, $nombreResumido: String){
                    editCliente(
                    _id: $_id,
                    cliente:{
                        contrato: $contrato,
                        nombreCliente: $nombreCliente,
                        apellidoCliente: $apellidoCliente,
                        ciudad:{
                            _id: $_idCiudad,
                            codigoCiudad: $codigoCiudad,
                            nombreCiudad: $nombreCiudad
                        },
                        servicios:{
                            _id: $_idServicio,
                            codigoServicio: $codigoServicio,
                            nombreResumido: $nombreResumido
                        }
                    }
                    ){
                    success
                    errors{
                        path
                        message
                        }                
                    }
                }
            `,
            createServicio: gpl`
            mutation($codigoServicio: String!, $nombreResumido: String!, $descripcionServicio: String!, $_idSubclaseServ: ID!, $codigoSubclaseServ: String!, $descrSubclaseServ: String!, $_idClaseServ: ID!, $codigoClaseServ: String!, $descrClaseServ: String!){
                createServicio(
                    servicio:{
                        codigoServicio:$codigoServicio,
                        nombreResumido:$nombreResumido,
                        descripcionServicio:$descripcionServicio,
                        subclaseserv:{
                            _id: $_idSubclaseServ,
                            codigoSubclaseServ: $codigoSubclaseServ,
                            descrSubclaseServ: $descrSubclaseServ
                            claseserv:{
                                _id: $_idClaseServ,
                                codigoClaseServ: $codigoClaseServ,
                                descrClaseServ: $descrClaseServ
                            },
                        },
                    }
                ){
                success
                errors{
                    path
                    message
                    }                
                }
            }
            `,
            createClaseServ: gpl`
                mutation($codigoClaseServ: String!, $descrClaseServ: String!){
                    createClaseServ(
                        claseserv:{
                            codigoClaseServ: $codigoClaseServ,
                            descrClaseServ: $descrClaseServ
                        }
                        ){
                        success
                        errors{
                            path
                            message
                            }                
                        }
                    }
                    `,
            createSubclaseServ: gpl`
                mutation($codigoSubclaseServ: String!, $descrSubclaseServ: String!, $_idClaseserv: ID!, $codigoClaseServ: String!, $descrClaseServ: String!){
                    createSubclaseServ(
                        subclaseserv:{
                            codigoSubclaseServ: $codigoSubclaseServ,
                            descrSubclaseServ: $descrSubclaseServ,
                            claseserv:{
                                _id: $_idClaseserv,
                                codigoClaseServ: $codigoClaseServ,
                                descrClaseServ: $descrClaseServ
                            },
                        }
                    ){
                    success
                    errors{
                        path
                        message
                        }                
                    }
                }
                `,
                editServicio: gpl`
                    mutation($_id: ID!, $nombreResumido: String!){
                        editServicio(
                            _id: $_id, nombreResumido: $nombreResumido
                        ){
                        success
                        errors{
                            path
                            message
                          }                
                        }
                    }
                `,
                editClaseServ: gpl`
                    mutation($_id: ID!, $descrClaseServ: String!){
                        editClaseServ(_id: $_id, descrClaseServ: $descrClaseServ) {
                        success
                        errors{
                            path
                            message
                          }                
                        }
                    }
                `,
                deleteClaseServ: gpl`
                    mutation($_id: ID!){
                        deleteClaseServ(
                            _id: $_id
                        ){
                        success
                        errors{
                            path
                            message
                          }                
                        }
                    }
                `,
                deleteCliente: gpl`
                    mutation($_id: ID!){
                        deleteCliente(
                            _id: $_id
                        ){
                        success
                        errors{
                            path
                            message
                          }                
                        }
                    }
                `,
            },
    // subscription:{},
}