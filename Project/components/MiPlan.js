import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard } from 'react-native';
import { AsyncStorage } from 'react-native';
import Swiper from "react-native-web-swiper";

import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorFondo from './Fotos/ExportadorFondo';
import base from './GenerarBase';

var { height, width } = Dimensions.get('window');

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

    componentWillReceiveProps() {
        this.setState({ isLoading: true })
        base.traerPlan(this.okPlan.bind(this))
    }

    okPlan(perfil) {
        this.setState({ perfil: perfil, isLoading: false })
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
            if(this.state.perfil == null){
                return ( 
                    <View style={styles.containerNull}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.imageContainer}>
                                <Image style={styles.Logo} source={require('../assets/Logo_Solo.png')} />
                            </View>
                        <View style={styles.ContainerInsideNull}>
                                    <Text style={styles.Text}> Si desea crear su plan de entrenamiento solo debe completar la ficha tecnica en la seccion de "Cambiar Plan"</Text>
                        </View>
                    </View>
                )
            }
            else{
                return ( 
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <Swiper style={styles.swiper}>
                            <View style={styles.slideContainer}>
                                <View style={styles.ContainerInside}>
                                    <Text style={styles.calories}>{this.state.perfil.caloriasEjercicio - 200} - {this.state.perfil.caloriasEjercicio}</Text>
                                    <Text style={styles.Text}>Calorias a consumir para mantener tu peso en base a la vida que llevas</Text>
                                </View>
                                <View style={styles.ContainerInside}>
                                    <Text style={styles.calories}>{this.state.perfil.caloriasTotal - 200} - {this.state.perfil.caloriasTotal}</Text>
                                    <Text style={styles.Text}>Calorias a consumir para cumplir con tu objetivo</Text>
                                </View>
                            </View>
                            <ScrollView style={{paddingHorizontal: height * 0.03}}>
                                <View style={styles.ContainerInsideTitle2}>
                                    <Text style={styles.TextTitle}>{this.state.perfil.obj_nombre}</Text>
                                </View>
                                <View style={styles.ContainerInside2}>
                                    <Text style={styles.Text}>{this.state.perfil.obj_descripcion}</Text>
                                </View>
                            </ScrollView>
                            <View style={{paddingHorizontal: height * 0.03}}>
                                <View style={styles.ContainerInsideTitle3}>
                                    <Text style={styles.TextTitle}>{this.state.perfil.exp_nombre}</Text>
                                </View>
                                <View style={styles.ContainerInside3}>
                                    <Text style={styles.Text}>{this.state.perfil.exp_descripcion}</Text>
                                </View>
                            </View>
                        </Swiper>
                    </View>
                )
            }
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({
    containerNull: {
        backgroundColor: "grey",
        flex: 1,
        justifyContent: "center"
    },
    ContainerInsideNull: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.04,
        borderRadius: 10,
        marginHorizontal: height * 0.05,
        alignItems: "center",
        justifyContent: 'center',
    },
    imageContainer: {
        height: height * 0.44,
        width: height * 0.40,
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderWidth: 4,
        borderRadius: 10,
        marginTop: hp(2)
    },

    Logo: {
        height: height * 0.35,
        width: height * 0.35,
        marginTop: hp(9),
        marginBottom: hp(6.6)
    },

    // EXISTE PLAN
    container: {
        width: width,
        height: height,
        backgroundColor: "grey",
        flex: 1
    },
    swiper: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "grey",
        height : height
    },
    slideContainer: {
        flex: 1,
        alignItems: "center",
        height: height
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

    ContainerInside: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.04,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        height: height * 0.33,
        width: width * 0.88
    },
    ContainerInsideTitle2: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.028,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
    },
    ContainerInside2: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.028,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: height * 0.11
    },
    ContainerInsideTitle3: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.028,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
    },
    ContainerInside3: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.028,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: height * 0.11
    },
    Text: {
        fontSize: height * 0.027,
        color: "#3399ff",
        textAlign: "center"
    },
    TextTitle: {
        fontSize: height * 0.04,
        color: "#3399ff",
        textAlign: "center"
    },
    calories: {
        fontSize: height * 0.07,
        marginBottom: height * 0.02,
        color: "#3399ff"
    }
})
export default withNavigation(MiPlan);