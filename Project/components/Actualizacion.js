import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorFrases from './Fotos/ExportadorFrases'
import { withNavigation } from 'react-navigation';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import Version from '../app.json';
import i18n from 'i18n-js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

class Actualizacion extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ejercicios: [],
            rutinas: [],
            ejerciciosRutina: [],
            perfil: {},
            configuracion: {},
            version: 0,

            contador: 0,
            id_idioma: i18n.t('id_idioma'),
            version: Version.expo.version
        };
    }
    componentDidMount() {
        base.abrirBase(this.existeBase.bind(this));
    }


    existeBase = async (existe, id_idioma, version) => {
        this.setState({id_idioma: id_idioma})
        if (existe == false) {
            base.crearBase(this.okBase.bind(this))
        }
        else {
            console.log("appVersion: " + this.state.version)
            console.log("celu: " + version)
            console.log("idioma: " + this.state.id_idioma)
            if (this.state.version.valueOf().toString() === version.valueOf().toString()) {
                this.okTodo()
            }
            else {
                base.traerEjerciciosPropiasParaGuardar(this.okEjercicios.bind(this))
            }
        }
    }

    okEjercicios(ejercicios) {
        this.setState({ ejercicios: ejercicios })
        base.traerRutinasPropiasParaGuardar(this.okRutinas.bind(this))
    }
    okRutinas(rutinas) {
        this.setState({ rutinas: rutinas })
        base.traerEjerciciosRutinaParaGuardar(this.okEjerciciosRutina.bind(this))
    }
    okEjerciciosRutina(ejerciciosRutina) {
        this.setState({ ejerciciosRutina: ejerciciosRutina })
        base.traerPerfil(this.okPerfil.bind(this))
    }
    okPerfil(perfil) {
        this.setState({ perfil: perfil })
        base.traerConfiguracion(this.okConfiguracion.bind(this))
    }
    okConfiguracion(configuracion) {
        this.setState({ configuracion: configuracion, contador: 1 })
        base.crearBase(this.actualizarBase.bind(this))
    }
    //************************************* */
    //Actualizar
    //************************************* */

    actualizarBase() {
        this.setState({ contador: 2 })
        if (this.state.ejercicios.length != 0) {
            base.traerIdEjercicioMax(this.actualizarEjercicios.bind(this))
        } else {
            this.okEjerciciosGuardados(this.state.ejerciciosRutina)
        }
    }

    actualizarEjercicios(maxId) {
        base.actualizarEjercicios(this.state.ejercicios, this.state.ejerciciosRutina, maxId, this.okEjerciciosGuardados.bind(this))
    }

    okEjerciciosGuardados(ejerciciosRutina) {
        this.setState({ contador: 3 })
        if (this.state.rutinas.length != 0) {
            base.traerIdRutinaMax(ejerciciosRutina, this.actualizarRutinas.bind(this))
        } else {
            this.okEjerciciosRutinaGuardados()
        }
    }
    actualizarRutinas(ejerciciosRutina, maxId) {
        base.actualizarRutinas(this.state.rutinas, ejerciciosRutina, maxId, this.okRutinasGuardadas.bind(this))
    }

    okRutinasGuardadas(ejerciciosRutina) {
        base.actualizarEjerciciosRutina(ejerciciosRutina, this.okEjerciciosRutinaGuardados.bind(this))
    }
    okEjerciciosRutinaGuardados() {
        if (this.state.perfil != null) {
            base.actualizarPerfil(this.state.perfil, this.okPerfilGuardado.bind(this))
        } else {
            this.okPerfilGuardado()
        }
    }
    okPerfilGuardado() {
        this.setState({ contador: 4 })
        base.actualizarConfiguracion(this.state.configuracion, this.state.version, this.okTodo.bind(this))
    }
    okTodo() {
        this.props.onOmitir(this.state.id_idioma);
    }

    okBase = async () => {
        this.setState({ contador: 5 })
        console.log(this.state.id_idioma + ' '  + this.state.version)
        base.guardarConfiguracion(this.state.id_idioma, this.state.version, this.okIdioma.bind(this))

    }

    okIdioma() {
        this.props.onPressStart()
    }

    render() {
        switch (this.state.contador) {
            case 0:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar} >
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}}></ActivityIndicator>

                            <View style={styles.slideVacio}>
                                
                            </View>
                        </View>
                    </View>
                );
                case 1:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar} >
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}}></ActivityIndicator>

                            <View style={styles.slide1}>
                                <Text style={styles.slideText}>{ExportadorFrases.ActualizandoBase(this.state.id_idioma)}</Text>
                            </View>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar} >
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}}></ActivityIndicator>

                            <View style={styles.slide1}>
                                <Text style={styles.slideText}>{ExportadorFrases.ActualizandoEjercicios(this.state.id_idioma)}</Text>
                            </View>
                        </View>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar} >
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}}></ActivityIndicator>

                            <View style={styles.slide1}>
                                <Text style={styles.slideText}>{ExportadorFrases.ActualizandoRutinas(this.state.id_idioma)}</Text>
                            </View>
                        </View>
                    </View>
                );

            case 4:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar} >
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}}></ActivityIndicator>

                            <View style={styles.slide1}>
                                <Text style={styles.slideText}>{ExportadorFrases.ActualizandoPlan(this.state.id_idioma)}</Text>
                            </View>
                        </View>
                    </View>
                );
            case 5:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar} >
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}}></ActivityIndicator>

                            <View style={styles.slide1}>
                                <Text style={styles.slideText}>{ExportadorFrases.GuardandoConfiguracion(this.state.id_idioma)}</Text>
                            </View>
                        </View>
                    </View>
                );

            default:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar} >
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}}></ActivityIndicator>

                            <View style={styles.slide1}>
                                <Text style={styles.slideText}>{ExportadorFrases.Actualizando(this.state.id_idioma)}</Text>
                            </View>
                        </View>
                    </View>
                );


        }
    }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
    },
    StatusBar: {
        height: hp(3),
        backgroundColor: "black",
    },

    insideContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    slideVacio: {
        padding: 10,
        borderRadius: 10,
        opacity: .95,
        alignSelf: 'center',
        marginTop: hp(5)
    },
    slide1: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        opacity: .95,
        alignSelf: 'center',
        marginTop: hp(5)
    },
    slideText: {
        alignSelf: "center",
        fontSize: 18,
        color: "#3399ff"
    },

    bgImage: {
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        resizeMode: 'cover'
    },
    slideContainer: {
        flex: 1,
        alignItems: "center"
    },


});

export default withNavigation(Actualizacion);