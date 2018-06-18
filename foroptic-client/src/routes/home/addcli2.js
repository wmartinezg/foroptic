import React from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react'
import {graphql} from 'react-apollo';
import _find from 'lodash/find';

//utils
import queries from '../../../src/utils/queries'

const DetalleNivel1 = props => {
  return (
    <option value={props.elemento._id}>{props.elemento.nombreCiudad}</option>
  )
};

const Lista = ({handleLista, list}) => {
  const Nivel1Detalle = list.map((elemento, _id) => <DetalleNivel1 elemento={elemento} key={elemento._id} />);
  return(
    <div>
      <select className="ui simple selection dropdown fluid" name="ciudad" id="miLista" onChange={handleLista}>
        {/* <select name="ciudad" id="miLista" onChange={handleLista}> */}
        <option value="">Seleccionar...</option>
        
        {Nivel1Detalle}
       </select>
    </div>
  )
};

const AddCli2 = ({styles, handleLista, handleSubmit, handleChange, args, errors, data: {allCiudades=[], props}}) => {
    // const handleMiLista = () => {
    //     var miLista = document.getElementById("miLista");

    //     console.log(miLista.options[miLista.selectedIndex].value);
    //     console.log(miLista.options[miLista.selectedIndex].text);
    //     return miLista.options[miLista.selectedIndex].value
    // }
    return(
        <div>
            <button className="ui right labeled icon button" style={styles.titBuscar}>
                <i className="large user plus yellow icon"></i>
                Cliente nuevo
            </button>
            <div style={styles.box}>
                <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
                    <div className="ui two column stackable grid">
                        <div className="row container">
                            <div className="column" style={styles.boxGrid}>
                                <Form.Field>
                                    <label style={styles.label}>Contrato</label>
                                    <Form.Input name="contrato" id="contrato" onChange={handleChange} placeholder='Contrato' icon={!errors.length?null: _find(errors, {path:'contrato'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Nombre</label>
                                    <Form.Input name="nombreCliente" id="nombreCliente" onChange={handleChange} placeholder='Nombre' icon={!errors.length?null: _find(errors, {path:'nombreCliente'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Apellido(s)</label>
                                    <Form.Input name="apellidoCliente" id="apellidoCliente" onChange={handleChange} placeholder='Apellido(s)' icon={!errors.length?null: _find(errors, {path:'apellidoCliente'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Ciudad</label>
                                    <Lista list={allCiudades} styles={styles} handleLista={handleLista} />
                                </Form.Field>
                            </div>
                            <div className="column" style={styles.boxGrid}>
                                <Form.Field>
                                    <label style={styles.label}>Foto</label>
                                    <img className="ui small image" src="images/logo.png" alt="foto"/>
                                    {/* <img src="images/logo.png" alt="Logo"/> */}
                                </Form.Field>
                            </div>
                            <Button
                                type='submit'
                                // disabled={!args.contrato || !args.nombreCliente || !args.apellidoCliente}
                                primary
                                fluid>
                                Agregar
                            </Button>

                            {
                                errors.length?<Message negative header="Los siguientes errores:"
                                list={errors.map(error=>`${error.path}: ${error.message}`)} />:null
                            }

                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default graphql(queries.query.allCiudades)(AddCli2)
