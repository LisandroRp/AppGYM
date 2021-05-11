import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorFrases from './Fotos/ExportadorFrases';
import { BlackShadowForBlack, BlackShadow } from './Estilos/Styles'
import ExportadorSuplementacion from './Fotos/ExportadorSuplementacion';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
  Dimensions,
  Modal,
  ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

class SuplementacionFavs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      modalVisible: false,
      suplementos: [],
      isLoading: true,
      id_suplemento: '',
      nombre_suplemento: "",
      id_idioma: 0
    };
    this.cargarSuplementosFavoritos();
  }
  cargarSuplementosFavoritos = async () => {
    base.traerSuplementosFavoritas(this.okSuplementos.bind(this))
  }
  okSuplementos(suplementos, id_idioma) {

    if (suplementos.length == 0) {

      this.setState({ suplementos: suplementos });
      base.traerIdIdioma(this.okIdIdioma.bind(this))

    } else {
      this.setState({
        suplementos: suplementos,
        id_idioma: suplementos[0].id_idioma,
        isLoading: false
      });
    }
  }
  okIdIdioma(id_idioma) {
    this.setState({ id_idioma: id_idioma, isLoading: false });
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

  searchSuplementos = value => {
    const filterDeSuplementos = this.state.memory.filter(suplemento => {
      let suplementoLowercase = (
        suplemento.nombre_suplemento +
        ' ' +
        suplemento.marca +
        ' ' +
        suplemento.sabores
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return suplementoLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ suplementos: filterDeSuplementos });
    this.setState({ value })
  };

  modalVisible(id, nombre_suplemento) {
    this.setState({ id_suplemento: id, nombre_suplemento: nombre_suplemento, modalVisible: true })
  }
  favear(id_suplemento) {
    var i = 0
    var fav
    var aux = 0
    var suplementos2 = []
    while (i < this.state.suplementos.length) {
      if (this.state.suplementos[i].id_suplemento == id_suplemento) {
        aux = i
      }
      suplementos2.push(this.state.suplementos[i])
      i++
    }
    if (suplementos2[aux].favoritos) {
      suplementos2[aux].favoritos = 0
      fav = 0
    } else {
      suplementos2[aux].favoritos = 1
      fav = 1
    }
    this.setState({ modalVisible: false })
    base.favoritearSuplemento(id_suplemento, fav, this.okFavorito.bind(this))
  }

  okFavorito() {
    this.cargarSuplementosFavoritos()
  }

  favoritos(favoritos) {
    if (favoritos) {
      return ExportadorLogos.traerEstrella(true)
    }
    else {
      return ExportadorLogos.traerEstrella(false)
    }
  }
  marginSize(item) {
    if (item.id_suplemento != this.state.suplementos[this.state.suplementos.length - 1].id_suplemento) {
      return { marginTop: hp(2) }
    } else {
      return { marginBottom: hp(2), marginTop: hp(2) }
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
      if (this.state.suplementos.length == 0) {
        return (
          <View style={[styles.NoItemsContainer]}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <View style={[styles.NoItemsTextContainer, BlackShadowForBlack()]}>
              <Text style={styles.NoItemsText}>{ExportadorFrases.SuplementosNo(this.state.id_idioma)}</Text>
            </View>
            <View style={[styles.NoItemsImageContainer, BlackShadowForBlack()]}>
              <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
            </View>
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
        );
      } else {
        return (
          <View style={styles.container}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.suplementos.sort((a, b) => a.nombre_suplemento.localeCompare(b.nombre_suplemento))}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.id_suplemento.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={[this.marginSize(item), styles.card, BlackShadowForBlack()]} onPress={() => this.props.onPressGo(item.id_suplemento, item.nombre_suplemento)}>
                    <View style={styles.imageContainer}>
                      <ImageBackground style={styles.image} source={ExportadorSuplementacion.default(this.state.id_idioma)}>
                        <Text style={[styles.textImage, { fontFamily: 'font2' }]} >{item.nombre_tipo}</Text>
                      </ImageBackground>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.nombre_suplemento}</Text>
                      <Text style={styles.marca}>{item.marca}</Text>
                    </View>
                    <View style={styles.ViewEstrella} >
                      <TouchableOpacity onPress={() => { this.modalVisible(item.id_suplemento, item.nombre_suplemento) }}>
                        <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )
              }
              } />
            <View style={styles.bannerContainer}></View>
            <Modal
              animationType="fade"
              visible={this.state.modalVisible}
              transparent={true}
              onRequestClose={() => this.setState({ modalVisible: false })}  >

              <View style={[styles.modal, BlackShadow()]}>

                <View style={{ flexDirection: 'column', marginVertical: height * 0.03, marginHorizontal: width * 0.05 }}>
                  <Text style={styles.textButton}>{ExportadorFrases.SacarSuplementoFavs1(this.state.id_idioma)} "{this.state.nombre_suplemento}" {ExportadorFrases.SacarSuplementoFavs2(this.state.id_idioma)}?</Text>
                </View>
                <View style={styles.modal2}>

                  <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                    <Text style={styles.textButton}>{ExportadorFrases.Cancelar(this.state.id_idioma)}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.favear(this.state.id_suplemento)} style={styles.modalButtonAceptar}>
                    <Text style={styles.textButton}>{ExportadorFrases.Aceptar(this.state.id_idioma)}</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>

            <AdMobBanner
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
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "black"
  },
  bannerContainer: {
    height: height * 0.08,
    backgroundColor: 'black',
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
  contentList: {
    flex: 1,
  },
  NoItemsContainer: {
    backgroundColor: 'grey',
    justifyContent: "center",
    flex: 1
  },
  NoItemsTextContainer: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: hp(1),
    opacity: .95,
    marginHorizontal: wp(5),
    marginBottom: height * 0.028
  },

  NoItemsText: {
    alignSelf: "center",
    fontSize: wp(5),
    color: "#3399ff",
    textAlign: 'center'
  },
  NoItemsImageContainer: {
    flex: 0.7,
    paddingHorizontal: wp(5),
    marginHorizontal: wp(5),
    borderRadius: hp(1),
    margin: wp(2.5),
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: height * 0.08,
  },

  NoItemsLogo: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
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
  shadow: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "black",
    marginHorizontal: wp(2),
    flexDirection: 'row'
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0.4,
    height: wp(22),
    width: wp(22),
    margin: wp(2.5),
    alignItems: 'center',
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: wp(22),
    width: wp(22),
    borderWidth: 1.5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    resizeMode: 'stretch',
    overflow: 'hidden'
  },
  textImage: {
    textAlign: 'center',
    fontSize: wp(4),
    textTransform: 'uppercase',
    color: "#2A73E0",
    letterSpacing: wp(0.5),
    padding: 1,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.1
  },
  name: {
    fontSize: wp(4.4),
    color: "#3399ff",
    fontWeight: 'bold'
  },
  marca: {
    marginTop: 1,
    fontSize: wp(3.5),
    color: "white"
  },
  StarImage: {
    width: hp(4.5),
    height: hp(4.5),
  },
  ViewEstrella: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: "center",
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
  modal2: {
    flexDirection: 'row',
    borderColor: 'black',
    borderTopWidth: 2,
    width: width * 0.74,
    height: hp(6),
    position: 'absolute',
    bottom: 0,
    opacity: .95
  },
  textButton: {
    color: 'white',
    fontSize: wp(3.8),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
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
  }
})

export default SuplementacionFavs;