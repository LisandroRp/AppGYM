import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, Modal, TextInput } from 'react-native';
import base from './GenerarBase';
import ExportadorEjercicios from './Fotos/ExportadorEjercicios';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
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

class MusculoAgregar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      musculo: this.props.navigation.getParam('musculo'),
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
      isLoading: false,
      id_ejercicio: 0,
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
      segundos: 0
    };
    var { height, width } = Dimensions.get('window');
    this.cargarEjercicios();
  }

  //Trae los ejercicios especificios del musculo seleccionado en la screen anterior
  cargarEjercicios = async () => {
    if (this.state.favoritos == false || this.state.favoritos == null) {
      base.traerEjercicios(await this.props.navigation.getParam('musculo'), this.okEjercicios.bind(this))
    }
    else {
      base.traerEjerciciosMusculoFavs(this.state.musculo, this.okEjerciciosFavs.bind(this))
    }
  }
  //Setea los ejercicios y renderiza la screen
  okEjercicios(ejercicios) {
    this.setState({
      favoritos: true,
      ejercicios: ejercicios,
      memory: ejercicios,
      isLoading: false
    });
  }
  okEjerciciosFavs(ejercicios) {
    this.setState({
      favoritos: false,
      ejercicios: ejercicios,
      memory: ejercicios,
      isLoading: false
    });
  }
  queEstrella() {
    if (this.state.favoritos == false) {
      return ExportadorLogos.traerEstrellaBlanca(true)
    } else {
      return ExportadorLogos.traerEstrellaBlanca(false)
    }
  }
  guardarEjercicio() {
    i = 0;
    if (this.state.repeticiones.length != 0) {
      while (i < this.state.repeticiones.length) {
        if (this.state.repeticiones[i] == undefined || this.state.repeticiones[i] == "") {
          alert("Debe completar todos los casilleros")
          return
        }
        i++
      }
      this.setState({ modalRepeticionesVisible: false })
      this._retrieveData(this.repeticionesString(), null);
    } else {
      alert("Debe completar todos los casilleros")
    }
  }
  guardarEjercicioTiempo() {
    if (this.state.minutos == 0 && this.state.segundos == 0) {
      alert("Debe marcar un tiempo")
    } else {
      this.setState({ modalTiempoVisible: false })
      this._retrieveData(null, (this.state.minutos + " : " + this.state.segundos));
    }
  }
  repeticionesString() {
    repeticiones = this.state.repeticiones[0]
    for (i = 1; i < this.state.repeticiones.length; i++) {
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
      terminada = {
        id_ejercicio: this.state.id_ejercicio,
        musculo: this.state.musculoEjercicio,
        nombre: this.state.nombreEjercicio,
        repeticiones: repeticiones,
        series: this.state.series,
        dia: this.state.dia,
        combinado: this.state.combinado,
        posicion: this.state.ultimaPos.toString(),
        tiempo: null
      }
    } else {
      terminada = {
        id_ejercicio: this.state.id_ejercicio,
        musculo: this.state.musculoEjercicio,
        nombre: this.state.nombreEjercicio,
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
      alert("Debe ingresar una cantidad de series")
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
    contadorRepeticiones = []
    contadorRepeticiones.length = parseInt(this.state.series)
    for (i = 0; i < parseInt(this.state.series); i++) {
      contadorRepeticiones[i] = (i + 1)
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
        ejercicio.nombre +
        ' ' +
        ejercicio.elemento +
        ' ' +
        ejercicio.musculo
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return ejercicioLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ ejercicios: filterDeEjercicios });
    this.setState({ value })
  };

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
          <View>
            <SearchBar
              placeholder="Search..."
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
            <TouchableOpacity onPress={() => { this.cargarEjercicios() }} style={styles.favoritos}>
              <Image style={styles.StarImage} source={this.queEstrella()} />
            </TouchableOpacity>
            <FlatList
              style={styles.contentList}
              data={this.state.ejercicios.sort((a, b) => a.nombre.localeCompare(b.nombre))}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.id_ejercicio.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_ejercicio, item.nombre, item.descripcion)}>
                    <View style={{ flexDirection: "row" }} >
                      <Image style={styles.image} source={ExportadorEjercicios.queMusculo(item.musculo)} />
                      <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.nombre}</Text>
                        <Text style={styles.elemento}>{item.elemento}</Text>
                      </View>
                      <View style={styles.masita}>
                        <FontAwesome name="plus" style={styles.plus}
                          onPress={() => this.setModalSeriesVisible(true, item.id_ejercicio, item.nombre, item.musculo)}
                          size={height * 0.055}
                        /></View>
                    </View>
                  </TouchableOpacity>
                )
              }
              } />
          </ScrollView>
          <Modal
            animationType="fade"
            visible={this.state.modalSeriesVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalSeriesVisible: false })}  >
            <View style={styles.modalSeries}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={styles.modalTextSeries}>Selecione la cantidad de series</Text>
                <View style={styles.containerInputSeries}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: 'Series',
                      value: '0'
                    }}
                    placeholderTextColor="grey"
                    style={{
                      inputIOS: styles.containerInputSeriesIOS,
                      inputAndroid: styles.containerInputSeriesIOS
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
              </View>
              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setState({ modalSeriesVisible: false }); }} style={styles.modalButtonCancelar}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setModalRepeticionesOTiempo(true)} style={styles.modalButtonAceptar}>
                  <Text style={styles.textButton}>Aceptar</Text>

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
              <Text style={styles.modalText}>Selecione el orden y la cantidad de sus repeticiones</Text>
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={styles.contentList2}
                data={this.state.contadorRepeticiones}
                initialNumToRender={10}
                keyExtractor={(item) => {
                  return item;
                }}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.containerInputReps}>
                      <TextInput keyboardType={'numeric'} placeholder='Reps.' style={styles.textInput} multiline={true} maxLength={2} onChangeText={(text) => this.guardarRepeticiones(item, text)} value={this.state.repeticiones[parseInt(item - 1)]}></TextInput>
                    </View>
                  )
                }
                } />

              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setModalSeriesVisible(true), this.setState({ repeticiones: [] }) }} style={styles.modalButtonCancelar}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.guardarEjercicio()} style={styles.modalButtonAceptar}>
                  <Text style={styles.textButton}>Aceptar</Text>

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
              <Text style={styles.modalText}>Escriba el tiempo del ejercicio</Text>
              <View style={styles.contentList3}>
                <View style={styles.containerInputReps}>
                  <TextInput keyboardType={'numeric'} placeholder='Mins.' style={styles.textInput} multiline={true} maxLength={2} onChangeText={(text) => this.guardarMinutos(parseInt(text))} value={this.state.minutos}></TextInput>
                </View>
                <View style={{ marginHorizontal: height * 0.02, justifyContent: "center" }}>
                  <Text>:</Text>
                </View>
                <View style={styles.containerInputReps}>
                  <TextInput keyboardType={'numeric'} placeholder='Segs.' style={styles.textInput} multiline={true} maxLength={2} onChangeText={(text) => this.guardarSegundos(parseInt(text))} value={this.state.segundos}></TextInput>
                </View>
              </View>
              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setModalSeriesVisible(true), this.setState({ minutos: 0, segundos: 0 }) }} style={styles.modalButtonCancelar}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.guardarEjercicioTiempo()} style={styles.modalButtonAceptar}>
                  <Text style={styles.textButton}>Aceptar</Text>

                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <AdMobBanner
            style={styles.bottomBanner}
            bannerSize="fullBanner"
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
    justifyContent: "center",
  },
  contentList3: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.02
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center'
  },
  textInput: {
    color: '#3399ff',
    fontSize: height * 0.028,
    alignSelf: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: height * 0.02,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
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
  masita: {
    alignItems: "center",
    alignContent: 'center',
    justifyContent: 'center',
  },
  plus: {
    alignItems: "center",
    alignContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp("5"),
    color: 'white',
  },
  cardContent: {
    marginLeft: height * 0.028,
    paddingRight: 5,
    width: wp("40"),
    justifyContent: 'center',
  },
  image: {
    width: wp("20"),
    height: hp("11"),
    borderWidth: 2,
    borderColor: "#ebf0f7",
    margin: 5,
    marginRight: 5,
    alignSelf: "center"
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: height * 0.028,
    marginRight: height * 0.028,
    marginTop: height * 0.028,
    backgroundColor: "black",
    padding: 10,
    flexDirection: 'row',
  },

  name: {
    fontSize: height * 0.028,
    //fontSize: 20,
    //flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },

  modalSeries: {
    height: height * 0.25,
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
    opacity: .95,
    padding: 15
  },
  modalReps: {
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
    opacity: .95,
    padding: 15
  },
  modal2: {
    flexDirection: 'row',
    borderColor: 'black',
    borderTopWidth: 2,
    width: width * 0.74,
    height: height * 0.08,
    position: 'absolute',
    bottom: 0,
    justifyContent: "center"
  },
  modalTextSeries: {
    color: 'white',
    fontSize: height * 0.02,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: height * 0.02
  },
  modalText: {
    color: 'white',
    fontSize: height * 0.02,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  textButton: {
    color: 'white',
    fontSize: height * 0.02,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: wp(0.2)
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
    height: height * 0.045,
    width: width * 0.20,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: height * 0.028,
    // margin: height * 0.005,
    color: '#3399ff',
  },
  containerInputSeriesAndroid: {
    // backgroundColor: 'white',
    borderRadius: 11,
    height: height * 0.045,
    width: width * 0.20,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: height * 0.022,
    color: '#3399ff',
    // margin: height * 0.005,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  containerInputReps: {
    marginTop: height * 0.02,
    marginBottom: hp(0.5),
    marginHorizontal: wp(0.8),
    borderRadius: 11,
    backgroundColor: 'white',
    height: height * 0.045,
    width: width * 0.15,
  },
  itemStyle: {
    fontSize: height * 0.02,
    height: 75,
    color: 'black',
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
  favoritos: {
    //width: 44,
    //height: 44,
    height: hp("6"),
    width: hp("6"),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginTop: 10
  },
  StarImage: {
    width: hp(4),
    height: hp(4),
    //resizeMode: 'cover',
  },
  elemento: {
    marginTop: 1,
    fontSize: height * 0.02,
    // color: "#6666ff"
    color: "white"
  },
})

export default withNavigation(MusculoAgregar);