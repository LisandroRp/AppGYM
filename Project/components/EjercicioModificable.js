import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFrases from './Fotos/ExportadorFrases';
import ExportadorFondo from './Fotos/ExportadorFondo';
import { withNavigation } from 'react-navigation';
import { BlackShadow } from './Estilos/Styles'
import { BlueParallelButton, BlackButtonText, WhiteModalText, TouchableOpacityMorgan } from './Estilos/PreMadeComponents'
import {
  StyleSheet,
  Text,
  View,
  Image,
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
import { AdMobInterstitial } from 'expo-ads-admob';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


var { height, width } = Dimensions.get('window');

class EjerciciosNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ejercicio: {},
      id_ejercicio: this.props.navigation.getParam('id_ejercicio'),
      id_idioma: 0,
      isLoading: true,
      actualizando: false,
      borrando: false,
      modalGuardarVisible: false,
      modalBorrarVisible: false,
      modalExiste: false,
      musculo: "",
      elemento: "",
      nombre: "",
      descripcion: "",
      ejecucion: "",
      nombresRutinas: ''
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
      ejercicio: data,
      musculo: data.id_musculo,
      elemento: data.id_elemento,
      nombre: data.nombre_ejercicio,
      descripcion: data.descripcion,
      ejecucion: data.ejecucion,
    });
    base.traerIdIdioma(this.okIdIdioma.bind(this))
  }
  okIdIdioma(id_idioma) {
    this.setState({ id_idioma: id_idioma, isLoading: false })
  }

  actualizarEjercicio() {
    var ejercicioUpdate = this.state.ejercicio

    this.setState({ modalGuardarVisible: false, isLoading: true, actualizando: true })
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
  borrarEjercicio() {
    this.setState({ modalBorrarVisible: false, isLoading: true, borrando: true })
    base.estaEjercicioRutina(this.state.id_ejercicio, this.okEsta.bind(this))

  }
  okEsta(rutina, id_ejercicio) {
    if (rutina.length == 0) {
      base.borrarEjercicio(id_ejercicio, this.okEjercicioBorrado.bind(this))
    } else {
      var nombresRutinas = ''
      for (var i = 0; i < rutina.length; i++) {
        nombresRutinas = nombresRutinas + '"' + rutina[i].nombre_rutina + '"' + ' '
      }
      this.setModalExisteVisible(true, nombresRutinas)
    }
  }
  okEjercicioBorrado() {
    this.showInterstitial()
  }
  setModalGuardarVisible(visible) {
    this.setState({ modalGuardadVisible: visible });
  }
  setModalExisteVisible(visible, nombresRutinas) {
    this.setState({ modalExiste: visible, nombresRutinas: nombresRutinas });
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
      if (this.state.actualizando || this.state.borrando) {
        if (this.state.actualizando) {
          return (
            <View style={styles.container}>
              <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
              <View style={styles.insideContainer}>
                <ActivityIndicator size="large" color="#3399ff" style={{}} />
                <Text style={styles.slideText}>{ExportadorFrases.ActualizandoEjercicio(this.state.id_idioma)}</Text>
              </View>
            </View>
          );
        }
        if (this.state.borrando) {
          return (
            <View style={styles.container}>
              <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
              <View style={styles.insideContainer}>
                <ActivityIndicator size="large" color="#3399ff" style={{}} />
                <Text style={styles.slideText}>{ExportadorFrases.BorrandoEjercicio(this.state.id_idioma)}</Text>
              </View>
            </View>
          );
        }
      }
      else {
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
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={height * 0.008} enabled>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: ExportadorFrases.MusculoEjercicio(this.state.id_idioma),
                      value: '0',
                    }}
                    value={this.state.musculo}
                    placeholderTextColor="black"
                    // placeholderfontWeight="bold"
                    style={{
                      inputIOS: [styles.PikerIos, BlackShadow()],
                      inputAndroid: [styles.PikerAndroid, BlackShadow()]
                    }}

                    onValueChange={(value) => this.setState({ musculo: value })}
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
                    value={this.state.elemento}
                    placeholderTextColor="black"
                    style={{
                      inputIOS: [styles.PikerIos, BlackShadow()],
                      inputAndroid: [styles.PikerAndroid, BlackShadow()]
                    }}
                    onValueChange={(value) => this.setState({ elemento: value })}
                    items={[
                      { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 1), value: 1 },
                      { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 2), value: 2 },
                      { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 3), value: 3 },
                      { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 4), value: 4 },
                      { label: ExportadorFrases.ElementoEjercicioOpciones(this.state.id_idioma, 5), value: 5 },
                    ]}
                  />
                  <TextInput style={[styles.TextContainer, BlackShadow()]} maxLength={33} placeholder={ExportadorFrases.Nombre(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(nombre) => this.setState({ nombre })} value={this.state.nombre}></TextInput>
                  <TextInput style={[styles.TextContainerLarge, BlackShadow()]} multiline={true} maxLength={222} placeholder={ExportadorFrases.Descripcion(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(descripcion) => this.setState({ descripcion })} value={this.state.descripcion}></TextInput>
                  <TextInput style={[styles.TextContainerLarge, BlackShadow()]} multiline={true} maxLength={222} placeholder={ExportadorFrases.Ejecucion(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(ejecucion) => this.setState({ ejecucion })} value={this.state.ejecucion}></TextInput>

                  <View style={{ flexDirection: "row", justifyContent: 'space-around', height: hp("11") }}>
                    <BlueParallelButton onPress={() => { this.setState({ modalBorrarVisible: true }) }}>
                      <BlackButtonText>
                        {ExportadorFrases.Borrar(this.state.id_idioma)}
                      </BlackButtonText>
                    </BlueParallelButton>
                    <BlueParallelButton onPress={() => { this.botonGuardar() }}>
                      <BlackButtonText>
                        {ExportadorFrases.Actualizar(this.state.id_idioma)}
                      </BlackButtonText>
                    </BlueParallelButton>
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

            <View style={[styles.modal, BlackShadow()]}>
              <View style={styles.modal1}>
                <Text style={styles.modalText}>{ExportadorFrases.ActualizarEjercicioModal(this.state.id_idioma)} "{this.state.nombre}"</Text>
              </View>
              <View style={styles.modal2}>
                <TouchableOpacityMorgan onPress={() => { this.setState({ modalGuardarVisible: false }) }} style={styles.modalButtonCancelar}>
                  <WhiteModalText>{ExportadorFrases.Cancelar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacityMorgan>
                <TouchableOpacityMorgan onPress={() => this.actualizarEjercicio()} style={styles.modalButtonAceptar}>
                  <WhiteModalText>{ExportadorFrases.Aceptar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacityMorgan>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            visible={this.state.modalBorrarVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalBorrarVisible: false })}  >

            <View style={[styles.modal, BlackShadow()]}>
              <View style={styles.modal1}>
                <Text style={styles.modalText}>{ExportadorFrases.BorrarEjercicio(this.state.id_idioma)} "{this.state.nombre}"</Text>
              </View>
              <View style={styles.modal2}>
                <TouchableOpacityMorgan onPress={() => { this.setState({ modalBorrarVisible: false }) }} style={styles.modalButtonCancelar}>
                  <WhiteModalText>{ExportadorFrases.Cancelar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacityMorgan>

                <TouchableOpacityMorgan onPress={() => this.borrarEjercicio()} style={styles.modalButtonAceptar}>
                  <WhiteModalText>{ExportadorFrases.Aceptar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacityMorgan>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            visible={this.state.modalExiste}
            transparent={true}
            onRequestClose={() => this.setState({ modalExiste: false })}  >

            <View style={styles.modalExiste}>
            <View style={styles.modal1}>
                <Text style={styles.modalText}>{ExportadorFrases.EjercicioPertenece1(this.state.id_idioma)} {this.state.nombre} {ExportadorFrases.EjercicioPertenece2(this.state.id_idioma)} {this.state.nombresRutinas} {"\n"}{ExportadorFrases.EjercicioPertenece3(this.state.id_idioma)}</Text>
              </View>
              <View style={styles.modal2}>
                <TouchableOpacityMorgan onPress={() => this.setState({ modalExiste: false })} style={styles.modalExisteButtonAceptar}>
                  <WhiteModalText>{ExportadorFrases.Aceptar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacityMorgan>
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
    backgroundColor: "black",
    justifyContent: 'center',
    alignSelf: "center",
    borderRadius: 20,
    padding: wp(5)
  },
  slideText: {
    marginTop: hp(2.5),
    fontSize: wp(4),
    color: "#3399ff"
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
    fontSize: wp(3.8),
    alignSelf: "center"
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
    fontSize: wp(3.8),
    alignSelf: "center"
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
    fontSize: wp(3.8),
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
    fontSize: wp(3.8),
    color: "black",
  },
  //MODAAAAL
  modal: {
    height: hp(20),
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
  modal1: {
    flex: 1,
    paddingHorizontal: wp(2),
    justifyContent: "center"
  },
  modal2: {
    flexDirection: 'row',
    borderColor: 'black',
    borderTopWidth: 2,
    width: width * 0.74,
    height: hp(6),
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
  modalText: {
    color: 'white',
    fontSize: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: hp(2),
  },
  modalButtonCancelar: {
    width: width * 0.37,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 22
  },
  modalButtonAceptar: {
    width: width * 0.366,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    borderLeftWidth: 2,
    borderBottomRightRadius: 22
  },
  modalExisteButtonAceptar: {
    width: width * 0.74,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22
  }
})


export default withNavigation(EjerciciosNew);