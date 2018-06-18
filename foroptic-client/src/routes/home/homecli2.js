import React from 'react';
import { List } from 'semantic-ui-react'
// import {graphql} from 'react-apollo';

//utils
// import queries from '../../../src/utils/queries'

import TitDer from '../../components/funcionales/titder';

// import EstilosHome from '../../css/home.css';
// const Cliente = ({elemento, handleClickVerCliente}) => {
// return(
//   <div>
// <p><a href="" onClick={handleClickVerCliente}>
// {elemento.contrato} {elemento.nombreCliente} {elemento.apellidoCliente}
// </a></p>
// </div>
// )}

const Cliente = ({styles, elemento}) => {
  return(
    <p style={styles.elemLis_1}>{elemento.contrato} {elemento.nombreCliente} {elemento.apellidoCliente}</p>
  )};

// const ServiciosNombreResumido = props => <p>{props.elemento.codigoServicio} => {props.elemento.nombreResumido}</p>;
const ServiciosNombreResumido = props => {
  var servDet = ""
  try{
    servDet = props.elemento.codigoServicio + " => " + props.elemento.nombreResumido
  }catch (e) {
    servDet = ""
  }
  return(
    <p>{servDet}</p>
  )
};



const CiudadNombre = props => <p>{props.elemento.codigoCiudad} => {props.elemento.nombreCiudad}</p>;

const DetalleNivel2 = props => <ServiciosNombreResumido elemento={props.elemento} />;
// const DetalleNivel2Ciu = props => <CiudadNombre elemento={props.elemento} />;

const DetalleNivel1 = ({styles, elemento, handleClickidLista}) => {
  const Nivel2Detalle = elemento.servicios.map((elemento, i) => <DetalleNivel2 elemento={elemento} key={i} />);
  // const Nivel2DetalleCiu = <DetalleNivel2Ciu elemento={elemento.ciudad} />;

  return (
    <div className="ui middle aligned animated celled link list" style={styles.listaDer}>
      <div className="item">
        <List.Item onClick={(ev)=>handleClickidLista(ev, elemento)}>
            <List.Header>
                <div className="right floated content" style={styles.elemLis_3}>
                    <div>{Nivel2Detalle}</div>
                </div>
            </List.Header>
            <div className="right floated content" style={styles.elemLis_2}>
                <div><CiudadNombre elemento={elemento.ciudad} /></div>
            </div>
            <img className="left floated ui avatar image" src="images/hombre.png" alt="imagen"></img>
            <List.Header>
                <div className="floated content" style={styles.subElemLis_1}>
                    <a className="header"><Cliente styles={styles} elemento={elemento}/></a>
                    Estado
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

const HomeCli2 = ({styles, handleClick, list, handleClickidLista}) => {
  // console.log("entro cli2")
//   if(!list){
// //indica que lis ya esta definida, no redeclarar => OJOOO FUNCIONA PERO PENDIENTE SOLUCIONAR
//     var list = []
//   }
  return (
    <div>
      <List selection>
        <TitDer list={list} textBoton1="Clientes" styles={styles} handleClick={handleClick} />

        <Lista list={list} styles={styles} handleClickidLista={handleClickidLista}/>
      </List>
    </div>
  )
};

// export default graphql(queries.query.allClientes)(HomeCli2)
export default HomeCli2
