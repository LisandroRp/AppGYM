import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import ApiController from '../controller/ApiController';
import { AsyncStorage } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorFondo from './Fotos/ExportadorFondo'

var { height, width } = Dimensions.get('window');

class Ficha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IdUser: 'LorenzoR',
            nombre: 'Lorenzo',
            apellido: 'Rodriguez',
            email: 'LorenzoR@gmail.com',
            isLoading: false,
            genrePosta: null,
            searchBarFocused: false,
            generoEvento: [],
            generoVacio: [],
        };
        //this._retrieveData();
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('IdUser');
            if (value !== null) {
                this.setState({
                    IdUser: value,
                })
                this.getUserData(this.state.IdUser);
            }
        } catch (error) {
            console.log(error);
        }
    };

    changeGenre = value => {
        this.setState({ genrePosta: value })
        this.setState({ value })
    }
    componentDidMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    keyboardDidShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillHide = () => {
        this.setState({ searchBarFocused: false })
        this.changeGenre2()
    }
    changeGenre2() {
        if (this.state.genrePosta != null) {
            if (this.state.generoEvento[0] == null) {
                this.state.generoEvento[0] = this.state.genrePosta
            }
            else {
                this.state.generoEvento.push(this.state.genrePosta)
            }
            ApiController.saveGenre(this.state.IdUser, this.state.generoEvento, this.okChange.bind(this));
        }
    }
    getUserData() {
        ApiController.getUsuario(this.okUserData.bind(this), this.state.IdUser);
    }

    okUserData(data) {
        this.setState({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            generoEvento: data.generoEvento,
            isLoading: false,
        })
    }
    okChange() {
        alert("Your favorite genre was successfully added");
        this.setState({ value: null, genrePosta: null })
        this.getUserData(this.state.IdUser)
    }
    borrarGenero() {
        if (this.state.generoEvento.length != 0) {
            ApiController.saveGenre(this.state.IdUser, this.state.generoVacio, this.okChange.bind(this));
        }
        else {
            alert('There is no genres to erase')
        }
    }
    render() {
        var key = 0
        if (this.state.isLoading) {
            return (
                <LinearGradient colors={['grey', 'black']} style={{ flex: 1 }}>
                    <View style={styles.detalleContainer}>
                        <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                    </View>
                </LinearGradient>
            );
        } else {
            return (

                <KeyboardAvoidingView style={[styles.Container]} behavior="position" enabled>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} onPress={Keyboard.dismiss} />

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={[styles.ContainerInside]}>
                            <View style={styles.containerTitle}>
                                <Text style={styles.slideText}>Ficha Personal{"\n"}y{"\n"}Objetivos a Alcanzar</Text>
                            </View>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Objetivo Deseado',
                                    value: '0'
                                }}
                                placeholderTextColor="black"
                                style={{
                                    inputIOS: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: 20,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: "black",
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: 20,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: "black",
                                    }
                                }}

                                onValueChange={(value) => this.setState({ series: value })}
                                items={[
                                    { label: 'Ganar Masa Muscualar', value: '1' },
                                    { label: 'Perder Peso', value: '2' },
                                    { label: 'Ganar Resistencia', value: '3' },
                                    { label: 'Definir', value: '4' },
                                ]}
                            />
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Experiencia en Entrenamiento',
                                    value: '0'
                                }}
                                placeholderTextColor="black"
                                style={{
                                    inputIOS: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: 20,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: "black",
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'grey',
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        width: wp("70"),
                                        height: hp("5.5"),
                                        margin: 20,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: "black",
                                    }
                                }}
                                onValueChange={(value) => this.setState({ series: value })}
                                items={[
                                    { label: 'Sin Experiencia', value: '1' },
                                    { label: 'Principiante', value: '2' },
                                    { label: 'Basico', value: '3' },
                                    { label: 'Normal', value: '4' },
                                    { label: 'Experimentado', value: '5' },
                                ]}
                            />

                            <TextInput style={styles.TextContainer} maxLength={3} keyboardType='numeric' placeholder='Altura en Centimentros' placeholderTextColor='black' onChangeText={(altura) => this.setState({ altura: altura })} value={this.state.altura}></TextInput>
                            <TextInput style={styles.TextContainer} maxLength={5} keyboardType='numeric' placeholder='Peso en Kg' placeholderTextColor='black' onChangeText={(peso) => this.setState({ peso: peso })} value={this.state.peso}></TextInput>
                            <TouchableOpacity style={styles.guardarButton} onPress={() => { this.props.onPressChange() }}>
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
    detalleContainer: {
        flex: 1,
        backgroundColor: '#ebf0f7'
    },
    bgImage: {
        resizeMode,
        position: 'absolute',
        width: 1000,
        height: 300,
        justifyContent: 'center',
        resizeMode: 'cover',
    },
    textInput: {
        color: '#3399ff',
        fontSize: 20,
        marginLeft: 20,
    },
    containerTitle: {
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
    Container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "grey"
    },
    TextContainer: {
        backgroundColor: 'grey',
        borderRadius: 10,
        paddingLeft: 10,
        width: wp("70"),
        height: hp("5.5"),
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    Piker: {
        backgroundColor: 'grey',
        borderRadius: 10,
        paddingLeft: 10,
        marginLeft: 20,
        marginBottom: 20,
        width: wp("70"),
        height: hp("5.5"),
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: "black",
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
        marginTop: height * 0.05,
        marginHorizontal: 22,
        alignSelf: 'center',
        opacity: .95
      },
})
export default Ficha;