import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import ApiController from '../controller/ApiController';
import { KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            lastName: null,
            email: null,
            user: null,
            password: null,
        }
    }

    checkCreate() {
        if (this.state.user != null && this.state.password != null) {
            ApiController.insertUsuario(this.state.name, this.state.lastName, this.state.email,
                this.state.user, this.state.password, this.okCreate.bind(this));
        } else {
            alert("Volver a intentar");
        }
    }

    okCreate() {
        alert("Se creo el usuario exitosamente");
        this.props.onPress();
    }

    render() {
        return (
            // <LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding" enabled>
                <LinearGradient colors={['#1D71B8', '#2D2E83']} style={styles.loginContainer}>
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ height: 250, width: 250, resizeMode: 'contain',paddingBottom:10 }}
                            source={require('./Licha-enjoy.png')}></Image>
                    </View>
                    <View style={{ paddingTop: 0, alignItems:'center' }}>
                        <View style={styles.outterInput}>
                            <TextInput style={styles.textInput}
                                placeholder="Name"
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({ name: text })} />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Last Name"
                                onChangeText={(text) => this.setState({ lastName: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Email"
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="User"
                                onChangeText={(text) => this.setState({ user: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Password"
                                onChangeText={(text) => this.setState({ password: text })}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                onPress={() => this.checkCreate()}>
                                <Text style={{ color: 'white', fontWeight: 'bold', }}>Create Account </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                onPress={() => this.props.onPress()}>
                                <Text style={{ color: 'white', fontWeight: 'bold', }}>Go back </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
            //</LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#9FA8DA',
    },
    textInput: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    outterInput: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        }},
        inputContainer: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            borderBottomWidth: 1,
            width: 300,
            height: 45,
            marginBottom: 20,
            alignItems: 'center',
        },
        imageStyle: {
            width: '100%',
            height: 200,
            resizeMode: 'contain',
            justifyContent: 'center'
        },
        imageContainer: {
            flex: 1,
            justifyContent: 'center'
        },
        outterButton: {
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 20,
        },
        outterButtonCreate: {
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 20,
        },
        SubmitButtonStyle: {
            width: 150,
            marginTop: 5,
            paddingTop: 5,
            paddingBottom: 5,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: '#373737',
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: '#fff'
        },
        loginButton: {
            backgroundColor: "#00b5ec",
            marginHorizontal: 5,
            shadowOffset: {
                width: 0,
                height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,

            elevation: 19,
        },
        buttonContainer: {
            height: 45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            width: 150,
            borderRadius: 30,
            backgroundColor: 'transparent'
        },
    })

export default Login;