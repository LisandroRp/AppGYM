import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorCreadores from './Fotos/ExportadorCreadores';
import ExportadorFrases from './Fotos/ExportadorFrases'
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
  AsyncStorage,
  Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

function createData(item, nombre) {
  return {
    id_rutina: item.id_rutina,
    nombre_rutina: nombre,
    modificable: item.modificable,
    rutina: [],
  };
}

class RutinasTipos extends Component {


  constructor(props) {
    super(props);
    this.state = {
      searchStatus: 'none',
      modalVisible: false,
      userSelected: [],
      rutinas: [],
      isLoading: true,
      generoEvento: [],
      idioma: {}
    };
  }

  componentDidMount(){
    base.traerIdioma(this.cargarRutinas.bind(this))
  }
  cargarRutinas = async (idioma) => {
    if (this.props.navigation.getParam('id_tipo') != null) {
      base.traerRutinas(await this.props.navigation.getParam('id_tipo'), idioma, this.okRutinas.bind(this))
    } else {
      base.traerRutinasPropias(idioma, this.okRutinas.bind(this))
    }
  }

  okRutinas(rutinasNueva, idioma) {

    this.setState({idioma: idioma, rutinas: rutinasNueva, isLoading: false });
    
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
    var aux = 0
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
      fav = 0
    } else {
      rutinas2[aux].favoritos = 1
      fav = 1
    }
    base.favoritearRutina(id_rutina, fav, this.okFavorito.bind(this))
  }

  okFavorito() {
    this.cargarRutinas(this.state.idioma)
  }

  favoritos(favoritos) {
    if (favoritos) {
      return ExportadorLogos.traerEstrella(true)
    }
    else {
      return ExportadorLogos.traerEstrella(false)
    }
  }
  favoritosLabel(favoritos) {
    if (favoritos) {
      return ExportadorFrases.FavoritosLabel(this.state.idioma.id_idioma)
    }
    else {
      return ExportadorFrases.FavoritosNoLabel(this.state.idioma.id_idioma)
    }
  }
  favoritosHint(favoritos) {
    if (favoritos) {
      return ExportadorFrases.FavoritosNoHint(this.state.idioma.id_idioma)
    }
    else {
      return ExportadorFrases.FavoritosHint(this.state.idioma.id_idioma)
    }
  }
  marginSize(item){
    if(item.id_rutina !=  this.state.rutinas[this.state.rutinas.length-1].id_rutina){
      return {marginTop: height * 0.02}
    }else{
      return {marginBottom: height * 0.02, marginTop: height * 0.02}
    }
  }
  crearDatosAEnviar(rutina, nombre_rutina){
    this.setState({isLoading: true})
    base.traerEjerciciosRutinaJoin(createData(rutina, nombre_rutina), this.enviar.bind(this))

  }
 enviar(rutina){
  this.props.onPressGo(rutina.id_rutina, rutina.nombre_rutina, rutina.modificable, rutina.rutina)
  this.setState({isLoading: false})
 }
 queNombreRutina(rutina){
  if(rutina.nombre_rutina == null){
    if(this.state.idioma.id_idioma == 1){
      return rutina.nombre_rutina_es
    }
    if(this.state.idioma.id_idioma == 2){
      return rutina.nombre_rutina_en
    }
  }else{
      return rutina.nombre_rutina
    }
 }
 creador(creador){
   if(creador == 'Propia'){
     return ExportadorFrases.Propia(this.state.idioma.id_idioma)
   }
   return creador
 }
 diaDias(dias, id_idioma){
   if(dias > 1){
     return ExportadorFrases.Dias(id_idioma)
   }
   else{
    return ExportadorFrases.Dia(id_idioma)
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
      if (this.state.rutinas.length == 0) {
        return (
          <View style={[styles.NoItemsContainer]}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <View style={styles.NoItems}>
              <Text style={styles.NoItemsText}>{ExportadorFrases.RutinasPropiasNo(this.state.idioma.id_idioma)}</Text>
            </View>
            <View style={styles.NoItemsImageContainer}>
              <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
              
            </View>
            <AdMobBanner
              accessible={true}
              accessibilityLabel={"Banner"}
              accessibilityHint={ExportadorFrases.BannerHint(this.state.idioma.id_idioma)}
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
              data={this.state.rutinas.sort((a, b) => {
                if(a.nombre_rutina != null && b.nombre_rutina != null ){
                  a.nombre_rutina.localeCompare(b.nombre_rutina)
                }else{
                  if(a.nombre_rutina == null){
                    if(this.state.idioma.id_idioma == 1){
                      a.nombre_rutina_es.localeCompare(b.nombre_rutina)
                    }else{
                      a.nombre_rutina_en.localeCompare(b.nombre_rutina)
                    }
                  }else{
                    if(this.state.idioma.id_idioma == 2){
                      a.nombre_rutina.localeCompare(b.nombre_rutina_es)
                    }else{
                      a.nombre_rutina.localeCompare(b.nombre_rutina_en)
                    }
                  }
                }
              })}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.id_rutina.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.crearDatosAEnviar(item, this.queNombreRutina(item))}>
                    <Image style={styles.image} source={ExportadorCreadores.queImagen(item.id_creador)} />
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{this.queNombreRutina(item)}</Text>
                      <Text style={styles.dias}>{item.dias} {this.diaDias(item.dias, this.state.idioma.id_idioma)}</Text>
                      <Text style={styles.dias}>{ExportadorFrases.Autor(this.state.idioma.id_idioma)}: {this.creador(item.nombre_creador)}</Text>
                    </View>
                    <View style={styles.ViewEstrella} >
                      <TouchableOpacity
                        accessible={true}
                        accessibilityLabel={this.favoritosLabel(item.favoritos)}
                        accessibilityHint={this.favoritosHint(item.favoritos)}
                        onPress={() => { this.favear(item.id_rutina) }}>
                        <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )
              }} />
              <View style={styles.bannerContainer}></View>
            <AdMobBanner
              accessible={true}
              accessibilityLabel={"Banner"}
              accessibilityHint={ExportadorFrases.BannerHint(this.state.idioma.id_idioma)}
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
    backgroundColor: "grey",
  },
  NoItemsContainer: {
    backgroundColor: 'grey',
    flex: 1,
  },
  NoItemsText: {
    alignSelf: "center",
    fontSize: height * 0.028,
    color: "#3399ff",
    textAlign: 'center'
  },
  NoItemsImageContainer: {
    height: height * 0.55,
    width: height * 0.50,
    marginBottom: height * 0.028,
    marginTop: height * 0.028,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: 'black',
    borderWidth: 4,
    borderRadius: 10,
  },

  NoItemsLogo: {
    height: height * 0.45,
    width: height * 0.45,
    alignSelf: "center",
    marginTop: hp(9),
    marginBottom: hp(6.6)
  },
  NoItems: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    opacity: .95,
    marginHorizontal: wp(5),
    marginTop: height * 0.028
  },
  bannerContainer: {
    height: height * 0.08,
    backgroundColor: 'black',
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center"
  },
  contentList: {
    paddingBottom:  height * 0.3
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
    justifyContent: 'center'
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
    flexDirection: 'row'
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