import React, { Component } from 'react';
import { SearchBar} from 'react-native-elements';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorSuplementacion from './Fotos/ExportadorSuplementacion'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';


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
  okSuplementos(suplementos){
    this.setState({
      suplementos: suplementos,
      memory: suplementos,
      isLoading: false,
    });
    console.log(suplementos)
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
    aux = 0
    suplementos2 = []
    while (i < this.state.suplementos.length) {
      if (this.state.suplementos[i].id_suplemento == id_suplemento) {
        aux = i
      }
      suplementos2.push(this.state.suplementos[i])
      i++
    }
    if (suplementos2[aux].favoritos) {
      suplementos2[aux].favoritos = 0
      fav= 0
    } else {
      suplementos2[aux].favoritos = 1
      fav= 1
    }
    base.favoritearSuplemento(id_suplemento, fav, this.okFavorito.bind(this))  
  }

  okFavorito() {
    this.cargarSuplementos()
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
          <ScrollView>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.suplementos}
              initialNumToRender={50}
              keyExtractor= {(item) => {
                return item.id_suplemento;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_suplemento, item.nombre)}>
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
    backgroundColor: "black"
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
    marginLeft: 20,
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

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    flexDirection: 'row',
  },

  name: {
    fontSize: 20,
    //flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  marca: {
    fontSize: 15,
    // color: "#6666ff"
    color: "white"
  },
  StarImage: {
    width: hp(5.5),
    height: hp(5.5),
    //resizeMode: 'cover',
  },
  ViewEstrella: {
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: wp("5")
  }
})

export default withNavigation(SuplementacionTipos);