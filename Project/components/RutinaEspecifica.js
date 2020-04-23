import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorLogos from './Fotos/ExportadorLogos'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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

class RutinaEspecifica extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_rutina: this.props.navigation.getParam('id_rutina'),
      nombre: this.props.navigation.getParam('nombre'),
      modalVisible: false,
      isLoading: true,
      rutina: {},
      diasTotal: [],
      contador: 1,
      ejercicios: []
    };
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
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../assets/Logo_Solo.png')} />
            </View>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.diasTotal}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.toString();
              }}
              renderItem={({ item }) => {
                aux = item
                contadorCobinadosFlatlist = false
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
                        data={this.state.rutina.rutina}
                        initialNumToRender={50}
                        keyExtractor={(item) => {
                          return item.id_ejercicio.toString();
                        }}
                        renderItem={({ item }) => {
                          if (item.dia == aux) {
                            if (item.tiempo == null) {
                              if (item.combinado != null) {
                                if (contadorCobinadosFlatlist) {
                                  contadorCobinadosFlatlist = false
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroSegundoCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre)}>
                                      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                          <View style={{ flexDirection: 'column', width: wp("60") }}>
                                            <Text style={styles.nombreEjercicio}>{item.nombre}</Text>
                                            <Text style={styles.subsEjercicio}>Series: {item.series}</Text>
                                            <Text style={styles.subsEjercicio}>Repeticiones:{"\n"}{item.repeticiones}</Text>
                                          </View>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                } else {
                                  contadorCobinadosFlatlist = true
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroPrimerCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre)}>
                                      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                          <View style={{ flexDirection: 'column', width: wp("60") }}>
                                            <Text style={styles.nombreEjercicio}>{item.nombre}</Text>
                                            <Text style={styles.subsEjercicio}>Series: {item.series}</Text>
                                            <Text style={styles.subsEjercicio}>Repeticiones:{"\n"}{item.repeticiones}</Text>
                                          </View>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                }
                              } else {
                                return (
                                  <TouchableOpacity style={styles.cuadraditosDeAdentro}
                                    onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre)}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                        <View style={{ flexDirection: 'column', width: wp("60") }}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre}</Text>
                                          <Text style={styles.subsEjercicio}>Series: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>Repeticiones:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                )
                              }
                            } else {
                              if (item.combinado != null) {
                                if (contadorCobinadosFlatlist) {
                                  contadorCobinadosFlatlist = false
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroSegundoCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre)}>
                                      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                          <View style={{ flexDirection: 'column', width: wp("60") }}>
                                            <Text style={styles.nombreEjercicio}>{item.nombre}</Text>
                                            <Text style={styles.subsEjercicio}>Series: {item.series}</Text>
                                            <Text style={styles.subsEjercicio}>Tiempo:{"\n"}{item.tiempo}</Text>
                                          </View>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                } else {
                                  contadorCobinadosFlatlist = true
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroPrimerCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre)}>
                                      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                          <View style={{ flexDirection: 'column', width: wp("60") }}>
                                            <Text style={styles.nombreEjercicio}>{item.nombre}</Text>
                                            <Text style={styles.subsEjercicio}>Series: {item.series}</Text>
                                            <Text style={styles.subsEjercicio}>Tiempo:{"\n"}{item.tiempo}</Text>
                                          </View>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                }
                              } else {
                                return (
                                  <TouchableOpacity style={styles.cuadraditosDeAdentro}
                                    onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre)}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                        <View style={{ flexDirection: 'column', width: wp("60") }}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre}</Text>
                                          <Text style={styles.subsEjercicio}>Series: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>Tiempo:{"\n"}{item.tiempo}</Text>
                                        </View>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                )
                              }
                            }
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

  imageContainer: {
    height: height * 0.40,
    width: height * 0.33,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderWidth: 4,
    borderRadius: 15
  },
  image: {
    height: height * 0.30,
    width: height * 0.30,
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

    marginLeft: height * 0.028,
    marginRight: height * 0.028,
    marginTop: height * 0.028,
    backgroundColor: "black",
    padding: 10,
    flexDirection: 'row',
  },
  musculosLogo: {
    width: wp("10.5"),
    height: hp("6"),
    marginRight: 12,
    resizeMode: 'cover',
  },
  detalleGenresTitles: {
    fontSize: height * 0.044,
    margin: 10,
    alignSelf: "center",
    color: '#3399ff',
    fontWeight: 'bold'
  },
  cuadraditos: {
    backgroundColor: 'black',
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal: 10, //paddingBottom: 10
  },
  cuadraditosDeAdentro: {
    borderWidth: 0,
    backgroundColor: 'grey',
    marginVertical: 5,
    marginTop: 2,
    paddingVertical: 10,
    paddingLeft: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  cuadraditosDeAdentroPrimerCombinado: {
    borderWidth: 0,
    backgroundColor: 'grey',
    marginTop: 5,
    marginTop: 2,
    paddingVertical: 10,
    paddingLeft: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  cuadraditosDeAdentroSegundoCombinado: {
    borderWidth: 0,
    backgroundColor: 'grey',
    marginBottom: 5,
    paddingVertical: 10,
    paddingLeft: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },nombreEjercicio: {
    fontWeight: 'bold',
    fontSize: height * 0.021,
    marginBottom: wp("1")
  },
  subsEjercicio:{
    fontSize: height * 0.019,
  }
})

export default withNavigation(RutinaEspecifica);