import React, { Component } from 'react';
import { SearchBar, Icon, ThemeConsumer } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, Modal, TextInput } from 'react-native';
import base from './GenerarBase';
import { FontAwesome } from '@expo/vector-icons';
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
  Picker,
  Item
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Reducer } from 'react-native-router-flux';

var { height, width } = Dimensions.get('window');

function createData(item) {
  return {
    key: item._id,
    idEvento: item._id,
    imagen: item.imagen,
    nombre: item.nombre,
    rating: item.rating,
    descripcion: item.descripcion,
    tipo: item.tipo,
    ubicacion: item.ubicacion,
    precioE: item.precioE,
    genero: item.genero,
  };
}

class MusculoAgregar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      //IdUser: props.navigation.getParam('IdUser'),
      searchBarFocused: false,
      musculo: this.props.navigation.getParam('musculo'),
      dia: this.props.navigation.getParam('dia'),
      tipo: this.props.navigation.getParam('tipo'),
      modalVisible: false,
      memory: [],
      ejercicios: [],
      isLoading: false,
      modalVisible: false,
      id_ejercicio: 0,
      nombreEjercicio: '',
      musculoEjercicio: '',
      series: '',
      repeticiones: '',
      rutinaNueva: [],
      ejercicioNuevo: [{ id_ejercicio: 0, nombre: '', repeticiones: '', series: '' }]
    };
    this.Pecho = require('./Fotos/PECHO.png')
    this.Espalda = require('./Fotos/ESPALDA.png')
    this.Hombros = require('./Fotos/HOMBROS.png')
    this.Piernas = require('./Fotos/PIERNAS.png')
    this.Bicep = require('./Fotos/BICEPS.png')
    this.Triceps = require('./Fotos/TRICEPS.png')
    this.Abs = require('./Fotos/ABS.png')
    this.Cardio = require('./Fotos/CARDIO.png')
    this.cargarEjercicios();
  }

  //Trae los ejercicios especificios del musculo seleccionado en la screen anterior
  cargarEjercicios = async () => {
    base.traerEjercicios(await this.props.navigation.getParam('musculo'), this.okEjercicios.bind(this))
  }

  //Setea los ejercicios y renderiza la screen
  okEjercicios(ejercicios) {
    this.setState({
      ejercicios: ejercicios,
      memory: ejercicios,
      isLoading: false,
    });
  }
  guardarEjercicio() {
    this.setState({ modalVisible: false })
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('rutina');
      if (value != null) {
        this.setState({
          rutinaNueva: JSON.parse(value),

        })
        this.cargarEjercicio();
      }
      else {
        this.cargarEjercicio()
      }
    } catch (error) {
      console.log(error);
    }
  };
  cargarEjercicio() {
    terminada = {
      id_ejercicio: this.state.id_ejercicio,
      musculo: this.state.musculoEjercicio,
      nombre: this.state.nombreEjercicio,
      repeticiones: this.state.repeticiones,
      series: this.state.series,
      dia: this.state.dia
    }
    //console.log(terminada)
    this.state.rutinaNueva.push(terminada)
    this.props.onPressSave(this.state.rutinaNueva, this.state.tipo)
  }
  setModalVisible(visible, id_ejercicio, nombre, musculo) {
    this.setState({ modalVisible: visible, nombreEjercicio: nombre, id_ejercicio: id_ejercicio, musculoEjercicio: musculo });
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
        ejercicio.id_ejercicio +
        ' ' +
        ejercicio.genero +
        ' ' +
        ejercicio.tipo
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return ejercicioLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ ejercicios: filterDeEjercicios });
    this.setState({ value })
  };

  queMusculo(musculo) {
    if (musculo == "Abdominales") {
      return this.Abs
    }
    if (musculo == "Bicep") {
      return this.Bicep
    }
    if (musculo == "Cardio") {
      return this.Cardio
    }
    if (musculo == "Espalda") {
      return this.Espalda
    }
    if (musculo == "Hombros") {
      return this.Hombros
    }
    if (musculo == "Pecho") {
      return this.Pecho
    }
    if (musculo == "Piernas") {
      return this.Piernas
    }
    if (musculo == "Tricep") {
      return this.Tricep
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <View>
            <SearchBar
              placeholder="Search..."
              platform='ios'
              onChangeText={value => this.searchEjercicio(value)}
              value={this.state.value}
              inputContainerStyle={{ backgroundColor: 'grey' }}
              placeholderTextColor='black'
              containerStyle={{ backgroundColor: 'black' }}
              //containerStyle={{ backgroundColor: 'black', height: 50, paddingBottom: 22 }}
              buttonStyle={{}}
              searchIcon={{ color: 'black' }}
            />
          </View>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.ejercicios}
            initialNumToRender={50}
            keyExtractor={(item) => {
              return item.id_ejercicio;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_ejercicio, item.nombre, item.descripcion)}>
                  <View style={{ flexDirection: "row" }} >
                    <Image style={styles.image} source={this.queMusculo(item.musculo)} />
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.nombre}</Text>
                    </View>
                    <View style={styles.masita}>
                      <FontAwesome name="plus" style={styles.plus}
                        onPress={() => this.setModalVisible(true, item.id_ejercicio, item.nombre, item.musculo)}
                        size={44}
                      /></View>
                  </View>
                </TouchableOpacity>
              )
            }
            } />
          <Modal
            animationType="fade"
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}  >

            <View style={styles.modal}>
              {/* <View style={{ flexDirection: 'column' }}>
                  <Text>Repeticiones:</Text>
                  <Text>Series:</Text>
                </View> */}
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: height * 0.03 }}>
                <View style={styles.containerInput}>
                  {/* <TextInput placeholder='Series' style={styles.textInput} multiline={true} autoFocus={true} maxLength={1} onChangeText={(text) => this.setState({ series: text })} value={this.state.series}></TextInput> */}
                  {/* <Picker
        style={styles.picker}
        mode="dropdown"
        itemStyle={styles.itemStyle}>
            <Item label="Basse" value="LOW" />
            <Item label="Normale" value="MEDIAN" />
    </Picker> */}
