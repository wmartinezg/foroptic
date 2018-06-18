import React from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react'
import {graphql} from 'react-apollo';
import _find from 'lodash/find';

//utils
import queries from '../../../utils/queries'

const DetalleNivel1 = props => {
  return (
    <option value={props.elemento._id}>{props.elemento.descrClaseServ}</option>
  )
};

const Lista = ({handleLista, list}) => {
  const Nivel1Detalle = list.map((elemento, _id) => <DetalleNivel1 elemento={elemento} key={elemento._id} />);
  return(
    <div>
      <select className="ui simple selection dropdown fluid" name="clase" id="miLista" onChange={handleLista}>
        <option value="">Seleccionar...</option>
        
        {Nivel1Detalle}
       </select>
    </div>
  )
};

const AddSubclase2 = ({styles, handleLista, handleSubmit, handleChange, args, errors, data: {allClasesServ=[], props}}) => {
    return(
        <div>
            <button className="ui right labeled icon button" style={styles.titBuscar}>
                <i className="large user plus yellow icon"></i>
                Subclase nueva
            </button>
            <div style={styles.box}>
                <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
                    <div className="ui two column stackable grid">
                        <div className="row container">
                            <div className="column" style={styles.boxGrid}>
                                <Form.Field>
                                    <label style={styles.label}>Código</label>
                                    <Form.Input name="codigoSubclaseServ" id="codigoSubclaseServ" onChange={handleChange} placeholder='Código' icon={!errors.length?null: _find(errors, {path:'codigoSubclaseServ'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Descripción</label>
                                    <Form.Input name="descrSubclaseServ" id="descrSubclaseServ" onChange={handleChange} placeholder='Descripción' icon={!errors.length?null: _find(errors, {path:'descrSubclaseServ'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Clase</label>
                                    <Lista list={allClasesServ} styles={styles} handleLista={handleLista} />
                                </Form.Field>
                            </div>
                            <Button
                                type='submit'
                                // disabled={!args.codigoSubclaseServ || !args.descrSubclaseServ}
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

export default graphql(queries.query.allClasesServ)(AddSubclase2)
