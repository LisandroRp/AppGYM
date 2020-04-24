import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  Dimensions
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AdMobBanner, setTestDeviceIDAsync} from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

class RutinasTipos extends Component {


  constructor(props) {
    super(props);
    this.state = {
      searchStatus: 'none',
      modalVisible: false,
      userSelected: [],
      rutinas:[],
      isLoading: true,
      generoEvento: [],
    };
    this.cargarRutinas();
  }

  cargarRutinas = async () => {
    if(await this.props.navigation.getParam('tipo_rutina') != "Propias"){
        base.traerRutinas(await this.props.navigation.getParam('tipo_rutina'), this.okRutinas.bind(this))
    }else{
        base.traerRutinasPropias(this.okRutinas.bind(this))
    }
  }
  okRutinas(rutinas){
    this.setState({ rutinas: rutinas, isLoading: false });
  }
  
  _storeData = async (id_rutina) => {
    try {
      await AsyncStorage.setItem('rutinaEditable', id_rutina);
    } catch (error) {
    }
  };

  favear(id_rutina) {
    var i = 0
    var fav
    aux = 0
    var rutinas2 = []
    while (i < this.state.rutinas.length) {
      if (this.state.rutinas[i].id_rutina == id_rutina) {
        aux = i
      }
      rutinas2.push(this.state.rutinas[i])
      i++
    }
    if (rutinas2[aux].favoritos) {
      rutinas2[aux].favoritos = 0
      fav= 0
    } else {
      rutinas2[aux].favoritos = 1
      fav= 1
    }
    //this.setState({ rutinas: rutinas2 })   
    base.favoritearRutina(id_rutina, fav, this.okFavorito.bind(this))  
  }

  okFavorito() {
    this.cargarRutinas()
    //this.setState({ isLoading: false })
  }

  favoritos(favoritos){
    if(favoritos){
      return ExportadorLogos.traerEstrella(true)
    }
    else{
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
      if(this.state.rutinas.length == 0){
        return(
        <View style={[styles.NoItemsContainer]}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <View style={styles.NoItemsImageContainer}>
                        <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
                    </View>
                    <View style={styles.NoItems}>
                        <Text style={styles.NoItemsText}>Ups! {"\n"} No hay ninguna Rutina Propia</Text>
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
              data={this.state.rutinas.sort((a,b) => a.nombre.localeCompare(b.nombre))}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.nombre.toString();
              }}
              renderItem={({ item }) => {
                  return (
                    <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_rutina, item.nombre,item.modificable)}>
                        <View style={styles.cardContent}>
                          <Text style={styles.name}>{item.nombre}</Text>
                          <Text style={styles.dias}>{item.dias} Dias</Text>
                      </View> 
                      <View style={styles.ViewEstrella} >
                          <TouchableOpacity onPress={() => {this.favear(item.id_rutina)}}>
                            <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                          </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                  )
              }} />
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
    backgroundColor: "grey"
  },
  NoItemsContainer: {
    backgroundColor: 'grey',
    flex: 1,
    alignItems: "center"
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
    marginTop: hp(8)
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
    marginVertical: hp(6)
},
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
  },
  contentList: {
    flex: 1,
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
    color: "#3399ff",
    fontWeight: 'bold'
  },
  dias: {
    fontSize: height * 0.02,
    marginTop: 5,
    color: "white",
  },
  StarImage: {
    width: hp(5.5),
    height: hp(5.5),
    alignSelf: "center"
  },
  ViewEstrella: {
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: wp("5"),
    position: "absolute",
    right: 0,
  }
})

export default withNavigation(RutinasTipos);