import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorFondo from './Fotos/ExportadorFondo'
import base from './GenerarBase';

var { height, width } = Dimensions.get('window');

class Ficha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            objetivoDeseado: '',
            experiencia: '',
            actividad: '',
            genero: '',
            altura: 0,
            peso: 0,
            edad: 0,

            calorias: {}
        };
    }

    okPlan(perfil) {
        this.setState({ id_perfil: perfil.id_perfil, isLoading: false })
    }

    crearPlan() {
        calorias = {
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

                case "1":

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.2
                    break;

                case "2":

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.375
                    break;

                case "3":

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.55
                    break;

                case "4":

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.725
                    break;

                case "5":

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.9
                    break;

                default:

                    calorias.caloriasEjercicio = calorias.caloriasBase
                    break;
            }
            if (calorias.caloriasEjercicio != 0) {
                switch (this.state.objetivoDeseado) {

                    case "1":

                        calorias.caloriasTotal = calorias.caloriasEjercicio + calorias.caloriasEjercicio * 0.15
                        break;

                    case "2":

                        calorias.caloriasTotal = calorias.caloriasEjercicio - calorias.caloriasEjercicio * 0.15
                        break;

                    case "3":

                        calorias.caloriasTotal = calorias.caloriasEjercicio
                        break;

                    case "4":

                        calorias.caloriasTotal = calorias.caloriasEjercicio - calorias.caloriasEjercicio * 0.1
                        break;

                    case '5':

                        calorias.caloriasTotal = calorias.caloriasEjercicio
                        break;

                    default:

                        calorias.caloriasTotal = calorias.caloriasEjercicio
                        break;
                }
            }
            this.setState({ calorias: calorias })
            this.traerInfo()
        }
    }
    traerInfo = async (okInfo) => {
        base.traerInfo(this.state.experiencia, this.state.objetivoDeseado, this.okExperiencia.bind(this))
    }
    okExperiencia(experiencia, objetivo) {
        base.cambiarPlan(this.state.calorias, (experiencia.descripcion + "\n" + "\n" + objetivo.descripcion), this.state.experiencia, this.state.objetivoDeseado, this.state.edad, this.state.peso, this.mostrarPlan.bind(this))
    }

    mostrarPlan() {
        this.props.onPressUpdate(this.state.caloriasEjercicio, this.state.caloriasTotal, this.state.objetivoDeseado)
    }

    render() {
        var key = 0
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

                <KeyboardAvoidingView style={[styles.container]} behavior="position" enabled>
                    <StatusBar barStyle="light-content" />
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} onPress={Keyboard.dismiss} />


                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={[styles.slideContainerInside2]}>
                            <View style={styles.slide2}>
                                <Text style={styles.slideText}>Ficha Personal{"\n"}y{"\n"}Objetivos a Alcanzar</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: wp("70"), justifyContent: "space-between" }}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'Nivel de Actividad',
                                        value: ''
                                    }}
                                    placeholderTextColor="black"
                                    style={{
                                        inputIOS: {
                                            backgroundColor: 'grey',
                                            borderRadius: 10,
                                            width: wp("44"),
                                            height: hp("5.5"),
                                            marginBottom: 20,
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                            color: "black",
                                            textAlign: 'center'
                                        },
                                        inputAndroid: {
                                            backgroundColor: 'grey',
                                            borderRadius: 10,
                                            width: wp("44"),
                                            height: hp("5.5"),
                                            marginBottom: 20,
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                            color: "black",
                                            textAlign: 'center'
                                        }
                                    }}
                                    onValueChange={(value) => this.setState({ actividad: value })}
                                    items={[
                                        { label: 'Casi Nulo (1 dia o menos)', value: '1' },
                                        { label: 'Lijero (2 a 3 dias)', value: '2' },
                                        { label: 'Moderado (4 a 5 dias)', value: '3' },
                                        { label: 'Fuerte (5 a 7 dias)', value: '4' },
                                        { label: 'Deportista (2 veces al dia)', value: '5' }
                                    ]}
                                />
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'Genero',
                                        value: ''
                                    }}
                                    placeholderTextColor="black"
                                    style={{
                                        inputIOS: {
                                            backgroundColor: 'grey',
                                            borderRadius: 10,
                                            width: wp("22"),
                                            height: hp("5.5"),
                                            marginBottom: 20,
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                            color: "black",
                                            textAlign: 'center'
                                        },
                                        inputAndroid: {
                                            backgroundColor: 'grey',
                                            borderRadius: 10,
                                            width: wp("22"),
                                            height: hp("5.5"),
                                            marginBottom: 20,
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                            color: "black",
                                            textAlign: 'center'
                                        }
                                    }}
                                    onValueChange={(value) => this.setState({ genero: value })}
                                    items={[
                                        { label: 'Masculino', value: 'Masculino' },
                                        { label: 'Femenino', value: 'Femenino' },
                                    ]}
                                />
                            </View>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Objetivo Deseado',
                                    value: ''
                                }}
                                placeholderTextColor="black"
                                style={{
                                    inputIOS: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: 20,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: "black",
                                        textAlign: 'center'
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: 20,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: "black",
                                        textAlign: 'center'
                                    }
                                }}

                                onValueChange={(value) => this.setState({ objetivoDeseado: value })}
                                items={[
                                    { label: 'Ganar Masa Muscualar', value: '1' },
                                    { label: 'Perder Peso', value: '2' },
                                    { label: 'Ganar Resistencia', value: '3' },
                                    { label: 'Definir', value: '4' },
                                    { label: 'Mantener', value: '5' }
                                ]}
                            />
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Experiencia en Entrenamiento',
                                    value: ''
                                }}
                                placeholderTextColor="black"
                                style={{
                                    inputIOS: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: 20,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: "black",
                                        textAlign: 'center'
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: 20,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: "black",
                                        textAlign: 'center'
                                    }
                                }}
                                onValueChange={(value) => this.setState({ experiencia: value })}
                                items={[
                                    { label: 'Principiante', value: '1' },
                                    { label: 'Basico', value: '2' },
                                    { label: 'Experimentado', value: '3' },
                                ]}
                            />
                            <View style={{ flexDirection: "row", width: wp("70"), justifyContent: "space-between" }}>
                                <TextInput style={styles.TextContainer} maxLength={3} keyboardType='numeric' placeholder='Altura cm' placeholderTextColor='black' onChangeText={(altura) => this.setState({ altura })} value={this.state.altura}></TextInput>
                                <TextInput style={styles.TextContainer} maxLength={2} keyboardType='numeric' placeholder='Edad' placeholderTextColor='black' onChangeText={(edad) => this.setState({ edad })} value={this.state.edad}></TextInput>
                                <TextInput style={styles.TextContainer} maxLength={5} keyboardType='numeric' placeholder='Peso Kg' placeholderTextColor='black' onChangeText={(peso) => this.setState({ peso })} value={this.state.peso}></TextInput>
                            </View>


                            <TouchableOpacity style={styles.guardarButton} onPress={() => { this.crearPlan() }}>
                                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
                                    Continuar
                </Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
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
    header: {
        position: "absolute",
        backgroundColor: "black",
        top: 0,
        height: hp(9),
        width: "100%",
        flexDirection: "row-reverse"
    },
    headerContent: {
        justifyContent: "center",
        marginRight: wp(5)
    },

    Logo: {
        height: height * 0.45,
        width: height * 0.45,
        marginTop: hp(9),
        marginBottom: hp(6.6)
    },

    headerText: {
        fontSize: 18,
        alignSelf: 'center',
        color: "#3399ff",
    },

    slideContainerInside3: {
        backgroundColor: "black",
        marginHorizontal: wp(5),
        marginTop: hp(10),
        marginBottom: hp(6),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',

    },
    header: {
        position: "absolute",
        backgroundColor: "black",
        top: 0,
        height: hp(9),
        width: "100%",
        flexDirection: "row-reverse"
    },
    headerContent: {
        justifyContent: "center",
        marginRight: wp(5)
    },

    Logo: {
        height: height * 0.45,
        width: height * 0.45,
        marginTop: hp(9),
        marginBottom: hp(6.6)
    },
    slide1: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        opacity: .95,
        marginHorizontal: wp(5),
        marginVertical: hp(6)
    },
    slide2: {
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
        fontSize: 22,
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
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20
    },

    slideContainerInside2: {
        width: width,
        height: height,
        alignItems: "center",
    },
    guardarButton: {
        backgroundColor: 'grey',
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.33,
        marginTop: 33,
        marginHorizontal: 22,
        alignSelf: 'center',
        opacity: .95
    }
})
export default Ficha;