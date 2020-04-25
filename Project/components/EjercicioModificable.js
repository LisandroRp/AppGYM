import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorAds from './Fotos/ExportadorAds';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Keyboard,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdMobInterstitial } from 'expo-ads-admob';


var { height, width } = Dimensions.get('window');

class EjerciciosNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ejercicio: {},
      isLoading: true,
      modalGuardarVisible: false,
      modalBorrarVisible: false,
      modalExiste: false,
      musculo: "",
      elemento: "",
      nombre: "",
      descripcion: "",
      ejecucion: "",
      nombres: ''
    };
    this.cargarEjercicio();
  }

  componentDidMount() {
    AdMobInterstitial.addEventListener("interstitialDidClose", () => this.props.onPressCancelar());
  }

  showInterstitial = async () => {
    AdMobInterstitial.setAdUnitID(ExportadorAds.Interracial()); // Test ID, Replace with your-admob-unit-id

    try {
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    }
    catch (e) {
      console.log(e);
    }
  }
  cargarEjercicio = async () => {
    base.traerEjercicioEspecifico(await this.props.navigation.getParam('id_ejercicio'), this.okEjercicio.bind(this));
  }

  okEjercicio(data) {
    this.setState({
      ejercicio: data[0],
      isLoading: false,
      musculo: data[0].musculo,
      elemento: data[0].elemento,
      nombre: data[0].nombre,
      descripcion: data[0].descripcion,
      ejecucion: data[0].ejecucion,
    });
  }

  actualizarEjercicio() {
    var ejercicioUpdate = this.state.ejercicio

    this.setState({ modalGuardarVisible: false })
    ejercicioUpdate.nombre = this.state.nombre
    ejercicioUpdate.musculo = this.state.musculo
    ejercicioUpdate.elemento = this.state.elemento
    ejercicioUpdate.ejecucion = this.state.ejecucion
    ejercicioUpdate.descripcion = this.state.descripcion
    base.actualizarEjercicio(ejercicioUpdate, this.showInterstitial.bind(this))
  }
  cancelarEjercicio() {
    this.props.onPressCancelar()
  }
  borrarEjercicio(id_ejercicio) {

    this.setModalBorrarVisible(!this.state.modalBorrarVisible)
    base.estaEjercicioRutina(id_ejercicio, this.okEsta.bind(this))
    
  }
  okEsta(rutina, id_ejercicio){
    if(rutina.length == 0){
      base.borrarEjercicio(id_ejercicio, this.okEjercicioBorrado.bind(this))
    }else{
      var nombres = ''
      for(i = 0; i < rutina.length; i++){
        nombres = nombres + rutina[i].nombre + ' '
      }
      this.setModalExisteVisible(true, nombres)
    }
  }
  okEjercicioBorrado(){
    this.showInterstitial()
  }
  setModalGuardarVisible(visible) {
    this.setState({ modalGuardadVisible: visible });
  }
  setModalBorrarVisible(visible) {
    this.setState({ modalBorrarVisible: visible });
  }
  setModalExisteVisible(visible, nombres){
    this.setState({ modalExiste: visible, nombres: nombres });
  }
  botonGuardar() {
    if (this.state.nombre == "") {
      alert("Debes escribir el nombre del ejercicio")
      return
    }
    if (this.state.musculo == "") {
      alert("Debes seleccionar el musculo del ejercicio")
      return
    }
    if (this.state.elemento == "") {
      alert("Debes seleccionar el elemento a usar del ejercicio")
      return
    }
    this.setState({ modalGuardarVisible: true })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ScrollView>

            <KeyboardAvoidingView style={[styles.inputContainer]} behavior="position" keyboardVerticalOffset={height * 0.008} enabled>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.inputContainerView}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: 'Musculo del Ejercicio',
                      value: '0',
                    }}
                    value={this.state.musculo}
                    placeholderTextColor="black"
                    placeholderfontWeight="bold"
                    style={{
                      inputIOS: {
                        backgroundColor: 'grey',
                        borderRadius: 10,
                        paddingLeft: 10,
                        margin: height * 0.028,
                        width: wp("70"),
                        height: hp("5.5"),
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: height * 0.02,
                        color: "black",
                      },
                      inputAndroid: {
                        backgroundColor: 'grey',
                        borderRadius: 10,
                        paddingLeft: 10,
                        margin: height * 0.028,
                        width: wp("70"),
                        height: hp("5.5"),
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: height * 0.02,
                        //fontSize: 15,
                        color: "black",
                      }
                    }}
                    onValueChange={(value) => this.setState({ musculo: value })}
                    items={[
                      { label: 'Pecho', value: 'Pecho' },
                      { label: 'Espalda', value: 'Espalda' },
                      { label: 'Hombros', value: 'Hombros' },
                      { label: 'Piernas', value: 'Piernas' },
                      { label: 'Biceps', value: 'Biceps' },
                      { label: 'Triceps', value: 'Triceps' },
                      { label: 'Abdominales', value: 'Abdominales' },
                      { label: 'Cardio', value: 'Cardio' },
                    ]}
                  />
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: 'Elemento del Ejercicio',
                      value: '0',
                    }}
                    value={this.state.elemento}
                    placeholderTextColor="black"
                    style={{
                      inputIOS: {
                        backgroundColor: 'grey',
                        borderRadius: 10,
                        paddingLeft: 10,
                        margin: height * 0.028,
                        width: wp("70"),
                        height: hp("5.5"),
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: height * 0.02,
                        color: "black",
                      },
                      inputAndroid: {
                        backgroundColor: 'grey',
                        borderRadius: 10,
                        paddingLeft: 10,
                        margin: height * 0.028,
                        width: wp("70"),
                        height: hp("5.5"),
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: height * 0.02,
                        color: "black",
                      }
                    }}
                    onValueChange={(value) => this.setState({ elemento: value })}
                    items={[
                      { label: 'Barra', value: 'Barra' },
                      { label: 'Mancuernas', value: 'Mancuernas' },
                      { label: 'Libre', value: 'Libre' },
                    ]}
                  />
                  <TextInput style={styles.TextContainer} maxLength={33} placeholder='Nombre' placeholderTextColor='black' onChangeText={(nombre) => this.setState({ nombre })} value={this.state.nombre}></TextInput>
                  <TextInput style={styles.TextContainerLarge} multiline={true} maxLength={222} placeholder='Descripcion' placeholderTextColor='black' onChangeText={(descripcion) => this.setState({ descripcion })} value={this.state.descripcion}></TextInput>
                  <TextInput style={styles.TextContainerLarge} multiline={true} maxLength={222} placeholder='Ejecucion' placeholderTextColor='black' onChangeText={(ejecucion) => this.setState({ ejecucion })} value={this.state.ejecucion}></TextInput>

                  <View style={{ flexDirection: "row", justifyContent: 'center', height: hp("11") }}>
                    <TouchableOpacity style={styles.guardarButton} onPress={() => { this.setModalBorrarVisible(!this.state.modalBorrarVisible)}}>
                      <Text style={styles.screenButtonText}>
                        Borrar
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.guardarButton} onPress={() => { this.botonGuardar() }}>
                      <Text style={styles.screenButtonText}>
                        Actualizar
                </Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </ScrollView>
          <Modal
            animationType="fade"
            visible={this.state.modalGuardarVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalGuardarVisible: false })}  >

            <View style={styles.modal}>
              <View style={{ flexDirection: 'column', marginTop: height * 0.05 }}>
                <Text style={styles.textButton}>Desea actualizar el Ejercicio "{this.state.nombre}"</Text>
              </View>
              <View style={styles.modal2}>

                <TouchableOpacity onPress={() => { this.setState({ modalGuardarVisible: false }) }} style={styles.modalButtonCancelar}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.actualizarEjercicio()} style={styles.modalButtonAceptar}>
                  <Text style={styles.textButton}>Aceptar</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            visible={this.state.modalBorrarVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalBorrarVisible: false })}  >

            <View style={styles.modal}>
              <View style={{ flexDirection: 'column', marginTop: height * 0.05 }}>
                <Text style={styles.textButton}>Esta seguro que desea borrar el ejercicio "{this.state.nombre}"</Text>
              </View>
              <View style={styles.modal2}>

                <TouchableOpacity onPress={() => { this.setModalBorrarVisible(!this.state.modalBorrarVisible) }} style={styles.modalButtonCancelar}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => base.conseguirIdEjercicioParaBorrar(this.state.nombre, this.borrarEjercicio.bind(this))} style={styles.modalButtonAceptar}>
                  <Text style={styles.textButton}>Aceptar</Text>

                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            visible={this.state.modalExiste}
            transparent={true}
            onRequestClose={() => this.setState({ modalExiste: false })}  >

            <View style={styles.modalExiste}>
              <View style={{ flexDirection: 'column', marginTop: height * 0.05, marginHorizontal:  height * 0.05}}>
                <Text style={styles.textButton}>El ejercicio {this.state.nombre} pertenece a las rutinas: {this.state.nombres} {"\n"}Debe elimnarlos de las rutinas primero</Text>
              </View>
              <View style={styles.modal2}>

                <TouchableOpacity onPress={() => this.setState({modalExiste: false})} style={styles.modalExisteButtonAceptar}>
                  <Text style={styles.textButton}>Aceptar</Text>

                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "grey"
  },

  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainerView: {
    flexDirection: 'column',
    alignItems: 'center',
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
    fontSize: height * 0.02
  },
  TextContainerLarge: {
    backgroundColor: 'grey',
    borderRadius: 10,
    paddingLeft: 10,
    width: wp("70"),
    height: hp("15"),
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: height * 0.02
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
  guardarButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.33,
    marginHorizontal: 22,
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
    top: height * 0.4,
    left: width * 0.13,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 5.0,
    borderRadius: 22,
    opacity: .95
  },
  modalExiste: {
    height: height * 0.28,
    width: width * 0.75,
    position: 'absolute',
    top: height * 0.4,
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
  },
  modalExisteButtonAceptar: {
    width: width * 0.74,
    height: height * 0.0775,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    backgroundColor: 'grey',
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22
  }
})


export default withNavigation(EjerciciosNew);