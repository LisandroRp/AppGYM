import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorCreadores from './Fotos/ExportadorCreadores'
import ExportadorFrases from './Fotos/ExportadorFrases';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
import { BlackShadowForBlack } from './Estilos/Shadows'
import { AzulPrincipal } from './Estilos/Colors'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Linking
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { height, width } = Dimensions.get('window');
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';
import { AntDesign } from '@expo/vector-icons';

function createData(item) {
  return {
    id_rutina: item.id_rutina,
    nombre: item.nombre_rutina,
    imagen: item.imagen,
    id_creador: item.id_creador,
    instagram: item.instagram,
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
      nombre_rutina: this.props.navigation.getParam('nombre_rutina'),
      modalVisible: false,
      isLoading: true,
      rutina: {},
      diasTotal: [],
      contador: 1,
      ejercicios: [],
      id_idioma: 0
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
  listo(result, id_idioma) {
    this.setState({ rutina: result, id_idioma: id_idioma })
    //Guarda la rutina provisoriamente en el caso que quiera ser editada
    this.props.editable(this.state.rutina)
    //Cuenta la cantidad de dias que posee la rutina 
    this.contarDias()
  }

  contarDias() {
    var dias = this.state.rutina.dias
    var cantidad = []
    var contador = 1
    while (dias != 0) {
      cantidad.push(contador)
      contador++
      dias--
    }
    this.setState({ diasTotal: cantidad, isLoading: false })
  }

  marginSize(item) {
    if (item != this.state.diasTotal[this.state.diasTotal.length - 1]) {

      return { marginTop: height * 0.02 }
    } else {
      return { marginBottom: height * 0.02, marginTop: height * 0.02 }
    }
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
            <View style={[styles.imageContainer, BlackShadowForBlack()]}>
              <Image style={styles.image} source={ExportadorCreadores.queImagenEspecifica(this.state.rutina.id_creador)} />
              <View style={styles.socialMediaContainer}>
                <Image style={styles.logoSocialMedia} source={ExportadorLogos.traerInstagram()} />
                <Text style={styles.socialMedia} onPress={() => Linking.openURL(ExportadorCreadores.queLink(this.state.rutina.id_creador))}>{this.state.rutina.instagram}</Text>
              </View>
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
                var aux = item
                var contadorCobinadosFlatlist = false
                return (
                  <View style={[this.marginSize(item), styles.dropDownContainer, BlackShadowForBlack()]}>
                    <DropDownItem key={item} contentVisible={false}
                      header={
                        <View style={styles.dropDownHeaderContainer}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.dropDownTitle}>
                              {ExportadorFrases.Dia(this.state.id_idioma)} {item}
                            </Text>
                          </View>
                          <AntDesign style={{ textAlign: 'center', marginRight: wp(3.3) }} name={"caretdown"} size={wp(3.3)} color={AzulPrincipal()} />
                        </View>
                      }
                    >
                      <FlatList
                        style={styles.contentList}
                        data={this.state.rutina.rutina}
                        initialNumToRender={50}
                        keyExtractor={(item) => {
                          return item.id_ejercicio.toString() + item.dia.toString();
                        }}
                        renderItem={({ item }) => {
                          if (item.dia == aux) {
                            if (item.tiempo == null) {
                              if (item.combinado != null) {
                                if (contadorCobinadosFlatlist) {
                                  contadorCobinadosFlatlist = false
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroSegundoCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre_ejercicio)}>

                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.musculosLogoContainer}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                        </View>
                                        <View style={{ flex: 1.7 }}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                } else {
                                  contadorCobinadosFlatlist = true
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroPrimerCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre_ejercicio)}>

                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.musculosLogoContainer}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                        </View>
                                        <View style={{ flex: 1.7 }}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                }
                              } else {
                                return (
                                  <TouchableOpacity style={styles.cuadraditosDeAdentro}
                                    onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre_ejercicio)}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <View style={styles.musculosLogoContainer}>
                                        <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                      </View>
                                      <View style={{ flex: 1.7 }}>
                                        <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                        <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                        <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
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
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre_ejercicio)}>

                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.musculosLogoContainer}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                        </View>
                                        <View style={{ flex: 1.7 }}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Tiempo(this.state.id_idioma)}:{"\n"}{item.tiempo}</Text>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                } else {
                                  contadorCobinadosFlatlist = true
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroPrimerCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre_ejercicio)}>

                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.musculosLogoContainer}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                        </View>
                                        <View style={{ flex: 1.7 }}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Tiempo(this.state.id_idioma)}:{"\n"}{item.tiempo}</Text>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                }
                              } else {
                                return (
                                  <TouchableOpacity style={styles.cuadraditosDeAdentro}
                                    onPress={() => this.props.onPressInfo(item.id_ejercicio, item.nombre_ejercicio)}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <View style={styles.musculosLogoContainer}>
                                        <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                      </View>
                                      <View style={{ flex: 1.7 }}>
                                        <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                        <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                        <Text style={styles.subsEjercicio}>{ExportadorFrases.Tiempo(this.state.id_idioma)}:{"\n"}{item.tiempo}</Text>
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
          <View style={styles.bannerContainer}>
            <AdMobBanner
              accessible={true}
              accessibilityLabel={"Banner"}
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
  bannerContainer: {
    height: height * 0.08,
    backgroundColor: 'black',
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
    width: width
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
  musculosLogoContainer: {
    flex: 0.3,
    margin: wp(2.5)
  },
  musculosLogo: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  dropDownTitle: {
    fontSize: wp(7),
    margin: 10,
    alignSelf: "center",
    color: AzulPrincipal(),
    fontWeight: 'bold'
  },
  dropDownContainer: {
    backgroundColor: 'black',
    marginHorizontal: 10, //paddingBottom: 10
  },
  dropDownHeaderContainer:{
    backgroundColor: 'black',
    alignItems: 'center',
    paddingHorizontal: wp("2"),
    flexDirection: "row"
  },
  cuadraditosDeAdentro: {
    borderWidth: 0,
    backgroundColor: 'grey',
    marginVertical: 5,
    marginTop: 2,
    paddingVertical: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  cuadraditosDeAdentroPrimerCombinado: {
    borderWidth: 0,
    backgroundColor: 'grey',
    marginTop: 5,
    marginTop: 2,
    paddingVertical: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  cuadraditosDeAdentroSegundoCombinado: {
    borderWidth: 0,
    backgroundColor: 'grey',
    marginBottom: 5,
    paddingVertical: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  nombreEjercicio: {
    fontWeight: 'bold',
    fontSize: wp(4),
    marginBottom: wp("1")
  },
  subsEjercicio: {
    fontSize: wp(3.5),
  },
  socialMedia: {
    color: "white",
    textDecorationLine: 'underline',
  },

  logoSocialMedia: {
    height: height * 0.044,
    width: height * 0.044,
    alignSelf: "center",
    marginRight: width * 0.033
  },
  socialMediaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02
  }
})

export default withNavigation(RutinaEspecifica);