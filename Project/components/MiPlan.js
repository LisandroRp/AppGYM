import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import Swiper from "react-native-web-swiper";

import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorFondo from './Fotos/ExportadorFondo';
import base from './GenerarBase';
import ExportadorFrases from './Fotos/ExportadorFrases';
import {BlackShadowForBlack} from './Estilos/Styles'
import {AzulPrincipal} from './Estilos/Colors'
import { BlackButtonText, BlueButton } from './Estilos/PreMadeComponents';

var { height, width } = Dimensions.get('window');
const azulPrincipal = AzulPrincipal()

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
                    <ActivityIndicator size="large" color={azulPrincipal} backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
            );
        } else {
            if (this.state.perfil == null) {
                return (
                    <View style={styles.NoItemsContainer}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={[styles.NoItemsImageContainer, BlackShadowForBlack()]}>
                            <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
                        </View>
                        <View style={[styles.NoItemsTextContainer, BlackShadowForBlack()]}>
                            <Text style={styles.NoItemsText}>{ExportadorFrases.NoPlan(this.state.id_idioma)}</Text>
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
                                prevTitle: ExportadorFrases.SwipperAnterior(this.state.id_idioma),
                                nextTitle: ExportadorFrases.SwipperSiguienteidioma(this.state.id_idioma),
                                nextTitleStyle: styles.swiperButtons,
                                prevTitleStyle: styles.swiperButtons
                            }}
                        >
                            <View style={styles.slideContainer}>
                                <View style={[styles.ContainerInside, BlackShadowForBlack()]}>
                                    <Text style={styles.calories}>{(this.state.perfil.caloriasEjercicio - 188).toString()} - {(this.state.perfil.caloriasEjercicio).toString()}</Text>
                                    <Text style={styles.Text}>{ExportadorFrases.CaloriasNormal(this.state.id_idioma)}</Text>
                                </View>
                                <View style={[styles.ContainerInside, BlackShadowForBlack()]}>
                                    <Text style={styles.calories}>{(this.state.perfil.caloriasTotal - 188).toString()} - {(this.state.perfil.caloriasTotal).toString()}</Text>
                                    <Text style={styles.Text}>{ExportadorFrases.CaloriasAConsumir(this.state.id_idioma)}</Text>
                                </View>
                            </View>
                            <ScrollView>
                                <View style={[styles.ContainerInsideTitle2, BlackShadowForBlack()]}>
                                    <Text style={styles.TextTitle}>{this.state.perfil.nombre_objetivo}</Text>
                                </View>
                                <View style={[styles.ContainerInside2, BlackShadowForBlack()]}>
                                    <Text style={styles.Text}>{this.state.perfil.descripcion_objetivo}</Text>
                                </View>
                            </ScrollView>
                            <ScrollView style={{paddingBottom: hp(5)}}>
                                <View style={[styles.ContainerInsideTitle3, BlackShadowForBlack()]}>
                                    <Text style={styles.TextTitle}>{this.state.perfil.nombre_experiencia}</Text>
                                </View>
                                <View style={[styles.ContainerInside3, BlackShadowForBlack()]}>
                                    <Text style={styles.Text}>{this.state.perfil.descripcion_experiencia}</Text>
                                </View>
                                <View style={{marginBottom: hp(10)}}>
                                <BlueButton onPress={() => this.props.navigation.openDrawer()}>
                                        <BlackButtonText>
                                           {ExportadorFrases.Empezar(this.state.id_idioma)}
                                        </BlackButtonText>
                                </BlueButton>
                                </View>
                            </ScrollView>
                        </Swiper>
                    </View>
                )
            }
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({
    NoItemsContainer: {
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: "center",
    },
    NoItemsTextContainer: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: hp(1),
        opacity: .95,
        marginHorizontal: wp(5),
        marginBottom: height * 0.028
    },

    NoItemsText: {
        alignSelf: "center",
        fontSize: wp(5),
        color: azulPrincipal,
        textAlign: 'center'
    },
    NoItemsImageContainer: {
        flex: 0.7,
        padding: wp(5),
        marginHorizontal: wp(5),
        borderRadius: hp(1),
        margin: wp(2.5),
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: height * 0.08,
    },

    NoItemsLogo: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    swiperButtons: {
        fontSize: wp(5),
        marginBottom: height * 0.011
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
        justifyContent: "center"
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
        height: hp(30),
        width: wp(88),
        paddingHorizontal: wp(2),
        backgroundColor: "black",
        marginTop: hp(2.5),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
    },
    ContainerInsideTitle2: {
        width: wp(88),
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.028,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
    },
    ContainerInside2: {
        width: wp(88),
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.028,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: height * 0.11
    },
    ContainerInsideTitle3: {
        width: wp(88),
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.028,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
    },
    ContainerInside3: {
        width: wp(88),
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.028,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: height * 0.05
    },
    Text: {
        fontSize: wp(5),
        color: azulPrincipal,
        textAlign: "center"
    },
    TextTitle: {
        fontSize: wp(8),
        color: azulPrincipal,
        textAlign: "center"
    },
    calories: {
        fontSize: wp(12),
        marginBottom: height * 0.02,
        color: azulPrincipal
    },
})
export default withNavigation(MiPlan);