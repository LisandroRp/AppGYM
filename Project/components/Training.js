import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorFrases from './Fotos/ExportadorFrases'
import { withNavigation } from 'react-navigation';
import { BlackShadow, BlackShadowForBlack } from './Estilos/Styles'
import { AzulPrincipal } from './Estilos/Colors'
import { BlueParallelButton, BlackButtonText, WhiteModalText } from './Estilos/PreMadeComponents'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    AsyncStorage,
    Modal
} from 'react-native';
import Version from '../app.json';
import ExportadorActualizarBase from './Fotos/ExportadorActualizarBase';
import RNPickerSelect from 'react-native-picker-select';
import Swiper from "react-native-web-swiper";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            creandoPlan: false,
            modalVisible: false,
            objetivoDeseado: '',
            experiencia: '',
            actividad: '',
            genero: '',
            altura: 0,
            edad: 0,
            peso: 0,

            ejercicios: [],
            rutinas: [],
            ejerciciosRutina: [],
            perfil: {},
            configuracion: {},
            version: 0,

            calorias: {},
            id_idioma: this.props.navigation.getParam('id_idioma')
        };
    }
    componentDidMount() {
        this.setState({ isLoading: false })
    }

    crearPlan() {
        var calorias = {
            caloriasBase: 0,
            caloriasEjercicio: 0,
            caloriasTotal: 0
        }
        if (this.state.peso == 0) {
            alert("Ingresa un Peso")
            return
        }
        if (this.state.altura == 0) {
            alert("Ingresa una Altura")
            return
        }
        if (this.state.edad == 0) {
            alert("Ingresa una Edad")
            return
        }
        if (this.state.genero == '') {
            alert("Seleccionar Genero")
            return
        }
        if (this.state.objetivoDeseado == '') {
            alert("Seleccionar Objetivo Deseado")
            return
        }
        if (this.state.experiencia == '') {
            alert("Seleccionar Su Nivel de Experiencia")
            return
        }
        if (this.state.genero == 'Masculino') {

            calorias.caloriasBase = ((10 * parseInt(this.state.peso)) + (6.25 * parseInt(this.state.altura)) - (5 * parseInt(this.state.edad)) + 5)

        } else {
            calorias.caloriasBase = ((10 * parseInt(this.state.peso)) + (6.25 * parseInt(this.state.altura)) - (5 * parseInt(this.state.edad)) - 161)

        }
        if (calorias.caloriasBase != 0) {
            switch (this.state.actividad) {

                case 1:

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.2
                    break;

                case 2:

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.375
                    break;

                case 3:

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.55
                    break;

                case 4:

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.725
                    break;

                case 5:

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.9
                    break;

                default:

                    calorias.caloriasEjercicio = calorias.caloriasBase
                    break;
            }
            if (calorias.caloriasEjercicio != 0) {
                switch (this.state.objetivoDeseado) {

                    case 1:

                        calorias.caloriasTotal = calorias.caloriasEjercicio + calorias.caloriasEjercicio * 0.15
                        break;

                    case 2:

                        calorias.caloriasTotal = calorias.caloriasEjercicio - calorias.caloriasEjercicio * 0.15
                        break;

                    case 3:

                        calorias.caloriasTotal = calorias.caloriasEjercicio
                        break;

                    case 4:

                        calorias.caloriasTotal = calorias.caloriasEjercicio - calorias.caloriasEjercicio * 0.1
                        break;

                    case 5:

                        calorias.caloriasTotal = calorias.caloriasEjercicio
                        break;

                    default:

                        calorias.caloriasTotal = calorias.caloriasEjercicio
                        break;
                }
            }
            this.setState({ calorias: calorias })
            this.okExperiencia(calorias)
        }
    }
    okExperiencia(calorias) {
        base.guardarPlan(calorias, this.state.objetivoDeseado, this.state.experiencia, this.state.edad, this.state.peso, this.mostrarPlan.bind(this))
    }

    mostrarPlan() {
        this.props.onPressCrear(this.state.id_idioma)
    }

    okOmitir() {
        this.props.onOmitir(this.state.id_idioma);
    }

    render() {
        if (this.state.creandoPlan) {
            if (this.state.creandoPlan) {
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.insideContainer} >
                            <ActivityIndicator size="large" color="#3399ff" style={{}} />
                            <Text style={styles.activatorContainer}>{ExportadorFrases.CreandoPlan(this.state.id_idioma)}</Text>
                        </View>
                    </View>
                );
            }
            else {
                return (
                    <View style={styles.container}>
                        <StatusBar barStyle="light-content" />
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.StatusBar} />
                        <ActivityIndicator size="large" color="#3399ff" style={{ flex: 2 }}></ActivityIndicator>
                    </View>
                );
            }
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <View style={styles.StatusBar} />
                    <Swiper
                        controlsProps={{
                            prevTitle: ExportadorFrases.SwipperAnterior(this.state.id_idioma),
                                nextTitle: ExportadorFrases.SwipperSiguienteidioma(this.state.id_idioma),
                            nextTitleStyle: styles.swiperButtons,
                            prevTitleStyle: styles.swiperButtons
                        }}
                    >
                        <View style={[styles.slideContainer]}>
                            <View style={[styles.imageContainer, BlackShadowForBlack()]}>
                                <Image style={styles.Logo} source={require('../assets/Logo_Solo.png')} />
                            </View>
                            <View style={[styles.slide1, BlackShadowForBlack()]}>
                                <Text style={styles.slideText}>{ExportadorFrases.DeslizarTraining(this.state.id_idioma)}</Text>
                            </View>
                        </View>
                        <KeyboardAvoidingView style={[styles.slideContainer]} behavior="position" keyboardVerticalOffset={height * 0.11} enabled>

                            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                                <View style={[styles.slideContainerInside2]}>
                                    <View style={[styles.slide2, BlackShadowForBlack()]}>
                                        <Text style={styles.slideText2}>{ExportadorFrases.FichaTitulo(this.state.id_idioma)}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: wp("70"), justifyContent: "space-between" }}>
                                        <RNPickerSelect
                                            useNativeAndroidPickerStyle={false}
                                            placeholder={{
                                                label: ExportadorFrases.NivelActividad(this.state.id_idioma),
                                                value: ''
                                            }}
                                            placeholderTextColor="black"
                                            style={{
                                                inputIOS: [styles.mediumPikerIOS, BlackShadow()],
                                                inputAndroid: [styles.mediumPikerAndroid, BlackShadow()]
                                            }}
                                            onValueChange={(value) => this.setState({ actividad: value })}
                                            items={[
                                                { label: ExportadorFrases.NivelActividadOpciones(this.state.id_idioma, 1), value: 1 },
                                                { label: ExportadorFrases.NivelActividadOpciones(this.state.id_idioma, 2), value: 2 },
                                                { label: ExportadorFrases.NivelActividadOpciones(this.state.id_idioma, 3), value: 3 },
                                                { label: ExportadorFrases.NivelActividadOpciones(this.state.id_idioma, 4), value: 4 },
                                                { label: ExportadorFrases.NivelActividadOpciones(this.state.id_idioma, 5), value: 5 }
                                            ]}
                                        />
                                        <RNPickerSelect
                                            useNativeAndroidPickerStyle={false}
                                            placeholder={{
                                                label: ExportadorFrases.Genero(this.state.id_idioma),
                                                value: ''
                                            }}
                                            placeholderTextColor="black"
                                            style={{
                                                inputIOS: [styles.smallPikerIOS, BlackShadow()],
                                                inputAndroid: [styles.smallPikerAndroid, BlackShadow()]
                                            }}
                                            onValueChange={(value) => this.setState({ genero: value })}
                                            items={[
                                                { label: ExportadorFrases.GeneroOpciones(this.state.id_idioma, 1), value: 'Masculino' },
                                                { label: ExportadorFrases.GeneroOpciones(this.state.id_idioma, 2), value: 'Femenino' }
                                            ]}
                                        />
                                    </View>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{
                                            label: ExportadorFrases.ObjetivoDeseado(this.state.id_idioma),
                                            value: ''
                                        }}
                                        placeholderTextColor="black"
                                        style={{
                                            inputIOS: [styles.largePikerIOS, BlackShadow()],
                                            inputAndroid: [styles.largePikerAndroid, BlackShadow()]
                                        }}

                                        onValueChange={(value) => this.setState({ objetivoDeseado: value })}
                                        items={[
                                            { label: ExportadorFrases.ObjetivoDeseadoOpciones(this.state.id_idioma, 1), value: 1 },
                                            { label: ExportadorFrases.ObjetivoDeseadoOpciones(this.state.id_idioma, 2), value: 2 },
                                            { label: ExportadorFrases.ObjetivoDeseadoOpciones(this.state.id_idioma, 3), value: 3 },
                                            { label: ExportadorFrases.ObjetivoDeseadoOpciones(this.state.id_idioma, 4), value: 4 },
                                            { label: ExportadorFrases.ObjetivoDeseadoOpciones(this.state.id_idioma, 5), value: 5 }
                                        ]}
                                    />
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{
                                            label: ExportadorFrases.ExperienciaEntrenamiento(this.state.id_idioma),
                                            value: ''
                                        }}
                                        placeholderTextColor="black"
                                        style={{
                                            inputIOS: [styles.largePikerIOS, BlackShadow()],
                                            inputAndroid: [styles.largePikerAndroid, BlackShadow()]
                                        }}
                                        onValueChange={(value) => this.setState({ experiencia: value })}
                                        items={[
                                            { label: ExportadorFrases.ExperienciaEntrenamientoOpciones(this.state.id_idioma, 1), value: 1 },
                                            { label: ExportadorFrases.ExperienciaEntrenamientoOpciones(this.state.id_idioma, 2), value: 2 },
                                            { label: ExportadorFrases.ExperienciaEntrenamientoOpciones(this.state.id_idioma, 3), value: 3 }
                                        ]}
                                    />
                                    <View style={{ flexDirection: "row", width: wp("70"), justifyContent: "space-between" }}>
                                        <TextInput style={[styles.TextContainer, BlackShadow()]} maxLength={3} keyboardType='numeric' placeholder={ExportadorFrases.AlturaDeseado(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(altura) => this.setState({ altura })} value={this.state.altura}></TextInput>
                                        <TextInput style={[styles.TextContainer, BlackShadow()]} maxLength={2} keyboardType='numeric' placeholder={ExportadorFrases.EdadDeseada(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(edad) => this.setState({ edad })} value={this.state.edad}></TextInput>
                                        <TextInput style={[styles.TextContainer, BlackShadow()]} maxLength={5} keyboardType='numeric' placeholder={ExportadorFrases.PesoDeseado(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(peso) => this.setState({ peso })} value={this.state.peso}></TextInput>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>

                        {/* </View> */}
                        <ScrollView style={{flex: 1}}>
                        <View style={[styles.slideContainer]}>
                            <View style={styles.slideContainerInside3}>
                                <Text style={styles.slideText3}>{ExportadorFrases.PlanTitulo(this.state.id_idioma)}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: 'space-around'}}>
                                <BlueParallelButton onPress={() => { this.setState({ modalVisible: true }) }}>
                                    <BlackButtonText>
                                        {ExportadorFrases.OmitirPlan(this.state.id_idioma)}
                                    </BlackButtonText>
                                </BlueParallelButton>
                                <BlueParallelButton onPress={() => { this.setState({ isLoading: true, creandoPlan: true }), this.crearPlan() }}>
                                    <BlackButtonText>
                                        {ExportadorFrases.CrearPlan(this.state.id_idioma)}
                                    </BlackButtonText>
                                </BlueParallelButton>
                            </View>
                        </View>
                        </ScrollView>
                    </Swiper>
                    <Modal
                        animationType="fade"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}  >

                        <View style={[styles.modal, BlackShadow()]}>
                            <View style={styles.modal1}>
                                <Text style={styles.modalText}>{ExportadorFrases.OmitirPlanModalLabel(this.state.id_idioma)}</Text>
                            </View>
                            <View style={styles.modal2}>
                                <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                                    <WhiteModalText>{ExportadorFrases.Cancelar(this.state.id_idioma)}</WhiteModalText>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.okOmitir(this.state.id_idioma)} style={styles.modalButtonAceptar}>
                                    <WhiteModalText>{ExportadorFrases.Aceptar(this.state.id_idioma)}</WhiteModalText>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                </View>

            )
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
    activatorContainer: {
        marginTop: hp(2.5),
        fontSize: wp(4),
        color: "#3399ff"
    },
    StatusBar: {
        height: hp(4),
        backgroundColor: "black"
    },
    swiperButtons: {
        fontSize: wp(5),
        marginBottom: height * 0.011
    },

    imageContainer: {
        flex: 0.7,
        padding: wp(5),
        marginHorizontal: wp(5),
        borderRadius: hp(1),
        margin: wp(2.5),
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: height * 0.08,
    },

    Logo: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    slide1: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: hp(1),
        opacity: .95,
        marginHorizontal: wp(5),
        marginBottom: height * 0.028
    },
    slide2: {
        backgroundColor: "black",
        marginTop: height * 0.14,
        marginBottom: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        opacity: .95,
    },

    slideText: {
        alignSelf: "center",
        fontSize: wp(5),
        color: "#3399ff",
        textAlign: 'center'
    },

    slideText2: {
        textAlign: "center",
        fontSize: wp(5.5),
        color: "#3399ff"
    },

    slideText3: {
        padding: wp(10),
        fontSize: wp(5),
        color: "#3399ff"
    },

    bgImage: {
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        resizeMode: 'cover'
    },
    slideContainer: {
        flex: 1,
        justifyContent: "center",
    },

    TextContainer: {
        backgroundColor: 'grey',
        borderRadius: 10,
        width: wp("20"),
        height: hp("5.5"),
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        textAlign: 'center',
        marginTop: height * 0.028,
        opacity: .95
    },
    slideContainerInside2: {
        width: width,
        height: height,
        alignItems: "center",
    },
    slideContainerInside3: {
        backgroundColor: "black",
        marginHorizontal: wp(5),
        marginTop: hp(10),
        marginBottom: hp(5),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',

    },
    guardarButton: {
        backgroundColor: 'grey',
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.33,
        marginHorizontal: height * 0.025,
        alignSelf: 'center',
        opacity: .95
    },
    ///////////////////////////////////////
    //Pikers
    //////////////////////////////////////
    smallPikerIOS: {
        backgroundColor: 'grey',
        borderRadius: 10,
        width: wp("22"),
        height: hp("5.5"),
        marginBottom: height * 0.028,
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        color: "black",
        textAlign: 'center'
    },
    smallPikerAndroid: {
        backgroundColor: 'grey',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: wp("22"),
        height: hp("5.5"),
        marginBottom: height * 0.028,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        color: "black",
        textAlign: 'center'
    },
    mediumPikerIOS: {
        backgroundColor: 'grey',
        borderRadius: 10,
        width: wp("44"),
        height: hp("5.5"),
        marginBottom: height * 0.028,
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        color: "black",
        paddingLeft: wp(2.5)
    },
    mediumPikerAndroid: {
        backgroundColor: 'grey',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: wp("44"),
        height: hp("5.5"),
        marginBottom: height * 0.028,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        color: "black",
        paddingLeft: wp(2.5)
    },
    largePikerIOS: {
        backgroundColor: 'grey',
        borderRadius: 10,
        width: wp("70"),
        height: hp("5.5"),
        margin: height * 0.028,
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        color: "black",
        textAlign: 'center'
    },
    largePikerAndroid: {
        backgroundColor: 'grey',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: wp("70"),
        height: hp("5.5"),
        margin: height * 0.028,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        color: "black",
        textAlign: 'center'
    },
    //MODAAAAL
    modal: {
        height: hp(20),
        width: width * 0.75,
        position: 'absolute',
        top: height * 0.4,
        left: width * 0.13,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'grey',
        shadowColor: 'black',
        shadowOpacity: 5.0,
        borderRadius: 22,
        opacity: .95
    },
    modal1: {
        flex: 1,
        paddingHorizontal: wp(2),
        justifyContent: "center"
    },
    modal2: {
        flexDirection: 'row',
        borderColor: 'black',
        borderTopWidth: 2,
        width: width * 0.74,
        height: hp(6),
        opacity: .95
    },
    modalText: {
        color: 'white',
        fontSize: wp(4),
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: hp(2),
    },
    modalButtonCancelar: {
        width: width * 0.37,
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 22
    },
    modalButtonAceptar: {
        width: width * 0.366,
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        borderLeftWidth: 2,
        borderBottomRightRadius: 22
    }
});

export default withNavigation(Training);