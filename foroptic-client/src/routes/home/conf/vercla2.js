import React from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react'
import _find from 'lodash/find';

class VerCla2 extends React.Component {
    state={
        argsDocum: {
            codigoClaseServ: this.props.idLista.codigoClaseServ,
            descrClaseServ: this.props.idLista.descrClaseServ,
            _id: this.props.idLista._id
        },
    }

    handleChange = (ev) => {
        if (this.props.permiteUpdate){
            if(ev.target.name !== "codigoClaseServ"){
                const argsDocum = this.state.argsDocum
                argsDocum[ev.target.name] = ev.target.value
                this.setState({argsDocum});
            }
        }
    }

    render(){
        const {argsDocum} = this.state;

        return(
            <div>
                <button className="ui right labeled icon button" style={this.props.styles.titBuscar}>
                    <i className="large user plus yellow icon"></i>
                    Clase nueva
                </button>
                <div style={this.props.styles.box}>
                    {/* <Form name="form1" id="form1" onSubmit={this.props.permiteUpdate?(ev)=>this.props.handleSubmit(ev, this.state.argsDocum):(ev)=>this.props.handleSubmit(ev, this.props.idLista)}> */}
                    <Form name="form1" id="form1" onSubmit={(ev)=>this.props.handleSubmit(ev, this.state.argsDocum)}>
                        <div className="ui two column stackable grid">
                            <div className="row container">
                                <div className="column" style={this.props.styles.boxGrid}>
                                    <Form.Field>
                                        <label style={this.props.styles.label}>Código</label>
                                        <Form.Input name="codigoClaseServ" id="codigoClaseServ" value={this.state.argsDocum.codigoClaseServ} onChange={this.handleChange} placeholder='Código' icon={!this.props.errors.length?null: _find(this.props.errors, {path:'codigoClaseServ'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={this.props.styles.label}>Descripción</label>
                                        <Form.Input name="descrClaseServ" id="descrClaseServ" value={this.props.permiteUpdate?this.state.argsDocum.descrClaseServ:this.props.idLista.descrClaseServ} onChange={this.handleChange} placeholder='Descripción' icon={!this.props.errors.length?null: _find(this.props.errors, {path:'descrClaseServ'})?<Icon name="remove circle" color="red" size="large" />:<Icon name="check circle outline" color="green" size="large" />} />
                                    </Form.Field>
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

export default VerCla2
