import React from 'react';
import { Form, Button, Icon, Message, Divider } from 'semantic-ui-react'
import {graphql, compose} from 'react-apollo';
import _find from 'lodash/find';

//utils
import queries from '../../../src/utils/queries'

const ListaServ = ({list}) => {
    if(list[0]==null){
        return(
            <div></div>
        )
    }else{
        const detServ = list.map((elemento, i) => <DetalleNivel2 elemento={elemento} key={i} />);
        return(
        <div>
            <select className="ui simple selection dropdown fluid" name="servNoTiene">
                {detServ}
            </select>
        </div>
        )
    }
};

const DetalleNivel2 = props => {
    return (
        <option data={props.elemento.nombreResumido} value={props.elemento._id}>
            {props.elemento.codigoServicio} => {props.elemento.nombreResumido}
        </option>
    )
  };

const Servicios = ({list}) => {
    if(list.servicios[0]==null){
        return(
            <div></div>
        )
    }else{
        const detServ = list.servicios.map((elemento, i) => <DetalleNivel2 elemento={elemento} key={i} />);
        return(
        <div>
            <select className="ui simple selection dropdown fluid" name="servTiene">
                {detServ}
            </select>
        </div>
        )
    }
};


const DetalleNivel1 = props => {
  return (
    <option data={props.elemento.nombreCiudad} value={props.elemento._id}>{props.elemento.nombreCiudad}</option>
  )
};

const Lista = ({handleLista, list, idLista, argsDocum, permiteUpdate, handleChange}) => {
  const Nivel1Detalle = list.map((elemento, _id) => <DetalleNivel1 elemento={elemento} key={elemento._id} />);

  return(
    <div>
      <select className="ui simple selection dropdown fluid" name="ciudad" id="miLista" value={permiteUpdate?argsDocum.idCiudad:idLista.ciudad._id} onChange={(ev)=>handleChange(ev, argsDocum)}>
        {Nivel1Detalle}
       </select>
    </div>
  )
};

class VerCli2 extends React.Component {
    state={
        argsDocum: {contrato: this.props.idLista.contrato,
                    nombreCliente: this.props.idLista.nombreCliente,
                    apellidoCliente: this.props.idLista.apellidoCliente,
                    idCiudad: this.props.idLista.ciudad._id,
                    nombreCiudad: this.props.idLista.ciudad.nombreCiudad,
                    _id: this.props.idLista._id}
      }

