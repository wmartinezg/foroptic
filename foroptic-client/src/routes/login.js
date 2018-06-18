import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
// import {Redirect} from 'react-router-dom';
import {graphql} from 'react-apollo';

//utils
import queries from '../utils/queries'

//components
import Signin from './login/signin';

const styles ={
    grid: {
        height: '100%',
        width: '800px',
        margin: '0 auto',
    },
    box:{
        backgroundColor: 'white',
        border: '1px solid #e6e6e6',
        textAlign: 'center',
        marginBottom: '1em',
        padding: '1em',
      },
    label:{
        textAlign: 'left',
    }
}

class Login extends React.Component{
    state = {
        argsUsuario: {},
        errorUsuario: []
    }

    handleLogin = async (ev, args)=>{
        if(!args.email||!args.claveDeAcceso) {
            const argsUsuario = this.state.argsUsuario
            const errors = [];
            if(!args.email){
              argsUsuario['email'] = "";
              errors.push({path: 'email', message: "Debe escribir el correo electrónico"});
            }
            if(!args.claveDeAcceso){
              argsUsuario['claveDeAcceso'] = "";
              errors.push({path: 'Clave de acceso', message: "Debe escribir la clave de acceso"});
            }
            this.setState({argsUsuario});
            this.setState({errorUsuario: errors})
        }else{
            const response = await this.props.mutate({
                variables: args
            });
            const {errors, success, token} = response.data.login
        
            if(!success){
            this.setState({errorUsuario: errors})
            }else{
            localStorage.setItem('token', token)
            this.props.history.push("/Home")
            }
        }
    }

    handleChange = (ev, input)=>{
        const argsUsuario = this.state.argsUsuario
        argsUsuario[input.name] = input.value
        this.setState({argsUsuario});
        // console.log(this.state.argsUsuario)
    }
    
    render(){
        const {argsUsuario, errorUsuario} = this.state;
        console.log("entro login")
        localStorage.removeItem('token');
        return (
            <div className="ui grid container">
                <Grid verticalAlign='middle' columns = {2} centered style={styles.grid}>
                    <Grid.Row>
                        <Grid.Column>
                            <Signin styles={styles} handleSubmit={this.handleLogin} handleChange={this.handleChange} args={argsUsuario} errors={errorUsuario}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </div>
        )
    }
}

export default graphql(queries.mutation.login)(Login)
