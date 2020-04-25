import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
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
  Modal
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
import {AdMobBanner, setTestDeviceIDAsync} from 'expo-ads-admob';

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
      nombre: ""
    };
    this.cargarSuplementosFavoritos();
  }
  cargarSuplementosFavoritos = async () => {
    base.traerSuplementosFavoritas(this.okSuplementos.bind(this))
  }
  okSuplementos(suplementos) {
    this.setState({
      suplementos: suplementos,
      memory: suplementos,
      isLoading: false,
    });
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
        suplemento.nombre +
        ' ' +
        suplemento.descripcion +
        ' ' +
        suplemento.genero +
        ' ' +
        suplemento.tipo
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return suplementoLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ suplementos: filterDeSuplementos });
    this.setState({ value })
  };

  modalVisible(id, nombre) {
    this.setState({id_suplemento: id, nombre: nombre, modalVisible: true })
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
    this.setState({modalVisible: false})
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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      if(this.state.suplementos.length == 0){
        return(
        <View style={[styles.NoItemsContainer]}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <View style={styles.NoItems}>
                        <Text style={styles.NoItemsText}>Ups! {"\n"} No hay Suplementos agregados a tu lista</Text>
                    </View>
                    <View style={styles.NoItemsImageContainer}>
                        <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
                    </View>
                    <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID= {ExportadorAds.Banner()}
          useEffect  = {setTestDeviceIDAsync('EMULATOR')}
          onDidFailToReceiveAdWithError={err => {
            console.log(err)
          }}
          onAdViewDidReceiveAd={() => {
            console.log("Ad Recieved");
          }}
          adViewDidReceiveAd={ (e) => { console.log('adViewDidReceiveAd', e) } }
          //didFailToReceiveAdWithError={this.bannerError()}
        />
                </View>      
        );
    }else{
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.suplementos.sort((a,b) => a.nombre.localeCompare(b.nombre))}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.id_suplemento.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_suplemento, item.nombre)}>
                    <View style={{ flexDirection: "row" }} >
                      <Image style={styles.image} source={{ uri: item.imagen }} />
                      <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.nombre}</Text>
                        <Text style={styles.marca}>{item.marca}</Text>
                      </View>
                      <View style={styles.ViewEstrella} >
                        <TouchableOpacity onPress={() => { this.modalVisible(item.id_suplemento, item.nombre) }}>
                          <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                        </TouchableOpacity>
                      </View>
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

                <View style={{ flexDirection: 'column', marginTop: height * 0.05, marginHorizontal: width * 0.05 }}>
                  <Text style={styles.textButton}>Desea sacar el suplemento "{this.state.nombre}" de su lista de favoritos</Text>
                </View>
                <View style={styles.modal2}>

                  <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                    <Text style={styles.textButton}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.favear(this.state.id_suplemento)} style={styles.modalButtonAceptar}>
                    <Text style={styles.textButton}>Aceptar</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>
            
            <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID= {ExportadorAds.Banner()}
          useEffect  = {setTestDeviceIDAsync('EMULATOR')}
          onDidFailToReceiveAdWithError={err => {
            console.log(err)
          }}
          onAdViewDidReceiveAd={() => {
            console.log("Ad Recieved");
          }}
          adViewDidReceiveAd={ (e) => { console.log('adViewDidReceiveAd', e) } }
          //didFailToReceiveAdWithError={this.bannerError()}
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
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
  },
  contentList: {
    flex: 1,
  },
  NoItemsContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "grey"
},
NoItemsText: {
    alignSelf: "center",
    fontSize: height *0.028,
    color: "#3399ff",
    textAlign: 'center'
},
NoItemsImageContainer: {
    height: height * 0.55,
    width: height * 0.50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 4,
    borderRadius: 10,
},

NoItemsLogo: {
    height: height * 0.45,
    width: height * 0.45,
    marginTop: hp(9),
    marginBottom: hp(6.6)
},
NoItems: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    opacity: .95,
    marginHorizontal: wp(5),
    marginVertical: hp(3)
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
    flexDirection: 'row'
  },

  name: {
    fontSize: height * 0.028,
    color: "#3399ff",
    fontWeight: 'bold'
  },
  marca: {
    fontSize: height * 0.02,
    marginTop: 5,
    color: "white"
  },
  StarImage: {
    width: hp(5.5),
    height: hp(5.5)
  },
  ViewEstrella: {
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: wp("5")
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
  fontWeight: 'bold'
},
modalButtonCancelar: {
  width: width * 0.37,
  height: height * 0.0775,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'grey',
  borderRadius: 22
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
}
})

export default SuplementacionFavs;