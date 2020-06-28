import { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Training from '../Training'
import base from '../GenerarBase';


class ExportadorActualizarBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ejercicios: [],
            rutinas: [],
            ejerciciosRutina: [],
            perfil: {},
            configuracion: {},
            version: 0
        };
    }

    existeBase = async (existe, id_idioma, version) => {
        if (existe == false) {
            base.crearBase(this.okBase.bind(this))
        }
        else {
            console.log("celu: "+this.state.version)
            console.log("app: "+version)
            console.log("idioma: "+id_idioma)
            if(this.state.version == version){
                Training.pasarMenu(id_idioma)
            }
            else{
                base.traerEjerciciosPropiasParaGuardar(this.okEjercicios.bind(this))
            }
        }
    }

    okEjercicios(ejercicios){
        this.setState({ejercicios: ejercicios}) 
        base.traerRutinasPropiasParaGuardar(this.okRutinas.bind(this))
    }
    okRutinas(rutinas){
        this.setState({rutinas: rutinas}) 
        base.traerEjerciciosRutinaParaGuardar(this.okEjerciciosRutina.bind(this))
    }
    okEjerciciosRutina(ejerciciosRutina){
        this.setState({ejerciciosRutina: ejerciciosRutina}) 
        base.traerPerfil(this.okPerfil.bind(this))
    }
    okPerfil(perfil){
        this.setState({perfil: perfil}) 
        base.traerConfiguracion(this.okConfiguracion.bind(this))
    }
    okConfiguracion(configuracion){
        this.setState({configuracion: configuracion}) 
        this.actualizarBase()
    }
    //************************************* */
    //Actualizar
    //************************************* */

    actualizarBase(){
        base.actualizarEjercicios(this.state.ejercicios, this.okEjerciciosGuardados.bind(this))
    }

    okEjerciciosGuardados(){
        base.actualizarRutinas(this.state.rutinas, this.okRutinasGuardadas.bind(this))
    }

    okRutinasGuardadas(newIdRutinas){
        newEjerciciosRutina = this.state.ejerciciosRutina
        for(var i=0; i<newIdRutinas.length; i++){
            for(var j=0; j<newEjerciciosRutina.length; j++){
                if(newEjerciciosRutina[j].id_rutina == newIdRutinas[i].id_rutina){
                    newEjerciciosRutina[j].id_rutina = newIdRutinas[i].newIdRutina
                }
            }
        }
        base.actualizarEjerciciosRutina(newEjerciciosRutina, this.okEjerciciosRutinaGuardados.bind(this))
    }
    okEjerciciosRutinaGuardados(){
        base.actualizarPerfil(this.state.perfil, this.okPerfilGuardado.bind(this))
    }
    okPerfilGuardado(){
        base.actualizarConfiguracion(this.state.configuracion, this.okTodo.bind(this))
    }
}
export default new ExportadorActualizarBase();