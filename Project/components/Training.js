import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
import { withNavigation } from 'react-navigation';
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
    KeyboardAvoidingView,
    StatusBar,
    Modal
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Swiper from "react-native-web-swiper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false,
            objetivoDeseado: '',
            experiencia: '',
            actividad: '',
            genero: '',
            altura: 0,
            edad: 0,
            peso: 0,

            calorias: {}
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

                case '1':

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.2
                    break;

                case '2':

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.375
                    break;

                case '3':

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.55
                    break;

                case '4':

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.725
                    break;

                case '5':

                    calorias.caloriasEjercicio = calorias.caloriasBase * 1.9
                    break;

                default:

                    calorias.caloriasEjercicio = calorias.caloriasBase
                    break;
            }
            if (calorias.caloriasEjercicio != 0) {
                switch (this.state.objetivoDeseado) {

                    case '1':

                        calorias.caloriasTotal = calorias.caloriasEjercicio + calorias.caloriasEjercicio * 0.15
                        break;

                    case '2':

                        calorias.caloriasTotal = calorias.caloriasEjercicio - calorias.caloriasEjercicio * 0.15
                        break;

                    case '3':

                        calorias.caloriasTotal = calorias.caloriasEjercicio
                        break;

                    case '4':

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
        base.guardarPlan(this.state.calorias, this.state.objetivoDeseado, this.state.experiencia, this.state.edad, this.state.peso, this.mostrarPlan.bind(this))
    }
    mostrarPlan() {
        this.props.onPressCreate(this.state.caloriasEjercicio, this.state.caloriasTotal, this.state.objetivoDeseado)
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <View style={styles.StatusBar} />
                    <ActivityIndicator size="large" color="#3399ff" style={{ flex: 2 }}></ActivityIndicator>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
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
                        <KeyboardAvoidingView style={[styles.slideContainer]} behavior="position" keyboardVerticalOffset={height * 0.11} enabled>

                            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                                <View style={[styles.slideContainerInside2]}>
                                    <View style={styles.slide2}>
                                        <Text style={styles.slideText2}>Ficha Personal{"\n"}y{"\n"}Objetivos a Alcanzar</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: wp("70"), justifyContent: "space-between" }}>
                                        <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
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
                                                    marginBottom: height * 0.028,
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: height * 0.02,
                                                    color: "black",
                                                    textAlign: 'center'
                                                },
                                                inputAndroid: {
                                                    backgroundColor: 'grey',
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    borderBottomLeftRadius: 10,
                                                    borderBottomRightRadius: 10,
                                                    width: wp("44"),
                                                    height: hp("5.5"),
                                                    marginBottom: height * 0.02,
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: height * 0.02,
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
                                        useNativeAndroidPickerStyle={false}
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
                                                    marginBottom: height * 0.028,
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: height * 0.02,
                                                    color: "black",
                                                    textAlign: 'center'
                                                },
                                                inputAndroid: {
                                                    backgroundColor: 'grey',
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    borderBottomLeftRadius: 10,
                                                    borderBottomRightRadius: 10,
                                                    width: wp("22"),
                                                    height: hp("5.5"),
                                                    marginBottom: height * 0.028,
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: height * 0.02,
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
                                    useNativeAndroidPickerStyle={false}
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
                                                margin: height * 0.028,
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                fontWeight: 'bold',
                                                fontSize: height * 0.02,
                                                color: "black",
                                                textAlign: 'center'
                                            },
                                            inputAndroid: {
                                                backgroundColor: 'grey',
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                width: wp("70"),
                                                height: hp("5.5"),
                                                margin: height * 0.028,
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                fontWeight: 'bold',
                                                fontSize: height * 0.02,
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
                                    useNativeAndroidPickerStyle={false}
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
                                                margin: height * 0.028,
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                fontWeight: 'bold',
                                                fontSize: height * 0.02,
                                                color: "black",
                                                textAlign: 'center'
                                            },
                                            inputAndroid: {
                                                backgroundColor: 'grey',
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                width: wp("70"),
                                                height: hp("5.5"),
                                                margin: height * 0.028,
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                fontWeight: 'bold',
                                                fontSize: height * 0.02,
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
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>

                        {/* </View> */}
                        <View style={[styles.slideContainer]}>
                            <View style={styles.slideContainerInside3}>
                                <Text style={styles.slideText3}>• Se le creara un plan de entrenamiento en base a los datos personales y objetivos señalados anteriormente.
                                        {"\n"}{"\n"}• Se incluira un plan de alimentacion y las rutinas que son mas utiles para el objetivo deseado.
                                        {"\n"}{"\n"}• Podras cambiar tu ficha personal y objetivos en el momento que quieras accediendo en la parte de {"\n"}"Perfil" desde el SideMenu.</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: 'center', height: hp("11") }}>
                            <TouchableOpacity style={styles.guardarButton} onPress={() => { this.setState({ modalVisible: true }) }}>
                                <Text style={styles.screenButtonText}>
                                    Omitir Plan
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.guardarButton} onPress={() => { this.crearPlan() }}>
                                <Text style={styles.screenButtonText}>
                                    Crear Plan
                                </Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </Swiper>
                    <Modal
          animationType="fade"
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}  >

          <View style={styles.modal}>
            <View style={{ flexDirection: 'column', marginTop: height * 0.05 }}>
              <Text style={styles.textButton}>Desea omitir la creacion de su plan?</Text>
            </View>
            <View style={styles.modal2}>

              <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                <Text style={styles.textButton}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.onOmitir()} style={styles.modalButtonAceptar}>
                <Text style={styles.textButton}>Aceptar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
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
        fontSize: height * 0.03,
        color: "#3399ff"
    },

    slideText3: {
        padding: wp(10),
        fontSize: height * 0.028,
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
        alignItems: "center"
    },

    TextContainer: {
        backgroundColor: 'grey',
        borderRadius: 10,
        width: wp("20"),
        height: hp("5.5"),
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: height * 0.02,
        textAlign: 'center',
        marginTop: height * 0.028
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
        marginHorizontal: height * 0.025,
        alignSelf: 'center',
        opacity: .95
      },
      screenButtonText: {
        marginVertical: height * 0.02,
        fontWeight: 'bold',
        fontSize: height * 0.025
      },

    //MODAAAAL
  modal: {
    height: height * 0.22,
    width: width * 0.75,
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.13,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 5.0,
    borderRadius: 22,
    opacity: .95
  },
  modal2: {
    flexDirection: 'row',
    borderColor: 'black',
    borderTopWidth: 2,
    width: width * 0.74,
    height: height * 0.08,
    position: 'absolute',
    bottom: 0,
    opacity: .95
  },
  textButton: {
    color: 'white',
    fontSize: height * 0.02,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalButtonCancelar: {
    width: width * 0.37,
    height: height * 0.0775,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderBottomLeftRadius: 22
  },
  modalButtonAceptar: {
    width: width * 0.37,
    height: height * 0.0775,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    borderLeftWidth: 2,
    backgroundColor: 'grey',
    borderBottomRightRadius: 22
  }
});

export default withNavigation(Training);