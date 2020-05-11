import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorSuplementacion from './Fotos/ExportadorSuplementacion';
import ExportadorAds from './Fotos/ExportadorAds';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

class SuplementacionTipos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      modalVisible: false,
      suplementos: [],
      isLoading: true,
    };
    this.cargarSuplementos();
  }
  cargarSuplementos = async () => {
    base.traerSuplementos(await this.props.navigation.getParam('tipo_suplementacion'), this.okSuplementos.bind(this))
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
    base.favoritearSuplemento(id_suplemento, fav, this.okFavorito.bind(this))
  }

  okFavorito() {
    this.cargarSuplementos()
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
      return "Favorito"
    }
    else {
      return "No Favorito"
    }
  }
  favoritosHint(favoritos) {
    if (favoritos) {
      return "Sacar de Favoritos este Suplemento"
    }
    else {
      return "Agregar este Suplemento a favoritos"
    }
  }
  marginSize(item){
    if(item.id_suplemento !=  this.state.suplementos[this.state.suplementos.length-1].id_suplemento){
      return {marginTop: height * 0.02}
    }else{
      return {marginBottom: height * 0.02, marginTop: height * 0.02}
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
          <View>
            <SearchBar
              placeholder="Search..."
              platform='ios'
              onChangeText={value => this.searchSuplementos(value)}
              value={this.state.value}
              inputContainerStyle={{ backgroundColor: 'grey' }}
              placeholderTextColor='black'
              containerStyle={{ backgroundColor: 'black', height: 50, paddingBottom: 22 }}
              buttonStyle={{ marginBottom: 30 }}
              searchIcon={{ color: 'black' }}
            />
          </View>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.suplementos.sort((a, b) => a.nombre.localeCompare(b.nombre))}
            initialNumToRender={50}
            keyExtractor={(item) => {
              return item.id_suplemento;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.props.onPressGo(item.id_suplemento, item.nombre)}>
                  <View style={{ flexDirection: "row" }} >
                    <Image style={styles.image} source={ExportadorSuplementacion.queSuplementacion(item.tipo)} />
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.nombre}</Text>
                      <Text style={styles.marca}>{item.marca}</Text>
                    </View>
                    <View style={styles.ViewEstrella} >
                      <TouchableOpacity onPress={() => { this.favear(item.id_suplemento) }}>
                        <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
            } />
            <View style={styles.bannerContainer}></View>
          <AdMobBanner
            accessible={true}
            accessibilityLabel={"Add Banner"}
            accessibilityHint={"Navega al Anuncio"}
            style={styles.bottomBanner}
            adUnitID={ExportadorAds.Banner()}
            useEffect={setTestDeviceIDAsync('EMULATOR')}
            onDidFailToReceiveAdWithError={err => {
              console.log(err)
            }}
            onAdViewDidReceiveAd={() => {
              console.log("Ad Recieved");
            }}
            adViewDidReceiveAd={(e) => { console.log('adViewDidReceiveAd', e) }}
          //didFailToReceiveAdWithError={this.bannerError()}
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
    backgroundColor: "black"
  },
  bannerContainer: {
    height: height * 0.08,
    backgroundColor: 'black',
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    height: height * 0.08
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
    flexDirection: 'row'
  },

  name: {
    fontSize: height * 0.028,
    color: "#3399ff",
    fontWeight: 'bold'
  },
  marca: {
    fontSize: height * 0.02,
    color: "white"
  },
  StarImage: {
    width: hp(5.5),
    height: hp(5.5),
    paddingHorizontal: wp("5"),
  },
  ViewEstrella: {
    alignItems: "center",
    alignContent: 'center',
    justifyContent: 'center',
  }
})

export default withNavigation(SuplementacionTipos);