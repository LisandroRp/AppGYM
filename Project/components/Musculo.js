import React, { Component } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorEjercicios from './Fotos/ExportadorEjercicios';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

function createData(item) {
  return {
    key: item._id,
    idEvento: item._id,
    imagen: item.imagen,
    nombre: item.nombre,
    rating: item.rating,
    descripcion: item.descripcion,
    tipo: item.tipo,
    ubicacion: item.ubicacion,
    precioE: item.precioE,
    genero: item.genero,
  };
}

class Musculo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      musculo: this.props.navigation.getParam('musculo'),
      modalVisible: false,
      memory:[],
      ejercicios: [],
      isLoading: true,
    };
    
    this.cargarEjercicios();
  }

  //Trae los ejercicios especificios del musculo seleccionado en la screen anterior
  cargarEjercicios = async () => {
    base.traerEjercicios(await this.props.navigation.getParam('musculo'), this.okEjercicios.bind(this))
  }

  //Setea los ejercicios y renderiza la screen
  okEjercicios(ejercicios){
    this.setState({
      ejercicios: ejercicios,
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
        ejercicio.nombre +
        ' ' +
        ejercicio.id_ejercicio +
        ' ' +
        ejercicio.genero +
        ' ' +
        ejercicio.tipo +
        ' ' +
        ejercicio.elemento
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
    aux = 0
    ejercicios2 = []
    while (i < this.state.ejercicios.length) {
      if (this.state.ejercicios[i].id_ejercicio == id_ejercicio) {
        aux = i
      }
      ejercicios2.push(this.state.ejercicios[i])
      i++
    }
    if (ejercicios2[aux].favoritos) {
      ejercicios2[aux].favoritos = 0
      fav= 0
    } else {
      ejercicios2[aux].favoritos = 1
      fav= 1
    }
    base.favoritearEjercicio(id_ejercicio, fav, this.okFavorito.bind(this))  
  }

  okFavorito() {
    this.cargarEjercicios()
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
              onChangeText={value => this.searchEjercicio(value)}
              value={this.state.value}
              inputContainerStyle={{ backgroundColor: 'grey' }}
              placeholderTextColor='black'
              containerStyle={{ backgroundColor: 'black'}}
              buttonStyle={{}}
              searchIcon={{ color: 'black' }}
            />
          </View>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.ejercicios.sort((a,b) => a.nombre.localeCompare(b.nombre))}
            initialNumToRender={50}
            keyExtractor={(item) => {
              return item.id_ejercicio.toString();
            }}
            renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_ejercicio, item.nombre, item.descripcion, item.modificable)}>
                    <View style={{ flexDirection: "row" }} >
                      <Image style={styles.image} source={ExportadorEjercicios.queMusculo(item.musculo)} />
                      <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.nombre}</Text>
                        <Text style={styles.elemento}>{item.elemento}</Text>
                      </View>
                      <View style={styles.ViewEstrella} >
                        <TouchableOpacity onPress={() => { this.favear(item.id_ejercicio) }}>
                          <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            }
            } />
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
    //flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },

  elemento: {
    marginTop:1,
    fontSize: height * 0.02,
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

export default withNavigation(Musculo);