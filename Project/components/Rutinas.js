import React, { Component } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import base from './GenerarBase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import  * as FileSystem from 'expo-file-system';

class Rutinas extends Component {


  constructor(props) {
    super(props);
    this.state = {
      //IdUser: props.navigation.getParam('IdUser'),
      searchStatus: 'none',
      Status: 'none',
      modalVisible: false,
      userSelected: [],
      // rutinas: [{ id: 1, nombre: 'Arnold N1', imagen: require('./Fotos/PECHO.png'), dias: 7, fav: 1,modificable:false },
      // { id: 2, nombre: 'La Roca', imagen: require('./Fotos/ESPALDA.png'), dias: 6, fav: 1,modificable:true },
      // { "id": 3, "nombre": 'Vin Disell', "imagen": require('./Fotos/HOMBROS.png'), dias: 5, fav: 1,modificable:true },
      // { id: 4, nombre: 'Wachiturro', imagen: require('./Fotos/PIERNAS.png'), dias: 1, fav: 0,modificable:true },
      // { id: 5, nombre: 'Navy SEAL', imagen: require('./Fotos/BICEPS.png'), dias: 15, fav: 0,modificable:true },],
      rutinas:[],
      isLoading: true,
      generoEvento: [],
    };
    this.Star = require('./Logos/Star_Llena.png');
    this.Star_With_Border = require('./Logos/Star_Borde.png');
    //this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.Star_With_Border = 'https://img.icons8.com/color/96/000000/star.png';
    //this.Star = 'https://img.icons8.com/color/96/000000/christmas-star.png';
    this.cargarRutinas();
  }

  cargarRutinas = async () => {
    base.traerRutinas(this.okRutinas.bind(this))
  }
  okRutinas(rutinas){
    this.setState({ rutinas: rutinas, isLoading: false });
    console.log(rutinas)
  }
  
  _storeData = async (id) => {
    try {
      await AsyncStorage.setItem('rutinaEditable', id);
    } catch (error) {
      console.log(error);
    }
  };
  esGenero(genero) {
    for (i = 0; i <= this.state.generoEvento.length; i++) {
      if (this.state.generoEvento[i] == genero) {
        return true
      }
    }
    return false
  }
  favear(id) {
    var i = 0
    aux = 0
    rutinas2 = []
    while (i < this.state.rutinas.length) {
      if (this.state.rutinas[i].id == id) {
        aux = i
        console.log(aux)
      }
      rutinas2.push(this.state.rutinas[i])
      i++
    }
    if (rutinas2[aux].fav == 1) {
      rutinas2[aux].fav = 0
    } else {
      rutinas2[aux].fav = 1
    }
    this.setState({ rutinas: rutinas2 })
    //Rutinas2.setState(rutinas2)        
    this.termino()
    
  }
  termino() {
    this.setState({ isLoading: false })
  }

  render() {
    if (this.state.isLoading) {
      return (
        //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
        //<View style={styles.container}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
        //</View>
        // </LinearGradient>
      );
    } else {
      return (
        //<View style={styles.container}>
        <LinearGradient colors={['black', 'grey']} style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <ScrollView>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.rutinas}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.nombre;
              }}
              renderItem={({ item }) => {
                if (item.fav == 1) {
                  return (
                    // <TouchableOpacity style={styles.card} onPress={() => {this.props.onPressGo(item.id, item.nombre, item.modificable),this._storeData(item.id)}}>
                    <TouchableOpacity style={styles.card} onPress={() => {this.props.onPressGo(item.id, item.nombre, item.modificable)}}>
                      <View style={{ flexDirection: "row" }} >
                        <Image style={styles.image} source={{uri: item.imagen}} />
                        <View style={styles.cardContent}>
                          <Text style={styles.name}>{item.nombre}</Text>
                          <Text style={styles.descripcion}>{item.dias} Dias</Text>
                          {/* <Text style={styles.count}>{item.ubicacion}</Text>
                        <Text style={{ fontSize: 11 }}>Entrada General: {item.precioE}$</Text> */}
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: "center" }} >
                          <TouchableOpacity onPress={() =>{ this.setState({ isLoading: true }), this.favear(item.id)}}>
                            <Image style={styles.StarImage} source={ this.Star } />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }
                else {
                  return (
                    <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id, item.nombre)}>
                      <View style={{ flexDirection: "row" }} >
                        <Image style={styles.image} source={item.imagen} />
                        <View style={styles.cardContent}>
                          <Text style={styles.name}>{item.nombre}</Text>
                          <Text style={styles.descripcion}>{item.dias} Dias</Text>
                          {/* <Text style={styles.count}>{item.ubicacion}</Text>
                        <Text style={{ fontSize: 11 }}>Entrada General: {item.precioE}$</Text> */}
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: "center" }} >
                          <TouchableOpacity onPress={() => { this.setState({ isLoading: true }), this.favear(item.id)}}>
                            <Image style={styles.StarImage} source={this.Star_With_Border } />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }
              }} />
          </ScrollView>
        </LinearGradient>
        //</View>
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
    marginLeft: 20,
    marginTop: 10,
    width: 180,
    flexDirection: "column"
  },
  image: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: "#ebf0f7"
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
    paddingTop: 12,
    fontSize: 18,
    flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  descripcion: {
    fontSize: 15,
    marginTop: 5,
    //flex: 1,
    color: "white",
  },
  count: {
    fontSize: 14,
    paddingBottom: 11,
    flex: 1,
    //alignSelf: 'center',
    color: "#6666ff"
  },
  StarImage: {
    width: wp("10%"),
    height: hp("5%"),
    resizeMode: 'cover',
  },
})

export default withNavigation(Rutinas);