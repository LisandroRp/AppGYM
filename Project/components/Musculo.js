import React, { Component } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorEjercicios from './Fotos/ExportadorEjercicios';
import ExportadorFrases from './Fotos/ExportadorFrases';
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
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

class Musculo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      musculo: this.props.navigation.getParam('nombre_musculo'),
      id_idioma: 0,
      modalVisible: false,
      memory: [],
      ejercicios: [],
      isLoading: true,
    };
    this.cargarEjercicios();
  }

  //Trae los ejercicios especificios del musculo seleccionado en la screen anterior
  cargarEjercicios = async () => {
    base.traerEjercicios(await this.props.navigation.getParam('id_musculo'), this.okEjercicios.bind(this))
  }

  //Setea los ejercicios y renderiza la screen
  okEjercicios(ejercicios) {
    
    this.setState({
      ejercicios: ejercicios,
      id_idioma: ejercicios[0].id_idioma,
      memory: ejercicios,
      isLoading: false,
    });
  }

  esGenero(genero) {
    for (i = 0; i <= this.state.generoEvento.length; i++) {
      if (this.state.generoEvento[i] == genero) {
        return true
      }
    }
    return false
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

  searchEjercicio = value => {
    const filterDeEjercicios = this.state.memory.filter(ejercicio => {
      let ejercicioLowercase = (
        ejercicio.nombre_musculo +
        ' ' +
        ejercicio.nombre_ejercicio +
        ' ' +
        ejercicio.nombre_elemento
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return ejercicioLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ ejercicios: filterDeEjercicios });
    this.setState({ value })
  };

  favear(id_ejercicio) {
    var i = 0
    var fav
    var aux = 0
    var ejercicios2 = []
    while (i < this.state.ejercicios.length) {
      if (this.state.ejercicios[i].id_ejercicio == id_ejercicio) {
        aux = i
      }
      ejercicios2.push(this.state.ejercicios[i])
      i++
    }
    if (ejercicios2[aux].favoritos) {
      ejercicios2[aux].favoritos = 0
      fav = 0
    } else {
      ejercicios2[aux].favoritos = 1
      fav = 1
    }
    base.favoritearEjercicio(id_ejercicio, fav, this.okFavorito.bind(this))
  }

  okFavorito() {
    this.cargarEjercicios()
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
  marginSize(item){
    if(item.id_ejercicio !=  this.state.ejercicios[this.state.ejercicios.length-1].id_ejercicio){
      
      return {marginTop: height * 0.028}
    }else{
      return {marginBottom: height * 0.028, marginTop: height * 0.028}
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
              placeholder= {ExportadorFrases.Search(this.state.id_idioma)+"..."}
              platform='ios'
              onChangeText={value => this.searchEjercicio(value)}
              value={this.state.value}
              inputContainerStyle={{ backgroundColor: 'grey' }}
              placeholderTextColor='black'
              containerStyle={{ backgroundColor: 'black' }}
              buttonStyle={{}}
              searchIcon={{ color: 'black' }}
            />
          </View>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.ejercicios.sort((a, b) => a.nombre_ejercicio.localeCompare(b.nombre_ejercicio))}
            initialNumToRender={50}
            keyExtractor={(item) => {
              return item.id_ejercicio.toString();
            }}
            renderItem={({ item }) => {
              return (
                <View>
                <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.props.onPressGo(item.id_ejercicio, item.nombre_ejercicio,this.state.id_idioma, item.modificable)}>
                  <View style={{ flexDirection: "row" }} >
                    <Image style={styles.image} source={ExportadorEjercicios.queMusculo(item.id_musculo)} />
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.nombre_ejercicio}</Text>
                      <Text style={styles.elemento}>{item.nombre_elemento}</Text>
                    </View>
                    <View style={styles.ViewEstrella} >
                      <TouchableOpacity
                        accessible={true}
                        accessibilityLabel={this.favoritosLabel(item.favoritos)}
                        accessibilityHint={this.favoritosHint(item.favoritos)}
                        onPress={() => { this.favear(item.id_ejercicio) }}>
                        <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
                </View>
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
    backgroundColor: "grey"
  },
  contentList: {
    flex: 1,
  },
  bannerContainer: {
    height: height * 0.08,
    backgroundColor: 'black',
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
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
    //marginBottom: height * 0.028,
    backgroundColor: "black",
    padding: 10,
    flexDirection: 'row',
  },

  name: {
    fontSize: height * 0.028,
    color: "#3399ff",
    fontWeight: 'bold'
  },

  elemento: {
    marginTop: 1,
    fontSize: height * 0.02,
    color: "white"
  },

  StarImage: {
    width: hp(5.5),
    height: hp(5.5),
  },
  ViewEstrella: {
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: wp("5")
  }
})

export default withNavigation(Musculo);