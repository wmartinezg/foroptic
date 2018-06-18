import React from 'react';
import { Form } from 'semantic-ui-react'
import {graphql} from 'react-apollo';

//utils
import queries from '../../../src/utils/queries'

// const Ciudad = props => <p>{props.elemento.codigoCiudad} {props.elemento.nombreCiudad}</p>;

const DetalleNivel1 = props => {
  return (
    // <option value={props.elemento._id}><Ciudad elemento={props.elemento}/></option>
    <option value={props.elemento._id}>{props.elemento.codigoCiudad} {props.elemento.nombreCiudad}</option>
  )
};

const Lista = props => {
  const Nivel1Detalle = props.list.map((elemento, _id) => <DetalleNivel1 elemento={elemento} key={elemento._id} />);
  return(
    <div>
      <select className="ui simple selection dropdown fluid" style={props.styles.dropdown}>
        {/* <input type="hidden" name="user"/> */}
        {/* <i className="dropdown icon"></i> */}
        <option value="">(Todas las ciudades)</option>
        
        {Nivel1Detalle}
       </select>
    </div>
  )
};

const HomeCli1 = ({styles, handleChange, handleSubmit, args, data: {allCiudades=[], props}}) => {
  // console.log("entro cli1")
  return (
    <div>
      <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
        <div>
          <button className="ui right labeled icon button fluid" type='submit' style={styles.titBuscar}>
            <i className="large search yellow icon"></i>
            Buscar
          </button>

          <div className="ui input fluid">
            <Form.Input name="contrato" type="text" placeholder="Contrato" style={styles.dropdown} onChange={handleChange}/>
          </div>
          <div className="ui input fluid">
            <Form.Input name="nombreCliente" type="text" placeholder="Nombre(s)" style={styles.dropdown} onChange={handleChange}/>
          </div>
          <div className="ui input fluid">
            <Form.Input name="apellidoCliente" type="text" placeholder="Apellido(s)" style={styles.dropdown} onChange={handleChange}/>
          </div>
          <div className="ui input fluid">
            <Form.Input name="descrClaseServ" type="text" placeholder="Clase de servicio" style={styles.dropdown} onChange={handleChange}/>
          </div>
          <div className="ui input fluid">
            <Form.Input name="descrSubclaseServ" type="text" placeholder="Subclase de servicio" style={styles.dropdown} onChange={handleChange}/>
          </div>

          <Lista list={allCiudades} styles={styles} />
        </div>
      </Form>
    </div>
  )
};

export default graphql(queries.query.allCiudades)(HomeCli1)
