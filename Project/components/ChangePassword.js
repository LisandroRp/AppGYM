import React, { Component } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import ApiController from '../controller/ApiController';
import { KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            oldPassword: null,
            newPassword: null,
        }
    }

    checkChange() {
        ApiController.getUsuario(this.checkUsuario.bind(this), this.state.username)
    }

    checkUsuario(data) {
        if (data.password == this.state.oldPassword && this.state.newPassword != null) {
            ApiController.changePassword(this.state.username, this.state.newPassword, this.okChange.bind(this));
        } else {
            alert("Volver a intentar");
        }
    }

    okChange() {
        alert("Cambio de contraseña exitoso");
        this.props.onPress();
    }

    render() {
        return (
            //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding" enabled>
                <LinearGradient colors={['#1D71B8', '#2D2E83']} style={styles.loginContainer}>

                <View style={[styles.imageContainer]}>
                        <Image
                            style={{height:300, width:300,resizeMode: 'contain',}}
                            source={require('./Licha-enjoy.png')}></Image>
                    </View>
                    
                    <View style={[styles.inputContainer]}>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Username"
                                onChangeText={(text) => this.setState({ username: text })}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Old Password"
                                onChangeText={(text) => this.setState({ oldPassword: text })}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={[styles.outterInput]}>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="New Password"
                                onChangeText={(text) => this.setState({ newPassword: text })}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                onPress={() => this.checkChange()}>
                                <Text style={{ color: 'white', fontWeight: 'bold', }}>Change Password</Text>
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
        height: 40,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        width: '100%',
        height: 300,
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
        marginTop: 20,
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
