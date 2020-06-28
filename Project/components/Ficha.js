import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorFrases from './Fotos/ExportadorFrases'
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorAds from './Fotos/ExportadorAds'
import base from './GenerarBase';
import { AdMobRewarded } from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

class Ficha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false,
            objetivoDeseado: '',
            experiencia: '',
            actividad: '',
            genero: '',
            altura: 0,
            peso: 0,
            edad: 0,

            calorias: {},
            id_idioma: 0
        };
        base.traerIdIdioma(this.okIdioma.bind(this))
    }

    okIdioma(id_idioma) {
        this.setState({ id_idioma: id_idioma, isLoading: false })
    }
    showRewarded = async () => {
        AdMobRewarded.setAdUnitID(ExportadorAds.Rewarded()); // Test ID, Replace with your-admob-unit-id

        try {
            this.setState({ modalVisible: false })
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        }
        catch (e) {
            console.log(e);
        }
    }
    chequearInfo() {
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
        this.setState({ modalVisible: true })
    }
    crearPlan() {
        var calorias = {
            caloriasBase: 0,
            caloriasEjercicio: 0,
            caloriasTotal: 0
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
            base.traerPlan(this.okExperiencia.bind(this))           
        }
    }

    okExperiencia(plan, id_idioma) {

        if (plan == null) {
            base.guardarPlan(this.state.calorias, this.state.objetivoDeseado, this.state.experiencia, this.state.edad, this.state.peso, this.mostrarPlan.bind(this))
        } else {
            base.cambiarPlan(this.state.calorias, this.state.objetivoDeseado, this.state.experiencia, this.state.edad, this.state.peso, this.mostrarPlan.bind(this))
        }
    }

    mostrarPlan() {
        this.setState({isLoading: false})
        this.props.onPressUpdate(true)
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} onPress={Keyboard.dismiss} />
                    <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
            );
        } else {
            return (

                <KeyboardAvoidingView style={[styles.container]} behavior="position" keyboardVerticalOffset={height * 0.11} enabled>
                    <StatusBar barStyle="light-content" />
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} onPress={Keyboard.dismiss} />


                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={[styles.ContainerInside]}>
                            <View style={styles.slide}>
                                <Text style={styles.slideText}>{ExportadorFrases.FichaTitulo(this.state.id_idioma)}</Text>
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
                                        inputIOS: {
                                            backgroundColor: 'grey',
                                            borderRadius: 10,
                                            width: wp("44"),
                                            height: hp("5.5"),
                                            marginBottom: height * 0.028,
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            fontSize: height * 0.02,
                                            color: "black",
                                            textAlign: 'center'
                                        },
                                        inputAndroid: {
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
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: height * 0.02,
                                            color: "black",
                                            textAlign: 'center'
                                        }
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
                                        inputIOS: {
                                            backgroundColor: 'grey',
                                            borderRadius: 10,
                                            width: wp("22"),
                                            height: hp("5.5"),
                                            marginBottom: height * 0.028,
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            fontSize: height * 0.02,
                                            color: "black",
                                            textAlign: 'center'
                                        },
                                        inputAndroid: {
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
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: height * 0.02,
                                            color: "black",
                                            textAlign: 'center'
                                        }
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
                                    inputIOS: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: height * 0.028,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: height * 0.02,
                                        color: "black",
                                        textAlign: 'center'
                                    },
                                    inputAndroid: {
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
                                        fontSize: height * 0.02,
                                        color: "black",
                                        textAlign: 'center'
                                    }
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
                                    inputIOS: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: height * 0.028,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: height * 0.02,
                                        color: "black",
                                        textAlign: 'center'
                                    },
                                    inputAndroid: {
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
                                        fontSize: height * 0.02,
                                        color: "black",
                                        textAlign: 'center'
                                    }
                                }}
                                onValueChange={(value) => this.setState({ experiencia: value })}
                                items={[
                                    { label: ExportadorFrases.ExperienciaEntrenamientoOpciones(this.state.id_idioma, 1), value: 1 },
                                    { label: ExportadorFrases.ExperienciaEntrenamientoOpciones(this.state.id_idioma, 2), value: 2 },
                                    { label: ExportadorFrases.ExperienciaEntrenamientoOpciones(this.state.id_idioma, 3), value: 3 }
                                ]}
                            />
                            <View style={{ flexDirection: "row", width: wp("70"), justifyContent: "space-between" }}>
                                <TextInput style={styles.TextContainer} maxLength={3} keyboardType='numeric' placeholder={ExportadorFrases.AlturaDeseado(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(altura) => this.setState({ altura })} value={this.state.altura}></TextInput>
                                <TextInput style={styles.TextContainer} maxLength={2} keyboardType='numeric' placeholder={ExportadorFrases.EdadDeseada(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(edad) => this.setState({ edad })} value={this.state.edad}></TextInput>
                                <TextInput style={styles.TextContainer} maxLength={4} keyboardType='numeric' placeholder={ExportadorFrases.PesoDeseado(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(peso) => this.setState({ peso })} value={this.state.peso}></TextInput>
                            </View>


                            <TouchableOpacity style={styles.guardarButton} onPress={() => { this.chequearInfo() }}>
                                <Text style={{ margin: height * 0.02, fontWeight: 'bold', fontSize: height * 0.025 }}>
                                   {ExportadorFrases.Actualizar(this.state.id_idioma)}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                    <Modal
                        animationType="fade"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}  >
                        <View style={styles.modal}>
                            <View style={{ flexDirection: 'column', marginTop: height * 0.05 }}>
                                <Text style={styles.textButton}>{ExportadorFrases.ActualizarPlanModalLabel(this.state.id_idioma)}</Text>
                            </View>
                            <View style={styles.modal2}>
                                <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                                    <Text style={styles.textButton}>{ExportadorFrases.Cancelar(this.state.id_idioma)}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {this.setState({ modalVisible: false }), this.setState({isLoading:true}), this.showRewarded(), this.crearPlan()}} style={styles.modalButtonAceptar}>
                                    <Text style={styles.textButton}>{ExportadorFrases.Aceptar(this.state.id_idioma)}</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
            )
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey"
    },
    StatusBar: {
        height: hp(3),
        backgroundColor: "black"
    },

    slide: {
        backgroundColor: "black",
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        opacity: .95,
    },

    slideText: {
        textAlign: "center",
        fontSize: height * 0.03,
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
        alignItems: "center",
    },

    TextContainer: {
        backgroundColor: 'grey',
        borderRadius: 10,
        width: wp("20"),
        height: hp("5.5"),
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: height * 0.02,
        textAlign: 'center',
        marginTop: height * 0.028,
        opacity: .95
    },

    ContainerInside: {
        width: width,
        height: height,
        alignItems: "center",
    },
    guardarButton: {
        backgroundColor: 'grey',
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.33,
        marginHorizontal: 22,
        marginTop: height * 0.05,
        alignSelf: 'center',
        opacity: .95
    },

    /*************************************** */
    //MODAAAAL
    modal: {
        height: height * 0.22,
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
    modal2: {
        flexDirection: 'row',
        borderColor: 'black',
        borderTopWidth: 2,
        width: width * 0.74,
        height: height * 0.08,
        position: 'absolute',
        bottom: 0,
        opacity: .95
    },
    textButton: {
        color: 'white',
        fontSize: height * 0.02,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: hp(1)
    },

    modalButtonCancelar: {
        width: width * 0.37,
        height: height * 0.0775,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 22
    },
    modalButtonAceptar: {
        width: width * 0.37,
        height: height * 0.0775,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        borderLeftWidth: 2,
        borderBottomRightRadius: 22
    }
})
export default Ficha;