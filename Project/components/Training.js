import React from "react";
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Swiper from "react-native-web-swiper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

export default class Training extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            peso: 0,
            pesoDeseado: 0,
            altura: 0
        };
    }
    componentDidMount() {
        base.abrirBase(this.existeBase.bind(this));
    }
    existeBase = async (existe) => {
        if (existe == false) {
            base.crearBase(this.okBase.bind(this))
        }
        else {
            this.props.onPressPass();
        }
    }

    okBase = async () => {
        this.setState({ isLoading: false })
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <View style={styles.StatusBar} />
                    <ActivityIndicator size="large" color="#3399ff" style={{ flex: 2 }}></ActivityIndicator>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <View style={styles.StatusBar} />
                    <Swiper>
                        <View style={[styles.slideContainer]}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.Logo} source={require('../assets/Logo_Solo.png')} />
                            </View>
                            <View style={styles.slide1}>
                                <Text style={styles.slideText}>Desliza para crear tu plan de entrenamiento a medida</Text>
                            </View>
                        </View>
                        <KeyboardAvoidingView style={[styles.slideContainer]} behavior="position" enabled>
                        {/* <View style={[styles.slideContainer]}> */}
                            {/* <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} onPress={Keyboard.dismiss} /> */}
                            
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                                <View style={[styles.slideContainerInside2]}>
                                    <View style={styles.slide2}>
                                        <Text style={styles.slideText2}>Ficha Personal{"\n"}y{"\n"}Objetivos a Alcanzar</Text>
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
                                    </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                            
                        {/* </View> */}
                        <View style={[styles.slideContainer]}>
                            <View style={styles.slideContainerInside3}>
                                        <Text style={styles.slideText3}>• Se le creara un plan de entrenamiento en base a los datos personales y objetivos señadalos anteriormente.
                                        {"\n"}{"\n"}• Se incluira un plan de alimentacion y las rutinas que son mas utiles para el objetivo deseado.
                                        {"\n"}{"\n"}• Podras cambiar tu ficha personal y objetivos en el momento que quieras accediendo en la parte de {"\n"}"Perfil" desde el SideMenu.</Text>
                                    </View>
                            <TouchableOpacity style={styles.guardarButton} onPress={() => { this.props.onPressCreate() }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
                Continuar
                </Text>
              </TouchableOpacity>
                        </View>
                    </Swiper>
                </View>
                
            )
        }
    }
}
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
    imageContainer: {
        height: height * 0.55,
        width: height * 0.50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 4,
    borderRadius: 10,
    marginTop: hp(8)
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
        marginTop: height * 0.14,
        marginBottom: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        opacity: .95,
    },
    slide3: {
        backgroundColor: "black",
        marginVertical: height * 0.05,
        padding: 10,
        borderRadius: 10,
        opacity: .95,
    },

    slideText: {
        alignSelf: "center",
        fontSize: 18,
        color: "#3399ff"
    },

    slideText2: {
        textAlign: "center",
        fontSize: 22,
        color: "#3399ff"
    },

    slideText3: {
        padding: wp(10),
        fontSize: 20,
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
    slideContainerInside2: {
        width: width,
        height: height,
        alignItems: "center",
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
    guardarButton: {
        backgroundColor: 'grey',
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.33,
        marginHorizontal: 22,
        alignSelf: 'center',
        opacity: .95
      },
});