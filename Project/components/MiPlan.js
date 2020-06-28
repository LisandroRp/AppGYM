import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import Swiper from "react-native-web-swiper";

import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorFondo from './Fotos/ExportadorFondo';
import base from './GenerarBase';
import ExportadorFrases from './Fotos/ExportadorFrases';

var { height, width } = Dimensions.get('window');

class MiPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            isLoading: true,
            id_idioma: 0
        };
    }
    componentDidMount() {
        base.traerIdIdioma(this.traerPlan.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    UNSAFE_componentWillReceiveProps = async () => {
        this.setState({isLoading: true})
        base.traerIdIdioma(this.traerPlan.bind(this))
    }

    traerPlan(id_idioma){
        this.setState({id_idioma: id_idioma})
        base.traerPlan(this.okPlan.bind(this))
    }
    okPlan(perfil) {
        this.setState({ perfil: perfil, isLoading: false })
    }
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
            if (this.state.perfil == null) {
                return (
                    <View style={styles.containerNull}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.imageContainer}>
                            <Image style={styles.Logo} source={require('../assets/Logo_Solo.png')} />
                        </View>
                        <View style={styles.ContainerInsideNull}>
                            <Text style={styles.Text}>{ExportadorFrases.NoPlan(this.state.id_idioma)}</Text>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <Swiper style={styles.swiper}
                            controlsProps={{
                                prevTitle: 'Ant',
                                nextTitle: 'Sig',
                                nextTitleStyle: styles.swiperButtons,
                                prevTitleStyle: styles.swiperButtons
                            }}
                        >
                            <View style={styles.slideContainer}>
                                <View style={styles.ContainerInside}>
                                    <Text style={styles.calories}>{(this.state.perfil.caloriasEjercicio - 188).toString()} - {(this.state.perfil.caloriasEjercicio).toString()}</Text>
                                    <Text style={styles.Text}>{ExportadorFrases.CaloriasNormal(this.state.id_idioma)}</Text>
                                </View>
                                <View style={styles.ContainerInside}>
                                    <Text style={styles.calories}>{(this.state.perfil.caloriasTotal - 188).toString()} - {(this.state.perfil.caloriasTotal).toString()}</Text>
                                    <Text style={styles.Text}>{ExportadorFrases.CaloriasAConsumir(this.state.id_idioma)}</Text>
                                </View>
                            </View>
                            <ScrollView style={{ paddingHorizontal: height * 0.03 }}>
                                <View style={styles.ContainerInsideTitle2}>
                                    <Text style={styles.TextTitle}>{this.state.perfil.nombre_objetivo}</Text>
                                </View>
                                <View style={styles.ContainerInside2}>
                                    <Text style={styles.Text}>{this.state.perfil.descripcion_objetivo}</Text>
                                </View>
                            </ScrollView>
                            <View style={{ paddingHorizontal: height * 0.03 }}>
                            <ScrollView style={{ paddingHorizontal: height * 0.03 }}>
                                <View style={styles.ContainerInsideTitle3}>
                                    <Text style={styles.TextTitle}>{this.state.perfil.nombre_experiencia}</Text>
                                </View>
                                <View style={styles.ContainerInside3}>
                                    <Text style={styles.Text}>{this.state.perfil.descripcion_experiencia}</Text>
                                </View>
                                <TouchableOpacity style={styles.guardarButton} onPress={() => this.props.navigation.openDrawer()}>
                                        <Text style={styles.screenButtonText}>
                                           {ExportadorFrases.Empezar(this.state.id_idioma)}
                                        </Text>
                                </TouchableOpacity>
                            </ScrollView>
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
    swiperButtons: {
        fontSize: height * 0.025,
        marginBottom: height * 0.011
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
        height: height
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
        marginBottom: height * 0.05
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
    },
    screenButtonText: {
        marginVertical: height * 0.02,
        fontWeight: 'bold',
        fontSize: height * 0.025
      },
      guardarButton: {
        backgroundColor: 'grey',
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.33,
        marginHorizontal: height * 0.025,
        marginBottom: height * 0.10,
        alignSelf: 'center',
        opacity: .95
      }
})
export default withNavigation(MiPlan);