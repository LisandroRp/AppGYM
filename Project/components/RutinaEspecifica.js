import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
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
import DropDownItem from 'react-native-drop-down-item';
import { LinearGradient } from 'expo-linear-gradient'
import { Reducer } from 'react-native-router-flux';
var { height, width } = Dimensions.get('window');

function createData(item) {
  return {
    id_rutina: item.id_rutina,
    nombre: item.nombre,
    imagen: item.imagen,
    dias: item.dias,
    favoritos: item.favoritos,
    modificable: item.modificable,
    rutina: [],
  };
}
function createEjercicio(item, ejercicio) {
  return {
    id_rutina: ejercicio.id_rutina,
    id_ejercicio: item.id_ejercicio,
    dia: ejercicio.dia,
    repeticiones: ejercicio.repeticiones,
    series: ejercicio.series,
    nombre: item.nombre,
    musculo: item.musculo,
    descripcion: item.descripcion,
    ejecucion: item.ejecucion,
    imagen1: item.imagen1,
    imagen2: item.imagen2,
  };
}
function createRutina(item) {
  return {
    dias: item.dias,
    fav: item.fav,
    id_rutina: item.id_rutina,
    imagen: item.imagen,
    modificable: item.modificable,
    rutina: []
  };
}

class RutinaEspecifica extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_rutina: this.props.navigation.getParam('id_rutina'),
      nombre: this.props.navigation.getParam('nombre'),
      modalVisible: false,
      isLoading: true,
      // rutina: { id: 1, nombre: 'Arnold N1', imagen: require('./arnold-schwarzenegger-biceps_0.jpg'), dias: 7, fav: 1,modificable:false,
      // rutina:[{key:'50', id: 55,dia:'2',musculo: 'Pecho', nombre: 'Press Plano', series: '4', repeticiones: '15-12-10-8' },
      // {key:'55',id: 11,dia: '1',musculo: 'Abdominales', nombre: 'Abdominales', series: '4', repeticiones: '5-4-3-2-1' },
      // {key:'51',id: 87,dia: '3',musculo: 'Hombros', nombre: 'cacaHombrosa', series: '4', repeticiones: '5-4-3-2-1' },
      // {key:'58',id: 12,dia: '2',musculo: 'Tricep', nombre: 'Tricep', series: '4', repeticiones: '5-4-3-2-1' },
      // {key:'59',id: 12,dia: '4',musculo: 'Bicep', nombre: 'Bicep', series: '4', repeticiones: '5-4-3-2-1' },
      // {key:'52',id: 12,dia: '4',musculo: 'Espalda', nombre: 'Espalda', series: '4', repeticiones: '5-4-3-2-1' },
      // {key:'53',id: 12,dia: '4',musculo: 'Cardio', nombre: 'Cardio', series: '4', repeticiones: '5-4-3-2-1' }]},
      rutina: {
        id: 1, nombre: 'Arnold N1', imagen: require('./arnold-schwarzenegger-biceps_0.jpg'), dias: 7, fav: 1, modificable: false,
        rutina: []
      },
      diasTotal: [],
      contador: 1,
      ejercicios: []
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
    this.cargarRutina();
  }

  //Trae de la base de datos la rutina
  cargarRutina = async () => {
    base.traerRutinaEspecifica(await this.props.navigation.getParam('id_rutina'), this.okRutina.bind(this))
  }

  //Trae de la base de datos la informacion de los ejercicios de la rutina anterior
  okRutina(rutina) {
    base.traerEjerciciosRutinaJoin(createData(rutina[0]), this.listo.bind(this))
  }

  //Setea la rutina y los ejercicios traidos anteriormente
  listo(result) {
    this.setState({ rutina: result })
    //Guarda la rutina provisoriamente en el caso que quiera ser editada
    this.props.editable(this.state.rutina)
    //Cuenta la cantidad de dias que posee la rutina 
    this.contarDias()
    console.log(this.state.rutina)
  }

  contarDias() {
    dias = this.state.rutina.dias
    cantidad = []
    contador = 1
    while (dias != 0) {
      cantidad.push(contador)
      contador++
      dias--
    }
    this.setState({ diasTotal: cantidad, isLoading: false })
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
              <TouchableOpacity onPress={() => { }}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={this.state.rutina.imagen} />
                </View>
              </TouchableOpacity>
            </View>
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
                    <DropDownItem key={item} contentVisible={false}
                      header={
                        <Text style={styles.detalleGenresTitles}>
                          Día {item}
                        </Text>
                      }
                    >
                      <FlatList
                        style={styles.contentList}
                        columnWrapperStyle={styles.listContainer}
                        data={this.state.rutina.rutina}
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
                                </View>
                              </TouchableOpacity>
                            )
                          }
                        }} />
                    </DropDownItem>
                  </View>
                )
              }} />
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
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width: 180,
    flexDirection: "column"
  },
  imageContainer: {
    height: height * 0.28,
    width: width * 0.51,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 4,
    borderColor: "#ebf0f7"
  },
  image: {
    height: height * 0.28,
    width: width * 0.51,
    borderWidth: 4,
    borderColor: "#ebf0f7"
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
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
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
  musculosLogo: {
    width: 40,
    height: 40,
    // width: width*0.05,
    // height: height*0.05,
    marginRight: 10,
    resizeMode: 'cover',
  },
  detalleGenresTitles: {
    fontSize: 33,
    margin: 10,
    marginBottom: 2.5,
    color: '#3399ff',
    fontWeight: 'bold'
  },
  cuadraditos: {
    backgroundColor: 'black', marginBottom: 5, marginTop: 5, marginHorizontal: 10, paddingBottom: 10
  },
  cuadraditosDeAdentro: {
    backgroundColor: 'grey', marginVertical: 5, marginTop: 2, paddingVertical: 10, paddingLeft: 10, alignSelf: 'stretch', width: Dimensions.get('window').width * 0.88
  },
})

export default withNavigation(RutinaEspecifica);