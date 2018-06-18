import React from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react'
import _find from 'lodash/find';

const AddClase2 = ({styles, handleSubmit, handleChange, args, errors}) => {
    return(
        <div>
            <button className="ui right labeled icon button" style={styles.titBuscar}>
                <i className="large user plus yellow icon"></i>
                Clase nueva
            </button>
            <div style={styles.box}>
                <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
                    <div className="ui two column stackable grid">
                        <div className="row container">
                            <div className="column" style={styles.boxGrid}>
                                <Form.Field>
                                    <label style={styles.label}>Código</label>
                                    <Form.Input name="codigoClaseServ" id="codigoClaseServ" onChange={handleChange} placeholder='Código' icon={!errors.length?null: _find(errors, {path:'codigoClaseServ'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Descripción</label>
                                    <Form.Input name="descrClaseServ" id="descrClaseServ" onChange={handleChange} placeholder='Descripción' icon={!errors.length?null: _find(errors, {path:'descrClaseServ'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                            </div>
                            <Button
                                type='submit'
                                // disabled={!args.contrato || !args.descrClaseServ || !args.apellidoCliente}
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

export default AddClase2
