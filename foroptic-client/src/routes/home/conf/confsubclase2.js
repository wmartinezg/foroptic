import React from 'react';

import {graphql} from 'react-apollo';

//utils
import queries from '../../../utils/queries'

import TitDer from '../../../components/funcionales/titder';

// import EstilosHome from '../../css/home.css';
  
const Dato = props => <p>{props.elemento.codigoSubclaseServ} {props.elemento.descrSubclaseServ}</p>;
const DescrClase = props => <p>{props.elemento.descrClaseServ}</p>;

const DetalleNivel1 = props => {
  return (
    <div className="ui middle aligned animated celled list" style={props.styles.listaDer}>
      <div className="item">
        <div className="right floated content">
          <div className="ui dropdown"><DescrClase elemento={props.elemento.claseserv} /></div>
        </div>
        <img className="ui avatar image" src="images/hombre.png" alt="imagen"></img>
        <div className="content">
          <a className="header"><Dato elemento={props.elemento} /></a>
        </div>
      </div>
    </div>
  )
};

const Lista = props => {
  const nivel1Detalle = props.list.map((elemento, _id) => <DetalleNivel1 styles={props.styles} elemento={elemento} key={elemento._id} />);
  return(
    <div>
      {nivel1Detalle}
    </div>
  )
};

const ConfSubclase2 = ({styles, handleClick, list}) => {
  console.log(list)
  return (
    <div>
      <TitDer list={list} textBoton1="Subclases" styles={styles} handleClick={handleClick}/>

      <Lista list={list} styles={styles} />
    </div>
  )
};

export default graphql(queries.query.allClasesServ)(ConfSubclase2)
