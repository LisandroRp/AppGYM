import React, { Component } from 'react';
import ApiController from '../controller/ApiController'
import { SearchBar, Icon } from 'react-native-elements';
import base from './GenerarBase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
  };
}

class Favoritos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      modalVisible: false,
      suplementos: [],
      isLoading: false,
    };
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />

                  <TouchableOpacity style={styles.card} nextFocusForward={true} onPress={() => this.props.onPressGoRutinas()}>
                      <Text style={styles.name}>Rutinas</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.card} nextFocusForward={true} onPress={() => this.props.onPressGoSuplementos()}>
                        <Text style={styles.name}>Suplementacion</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.card} nextFocusForward={true} onPress={() => this.props.onPressGoEjercicios()}>
                        <Text style={styles.name}>Ejercicios</Text>
                  </TouchableOpacity>
                  
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
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    height: hp("29.5"),
    backgroundColor: "black",
    //padding: 10,
    paddingHorizontal: wp("2"),
    paddingVertical: hp("1"),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white"
  },

  name: {
    fontSize: 22,
    //flex: 1,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },

})

export default Favoritos;