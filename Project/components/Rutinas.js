import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
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

class Rutinas extends Component {

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

                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGoRutinas("Musculacion")}>
                      <Text style={styles.name}>Musculacion</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGoRutinas("Aeróbico")}>
                        <Text style={styles.name}>Aeróbico</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGoRutinas("Propias")}>
                        <Text style={styles.name}>Propias</Text>
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
    padding: 10,
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

export default Rutinas;