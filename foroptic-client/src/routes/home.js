import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import {graphql, compose} from 'react-apollo';
import { RetryLink } from "apollo-link-retry";
// import {Redirect} from 'react-router-dom';
// import gpl from 'graphql-tag';

//utils
import queries from '../../src/utils/queries'

//components
import HomeCli1 from './home/homecli1';
import HomeCli2 from './home/homecli2';
import HomeUsu1 from './home/homeusu1';
import HomeUsu2 from './home/homeusu2';
import AddUsu1 from './home/addusu1';
import AddUsu2 from './home/addusu2';
import AddCli1 from './home/addcli1';
import AddCli2 from './home/addcli2';
import HomeConf from './home/homeconf';
import VerCli1 from './home/vercli1';
import VerCli2 from './home/vercli2';

// import Estilos from '../css/main.css';
import '../css/marquee.css';

//maneja los reintentos por errores de red => proporciona un retroceso exponencial
//y el jitter demora entre los intentos por defecto
//como se maneja ?
const link = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error
  }
});

const styles ={
  bordes:{
    margin: '1em 0em 0.2em 0em',
    padding: '0em 0em 0em 0em',
  },
  boxIzq:{
    width: '25%',
    padding: '0.2em 1em 0em 2em',
  },
  boxDer:{
    width: '75%',
    padding: '0.2em 2em 0em 1em',
  },
  boxUnaCol:{
    width: '100%',
    padding: '1em 2em 2em 1em',
  },
  botones:{
    // background: 'linear-gradient(#093028, #237A57)',
    background: '#0B486B',
    margin: '0px 0px 0px 10px',
  },
  menu:{
    background: 'linear-gradient(#355C7D, #6C5B7B)',
  },
  divider:{
    margin: '10px 10px 10px 10px',
  },
  rowMarquee:{
    background: '#0B486B',
    border: '1px solid blue',
    margin: '0px',
    padding: '2px 0 0 0',
    color: "white",
  },
  titBuscar:{
    background: 'linear-gradient(#355C7D, #6C5B7B)',
    height: '3em',
    color: 'white',
  },
  etiqClientes:{
    padding: '12px 40px 12px 12px',
    color: "white",
  },
  dropdown:{
    background: 'linear-gradient(#141E30, #243B55)',
    color: 'white',
    textAlign: 'left',
    width: '100%',
  },
  listaDer:{
    background: 'linear-gradient(#1CB5E0, #000046)',
    margin: '0px',
    padding: '0px',
    height: '3em',
  },
  titClientes:{
    background: 'linear-gradient(#355C7D, #6C5B7B)',
    height: 'em',
  },
  box:{
    background: 'white',
    border: '1px solid #e6e6e6',
    marginBottom: '1em',
    padding: '1em'
  },
  boxGrid:{
    width: '50%'
  },
  elemLis_1:{
    color: 'white',
    fontWeight: 'bold',
  },
  elemLis_2:{
    color: '#000000',
    fontWeight: 'bold',
  },
  elemLis_3:{
    color: '#93291E',
    fontWeight: 'bold',
  },
  subElemLis_1:{
    color: '#DCE35B',
    fontWeight: 'bold',
  },
  botIcon:{
    height: '1em',
    width: '1em',
  }
}

const argsBuscar = {nombreCliente: "AGUSTIN"}
// const argsBuscar = {"servicios.subclaseserv.claseserv.codigoClaseServ": "2"}

