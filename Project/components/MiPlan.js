import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator,Text, ScrollView, Keyboard } from 'react-native';
import { AsyncStorage } from 'react-native';

import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorFondo from './Fotos/ExportadorFondo';
import base from './GenerarBase';

class MiPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            isLoading: true
        };
    }
    componentDidMount() {
        base.traerPlan(this.okPlan.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    
    componentWillReceiveProps(){
        this.setState({isLoading:true})
        base.traerPlan(this.okPlan.bind(this))
    }

    okPlan(perfil){
        this.setState({perfil:perfil, isLoading:false})
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

    keyboardDidShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillHide = () => {
        this.setState({ searchBarFocused: false })
    }
    
    render() {
        var key = 0
        if (this.state.isLoading) {
            return (
                    <View style={styles.container}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                    </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <ScrollView>
                            <View style={styles.ContainerInside}>
                                <Text style={styles.Text}>{this.state.perfil.plan}</Text>
                                <Text style={styles.Text}>•  Calorias a consumir para mantener tu peso en base a la vida que llevas: {this.state.perfil.caloriasEjercicio}{"\n"}</Text>
                                <Text style={styles.Text}>•  Calorias a consumir para cumplir con tu objetivo: {this.state.perfil.caloriasTotal}</Text>
                            </View>
                            </ScrollView>   
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
        marginTop: hp(5),
        marginBottom: hp(5),
        padding: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',

    },
    Text: {
        fontSize: 20,
        color: "#3399ff"
    },
})
export default withNavigation(MiPlan);