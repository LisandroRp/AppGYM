import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import base from './GenerarBase';
import ExportadorSuplementacion from './Fotos/ExportadorSuplementacion';
import ExportadorFrases from './Fotos/ExportadorFrases';
import { BlackShadowForBlack } from './Estilos/Shadows'
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
  Keyboard,
  ActivityIndicator,
  Dimensions,
  ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import * as Font from 'expo-font';
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
      isLoadingFont: true,
      id_idioma: 0
    };
    this.cargarSuplementos();
    this.loadFont()
  }
  cargarSuplementos = async () => {
    base.traerSuplementos(await this.props.navigation.getParam('id_suplemento'), this.okSuplementos.bind(this))
  }
  loadFont = async () => {
    await Font.loadAsync({
      'font1': require('../assets/fonts/BebasNeue-Regular.ttf'),
      'font2': require('../assets/fonts/BebasNeue-Bold.ttf'),
    });
    this.setState({ isLoadingFont: false })
  }
  okSuplementos(suplementos, id_idioma) {
    this.setState({
      suplementos: suplementos,
      id_idioma: id_idioma,
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
      return ExportadorFrases.FavoritosLabel(this.state.id_idioma)
    }
    else {
      return ExportadorFrases.FavoritosNoLabel(this.state.id_idioma)
    }
  }
  favoritosHint(favoritos) {
    if (favoritos) {
      return ExportadorFrases.FavoritosNoHint(this.state.id_idioma)
    }
    else {
      return ExportadorFrases.FavoritosHint(this.state.id_idioma)
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
    if (this.state.isLoadingFont || this.state.isLoading) {
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
          <View style={BlackShadowForBlack()} >
            <SearchBar
              placeholder={ExportadorFrases.Search(this.state.id_idioma) + '...'}
              platform='ios'
              onChangeText={value => this.searchSuplementos(value)}
              value={this.state.value}
              inputContainerStyle={{ backgroundColor: 'grey' }}
              placeholderTextColor='black'
              containerStyle={{ backgroundColor: 'black', paddingBottom: 22 }}
              buttonStyle={{ marginBottom: 30 }}
              searchIcon={{ color: 'black' }}
            />
          </View>
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
                    <TouchableOpacity onPress={() => { this.favear(item.id_suplemento) }}>
                      <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )
            }
            } />
          <View style={styles.bannerContainer}></View>
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
    flex: 1,
    backgroundColor: "black",
    marginHorizontal: wp(2),
    flexDirection: 'row'
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0.5,
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
    fontSize: wp(3.7),
    textTransform: 'uppercase',
    color: "#2A73E0",
    letterSpacing: wp(0.5),
    padding: 1,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.1
  },

  name: {
    fontSize: wp(5),
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
  }
})

export default withNavigation(SuplementacionTipos);