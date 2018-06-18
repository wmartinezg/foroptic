import React from 'react';
import {graphql} from 'react-apollo';

//utils
import queries from '../../../src/utils/queries'

// const Dato1 = props => <div>{props.elemento.nombrePerfil}</div>;

const DetalleNivel1 = props => {
  return (
    // <option value={props.elemento._id}><Dato1 elemento={props.elemento}/></option>
    <option value={props.elemento._id}>{props.elemento.nombrePerfil}</option>
  )
};

const Lista = props => {
  const Nivel1Detalle = props.list.map((elemento, _id) => <DetalleNivel1 elemento={elemento} key={elemento._id} />);
  return(
    <div>
      <select className="ui simple selection dropdown fluid" style={props.styles.dropdown}>
        {/* <input type="hidden" name="user"/> */}
        {/* <i className="dropdown icon"></i> */}
        <option value="">(Todos los perfiles)</option>
        
        {Nivel1Detalle}
       </select>
    </div>
  )
};

const HomeUsu1 = ({styles, data: {allPerfiles=[], props}}) => {
  return (
    <div>
      <button className="ui right labeled icon button fluid" style={styles.titBuscar}>
        <i className="large search yellow icon"></i>
        Buscar
      </button>
      <div className="ui input fluid">
        <input name="email" type="text" placeholder="Correo electrónico" style={styles.dropdown}/>
      </div>

      <div className="ui input fluid">
        <input name="nombre" type="text" placeholder="Nombre" style={styles.dropdown}/>
      </div>

      <Lista list={allPerfiles} styles={styles} />
    </div>
)
};

// const clienteItem = (cliente, _id) => <li key={cliente._id}>{cliente.servicios.nombreResumido} {cliente.contrato} {cliente.nombreCliente} {cliente.apellidoCliente}</li>

// const HomeClientes = ({data: {allClientes=[], loading}}) => 
// <ul>
//     {allClientes.map(clienteItem)}
// </ul>

export default graphql(queries.query.allPerfiles)(HomeUsu1)
