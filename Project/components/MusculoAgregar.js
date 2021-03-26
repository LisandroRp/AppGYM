import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, Modal, TextInput } from 'react-native';
import base from './GenerarBase';
import ExportadorEjercicios from './Fotos/ExportadorEjercicios';
import ExportadorFrases from './Fotos/ExportadorFrases';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
import { BlackShadowForBlack, BlackShadow } from './Estilos/Shadows'
import { AzulPrincipal } from './Estilos/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { AdMobBanner } from 'expo-ads-admob';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');
const blueColor = AzulPrincipal()

class MusculoAgregar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      id_musculo: this.props.navigation.getParam('id_musculo'),
      dia: this.props.navigation.getParam('dia'),
      tipo: this.props.navigation.getParam('tipo'),
      combinado: this.props.navigation.getParam('combinado'),
      ultimaPos: this.props.navigation.getParam('ultimaPos'),
      modalRepeticionesVisible: false,
      modalTiempoVisible: false,
      modalSeriesVisible: false,
      favoritos: null,
      memory: [],
      ejercicios: [],
      isLoading: true,
      id_ejercicio: 0,
      id_idioma: 0,
      nombreEjercicio: '',
      musculoEjercicio: '',
      series: '0',
      repeticiones: [],
      contadorRepeticiones: [],
      rutinaNueva: [],
      ejercicioNuevo: [{ id_ejercicio: 0, nombre: '', repeticiones: '', series: '' }],
      modalRepeticionesHeigh: 0.25,
      contador: 0,
      contador2: 0,
      tiempo: 0,
      minutos: 0,
      segundos: 0,
    };
    this.cargarEjercicios();
  }

  //Trae los ejercicios especificios del musculo seleccionado en la screen anterior
  cargarEjercicios = async () => {
    if (this.state.favoritos == false || this.state.favoritos == null) {
      base.traerEjercicios(await this.props.navigation.getParam('id_musculo'), this.okEjercicios.bind(this))
    }
    else {
      base.traerEjerciciosMusculoFavs(this.state.id_musculo, this.okEjerciciosFavs.bind(this))
    }
  }
  //Setea los ejercicios y renderiza la screen
  okEjercicios(ejercicios) {
    if (ejercicios.length == 0) {
      this.setState({ ejercicios: ejercicios, memory: ejercicios, favoritos: true });
      base.traerIdIdioma(this.okIdIdioma.bind(this))
    } else {
      this.setState({
        id_idioma: ejercicios[0].id_idioma,
        favoritos: true,
        ejercicios: ejercicios,
        memory: ejercicios,
        isLoading: false
      });
    }
  }
  okEjerciciosFavs(ejercicios, id_idioma) {
    if (ejercicios.length == 0) {
      this.setState({ ejercicios: ejercicios, memory: ejercicios, favoritos: false });
      base.traerIdIdioma(this.okIdIdioma.bind(this))
    } else {
      this.setState({
        favoritos: false,
        id_idioma: id_idioma,
        ejercicios: ejercicios,
        memory: ejercicios,
        isLoading: false
      });
    }
  }

  okIdIdioma(id_idioma) {
    this.setState({ id_idioma: id_idioma, isLoading: false });
  }

  queEstrella() {
    if (this.state.favoritos == false) {
      return ExportadorLogos.traerEstrellaBlanca(true)
    } else {
      return ExportadorLogos.traerEstrellaBlanca(false)
    }
  }
  guardarEjercicio() {
    var i = 0;
    if (this.state.repeticiones.length != 0) {
      while (i < this.state.repeticiones.length) {
        if (this.state.repeticiones[i] == undefined || this.state.repeticiones[i] == "") {
          alert(ExportadorFrases.CompletarCasilleros(this.state.id_idioma))
          return
        }
        i++
      }
      this.setState({ modalRepeticionesVisible: false })
      this._retrieveData(this.repeticionesString(), null);
    } else {
      alert(ExportadorFrases.CompletarCasilleros(this.state.id_idioma))
    }
  }
  guardarEjercicioTiempo() {
    if (this.state.minutos == 0 && this.state.segundos == 0) {
      alert(ExportadorFrases.CompletarTiempo(this.state.id_idioma))
    } else {
      this.setState({ modalTiempoVisible: false })
      this._retrieveData(null, (this.state.minutos + " : " + this.state.segundos));
    }
  }
  repeticionesString() {
    var repeticiones = this.state.repeticiones[0]
    for (var i = 1; i < this.state.repeticiones.length; i++) {
      repeticiones = repeticiones + " - " + this.state.repeticiones[i]
    }
    return repeticiones
  }

  _retrieveData = async (repeticiones, tiempo) => {
    try {
      const value = await AsyncStorage.getItem('rutina');
      if (value != null) {
        this.setState({
          rutinaNueva: JSON.parse(value),

        })
        this.cargarEjercicio(repeticiones, tiempo);
      }
      else {
        this.cargarEjercicio(repeticiones, tiempo)
      }
    } catch (error) {
      console.log(error);
    }
  };
  cargarEjercicio(repeticiones, tiempo) {
    if (tiempo == null) {
      var terminada = {
        id_ejercicio: this.state.id_ejercicio,
        id_musculo: this.state.musculoEjercicio,
        nombre_ejercicio: this.state.nombreEjercicio,
        repeticiones: repeticiones,
        series: this.state.series,
        dia: this.state.dia,
        combinado: this.state.combinado,
        posicion: this.state.ultimaPos.toString(),
        tiempo: null
      }
    } else {
      var terminada = {
        id_ejercicio: this.state.id_ejercicio,
        id_musculo: this.state.musculoEjercicio,
        nombre_ejercicio: this.state.nombreEjercicio,
        repeticiones: null,
        series: this.state.series,
        dia: this.state.dia,
        combinado: this.state.combinado,
        posicion: this.state.ultimaPos.toString(),
        tiempo: tiempo.toString()
      }
    }


    this.state.rutinaNueva.push(terminada)
    this.props.onPressSave(this.state.rutinaNueva, this.state.tipo, this.state.ultimaPos)
  }

  setModalSeriesVisible(visible, id_ejercicio, nombre, musculo) {
    this.setState({ modalSeriesVisible: visible, modalRepeticionesVisible: !visible, modalTiempoVisible: !visible, nombreEjercicio: nombre, id_ejercicio: id_ejercicio, musculoEjercicio: musculo });
  }
  setModalRepeticionesOTiempo(visible) {
    if (parseInt(this.state.series) == 0) {
      alert(ExportadorFrases.CompletarSeries(this.state.id_idioma))
    }
    else {
      if (this.state.musculo != "Cardio" && this.state.id_ejercicio != 68 && this.state.id_ejercicio != 69) {
        if (parseInt(this.state.series) < 5) {
          this.setState({ modalRepeticionesHeigh: 0.25 })
          this.setModalRepeticionesVisible(visible)
        } else {
          this.setState({ modalRepeticionesHeigh: 0.33 })
          this.setModalRepeticionesVisible(visible)
        }
      } else {
        this.setState({ modalSeriesVisible: !visible, modalTiempoVisible: visible })
      }
    }
  }
  setModalRepeticionesVisible(visible) {
    var contadorRepeticiones = []
    contadorRepeticiones.length = parseInt(this.state.series)
    var primerFila = []
    if (parseInt(this.state.series) < 4) {
      for (var i = 0; i < parseInt(this.state.series); i++) {
        primerFila.push(i + 1)
      }
      contadorRepeticiones.push(primerFila)
    }
    else {
      var segundaFila = []
      for (var i = 0; i < 4; i++) {
        primerFila.push(i + 1)
      }
      contadorRepeticiones.push(primerFila)
      for (var i = 4; i < parseInt(this.state.series); i++) {
        segundaFila.push(i + 1)
      }
      contadorRepeticiones.push(segundaFila)
    }
    this.setState({ modalSeriesVisible: !visible, modalRepeticionesVisible: visible, contadorRepeticiones: contadorRepeticiones })
  }
  guardarRepeticiones(repeticion, cantidad) {
    var repeticiones2 = this.state.repeticiones
    repeticiones2[repeticion - 1] = cantidad
    this.setState({ repeticiones: repeticiones2 })
  }
  guardarMinutos(tiempo) {
    this.setState({ minutos: tiempo })
  }
  guardarSegundos(tiempo) {
    this.setState({ segundos: tiempo })
  }
  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
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

  searchEjercicio = value => {
    const filterDeEjercicios = this.state.memory.filter(ejercicio => {
      let ejercicioLowercase = (
        ejercicio.nombre_musculo +
        ' ' +
        ejercicio.nombre_ejercicio +
        ' ' +
        ejercicio.nombre_elemento
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return ejercicioLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ ejercicios: filterDeEjercicios });
    this.setState({ value })
  };
  marginSize(item) {
    if (item.id_ejercicio != this.state.ejercicios[this.state.ejercicios.length - 1].id_ejercicio) {

      return { marginTop: height * 0.028 }
    } else {
      return { marginBottom: height * 0.028, marginTop: height * 0.028 }
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ActivityIndicator size="large" color={blueColor} backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <View style={BlackShadowForBlack()} >
            <SearchBar
              placeholder={ExportadorFrases.Search(this.state.id_idioma)}
              platform='ios'
              onChangeText={value => this.searchEjercicio(value)}
              value={this.state.value}
              inputContainerStyle={{ backgroundColor: 'grey' }}
              placeholderTextColor='black'
              containerStyle={{ backgroundColor: 'black' }}
              buttonStyle={{}}
              searchIcon={{ color: 'black' }}
            />
          </View>
          <ScrollView>
            <TouchableOpacity onPress={() => { this.cargarEjercicios() }} style={[styles.starButton, BlackShadow()]}>
              <Image style={styles.starImage} source={this.queEstrella()} />
            </TouchableOpacity>
            {this.state.ejercicios.map((item, itemPos) => (
              <TouchableOpacity style={[this.marginSize(item), styles.card, BlackShadowForBlack()]} onPress={() => this.props.onPressGo(item.id_ejercicio, item.nombre_ejercicio, item.descripcion)}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={ExportadorEjercicios.queMusculo(item.id_musculo)} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.nombre_ejercicio}</Text>
                  <Text style={styles.elemento}>{item.nombre_elemento}</Text>
                </View>
                <View style={styles.plusContainer}>
                  <FontAwesome name="plus"
                    onPress={() => this.setModalSeriesVisible(true, item.id_ejercicio, item.nombre_ejercicio, item.id_musculo)}
                    color={"white"}
                    size={wp(8)}
                  /></View>
              </TouchableOpacity>
            )
            )
            }
          </ScrollView>
          <View style={styles.bannerContainer}></View>
          <Modal
            animationType="fade"
            visible={this.state.modalSeriesVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalSeriesVisible: false })}  >
            <View style={styles.modalSeries}>
            <Text style={styles.modalText}>{ExportadorFrases.CantidadSeries(this.state.id_idioma)}</Text>
              <View style={styles.modal1}>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: ExportadorFrases.Series(this.state.id_idioma),
                    value: '0'
                  }}
                  placeholderTextColor="grey"
                  style={{
                    inputIOS: styles.containerInputSeriesIOS,
                    inputAndroid: styles.containerInputSeriesAndroid
                  }}
                  onValueChange={(value) => this.setState({ series: value })}
                  items={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                    { label: '7', value: '7' },
                    { label: '8', value: '8' },
                  ]}
                />
                </View>
              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setState({ modalSeriesVisible: false }); }} style={styles.modalButtonCancelar}>
                  <Text style={styles.textButton}>{ExportadorFrases.Cancelar(this.state.id_idioma)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setModalRepeticionesOTiempo(true)} style={styles.modalButtonAceptar}>
                  <Text style={styles.textButton}>{ExportadorFrases.Aceptar(this.state.id_idioma)}</Text>

                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            visible={this.state.modalRepeticionesVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalRepeticionesVisible: false })}  >

            <View style={[{ height: height * this.state.modalRepeticionesHeigh }, styles.modalReps]}>
              <Text style={styles.modalText}>{ExportadorFrases.CantidadSeries(this.state.id_idioma)}</Text>
              <View style={styles.modal1}>
                  {this.state.contadorRepeticiones.map((array, arrayPos) => (
                    <View style={{ flexDirection: "row"}}>
                      {
                        array.map((item, itemPos) => (
                          <View style={styles.containerInputReps}>
                            <TextInput
                              keyboardType={'numeric'}
                              placeholder='Reps.'
                              style={styles.modalTextInputFont}
                              multiline={true} maxLength={2}
                              onChangeText={(text) => this.guardarRepeticiones(item, text)}
                              value={this.state.repeticiones[parseInt(item - 1)]}>
                            </TextInput>
                          </View>
                        )
                        )}
                    </View>
                  ))}
              </View>
              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setModalSeriesVisible(true), this.setState({ repeticiones: [] }) }} style={styles.modalButtonCancelar}>
                  <Text style={styles.textButton}>{ExportadorFrases.Cancelar(this.state.id_idioma)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.guardarEjercicio()} style={styles.modalButtonAceptar}>
                  <Text style={styles.textButton}>{ExportadorFrases.Aceptar(this.state.id_idioma)}</Text>

                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            visible={this.state.modalTiempoVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalTiempoVisible: false })}  >

            <View style={[{ height: height * this.state.modalRepeticionesHeigh }, styles.modalReps]}>
              <Text style={styles.modalText}>{ExportadorFrases.CantidadTiempo(this.state.id_idioma)}</Text>
              <View style={styles.contentList3}>
                <View style={styles.containerInputReps}>
                  <TextInput keyboardType={'numeric'} placeholder='Mins.' style={styles.modalTextInputFont} multiline={true} maxLength={2} onChangeText={(text) => this.guardarMinutos(parseInt(text))} value={this.state.minutos}></TextInput>
                </View>
                <View style={{ marginHorizontal: height * 0.02, justifyContent: "center" }}>
                  <Text>:</Text>
                </View>
                <View style={styles.containerInputReps}>
                  <TextInput keyboardType={'numeric'} placeholder='Segs.' style={styles.modalTextInputFont} multiline={true} maxLength={2} onChangeText={(text) => this.guardarSegundos(parseInt(text))} value={this.state.segundos}></TextInput>
                </View>
              </View>
              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setModalSeriesVisible(true), this.setState({ minutos: 0, segundos: 0 }) }} style={styles.modalButtonCancelar}>
                  <Text style={styles.textButton}>{ExportadorFrases.Cancelar(this.state.id_idioma)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.guardarEjercicioTiempo()} style={styles.modalButtonAceptar}>
                  <Text style={styles.textButton}>{ExportadorFrases.Aceptar(this.state.id_idioma)}</Text>

                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <AdMobBanner
            accessible={true}
            accessibilityLabel={"Add Banner"}
            accessibilityHint={ExportadorFrases.BannerHint(this.state.id_idioma)}
            style={styles.bottomBanner}
            adUnitID={ExportadorAds.Banner()}
            onDidFailToReceiveAdWithError={err => {
              console.log(err)
            }}
            onAdViewDidReceiveAd={() => {
              console.log("Ad Recieved");
            }}
            adViewDidReceiveAd={(e) => { console.log('adViewDidReceiveAd', e) }}
          />
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
  contentList: {
    flex: 1,
  },
  contentList2: {
    flexDirection: "row",
    justifyContent: "center"
  },
  contentList3: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  modalText: {
    color: 'white',
    fontSize: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: hp(2),
  },

  bannerContainer: {
    height: height * 0.08,
    backgroundColor: 'black',
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
  },

  containerInputReps: {
    borderRadius: 11,
    backgroundColor: 'white',
    width: wp(15),
    margin: wp(1),
    padding: wp(1)
  },
  modalTextInputFont: {
    color: blueColor,
    fontSize: wp(4),
    textAlign: "center"
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
  plusContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: "center",
  },
  plus: {
    alignItems: "center",
    alignContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp("5"),
    color: 'white',
  },
  card: {
    flex: 1,
    backgroundColor: "black",
    marginHorizontal: wp(2),
    paddingVertical: wp(1.5),
    flexDirection: 'row'
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0.4,
    margin: wp(2.5),
    alignItems: 'center',
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: wp(18),
    width: wp(18),
    borderWidth: 1.5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    resizeMode: 'stretch',
    overflow: 'hidden'
  },

  name: {
    fontSize: wp(5),
    color: blueColor,
    fontWeight: 'bold'
  },

  elemento: {
    marginTop: 1,
    fontSize: wp(3.5),
    color: "white"
  },

  modalSeries: {
    flex: 1,
    height: height * 0.22,
    position: 'absolute',
    alignSelf: "center",
    top: hp(40),
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 5.0,
    borderRadius: 22,
    opacity: .95
  },
  modalReps: {
    flex: 1,
    position: 'absolute',
    alignSelf: "center",
    top: hp(35),
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
    flexDirection: "column",
    alignSelf: "center",
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
  modalButtonCancelar: {
    flex: 1,
    justifyContent: 'center',
    borderBottomLeftRadius: 22
  },
  modalButtonAceptar: {
    flex: 1,
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderBottomRightRadius: 22
  },
  modalTextSeries: {
    color: 'white',
    fontSize: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  textButton: {
    color: 'white',
    fontSize: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  containerInputSeries: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 11,
    marginTop: height * 0.02,
  },
  containerInputSeriesIOS: {
    backgroundColor: 'white',
    borderRadius: 11,
    width: wp(15),
    padding: wp(2),
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: wp(4),
    color: blueColor,
  },
  containerInputSeriesAndroid: {
    borderRadius: 11,
    width: wp(15),
    height: height * 0.045,
    width: width * 0.4,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: wp(4),
    color: blueColor,
    padding: wp(2),
    backgroundColor: 'white'
  },
  starButton: {
    height: wp("10"),
    width: wp("10"),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: blueColor,
    borderRadius: 30,
    marginTop: 10
  },
  starImage: {
    width: wp(7),
    height: wp(7),
  },
})

export default withNavigation(MusculoAgregar);