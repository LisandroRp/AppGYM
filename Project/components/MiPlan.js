import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, TextInput, Button, Text, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import ApiController from '../controller/ApiController';
import { AsyncStorage } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorFondo from './Fotos/ExportadorFondo';
import base from './GenerarBase';

class MiPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plan: "",
            isLoading: false
        };
        //this._retrieveData();
    }
    componentDidMount(){
        base.crearPlan(this.okPlan.bind(this))
    }
    okPlan(){
        this.setState({isLoading: false})
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
                <View style={styles.container}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                            <View style={styles.ContainerInside}>
                                        <Text style={styles.Text}>• Se le creara un plan de entrenamiento en base a los datos personales y objetivos señadalos anteriormente.
                                        {"\n"}{"\n"}• Se incluira un plan de alimentacion y las rutinas que son mas utiles para el objetivo deseado.
                                        {"\n"}{"\n"}• Podras cambiar tu ficha personal y objetivos en el momento que quieras accediendo en la parte de {"\n"}"Mi Plan" desde el SideMenu.</Text>
                                    </View>
                            
                </View>
            )
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "grey"
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
    firstContainer: {
        alignSelf: 'center', alignItems: 'center', paddingBottom: 30, width: 2000
    },
    textInput: {
        color: '#3399ff',
        fontSize: 20,
        marginLeft: 20,
    },
    underline: {
        marginTop: 5,
        flexDirection: 'row',
    },
    TextUnderline: {
        textDecorationLine: 'underline',
        color: '#3399ff',
        fontSize: 25,
        marginBottom: 10,
    },
    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 5,
        width: 100,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },

    loginButton: {
        backgroundColor: "#3399ff",

        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
    },
    CircleShapeView: {
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: '#6666ff',
        marginBottom: 30,
        marginTop: 30,
        alignItems: 'center',
        alignContent: 'center'
    },
    contentList: {
        flexDirection: 'column',
        marginLeft: 18,
        backgroundColor: 'white',
        borderRadius: 10,
        //height:200,
        paddingHorizontal: 18,
        marginTop: 18,
        // alignItems:'center', height:100 
    },
    contentList2: {
        alignItems: 'flex-start'
        // alignItems:'center', height:100 
    },
    ContainerInside: {
        backgroundColor: "black",
        marginHorizontal: wp(5),
        marginTop: hp(10),
        marginBottom: hp(6),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',

    },
    Text: {
        padding: wp(10),
        fontSize: 20,
        color: "#3399ff"
    },
})
export default MiPlan;