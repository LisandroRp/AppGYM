import React, { Component } from 'react';
import ExportadorMenus from './Fotos/ExportadorMenus'
import ExportadorFondo from './Fotos/ExportadorFondo'
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
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />

          <View style={styles.contentList}>

            <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoRutinas()}>
              <Image style={styles.image} source={ExportadorMenus.Rutinas()} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoEjercicios()}>
              <Image style={styles.image} source={ExportadorMenus.Ejercicios()} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoSuplementos()}>
              <Image style={styles.image} source={ExportadorMenus.Suplementacion()} />
            </TouchableOpacity>

          </View>
                  
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
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
  imageContainer: {
    width: wp(99),
    height: hp(28.6),
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  image: {
    width: wp(98.5),
    height: hp(28.1),
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