      handleChange = (ev) => {
        // console.log(ev.target.name)
        // console.log(this.props.permiteUpdate)
            // const listC = this.props.list
            //   const clienteMap = listC.map((listC) => {
            //     return listC.nombreCliente;
            //   })
            // const cliente = listC.find(function(elem) {
            //     return elem._id == this.props.idLista;
            // })
            // console.log(cliente.contrato)
            
            //   if({argsDoc}){

        if (this.props.permiteUpdate){
            console.log(ev.target.name)
            console.log(ev.target)
            if(ev.target.name !== "contrato"){
                const argsDocum = this.state.argsDocum
                if(ev.target.name == "ciudad"){
                    // console.log(ev.target.value)
                    // console.log(ev.target.data)
                    // console.log(argsDocum)
                    argsDocum['idCiudad'] = ev.target.value
                    var miLista = document.getElementById("miLista");
                    argsDocum['nombreCiudad'] = miLista.options[miLista.selectedIndex].attributes[0].value
                }else{
                    argsDocum[ev.target.name] = ev.target.value 
                }
                this.setState({argsDocum});
            }
        }
    
      }

render(){
    const {argsDocum} = this.state;
console.log(argsDocum)
    let listaCCiu = []
    if(this.props.allCiudades.allCiudades){listaCCiu = this.props.allCiudades.allCiudades}
    let listaCSer = []
    if(this.props.allServicios.allServicios){listaCSer = this.props.allServicios.allServicios}

    console.log("entro ver")
    return(
        <div>
            <button className="ui right labeled icon button" style={this.props.styles.titBuscar}>
                <i className="large user plus yellow icon"></i>
                Cliente nuevo
            </button>
            <div style={this.props.styles.box}>
                {/* <Form name="form1" id="form1" onSubmit={this.props.permiteUpdate?(ev)=>this.props.handleSubmit(ev, this.state.argsDocum):(ev)=>this.props.handleSubmit(ev, this.props.idLista)}> */}
                <Form name="form1" id="form1" onSubmit={(ev)=>this.props.handleSubmit(ev, this.state.argsDocum)}>
                    <div className="ui two column stackable grid">
                        <div className="row container">
                            <div className="column" style={this.props.styles.boxGrid}>
                                <Form.Field>
                                    <label style={this.props.styles.label}>Contrato</label>
                                    <Form.Input name="contrato" id="contrato" value={this.state.argsDocum.contrato} onChange={this.handleChange} placeholder='Contrato' icon={!this.props.errors.length?null: _find(this.props.errors, {path:'contrato'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={this.props.styles.label}>Nombre</label>
                                    <Form.Input name="nombreCliente" id="nombreCliente" value={this.props.permiteUpdate?this.state.argsDocum.nombreCliente:this.props.idLista.nombreCliente} onChange={this.handleChange} placeholder='Nombre' icon={!this.props.errors.length?null: _find(this.props.errors, {path:'nombreCliente'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={this.props.styles.label}>Apellido(s)</label>
                                    <Form.Input name="apellidoCliente" id="apellidoCliente" value={this.props.permiteUpdate?this.state.argsDocum.apellidoCliente:this.props.idLista.apellidoCliente} onChange={this.handleChange} placeholder='Apellido(s)' icon={!this.props.errors.length?null: _find(this.props.errors, {path:'apellidoCliente'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                </Form.Field>
                                <Form.Field>
                                    <label style={this.props.styles.label}>Ciudad</label>
                                    <Lista list={listaCCiu} styles={this.props.styles} handleLista={this.props.handleLista} idLista={this.props.idLista} argsDocum={this.state.argsDocum} permiteUpdate={this.props.permiteUpdate} handleChange={this.handleChange}/>
                                </Form.Field>
                            </div>
                            <div className="column" style={this.props.styles.boxGrid}>
                                <Form.Field>
                                    {/* <label style={this.props.styles.label}>Foto</label>
                                    <img className="ui small image" src="images/logo.png" alt="foto"/> */}
                                    <label style={this.props.styles.label}>Servicios</label>
                                    <Servicios list={this.props.idLista}/>
                                </Form.Field>
                                <button className="ui right labeled icon button fluid" style={this.props.styles.dropdown}>
                                    <i className="large minus violet icon"></i>
                                    Quitar servicio
                                </button>

                                <Divider inverted />
                                <Divider inverted />

                                <Form.Field>
                                    <label style={this.props.styles.label}>Agregar servicios:</label>
                                    <ListaServ list={listaCSer} styles={this.props.styles}/>
                                </Form.Field>
                                <button className="ui right labeled icon button fluid" style={this.props.styles.dropdown}>
                                    <i className="large plus violet icon"></i>
                                    Agregar servicio
                                </button>
                            </div>
                            {this.props.permiteUpdate && 
                                    <Button className="ui right labeled icon" type='submit' primary fluid>
                                        <i className="large edit yellow icon"></i>
                                        Confirmar MODIFICAR
                                    </Button>
                                }
                                {this.props.permiteDelete && 
                                    <Button className="ui right labeled icon" type='submit' primary fluid>
                                        <i className="large delete yellow icon"></i>
                                        Confirmar ELIMINAR
                                    </Button>
                                }

                            {
                                this.props.errors.length?<Message negative header="Los siguientes errores:"
                                list={this.props.errors.map(error=>`${error.path}: ${error.message}`)} />:null
                            }

                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
}

// export default graphql(queries.query.allCiudades)(VerCli2)

export default compose(
    graphql(queries.query.allCiudades, {name:'allCiudades'}),
    graphql(queries.query.allServicios, {name:'allServicios', options: (props) => {return {variables: {}}}}),
    // graphql(queries.mutation.createUsuario, {name:'createUsuario'}),
    // graphql(queries.mutation.createCliente, {name:'createCliente'}),
    // graphql(queries.mutation.editCliente, {name:'editCliente'}),
    // graphql(queries.mutation.createServicio, {name:'createServicio'}),
  )(VerCli2)