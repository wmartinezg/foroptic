import React from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react'
import {graphql} from 'react-apollo';
import _find from 'lodash/find';

//utils
import queries from '../../../src/utils/queries'

const DetalleNivel1 = props => {
  return (
    <option value={props.elemento._id}>{props.elemento.nombrePerfil}</option>
  )
};

const Lista = ({handleLista, list}) => {
  const Nivel1Detalle = list.map((elemento, _id) => <DetalleNivel1 elemento={elemento} key={elemento._id} />);
  return(
    <div>
      <select className="ui simple selection dropdown fluid" name="perfil" id="miLista" onChange={handleLista}>
        {/* <select name="perfil" id="miLista" onChange={handleLista}> */}
        <option value="">Seleccionar...</option>
        
        {Nivel1Detalle}
       </select>
    </div>
  )
};

const AddUsu2 = ({styles, handleLista, handleSubmit, handleChange, args, errors, data: {allPerfiles=[], props}}) => {
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
                Usuario nuevo
            </button>
            <div style={styles.box}>
                <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
                    <div className="ui two column stackable grid">
                        <div className="row container">
                            <div className="column" style={styles.boxGrid}>
                                <Form.Field>
                                    <label style={styles.label}>Correo electrónico</label>
                                    <Form.Input name="email" id="email" onChange={handleChange} placeholder='Correo electrónico' icon={!errors.length?null: _find(errors, {path:'email'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Nombre del usuario</label>
                                    <Form.Input name="nombreUsuario" id="nombreUsuario" onChange={handleChange} placeholder='Nombre del usuario' icon={!errors.length?null: _find(errors, {path:'nombreUsuario'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Clave de acceso</label>
                                    <Form.Input name="claveDeAcceso" id="claveDeAcceso" onChange={handleChange} type='password' placeholder='Clave de acceso' icon={!errors.length?null: _find(errors, {path:'Clave de acceso'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.label}>Perfil</label>
                                    <Lista list={allPerfiles} styles={styles} handleLista={handleLista} />
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
                                // disabled={!args.email || !args.nombreUsuario || !args.claveDeAcceso}
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

export default graphql(queries.query.allPerfiles)(AddUsu2)
