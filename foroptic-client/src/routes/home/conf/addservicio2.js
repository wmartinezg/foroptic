import React from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react'
import {graphql} from 'react-apollo';
import _find from 'lodash/find';

//utils
import queries from '../../../utils/queries'

const DetalleNivel1 = props => {
  return (
    <option dato1={props.elemento.claseserv._id} value={props.elemento._id}>{props.elemento.claseserv.codigoClaseServ}: {props.elemento.claseserv.descrClaseServ} => {props.elemento.codigoSubclaseServ}: {props.elemento.descrSubclaseServ}</option>
  )
};

const Lista = ({handleLista, list}) => {
  const Nivel1Detalle = list.map((elemento, _id) => <DetalleNivel1 elemento={elemento} key={elemento._id} />);
  return(
    <div>
      <select className="ui simple selection dropdown fluid" name="subclase" id="miLista" onChange={handleLista}>
        <option value="">Seleccionar...</option>
        
        {Nivel1Detalle}
       </select>
    </div>
  )
};

const AddServicio2 = ({styles, handleLista, handleSubmit, handleChange, args, errors, data: {allSubclasesServ=[], props}}) => {
// const AddServicio2 = ({styles, handleLista, handleSubmit, handleChange, args, errors}) => {
    return(
        <div>
            <button className="ui right labeled icon button" style={styles.titBuscar}>
                <i className="large user plus yellow icon"></i>
                Servicio nuevo
            </button>
            <div style={styles.box}>
                <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
                    <div className="ui two column stackable grid">
                        <div className="row container">
                            <div className="column" style={styles.boxGrid}>
                                <Form.Field>
                                    <label style={styles.label}>Código</label>
                                    <Form.Input name="codigoServicio" id="codigoServicio" onChange={handleChange} placeholder='Código' icon={!errors.length?null: _find(errors, {path:'codigoServicio'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Descripción resumida</label>
                                    <Form.Input name="nombreResumido" id="nombreResumido" onChange={handleChange} placeholder='Descripción resumida' icon={!errors.length?null: _find(errors, {path:'nombreResumido'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Descripción</label>
                                    <Form.Input name="descripcionServicio" id="descripcionServicio" onChange={handleChange} placeholder='Descripción' icon={!errors.length?null: _find(errors, {path:'descripcionServicio'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Subclase</label>
                                    <Lista list={allSubclasesServ} styles={styles} handleLista={handleLista} />
                                </Form.Field>
                            </div>
                            <Button
                                type='submit'
                                // disabled={!args.codigoServicio || !args.nombreResumido}
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

// export default AddServicio2
export default graphql(queries.query.allSubclasesServ, {options: (props) => {return {variables: {}}}})(AddServicio2)
