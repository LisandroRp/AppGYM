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
import * as Localization from 'expo-localization';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

i18n.translations = {
    es: { id_idioma: 1, ejercicios: 'Ejercicios', rutinas: 'Rutinas', suplementos: 'Suplementos', favoritos: 'Favoritos', ajustes: 'Ajustes', perfil: 'Perfil' },
    en: { id_idioma: 2, ejercicios: 'Exercises', rutinas: 'Routines', suplementos: 'Supplements', favoritos: 'Favorites', ajustes: 'Settings', perfil: 'Profile' },
};
i18n.locale = Localization.locale
i18n.defaultLocale = 'es'
i18n.fallbacks = true;

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
            //id_idioma: 1,
            version: Version.expo.version
        };
    }
    componentDidMount() {
        base.abrirBase(this.existeBase.bind(this));
    }


    existeBase = async (existe, id_idioma, version) => {

        if (id_idioma != null) {
            this.setState({ id_idioma: id_idioma })
        }

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
        base.borrarBase(this.crearBase.bind(this))
    }
    //************************************* */
    //Actualizar
    //************************************* */

    crearBase() {
        base.crearBase(this.actualizarBase.bind(this))
    }
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
        console.log(this.state.id_idioma + ' ' + this.state.version)
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
                        <View style={styles.StatusBar}>
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}} />
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar}>
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}} />
                            <Text style={styles.slideText}>{ExportadorFrases.ActualizandoBase(this.state.id_idioma)}</Text>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View>
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}} />
                            <Text style={styles.slideText}>{ExportadorFrases.ActualizandoEjercicios(this.state.id_idioma)}</Text>
                        </View>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View>
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}} />
                            <Text style={styles.slideText}>{ExportadorFrases.ActualizandoRutinas(this.state.id_idioma)}</Text>
                        </View>
                    </View>
                );

            case 4:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View>
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}} />
                            <Text style={styles.slideText}>{ExportadorFrases.ActualizandoPlan(this.state.id_idioma)}</Text>
                        </View>
                    </View>
                );
            case 5:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View>
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}} />
                            <Text style={styles.slideText}>{ExportadorFrases.GuardandoConfiguracion(this.state.id_idioma)}</Text>
                        </View>
                    </View>
                );

            default:
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View>
                            <StatusBar barStyle="light-content" />
                        </View>
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}} />
                            <Text style={styles.slideText}>{ExportadorFrases.Actualizando(this.state.id_idioma)}</Text>
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
        justifyContent: 'center',
        backgroundColor: "grey"
    },

    insideContainer: {
        backgroundColor: "black",
        justifyContent: 'center',
        alignSelf: "center",
        borderRadius: 20,
        padding: wp(5)
    },
    slideText: {
        marginTop: hp(2.5),
        fontSize: wp(4),
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

});

export default withNavigation(Actualizacion);