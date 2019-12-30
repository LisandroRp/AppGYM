import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import ApiController from '../controller/ApiController'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import DropDownItem from 'react-native-drop-down-item';
import { Reducer } from 'react-native-router-flux';
import { TextInput } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';

var { height, width } = Dimensions.get('window');

class RutinaNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      modalVisible: false,
      userSelected: [],
      rutina: [],
      isLoading: false,
      rutinaVacia: [],
      ultimoDia: 0,
      imagen: '',
      diasTotal: [1,2,3,4,5,6,7]
    };
    this.Star = require('./Logos/Star_Llena.png');
    this.Pecho = require('./Logos/Logo_Pecho1.png');
    this.Abs = require('./Logos/Logo_Abs.png');
    this.Espalda = require('./Logos/Logo_Espalda.png');
    this.Hombros = require('./Logos/Logo_Hombros.png');
    this.Bicep = require('./Logos/Logo_Bicep.png');
    this.Tricep = require('./Logos/Logo_Bicep.png');
    this.Piernas = require('./Logos/Logo_Bicep.png');
    this.Cardio = require('./Logos/Logo_Cardio.png');
  }
  componentWillReceiveProps() {
    console.log('chauuuu')
    this._retrieveData()
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('rutina');
      if (value !== null) {
        if (this.yaEsta(JSON.parse(value)[0])) {
          this.setState({ isLoading: true })
          this.state.rutina.push(JSON.parse(value)[0])
          this.termino()
        } else {
          this._storeData()
          alert('Este ejercicio ya esta en el dia seleccionado')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  termino() {
    this._storeData()
  }
  touch(dia) {
    if (this.diaAnterior(dia) || dia == 1) {
      this.setState({ ultimoDia: dia })
      this.props.onPressGo(dia, 'nuevo')
    } else {
      alert('Debe agregar ejercicios en el dia ' + (dia - 1) + ' para poder agregar los en este dia')
    }
  }
  diaAnterior(dia) {
    i = 0
    while (i < this.state.rutina.length) {
      if (this.state.rutina[i].dia == (dia - 1)) {
        return true
      }
      i++
    }
    return false
  }
  yaEsta(data) {
    for (i = 0; i < this.state.rutina.length; i++) {
      if (this.state.rutina[i].id_ejercicio == data.id_ejercicio) {
        if (this.state.rutina[i].dia == data.dia)
          return false
      }
    }
    return true
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('rutina', JSON.stringify(this.state.rutinaVacia));
      this.setState({
        isLoading: false,
      })
    } catch (error) {
      console.log(error);
    }
  };
  subir(dia, id_ejercicio) {
    var aux
    var rutinaNueva = []
    var i = 0
    var flag = 0
    var fallador = 0
    while (i < this.state.rutina.length) {
      rutinaNueva.push(this.state.rutina[i])
      if (dia == this.state.rutina[i].dia && flag != 1) {
        fallador++
        if (id_ejercicio == this.state.rutina[i].id_ejercicio) {
          if (fallador != 1) {
            this.setState({ isLoading: true })
            rutinaNueva[i] = this.state.rutina[aux]
            rutinaNueva[aux] = this.state.rutina[i]
            flag = 1
          } else {
            return this.termino()
          }
        } else {
          aux = i
        }
      }
      i++
    }
    this.setState({ rutina: rutinaNueva })
    this.termino()
  }

  bajar(dia, id_ejercicio) {
    var aux
    var rutinaNueva = []
    var i = 0
    var flag = 0
    while (i < this.state.rutina.length) {
      rutinaNueva.push(this.state.rutina[i])
      if ((id_ejercicio == this.state.rutina[i].id_ejercicio && dia == this.state.rutina[i].dia) && flag != 1) {
        aux = i
        aux++
        if (aux < this.state.rutina.length) {
          while (aux != this.state.rutina.length && dia != this.state.rutina[aux].dia) {
            rutinaNueva.push(this.state.rutina[aux])
            aux++
          }
          if (aux != this.state.rutina.length) {
            this.setState({ isLoading: true })
            rutinaNueva.push(this.state.rutina[i])
            rutinaNueva[i] = this.state.rutina[aux]
            i = aux
            flag = 1
          } else {
            return this.termino()
          }
        } else {
          return this.termino()
        }
      }
      i++
    }
    this.setState({ rutina: rutinaNueva })
    this.termino()
  }
  borrar(dia, id_ejercicio) {
    var rutinaNueva = []
    var i = 0
    while (i < this.state.rutina.length) {
      if (id_ejercicio == this.state.rutina[i].id_ejercicio && dia == this.state.rutina[i].dia) {
        i++
      }
      if (i < this.state.rutina.length) {
        rutinaNueva.push(this.state.rutina[i])
      } else {
        this.setState({ rutina: rutinaNueva })
        this.termino()
      }
      i++
    }
    this.setState({ rutina: rutinaNueva })
    this.termino()
  }
  borrarTodo() {
    var rutinaVacia = []
    if (this.state.rutina.length != 0) {
      this.setState({ isLoading: true })
      this.setState({ rutina: rutinaVacia })
      this.termino()
    }
  }
  guardarRutina() {
    var aux = 0
    rutinaNueva = { id_rutina: 0, nombre: '', imagen: require('./Fotos/PECHO.png'), dias: '', fav: 1, rutina: [] }
    for (i = 0; i < this.state.rutina.length; i++) {
      if (this.state.rutina[i].dia > aux) {
        aux = this.state.rutina[i].dia
      }
    }
    rutinaNueva.id_rutina = this.nuevoId()
    rutinaNueva.nombre = this.state.nombre
    rutinaNueva.imagen = this.state.imagen
    rutinaNueva.dias = aux
    rutinaNueva.rutina = this.state.rutina
    console.log(rutinaNueva)
  }
  cancelarRutina() {
    this.props.onPressCancelar()
  }
  nuevoId() {
    //buscar el ultimo id en la base de datos
  }
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
          <ScrollView>
            <View style={{ alignItems: 'center', marginVertical: height * 0.03 }}>
              {/* <TouchableOpacity onPress={() => {}> */}
              <TouchableOpacity>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} />
                  {/* <Image style={styles.image} source={} /> */}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.TextContainer} maxLength={15} placeholder='Nombre' placeholderTextColor='black' onChangeText={(nombre) => this.setState({ nombre })} value={this.state.nombre}></TextInput>
              <TouchableOpacity onPress={() => { this.borrarTodo() }} style={styles.borrarTodo}>
                <AntDesign name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* ************************************************************************
            ******************************DropDownn Aca*********************************
            **************************************************************************** */}
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.diasTotal}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item;
              }}
              renderItem={({ item }) => {
                aux = item
                return (
            <View style={styles.cuadraditos}>
              <DropDownItem key={1} contentVisible={false}
                header={
                  <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    <Text style={styles.detalleGenresTitles}>
                    Día {item}
                </Text>
                    <TouchableOpacity onPress={() => {
                      this.touch(item);
                    }} style={styles.fab}>
                      <AntDesign name="plus" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <FlatList
                  style={styles.contentList}
                  columnWrapperStyle={styles.listContainer}
                  data={this.state.rutina}
                  initialNumToRender={50}
                  keyExtractor={(item) => {
                    return item.id_ejercicio;
                  }}
                  renderItem={({ item }) => {
                    if (item.dia == aux) {
                        return (
                          <TouchableOpacity style={styles.cuadraditosDeAdentro}
                            onPress={() => this.props.onPressInfo(item.id_ejercicio)}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.musculosLogo} source={this.queMusculo(item.musculo)} />
                                <View style={{ flexDirection: 'column' }}>
                                  <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
                                  <Text>Reps: {item.repeticiones}</Text>
                                  <Text>Series: {item.series}</Text>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { this.subir(item.dia, item.id_ejercicio) }} style={styles.fab}>
                                  <AntDesign name="up" size={15} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id_ejercicio) }} style={styles.fab}>
                                  <AntDesign name="down" size={15} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id_ejercicio), this.setState({ isLoading: true }) }} style={styles.fab}>
                                  <AntDesign name="delete" size={15} color="white" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                    }
                  }} />
              </DropDownItem>
            </View>
                )
              }} />
            {/* ************************************************************************
            ******************************Ya no Mas*********************************
            **************************************************************************** */}

            <View style={{ flexDirection: "row", justifyContent: 'center', height: 100 }}>
              <TouchableOpacity style={styles.guardarButton} onPress={() => { this.cancelarRutina() }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.guardarButton} onPress={() => { this.guardarRutina() }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    marginBottom: 5, marginTop: 5
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width: 180,
    flexDirection: "column"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 15,
    justifyContent: "space-between"
  },
  TextContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
    width: 300,
    height: 45,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  borrarTodo: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 20,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 2 - 4,
    height: 200,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: "#ebf0f7"
  },
  image: {
    width: Dimensions.get('window').width / 2 - 4,
    height: 200,
  },
  cuadraditos: {
    backgroundColor: 'black', marginBottom: 5, marginTop: 5, marginHorizontal: 10, paddingBottom: 10, alignItems: 'center'
  },
  cuadraditosDeAdentro: {
    backgroundColor: 'grey', marginVertical: 5, marginTop: 2, paddingVertical: 10, paddingLeft: 10, alignSelf: 'stretch', width: Dimensions.get('window').width * 0.88
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
  card: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 30,
  },

  name: {
    paddingTop: 12,
    fontSize: 18,
    flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  count: {
    fontSize: 14,
    paddingBottom: 11,
    flex: 1,
    //alignSelf: 'center',
    color: "#6666ff"
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "black",
    marginTop: 4,
    fontSize: 15,
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  detalleGenresTitles: {
    fontSize: 33,
    margin: 10,
    marginBottom: 2.5,
    color: '#3399ff',
    fontWeight: 'bold'
  },
  fab: {
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 10,
    marginTop: 10,
  },
  fab2: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 10,
    marginTop: 10,
  },
  guardarButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.33,
    marginHorizontal: 22,
    alignSelf: 'center'
  },
  DropDownItem: {
    alignItems: 'stretch'
  },
  musculosLogo: {
    width: 40,
    height: 40,
    // width: width*0.05,
    // height: height*0.05,
    marginRight: 10,
    resizeMode: 'cover',
  },
})


export default withNavigation(RutinaNew);