import React from 'react';
// import {graphql} from 'react-apollo';

//utils
// import queries from '../../../src/utils/queries'

import TitDer from '../../../components/funcionales/titder';

// import EstilosHome from '../../css/home.css';

const Servicio = props => <p>{props.elemento.codigoServicio} {props.elemento.nombreResumido}=>{props.elemento.descripcionServicio}</p>;
const Subclase = props => <p>{props.elemento.claseserv.codigoClaseServ}: {props.elemento.claseserv.descrClaseServ} => {props.elemento.codigoSubclaseServ}: {props.elemento.descrSubclaseServ}</p>;
// const Clase = props => <p>{props.elemento.codigoClaseServ} => {props.elemento.descrClaseServ}</p>;

const DetalleNivel1 = props => {
  return (
    <div className="ui middle aligned animated celled list" style={props.styles.listaDer}>
      <div className="item">
        <div className="right floated content">
        <div className="ui dropdown"><Subclase elemento={props.elemento.subclaseserv} /></div>
        </div>
        <div className="content">
          {/* <div className="ui dropdown"><Clase elemento={props.elemento.claseserv} /></div> */}
          <a className="header"><Servicio elemento={props.elemento} /></a>
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

const ConfServ2 = ({styles, handleClick, list}) => {
  return (
    <div>
      <TitDer list={list} textBoton1="Servicios" styles={styles} handleClick={handleClick} />

      <Lista list={list} styles={styles} />
    </div>
  )
};

// export default graphql(queries.query.allServicios)(ConfServ2)
export default ConfServ2
