import express from "express";
import cors from 'cors';
import "dotenv/config";

const app = express();
app.use(cors({
    origin:["http://127.0.0.1:3001", "http://localhost:3001", "http://192.168.0.12:3001"] //van todos los origenes que hagan request a este servidor
}))
// ""http://127.0.0.1:3001", "http://192.168.0.19:3001", http://localhost:3001", "192.168.0.21:3001", 
import mongoose from 'mongoose';
// mongoose.Promise = global.Promise;

import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';

import {makeExecutableSchema} from 'graphql-tools'; //para crear e inicializar el schema
// import typeDefs from './types/usuarios';
// import resolvers from './resolvers/usuarios';

//mezclar todos los archivos de carpetas de types y resolvers
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
    typeDefs,    //como van a lucir los datos => las propiedades
    resolvers   //metodos que indican lo que puedo hacer con los datos => crearlos, consultarlos
})

import models from './models'
import auth from './auth'

// const PORT = 3000;
// const SECRET = "asdasdasdfdfg4556ytrghjh";

//antes de hacer lo de graphql, lo del token en auth => gracias a express interceptar las
//operaciones y leer los headers que se van a enviar desdes el navegador
app.use(auth.checkHeaders)

app.use('/graphql', express.json(), graphqlExpress((req)=>{
    // console.log("Usuario =>:", req.usuario);
    // console.log("Email =>:", req.email);
console.log("contexto")
    return {
        schema,     //por ecmascript6 schema: schema se puede abreviar a solo   schema
        context: {  //el contexto es el modelo con el que se va a guiar y es el de mongodb
            models,
            SECRET: process.env.SECRET,     // process.env. => por dotenv
            usuario: req.email
            // usuario: {
            //     email: "wilson@hotmail.com"
            // }
        }
    }
}));

app.use('/graphiql', graphiqlExpress({ //cuando pida la ruta /graphiql se va a utilizar la interfase
                                        //grafica graphiqlExpress
    endpointURL: '/graphql' //cuando se utliza la interfase grafica se consulta la ruta /graphql
}))

app.set('port', process.env.PORT || 3000);     // process.env. => por dotenv

import {bdPruebas} from './config/database'

mongoose.connect(bdPruebas)
    .then(
        () => {
            console.log('Conectado a Mongo!!!')
            app.listen(app.get('port'), () => {
                console.log('Running GRAPHQL server...'); //una vez conecte a mongo se
                                                      //corre express
            }); //se guarda
        }
    )
    .catch(err => console.log(err));
    