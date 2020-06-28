import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFrases from './Fotos/ExportadorFrases';
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorAds from './Fotos/ExportadorAds'
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
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator
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
      nombre: '',
      descripcion: '',
      ejecucion: '',
      id_elemento: '',
      id_musculo: '',
      ejercicio: {},
      id_idioma: 0,
      isLoading: true,
      actualizando: false,
      modalGuardarVisible: false,
    };
  }
  componentDidMount() {
    AdMobInterstitial.addEventListener("interstitialDidClose", () => this.props.onPressCancelar());
    base.traerIdIdioma(this.okIdIdioma.bind(this))
  }

  okIdIdioma(id_idioma) {
    this.setState({id_idioma: id_idioma, isLoading: false})
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
  guardarEjercicio() {
    this.setState({ modalGuardarVisible: false, isLoading: true, actualizando: true })
    //base.crearEjercicio((id_ejercicio + 1), this.state.nombre, this.state.descripcion, this.state.ejecucion, this.state.id_elemento, this.state.id_musculo, this.showInterstitial.bind(this))
    base.crearEjercicio(this.state.nombre, this.state.descripcion, this.state.ejecucion, this.state.id_elemento, this.state.id_musculo, this.cancelarEjercicio.bind(this))
  }
  cancelarEjercicio() {
    this.props.onPressCancelar()
  }
  botonGuardar() {
    if (this.state.nombre == '') {
      alert(ExportadorFrases.NombreEjercicioObligatorio(this.state.id_idioma))
      return
    }
    if (this.state.musculo == '') {
      alert(ExportadorFrases.MusculoEjercicioObligatorio(this.state.id_idioma))
      return
    }
    if (this.state.elemento == '') {
      alert(ExportadorFrases.MusculoElementoObligatorio(this.state.id_idioma))
      return
    }
    this.setState({ modalGuardarVisible: true })
  }

  render() {
    if (this.state.isLoading) {
      if(this.state.actualizando){
        return (
          <View style={styles.container}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <View style={styles.insideContainer} >
              
              <ActivityIndicator size="large" color="#3399ff" style={{}}></ActivityIndicator>

              <View style={styles.slide1}>
                <Text style={styles.slideText}>{ExportadorFrases.CreandoEjercicio(this.state.id_idioma)}</Text>
              </View>
            </View>
          </View>
        );
      }
      else{
        return (
          <View style={styles.container}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
        );
      }
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
                    label: ExportadorFrases.MusculoEjercicio(this.state.id_idioma),
                    value: '0',
                  }}
                  placeholderTextColor="black"
                  style={{
                    inputIOS: styles.PikerIos,
                    inputAndroid: styles.PikerAndroid
                  }}
                  onValueChange={(value) => this.setState({ id_musculo: value })}
                  items={[
                    { label: ExportadorFrases.MusculoEjercicioOpciones(this.state.id_idioma, 1), value: 1 },
                    { label: ExportadorFrases.MusculoEjercicioOpciones(this.state.id_idioma, 2), value: 2 },
                    { label: ExportadorFrases.MusculoEjercicioOpciones(this.state.id_idioma, 3), value: 3 },
                    { label: ExportadorFrases.MusculoEjercicioOpciones(this.state.id_idioma, 4), value: 4 },
                    { label: ExportadorFrases.MusculoEjercicioOpciones(this.state.id_idioma, 5), value: 5 },
                    { label: ExportadorFrases.MusculoEjercicioOpciones(this.state.id_idioma, 6), value: 6 },
                    { label: ExportadorFrases.MusculoEjercicioOpciones(this.state.id_idioma, 7), value: 7 },
                    { label: ExportadorFrases.MusculoEjercicioOpciones(this.state.id_idioma, 8), value: 8 },
                  ]}
                />
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: ExportadorFrases.ElementoEjercicio(this.state.id_idioma),
                    value: '0',
                  }}
                  placeholderTextColor="black"
                  style={{
                    inputIOS: styles.PikerIos,
                    inputAndroid: styles.PikerAndroid
                  }}
                  onValueChange={(value) => this.setState({ id_elemento: value })}
                  items={[
                    { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 1), value: 1 },
                    { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 2), value: 2 },
                    { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 3), value: 3 },
                    { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 4), value: 4 },
                    { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 5), value: 5 },
                  ]}
                />
                <TextInput style={styles.TextContainer} maxLength={33} placeholder= {ExportadorFrases.Nombre(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(nombre) => this.setState({ nombre })} value={this.state.nombre}></TextInput>
                <TextInput style={styles.TextContainerLarge} multiline={true} maxLength={222} placeholder={ExportadorFrases.Descripcion(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(descripcion) => this.setState({ descripcion })} value={this.state.descripcion}></TextInput>
                <TextInput style={styles.TextContainerLarge} multiline={true} maxLength={222} placeholder={ExportadorFrases.Ejecucion(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(ejecucion) => this.setState({ ejecucion })} value={this.state.ejecucion}></TextInput>

                <View style={{ flexDirection: "row", justifyContent: 'center', height: hp("11") }}>
                  <TouchableOpacity style={styles.guardarButton} onPress={() => { this.cancelarEjercicio() }}>
                    <Text style={styles.screenButtonText}>
                      {ExportadorFrases.Cancelar(this.state.id_idioma)}
                </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.guardarButton} onPress={() => { this.botonGuardar() }}>
                    <Text style={styles.screenButtonText}>
                      {ExportadorFrases.Guardar(this.state.id_idioma)}
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
            <View style={{ flexDirection: 'column', marginTop: height * 0.03 }}>
              <Text style={styles.textButton}>{ExportadorFrases.CrearEjercicioModal(this.state.id_idioma)} "{this.state.nombre}"?</Text>
            </View>
            <View style={styles.modal2}>

              <TouchableOpacity onPress={() => { this.setState({ modalGuardarVisible: false }) }} style={styles.modalButtonCancelar}>
                <Text style={styles.textButton}>{ExportadorFrases.Cancelar(this.state.id_idioma)}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {this.guardarEjercicio(), this.showInterstitial()}} style={styles.modalButtonAceptar}>
                <Text style={styles.textButton}>{ExportadorFrases.Aceptar(this.state.id_idioma)}</Text>
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
  insideContainer: {
    flex: 1,
    justifyContent: 'center'
},
  slide1: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    opacity: .95,
    alignSelf: 'center',
    marginTop: hp(5)
  },
  slideText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#3399ff"
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
    margin: height * 0.028,
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
    margin: height * 0.028,
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: height * 0.02
  },
  PikerIos: {
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
  PikerAndroid: {
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    fontWeight: 'bold',
    padding: hp(1)
  },
  modalButtonCancelar: {
    width: width * 0.37,
    height: height * 0.0775,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 22
  },
  modalButtonAceptar: {
    width: width * 0.37,
    height: height * 0.0775,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    borderLeftWidth: 2,
    borderBottomRightRadius: 22
  }
})


export default withNavigation(EjerciciosNew);