class Home extends React.Component{
  state={
    showClient: true,
    showUser: false,
    showConfig: false,
    addCliente: false,
    verCliente: false,
    addUsuario: false,
    permiteUpdate: false,
    permiteDelete: false,
    argsAddUsuario: {},
    errorAddUsuario: [],
    argsAddCliente: {},
    errorAddCliente: [],
    argsBuscCliente: {},
    idLista: {}
  }

  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push("/")
    // return <Redirect to="/" />
  }

  showUser = (ev) => {
    ev.preventDefault()
    this.setState({
      showClient: false,
      showUser: true,
      showConfig: false,
      addCliente: false,
      verCliente: false,
      addUsuario: false,
      permiteUpdate: false,
      permiteDelete: false,
    })
  }

  showClient = (ev) => {
    ev.preventDefault()
    this.props.allClientes.refetch()
    this.setState({
      showClient: true,
      showUser: false,
      showConfig: false,
      addCliente: false,
      verCliente: false,
      addUsuario: false,
      permiteUpdate: false,
      permiteDelete: false,
    })
  }

  showConfig = (ev) => {
    ev.preventDefault()
    console.log("entro conf")
    this.setState({
      showClient: false,
      showUser: false,
      showConfig: true,
      addCliente: false,
      verCliente: false,
      addUsuario: false,
      permiteUpdate: false,
      permiteDelete: false,
    })
  }

  addUsuario = (ev) => {
    ev.preventDefault()
    this.setState({
      showClient: false,
      showUser: false,
      showConfig: false,
      addCliente: false,
      verCliente: false,
      addUsuario: true,
      errorAddUsuario: {},
      permiteUpdate: false,
      permiteDelete: false,
    })
  }

  addCliente = (ev) => {
    ev.preventDefault()
    this.setState({
      showClient: false,
      showUser: false,
      showConfig: false,
      addCliente: true,
      verCliente: false,
      addUsuario: false,
      permiteUpdate: false,
      permiteDelete: false,
      errorAddCliente: {},
    })
  }

  verCliente = (ev) => {
    ev.preventDefault()
    this.setState({
      showClient: false,
      showUser: false,
      showConfig: false,
      addCliente: false,
      verCliente: true,
      addUsuario: false,
      permiteUpdate: false,
      permiteDelete: false,
      errorAddCliente: {},
    })
    var miLista = document.getElementById("miLista");
    console.log({miLista})
    // const aaPrueba = miLista.options[miLista.selectedIndex].text
    const aaPrueba1 = miLista.accessKey
    // argsAddCliente['nombreCiudad'] = miLista.options[miLista.selectedIndex].text
    // argsAddCliente['_idCiudad'] = miLista.options[miLista.selectedIndex].value
    // this.setState({argsAddCliente});
    // console.log(aaPrueba)
    console.log(aaPrueba1)

    // miLista.options[miLista.selectedIndex].value
    // var miLista = document.getElementById("miLista");
    // console.log(miLista)

  }
  
  handleChange = (ev, input)=>{
    if (this.state.addCliente) {
      console.log(input.name)

      const argsAddCliente = this.state.argsAddCliente
      argsAddCliente[input.name] = input.value
      this.setState({argsAddCliente});

      //quitarlas cuando se capturen los datos
      argsAddCliente['codigoCiudad'] = "BAQ";
      // argsAddCliente['_idServicio'] = "5b15975842dbbb0f74d0617e";
      // argsAddCliente['codigoServicio'] = "TVD";
      // argsAddCliente['nombreResumido'] = "TELEVISION DIGITAL";
      // argsAddCliente['descripcionServicio'] = "TV DDDD";
      // argsAddCliente['_idSubclaseServ'] = "5b12cea12365ee148c10a07f";
      // argsAddCliente['codigoSubclaseServ'] = "12";
      // argsAddCliente['descrSubclaseServ'] = "TV Digital";
      // argsAddCliente['_idClaseServ'] = "5b1174edeb417f15acc97a9a";
      // argsAddCliente['codigoClaseServ'] = "1";
      // argsAddCliente['descrClaseServ'] = "Televisión";

      
console.log(argsAddCliente)
    }
    if (this.state.addUsuario) {
      const argsAddUsuario = this.state.argsAddUsuario
      argsAddUsuario[input.name] = input.value
      this.setState({argsAddUsuario});
    }

  }
  
  handleChangeBuscClient = (ev, input)=>{
    const argsBuscCliente = this.state.argsBuscCliente
    argsBuscCliente[input.name] = input.value
    this.setState({argsBuscCliente});
    // console.log(argsBuscCliente)
  }

  handleBuscCliente = async (ev, args) => {
    console.log("entro buscar")
    ev.preventDefault()
    this.setState({
      showClient: true,
      showUser: false,
      showConfig: false,
      addCliente: false,
      verCliente: false,
      addUsuario: false,
      permiteUpdate: false,
      permiteDelete: false,
    });

    let argsBuscar={}

    if(!args.contrato && "contrato" in this.props.allClientes.variables){

//delete quita contrato de las variables pero al hacer refetch ejecuta el query con contrato
//como si no lo hubiera eliminado => refetch agrega y modifica pero no considera el delete
//=> como quitar por ej contrato de las variables cuando queremos quitarlo ?
    delete this.props.allClientes.variables.contrato
    }
    if(!args.apellidoCliente && "apellidoCliente" in this.props.allClientes.variables){
      delete this.props.allClientes.variables.apellidoCliente
    }
    if(args.contrato){
      argsBuscar.contrato=args.contrato
    }
    if(args.nombreCliente){
      argsBuscar.nombreCliente=args.nombreCliente
    }
    if(args.apellidoCliente){
      argsBuscar.apellidoCliente=args.apellidoCliente
    }
    if(args.codigoClaseServ){
      argsBuscar.codigoClaseServ=args.codigoClaseServ
    }
    if(args.codigoSubclaseServ){
      argsBuscar.codigoSubclaseServ=args.codigoSubclaseServ
    }

      console.log(argsBuscar)
//       console.log(args)
    await this.props.allClientes.refetch(argsBuscar)
  }

  handleCliente = async (ev, args)=>{
    console.log(args)
    if(!args.contrato||!args.nombreCliente||!args.apellidoCliente||!args.nombreCiudad){
      const argsAddCliente = this.state.argsAddCliente
      const errors = [];
      if(!args.contrato){
        argsAddCliente['contrato'] = "";
        errors.push({path: 'contrato', message: "Debe escribir el contrato"});
      }
      if(!args.nombreCliente){
        argsAddCliente['nombreCliente'] = "";
        errors.push({path: 'nombreCliente', message: "Debe escribir el nombre del cliente"});
      }
      if(!args.apellidoCliente){
        argsAddCliente['apellidoCliente'] = "";
        errors.push({path: 'apellidoCliente', message: "Debe escribir el apellido del cliente"});
      }
      if(!args.nombreCiudad){
        argsAddCliente['_idCiudad'] = "";
        argsAddCliente['nombreCiudad'] = "Seleccionar...";
        errors.push({path: 'Ciudad', message: "Debe seleccionar la ciudad"});
      }
      this.setState({argsAddCliente});
      this.setState({errorAddCliente: errors})
    }else{
        if(this.state.addCliente){
          console.log(args)
          console.log("entro crear")
          const response = await this.props.createCliente({
          // const response = await this.props.mutate({
            variables: args
          });
          console.log("paso crear")
          // console.log('Graphql response', response);
          const {errors, success} = response.data.createCliente;
          if (!success){
            this.setState({errorAddCliente: errors})
          }else{
              var contrato = document.getElementById("contrato");
          var nombreCliente = document.getElementById("nombreCliente");
          var apellidoCliente = document.getElementById("apellidoCliente");
          var ciudad = document.getElementById("miLista");
          ciudad.options.selectedIndex = 0
          contrato.value = ""
          nombreCliente.value = ""
          apellidoCliente.value = ""
          const errors = [];
          this.setState({errorAddCliente: errors})
          this.setState({argsAddCliente: {}})
          }
        }else{
          if(this.state.permiteUpdate){
            console.log("entro modificar")
            const argsUpd = {
              _id: args._id,
              contrato: args.contrato,
              nombreCliente: args.nombreCliente,
              apellidoCliente: args.apellidoCliente
            }
            console.log(argsUpd)
            const response = await this.props.editCliente({
              variables: argsUpd
            });
            console.log("paso modificar")
            const {errors, success} = response.data.editCliente;
            if (!success){
              this.setState({errorAddClaseServ: errors})
            }else{
              this.showClase
            }
          }
          if(this.state.permiteDelete){
            console.log("entro eliminar")
            const argsDel = {
              _id: args._id
            }
            console.log(argsDel)
            const response = await this.props.deleteCliente({
              variables: argsDel
            });
            console.log("ya elimino")
            console.log(response)
            this.showClase
        }
      }
    }
  }

  handleUsuario = async (ev, args)=>{
    if(!args.email||!args.nombreUsuario||!args.claveDeAcceso||!args.nombrePerfil){
      const argsAddUsuario = this.state.argsAddUsuario
      const errors = [];
      if(!args.email){
        argsAddUsuario['email'] = "";
        errors.push({path: 'email', message: "Debe escribir el correo electrónico"});
      }
      if(!args.nombreUsuario){
        argsAddUsuario['nombreUsuario'] = "";
        errors.push({path: 'nombreUsuario', message: "Debe escribir el nombre del usuario"});
      }
      if(!args.claveDeAcceso){
        argsAddUsuario['claveDeAcceso'] = "";
        errors.push({path: 'Clave de acceso', message: "Debe escribir la clave de acceso"});
      }
      if(!args.nombrePerfil){
        argsAddUsuario['_id'] = "";
        argsAddUsuario['nombrePerfil'] = "Seleccionar...";
        errors.push({path: 'Perfil', message: "Debe seleccionar el perfil"});
      }
      this.setState({argsAddUsuario});
      this.setState({errorAddUsuario: errors})
    }else{
      console.log(args)
      const response = await this.props.createUsuario({
      // const response = await this.props.mutate({
        variables: args
      });
      // console.log('Graphql response', response);
      const {errors, success} = response.data.createUsuario;
      if (!success){
        this.setState({errorAddUsuario: errors})
      }else{
        // this.props.history.push("/")
        var email = document.getElementById("email");
        var nombreUsuario = document.getElementById("nombreUsuario");
        var claveDeAcceso = document.getElementById("claveDeAcceso");
        var perfil = document.getElementById("miLista");
        perfil.options.selectedIndex = 0
        email.value = ""
        nombreUsuario.value = ""
        claveDeAcceso.value = ""
        const errors = [];
        this.setState({errorAddUsuario: errors})
        this.setState({argsAddUsuario: {}})
      }
    }
  }

  handleCiudad = () => {
    var miLista = document.getElementById("miLista");
    console.log({miLista})
    const argsAddCliente = this.state.argsAddCliente
    argsAddCliente['nombreCiudad'] = miLista.options[miLista.selectedIndex].text
    argsAddCliente['_idCiudad'] = miLista.options[miLista.selectedIndex].value
    this.setState({argsAddCliente});
    console.log({argsAddCliente})
}

  handlePerfilUsuario = () => {
    var miLista = document.getElementById("miLista");
    const argsAddUsuario = this.state.argsAddUsuario
    argsAddUsuario['nombrePerfil'] = miLista.options[miLista.selectedIndex].text
    argsAddUsuario['_id'] = miLista.options[miLista.selectedIndex].value
    this.setState({argsAddUsuario});
    console.log({argsAddUsuario})
}

