import React from 'react';
import {graphql, compose} from 'react-apollo';

//utils
import queries from '../../utils/queries'

import HomeConf1 from './homeconf1';
import HomeConf2 from './homeconf2';
import ConfServ1 from './conf/confserv1';
import ConfServ2 from './conf/confserv2';
import ConfClase1 from './conf/confclase1';
import ConfClase2 from './conf/confclase2';
import ConfSubclase1 from './conf/confsubclase1';
import ConfSubclase2 from './conf/confsubclase2';
import AddClase1 from './conf/addclase1';
import AddClase2 from './conf/addclase2';
import AddSubclase1 from './conf/addsubclase1';
import AddSubclase2 from './conf/addsubclase2';
import AddServicio1 from './conf/addservicio1';
import AddServicio2 from './conf/addservicio2';
import VerCla1 from './conf/vercla1';
import VerCla2 from './conf/vercla2';

const styles ={
    boxIzq:{
      width: '25%',
      padding: '1em 1em 2em 2em',
    },
    boxDer:{
      width: '75%',
      padding: '1em 2em 2em 1em',
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

  const argsBuscar = {nombreCliente: "WILSON"}
  // const argsBuscar = {contrato: "XXX"}
  // const argsBuscar = {"servicios.subclaseserv.claseserv.codigoClaseServ": "2"}
  
class HomeConf extends React.Component{
    state={
      showConf: true,
      showClase: false,
      showSubclase: false,
      showServicio: false,
      showTarifa: false,
      verClase:false,
      addClase: false,
      addSubclase: false,
      addServicio: false,
      addTarifa: false,
      permiteUpdate: false,
      permiteDelete: false,
      argsAddClaseServ: {},
      errorAddClaseServ: [],
      argsAddSubclaseServ: {},
      errorAddSubclaseServ: [],
      argsAddServicio: {},
      errorAddServicio: [],
      argsAddTarifa: {},
      errorAddTarifa: [],
      idLista: {}
    }

    showConf = (ev) => {
        ev.preventDefault()
        this.setState({
            showConf: true,
            showClase: false,
            showSubclase: false,
            showServicio: false,
            showTarifa: false,
            verClase:false,
            addClase: false,
            addSubclase: false,
            addServicio: false,
            addTarifa: false,
            permiteUpdate: false,
            permiteDelete: false,
        })
      }

      showClase = (ev) => {
        ev.preventDefault()
        this.props.allClasesServ.refetch()
        this.setState({
            showConf: false,
            showClase: true,
            showSubclase: false,
            showServicio: false,
            showTarifa: false,
            verClase:false,
            addClase: false,
            addSubclase: false,
            addServicio: false,
            addTarifa: false,
            permiteUpdate: false,
            permiteDelete: false,
        })
      }

      addClase = (ev) => {
        ev.preventDefault()
        this.setState({
            showConf: false,
            showClase: false,
            showSubclase: false,
            showServicio: false,
            showTarifa: false,
            verClase:false,
            addClase: true,
            addSubclase: false,
            addServicio: false,
            addTarifa: false,
            permiteUpdate: false,
            permiteDelete: false,
        })
      }

      addSubclase = (ev) => {
        ev.preventDefault()
        this.setState({
            showConf: false,
            showClase: false,
            showSubclase: false,
            showServicio: false,
            showTarifa: false,
            verClase:false,
            addClase: false,
            addSubclase: true,
            addServicio: false,
            addTarifa: false,
            permiteUpdate: false,
            permiteDelete: false,
        })
      }

      addServicio = (ev) => {
        ev.preventDefault()
        this.setState({
            showConf: false,
            showClase: false,
            showSubclase: false,
            showServicio: false,
            showTarifa: false,
            verClase:false,
            addClase: false,
            addSubclase: false,
            addServicio: true,
            addTarifa: false,
            permiteUpdate: false,
            permiteDelete: false,
        })
      }

      showSubclase = (ev) => {
        ev.preventDefault()
        this.setState({
            showConf: false,
            showClase: false,
            showSubclase: true,
            showServicio: false,
            showTarifa: false,
            verClase:false,
            addClase: false,
            addSubclase: false,
            addServicio: false,
            addTarifa: false,
            permiteUpdate: false,
            permiteDelete: false,
        })
      }

    showServicio = (ev) => {
        ev.preventDefault()
        this.setState({
            showConf: false,
            showClase: false,
            showSubclase: false,
            showServicio: true,
            showTarifa: false,
            verClase:false,
            addClase: false,
            addSubclase: false,
            addServicio: false,
            addTarifa: false,
            permiteUpdate: false,
            permiteDelete: false,
        })
      }

      handleChange = (ev, input)=>{
        if (this.state.addClase) {
          const argsAddClaseServ = this.state.argsAddClaseServ
          argsAddClaseServ[input.name] = input.value
          this.setState({argsAddClaseServ});
          console.log(argsAddClaseServ)
        }
        if (this.state.addSubclase) {
          const argsAddSubclaseServ = this.state.argsAddSubclaseServ
          argsAddSubclaseServ[input.name] = input.value
          this.setState({argsAddSubclaseServ});
          console.log(argsAddSubclaseServ)
          
//quitarla cuando se capturen los datos
          argsAddSubclaseServ['codigoClaseServ'] = "1";
        }
        if (this.state.addServicio) {
          console.log(input.name)
          const argsAddServicio = this.state.argsAddServicio
          argsAddServicio[input.name] = input.value
          this.setState({argsAddServicio});
          console.log(argsAddServicio)

//quitarla cuando se capturen los datos
// argsAddServicio['_idClaseServ'] = "5b1174edeb417f15acc97a9a";
argsAddServicio['codigoClaseServ'] = "1";
argsAddServicio['descrClaseServ'] = "Televisión";
argsAddServicio['codigoSubclaseServ'] = "12";
        }

      }

      handleClase = async (ev, args)=>{
        console.log(args)
        if(!args.codigoClaseServ||!args.descrClaseServ){
          const argsAddClaseServ = this.state.argsAddClaseServ
          const errors = [];
          if(!args.codigoClaseServ){
            argsAddClaseServ['codigoClaseServ'] = "";
            errors.push({path: 'codigoClaseServ', message: "Debe escribir el código"});
          }
          if(!args.descrClaseServ){
            argsAddClaseServ['descrClaseServ'] = "";
            errors.push({path: 'descrClaseServ', message: "Debe escribir la descripción"});
          }
          this.setState({argsAddClaseServ});
          this.setState({errorAddClaseServ: errors})
        }else{
          if(this.state.addClase){
            const response = await this.props.createClaseServ({
              variables: args
            });
            const {errors, success} = response.data.createClaseServ;
            if (!success){
              this.setState({errorAddClaseServ: errors})
            }else{
              var codigoClaseServ = document.getElementById("codigoClaseServ");
              var descrClaseServ = document.getElementById("descrClaseServ");
              codigoClaseServ.value = ""
              descrClaseServ.value = ""
              const errors = [];
              this.setState({errorAddClaseServ: errors})
              this.setState({argsAddClaseServ: {}})
            }
          }else{
            if(this.state.permiteUpdate){
              console.log("entro modificar")
              const argsUpd = {
                _id: args._id,
                descrClaseServ: args.descrClaseServ
              }
              console.log(argsUpd)
              const response = await this.props.editClaseServ({
                variables: argsUpd
              });
              console.log("paso modificar")
              const {errors, success} = response.data.editClaseServ;
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
              const response = await this.props.deleteClaseServ({
                variables: argsDel
              });
              console.log("ya elimino")
              console.log(response)
              this.showClase
            }
            console.log(args._id)
            console.log(this.state.permiteUpdate)
            console.log(this.state.permiteDelete)
          }
        }
      }

      handleSubclase = async (ev, args)=>{
        console.log(args)
        if(!args.codigoSubclaseServ||!args.descrSubclaseServ||!args.descrClaseServ){
          const argsAddSubclaseServ = this.state.argsAddSubclaseServ
          const errors = [];
          if(!args.codigoSubclaseServ){
            argsAddSubclaseServ['codigoSubclaseServ'] = "";
            errors.push({path: 'codigoSubclaseServ', message: "Debe escribir el código"});
          }
          if(!args.descrSubclaseServ){
            argsAddSubclaseServ['descrSubclaseServ'] = "";
            errors.push({path: 'descrSubclaseServ', message: "Debe escribir la descripción"});
          }
          if(!args.descrClaseServ){
            argsAddSubclaseServ['_idClaseserv'] = "";
            argsAddSubclaseServ['descrClaseServ'] = "Seleccionar...";
            errors.push({path: 'Clase', message: "Debe seleccionar la clase"});
          }
          this.setState({argsAddSubclaseServ});
          this.setState({errorAddSubclaseServ: errors})
        }else{
          console.log(args)
          const response = await this.props.createSubclaseServ({
          // const response = await this.props.mutate({
            variables: args
          });
          // console.log('Graphql response', response);
          const {errors, success} = response.data.createSubclaseServ;
          if (!success){
            this.setState({errorAddSubclaseServ: errors})
          }else{
            // this.props.history.push("/")
            var codigoSubclaseServ = document.getElementById("codigoSubclaseServ");
            var descrSubclaseServ = document.getElementById("descrSubclaseServ");
            var clase = document.getElementById("miLista");
            clase.options.selectedIndex = 0
            codigoSubclaseServ.value = ""
            descrSubclaseServ.value = ""
            const errors = [];
            this.setState({errorAddSubclaseServ: errors})
            this.setState({argsAddSubclaseServ: {}})
          }
        }
      }

      handleServicio = async (ev, args)=>{
        // console.log(args)
        if(!args.codigoServicio||!args.nombreResumido||!args.descripcionServicio||!args.descrSubclaseServ){
          const argsAddServicio = this.state.argsAddServicio
          const errors = [];
          if(!args.codigoServicio){
            argsAddServicio['codigoServicio'] = "";
            errors.push({path: 'codigoServicio', message: "Debe escribir el código"});
          }
          if(!args.nombreResumido){
            argsAddServicio['nombreResumido'] = "";
            errors.push({path: 'nombreResumido', message: "Debe escribir la descripción resumida"});
          }
          if(!args.descripcionServicio){
            argsAddServicio['descripcionServicio'] = "";
            errors.push({path: 'descripcionServicio', message: "Debe escribir la descripción"});
          }
          if(!args.descrSubclaseServ){
            argsAddServicio['_idSubclaseServ'] = "";
            argsAddServicio['descrSubclaseServ'] = "Seleccionar...";
            errors.push({path: 'Subclase', message: "Debe seleccionar la subclase"});
          }
          this.setState({argsAddServicio});
          this.setState({errorAddServicio: errors})
        }else{
          console.log(args)
          const response = await this.props.createServicio({
          // const response = await this.props.mutate({
            variables: args
          });
          // console.log('Graphql response', response);
          const {errors, success} = response.data.createServicio;
          if (!success){
            this.setState({errorAddServicio: errors})
          }else{
            // this.props.history.push("/")
            var codigoServicio = document.getElementById("codigoServicio");
            var nombreResumido = document.getElementById("nombreResumido");
            var descripcionServicio = document.getElementById("descripcionServicio");
            var subclase = document.getElementById("miLista");
            subclase.options.selectedIndex = 0
            codigoServicio.value = ""
            nombreResumido.value = ""
            descripcionServicio.value = ""
            const errors = [];
            this.setState({errorAddServicio: errors})
            this.setState({argsAddServicio: {}})
          }
        }
      }

      handleClaseSub = () => {
        var miLista = document.getElementById("miLista");
        const argsAddSubclaseServ = this.state.argsAddSubclaseServ
        argsAddSubclaseServ['descrClaseServ'] = miLista.options[miLista.selectedIndex].text
        argsAddSubclaseServ['_idClaseserv'] = miLista.options[miLista.selectedIndex].value
        this.setState({argsAddSubclaseServ});
        // console.log({argsAddSubclaseServ})
    }
 
    handleSubclaseSer = () => {
      var miLista = document.getElementById("miLista");
      const argsAddServicio = this.state.argsAddServicio
      argsAddServicio['_idSubclaseServ'] = miLista.options[miLista.selectedIndex].value
      argsAddServicio['_idClaseServ'] = miLista.options[miLista.selectedIndex].attributes[0].value

      let posic1 = miLista.options[miLista.selectedIndex].text.indexOf(":")
      argsAddServicio['codigoClaseServ'] = miLista.options[miLista.selectedIndex].text.substr(0, posic1)

      let posic2 = miLista.options[miLista.selectedIndex].text.indexOf("=")
      argsAddServicio['descrClaseServ'] = miLista.options[miLista.selectedIndex].text.substr(posic1 + 2, posic2 - 4)

      posic1 = miLista.options[miLista.selectedIndex].text.indexOf(":", posic2)
      argsAddServicio['codigoSubclaseServ'] = miLista.options[miLista.selectedIndex].text.substr(posic2 + 3, posic1 - posic2 - 3)

      argsAddServicio['descrSubclaseServ'] = miLista.options[miLista.selectedIndex].text.substr(posic1 + 2)

      this.setState({argsAddServicio});
      console.log({argsAddServicio})
  }

  idLista = async (ev, idLista)=>{
    this.setState({idLista: idLista})
    ev.preventDefault()
    if (this.state.showClase) {
      this.setState({
        showConf: false,
        showClase: false,
        showSubclase: false,
        showServicio: false,
        showTarifa: false,
        verClase:true,
        addClase: false,
        addSubclase: false,
        addServicio: false,
        addTarifa: false,
        permiteUpdate: false,
        permiteDelete: false,
      })
    }

    const valLista = ev.target
    // console.log(ev.target.innerText);
    // console.log(ev.target)
    // console.log(idLista)
  };

  handleClickUpd = (ev) => {
    ev.preventDefault()
    this.setState({
      permiteUpdate: true,
      permiteDelete: false,
    })
  }

  // onDogSelected = (ev) => {
  //   ev.preventDefault()
  //   console.log("pruebaaaa")
  // }

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
      const {showConf, showClase, showSubclase, showServicio, showTarifa, verClase, addClase, addSubclase, addServicio, addTarifa, permiteUpdate, permiteDelete, argsAddClaseServ, errorAddClaseServ, argsAddSubclaseServ, errorAddSubclaseServ, argsAddServicio, errorAddServicio, argsAddTarifa, errorAddTarifa, idLista} = this.state;        
        let lista = []
        if (this.state.showClase || this.state.verClase) {
          if(this.props.allClasesServ.allClasesServ){lista = this.props.allClasesServ.allClasesServ}
        }
        if (this.state.showSubclase) {
          if(this.props.allSubclasesServ.allSubclasesServ){lista = this.props.allSubclasesServ.allSubclasesServ}
        }
        if (this.state.showServicio) {
          if(this.props.allServicios.allServicios){lista = this.props.allServicios.allServicios}
        }
            return (
            <div>
                <div className="ui two column stackable grid">
                    <div className="column" style={styles.boxIzq}>
                        {showConf && <HomeConf1 styles={styles} handleClickServ={this.showServicio}/>}
                        {showClase && <ConfClase1 styles={styles} handleClickRegr={this.showServicio}/>}

                        {verClase && <VerCla1 styles={styles} handleClickRegr={this.showClase} handleClickUpd={this.handleClickUpd} handleClickDel={this.handleClickDel}/>}

                        {addServicio && <AddServicio1 styles={styles} handleClickRegr={this.showServicio}/>}
                        {addClase && <AddClase1 styles={styles} handleClickRegr={this.showClase}/>}
                        {addSubclase && <AddSubclase1 styles={styles} handleClickRegr={this.showSubclase}/>}
                        {showSubclase && <ConfSubclase1 styles={styles} handleClickRegr={this.showServicio}/>}
                        {showServicio && <ConfServ1 styles={styles} handleClickSubcl={this.showSubclase} handleClickCl={this.showClase} handleClickRegr={this.showConf}/>}
                    </div>
                    <div className="column" style={styles.boxDer}>
                        {showConf && <HomeConf2 styles={styles}/>}
                        
                        {addServicio && <AddServicio2 styles={styles} handleLista={this.handleSubclaseSer} handleSubmit={this.handleServicio} handleChange={this.handleChange} args={argsAddServicio} errors={errorAddServicio} />}

                        {showClase && <ConfClase2 styles={styles} handleClick={this.addClase} list={lista} handleClickidLista={this.idLista}/>}

                        {verClase && <VerCla2 styles={styles} handleSubmit={this.handleClase} handleChange={this.handleChange} args={argsAddClaseServ} errors={errorAddClaseServ} idLista={idLista} list={lista} permiteUpdate={this.state.permiteUpdate} permiteDelete={this.state.permiteDelete}/>}
                        
                        {addClase && <AddClase2 styles={styles} handleSubmit={this.handleClase} handleChange={this.handleChange} args={argsAddClaseServ} errors={errorAddClaseServ} />}
                        {addSubclase && <AddSubclase2 styles={styles} handleLista={this.handleClaseSub} handleSubmit={this.handleSubclase} handleChange={this.handleChange} args={argsAddSubclaseServ} errors={errorAddSubclaseServ} />}
                        {showSubclase && <ConfSubclase2 styles={styles} handleClick={this.addSubclase} list={lista}/>}
                        {showServicio && <ConfServ2 styles={styles} handleClick={this.addServicio} list={lista}/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
  graphql(queries.query.allServicios, {name:'allServicios', options: (props) => {return {variables: {}}}}),

  graphql(queries.query.allClientes, {name:'allClientes', options: (props) => {return {variables: argsBuscar}}}),

  graphql(queries.mutation.createServicio, {name:'createServicio'}),
  graphql(queries.mutation.editServicio, {name:'editServicio'}),
  graphql(queries.query.allClasesServ, {name:'allClasesServ'}),
  graphql(queries.query.allSubclasesServ, {name:'allSubclasesServ', options: (props) => {return {variables: {}}}}),
  graphql(queries.mutation.createClaseServ, {name:'createClaseServ'}),
  graphql(queries.mutation.editClaseServ, {name:'editClaseServ'}),
  graphql(queries.mutation.deleteClaseServ, {name:'deleteClaseServ'}),
  graphql(queries.mutation.createSubclaseServ, {name:'createSubclaseServ'}),
)(HomeConf)
