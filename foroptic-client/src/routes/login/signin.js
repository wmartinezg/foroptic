import React from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react'
import _find from 'lodash/find';
import {graphql} from 'react-apollo';
import queries from '../../utils/queries'

// const signIn = ({styles, handleSubmit, handleChange, args, errors}) => {
class signIn extends React.Component{
    
handleUsrInv = async (ev) => {
    ev.preventDefault()
    console.log("Hacer pruebas")

      const response = await this.props.mutate({
        variables: {
          claveDeAcceso: "invitado",
          email: "invitado@invitado.com",
          _id: "5af6d775ab98252fd8a7bb82",
          nombrePerfil: "Administrador",
          nombreUsuario: "invitado",
          usuarioCreate: "invitado@invitado.com"
        }
    })
    console.log(response);
}

    render(){
    return (
    <div style={this.props.styles.box}>
        <div>
            <img src="images/logo.png" alt="Logo"/>
            <h1>!! Buenos días !!</h1>
            <Form onSubmit={(ev)=>this.props.handleSubmit(ev, this.props.args)}>
                <Form.Field>
                    <label style={this.props.styles.label}>Correo electrónico</label>
                    <Form.Input name="email" onChange={this.props.handleChange} placeholder='Correo electrónico' icon={!this.props.errors.length?null: _find(this.props.errors, {path:'email'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                </Form.Field>
                <Form.Field>
                    <label style={this.props.styles.label}>Clave de acceso</label>
                    <Form.Input name="claveDeAcceso" onChange={this.props.handleChange}  type='password' placeholder='Clave de acceso' icon={!this.props.errors.length?null: _find(this.props.errors, {path:'Clave de acceso'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                </Form.Field>
                <Button type='submit' primary fluid>Ingresar</Button>
                <Button type='submit' color='grey' fluid onClick={this.handleUsrInv}>Crear primer usuario => NO FUNCIONA</Button>
                {
                    this.props.errors.length?<Message negative header="Los siguientes errores:"
                    list={this.props.errors.map(error=>`${error.path}: ${error.message}`)} />:null
                }
    
            </Form>
        </div>
    </div>)
}
}

export default graphql(queries.mutation.createUsuario)(signIn)