// shouldComponentUpdate(){
//   console.log("entro")
//   if (this.state.agregoUsuario) {
//     console.log(this.state)
//     return true
//   }else{
//     return false
//   }
// }

// shouldComponentUpdate () {
//   console.log("entro refetch")
//  this.props.allClientes.refetch()
//  return true
// }
// componentDidMount() {
//   console.log("entro did")
//   this.props.allClientes.refetch();
// }
  // componentWillMount() {
  //   console.log("entro will")
  //   this.props.allClientes.refetch(argsBuscar)
  // }

  idLista = async (ev, idLista)=>{
    console.log(idLista)
    this.setState({idLista: idLista})
    ev.preventDefault()
    if (this.state.showClient) {
      this.setState({
        showClient: false,
        showUser: false,
        showConfig: false,
        addCliente: false,
        verCliente: true,
        addUsuario: false,
        permiteUpdate: false,
        permiteDelete: false,
        errorAddCliente: {},
      })
    }
    const valLista = ev.target
};

handleClickUpd = (ev) => {
  ev.preventDefault()
  this.setState({
    permiteUpdate: true,
    permiteDelete: false,
  })
}

handleClickDel = async (ev) => {
  ev.preventDefault()
  // console.log(this.state.idLista)

  // const listC = await this.props.allClientes;
  // try{
  //   // console.log(listC);
  // }catch(e){
  //   return{}
  // }
  
//     const exist = await listC.find(function(elem) {
//         return elem.servicios.subclaseserv.claseserv.codigoClaseServ == this.props.idLista.codigoClaseServ;
//     })
// console.log(exist)
  this.setState({
    permiteUpdate: false,
    permiteDelete: true,
  })
}


  render(){
    const {showClient, showUser, showConfig, addCliente, verCliente, addUsuario, permiteUpdate, permiteDelete, argsAddUsuario, errorAddUsuario, argsAddCliente, errorAddCliente, argsBuscCliente, idLista} = this.state;
    
    // this.props.allClientes.variables = argsBuscCliente
    // const listaCli = this.props.allClientes.allClientes
    // this.props.allClientes.refetch()
    let listaCli = []
    if (this.state.showClient || this.state.verCliente) {
      if(this.props.allClientes.allClientes){listaCli = this.props.allClientes.allClientes}
    }
    
    // this.props.allClientes.refetch(argsBuscar)
    // this.props.allClientes.refetch()
    // const {variables} = this.props.allClientes
    // console.log(variables)
    // console.log(argsBuscCliente)
    // console.log(listaCli)
    // if(listaCli){console.log(listaCli.length)};
    // console.log(this.props.allClientes)
    // console.log(this.props)
// console.log(this.props.allClientes)
// delete this.props.allClientes.variables.contrato
    // console.log(this.props)
    return (
      <div>
        <div className="ui two column stackable grid">
          <div className="row rowBotones container" style={styles.bordes}>
          <div className="column" style={styles.boxIzq}>
              <div className="medium ui simple icon dropdown button" style={styles.menu}>

                <i className="bars inverted icon"></i>
                <div className="menu">
                  <h2 className="ui header fluid">
                    <img src="images/hombre.png" className="ui circular image" alt="imagen"/>
                    Wilson Martínez
                    <Button>
                      <Icon name='edit' />
                    </Button>

                    {/* <Button className="small edit icon button"></Button> */}
                    {/* <button className="small ui icon button">
                      <i className="small edit icon"></i>
                    </button> */}
                  </h2>
                <div className="ui divider"></div>
                  <div className="item">
                    <i className="dropdown icon"></i>
                    <span className="text">Menu a la derecha</span>
                    <div className="right menu">
                      <div className="item">
                      <a href="" onClick={this.showClient}>Clientes</a>
                      </div>
                      <div className="item">2</div>
                      <div className="item">3</div>
                    </div>
                  </div>
                  <div className="item">
                    <i className="dropdown icon"></i>
                    <span className="text">Otro menu a la derecha</span>
                    <div className="right menu">
                      <div className="item">1</div>
                      <div className="item">2</div>
                      <div className="item">3</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <img className="ui small image" src="images/logocliente.png" alt="foto"/> */}


              {/* <span>foroptic</span> */}
            </div>

            <div className="column" style={styles.boxDer}>
              <div className="ui labeled inverted icon menu" style={styles.menu}>
                <a href="" onClick={this.showClient} className="item selected">
                  <i className="id card icon"></i>
                  Clientes
                </a>
                <a href="" onClick={this.showUser} className="item">
                  <i className="users icon"></i>
                  Usuarios
                </a>
                <a href="" onClick={this.showConfig} className="item">
                  <i className="settings icon"></i>
                  Configurar
                </a>
                <a href="" onClick={this.logout} className="right item">
                  <i className="close icon"></i>
                  Salir
                </a>
                {/* <a className="right item">
                  <i className="cog icon"></i>
                  Configurar
                </a> */}
              </div>
            </div>
          </div>
          
          <div className="row" style={styles.rowMarquee}>
            {/* <marquee behavior="alternate" scrollamount="7" color="red">!! Mensaje !!</marquee> */}
            <div className="marquee">
              <div>
                <span>!! Mensaje !!</span>
                <span>!! Mensaje !!</span>
              </div>
            </div>
          </div>



          {!showConfig &&
          <div className="column" style={styles.boxIzq}>
            {/* {showConfig && <HomeConf />} */}
            {showClient && <HomeCli1 styles={styles} handleChange={this.handleChangeBuscClient} handleSubmit={this.handleBuscCliente} args={argsBuscCliente}/>}
            {showUser && <HomeUsu1 styles={styles}/>}
            {addCliente && <AddCli1 styles={styles} handleClickRegr={this.showClient}/>}

            {verCliente && <VerCli1 styles={styles} handleClickRegr={this.showClient} handleClickUpd={this.handleClickUpd} handleClickDel={this.handleClickDel}/>}

            {addUsuario && <AddUsu1 styles={styles}/>}
          </div>}
          {!showConfig &&
          <div className="column" style={styles.boxDer}>
            {showClient && <HomeCli2 styles={styles} handleClick={this.addCliente} list={listaCli} handleClickidLista={this.idLista}/>}
            {showUser && <HomeUsu2 styles={styles} handleClick={this.addUsuario} />}
            {addCliente && <AddCli2 styles={styles} handleLista={this.handleCiudad} handleSubmit={this.handleCliente} handleChange={this.handleChange} args={argsAddCliente} errors={errorAddCliente} />}

            {verCliente && <VerCli2 styles={styles} handleLista={this.handleCiudad} handleSubmit={this.handleCliente} handleChange={this.handleChange} args={argsAddCliente} errors={errorAddCliente} idLista={idLista} list={listaCli} permiteUpdate={this.state.permiteUpdate} permiteDelete={this.state.permiteDelete}/>}
            {/* {verCliente && <VerCli2 idLista={idLista} list={listaCli}/>} */}

            {addUsuario && <AddUsu2 styles={styles} handleLista={this.handlePerfilUsuario} handleSubmit={this.handleUsuario} handleChange={this.handleChange} args={argsAddUsuario} errors={errorAddUsuario} />}
          </div>}
          {showConfig &&
          <div className="column" style={styles.boxUnaCol}>
            {showConfig && <HomeConf />}
          </div>}
        </div>
      </div>
    )
  }
}

// export default compose(
//   graphql(queries.mutation.login,{name: 'login'}),
//   graphql(queries.mutation.createUser, {name:'createUser'}),
// )(Login)

export default compose(
  // graphql(queries.query.allClientes, {name:'allClientes', options: (props) => {return {variables: {nombreCliente: "XXXX"}}}}),
  graphql(queries.query.allClientes, {name:'allClientes', options: (props) => {return {variables: argsBuscar}}}),
  // graphql(queries.query.allClientes, {name:'allClientes', options: (props) => {return {variables: {nombreCliente: "AGUSTIN"}}}}),
  graphql(queries.mutation.createUsuario, {name:'createUsuario'}),
  graphql(queries.mutation.createCliente, {name:'createCliente'}),
  graphql(queries.mutation.editCliente, {name:'editCliente'}),
  graphql(queries.mutation.deleteCliente, {name:'deleteCliente'}),
  graphql(queries.mutation.createServicio, {name:'createServicio'}),
  // graphql(queries.mutation.editServicio, {name:'editServicio'}),
)(Home)

// export default graphql(queries.mutation.createUsuario)(Home)