<View style={{alignSelf: "center", justifyContent: "center", paddingTop: hp("0.5")}}>
    <RNPickerSelect
                    placeholder={{
                        label: 'Series',
                        value: '0',
                    }}
                    style={{inputAndroid:{
                        fontSize: 20,
                        justifyContent: 'center',
                        textAlign: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        placeholderColor: '#ababa',
                        borderWidth: 0.5,
                        color: '#ababa',
                      }}}
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
                      { label: '9', value: '9' },
                      { label: '10', value: '10' },
                    ]}
                  />
                  </View>
                </View>
                <View style={styles.containerInput}>
                  <TextInput placeholder='Repeticiones' style={styles.textInput} multiline={true} autoFocus={true} maxLength={15} onChangeText={(text) => this.setState({ repeticiones: text })} value={this.state.repeticiones}></TextInput>
                </View>
              </View>
              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }} style={{ width: width * 0.37, height: height * 0.0775, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', borderRadius: 22 }}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.guardarEjercicio()} style={{ width: width * 0.37, height: height * 0.0775, justifyContent: 'center', alignItems: 'center', textAlign: "center", borderLeftWidth: 2, backgroundColor: 'grey', borderBottomRightRadius: 22 }}>
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
  contentList: {
    flex: 1,
  },

  textInput: {
    color: '#3399ff',
    fontSize: 20,
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  textButton: {
    color: 'white',
    fontSize: 15,
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
    marginLeft: 20,
    //marginTop: 10,
    paddingRight: 5,
    width: wp("40"),
    justifyContent: 'center',
  },
  image: {
    //width: 90,
    width: wp("20"),
    //height: 90,
    height: hp("11"),
    borderWidth: 2,
    borderColor: "#ebf0f7",
    margin: 5,
    marginRight: 5,
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

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    flexDirection: 'row',
  },

  name: {
    fontSize: 22,
    //flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  modal: {
    height: height * 0.25,
    width: width * 0.75,
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.13,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 5.0,
    borderRadius: 22
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
  modalText: {
    fontSize: 20,
    margin: 10,
    color: '#3399ff',
    fontWeight: 'bold'
  },
  textInput: {
    color: '#3399ff',
    fontSize: 20,
    alignSelf: 'center',
  },

  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  containerInput: {
    backgroundColor: 'white',
    marginVertical: 4,
    borderRadius: 22,
    height: height * 0.04,
    width: width * 0.5
  },
  PikerInput: {
    color: '#3399ff',
    fontSize: 200,
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
picker: {
    width: 100
  },
})

export default withNavigation(MusculoAgregar);