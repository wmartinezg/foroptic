import React from 'react';

import {graphql} from 'react-apollo';

//utils
import queries from '../../../src/utils/queries'

import TitDer from '../../components/funcionales/titder';

// import EstilosHome from '../../css/home.css';
  
const Usuario = props => <p>{props.elemento.email} {props.elemento.nombreUsuario}</p>;
const NombrePerfil = props => <p>{props.elemento.nombrePerfil}</p>;

const DetalleNivel1 = props => {
  return (
    <div className="ui middle aligned animated celled list" style={props.styles.listaDer}>
      <div className="item">
        <div className="right floated content">
          <div className="ui dropdown"><NombrePerfil elemento={props.elemento.perfil} /></div>
        </div>
        <img className="ui avatar image" src="images/hombre.png" alt="imagen"></img>
        <div className="content">
          <a className="header"><Usuario elemento={props.elemento} /></a>
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

const HomeUsu2 = ({styles, handleClick, data: {allUsuarios=[], props}}) => {
  return (
    <div>
      <TitDer list={allUsuarios} textBoton1="Usuarios" styles={styles} handleClick={handleClick}/>

      <Lista list={allUsuarios} styles={styles} />
    </div>
  )
};

export default graphql(queries.query.allUsuarios)(HomeUsu2)
