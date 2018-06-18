import React from 'react';
import { List } from 'semantic-ui-react'
// import {graphql} from 'react-apollo';

//utils
// import queries from '../../../src/utils/queries'

import TitDer from '../../../components/funcionales/titder';

// import EstilosHome from '../../css/home.css';
  
const Dato = ({styles, elemento}) => {
  return(
    <p style={styles.elemLis_1}>{elemento.codigoClaseServ} => {elemento.descrClaseServ}</p>
  )};

const DetalleNivel1 = ({styles, elemento, handleClickidLista}) => {
  return (
    <div className="ui middle aligned animated celled list" style={styles.listaDer}>
      <div className="item">
      <List.Item onClick={(ev)=>handleClickidLista(ev, elemento)}>
      <List.Header>
      <div className="floated content" style={styles.subElemLis_1}>
          <a className="header"><Dato styles={styles} elemento={elemento} /></a>
        </div>
        </List.Header>
        </List.Item>
      </div>
    </div>
  )
};

const Lista = ({styles, list, handleClickidLista}) => {
  const nivel1Detalle = list.map((elemento, _id) => <DetalleNivel1 styles={styles} handleClickidLista={handleClickidLista} elemento={elemento} key={elemento._id} />);
  return(
    <div>
      {nivel1Detalle}
    </div>
  )
};

const ConfClase2 = ({styles, handleClick, list, handleClickidLista}) => {
  // console.log("entro cli2")
//   if(!list){
// //indica que lis ya esta definida, no redeclarar => OJOOO FUNCIONA PERO PENDIENTE SOLUCIONAR
//     var list = []
//   }
  return (
    <div>
      <TitDer list={list} textBoton1="Clases" styles={styles} handleClick={handleClick} />

      <Lista list={list} styles={styles} handleClickidLista={handleClickidLista}/>
    </div>
  )
};

// export default graphql(queries.query.allClientes)(HomeCli2)
export default ConfClase2
