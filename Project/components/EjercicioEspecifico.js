import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function createData(item) {
  return {
    key: item._id,
    idEjercicio: item._id,
    imagen: item.imagen,
    nombre: item.nombre,
    rating: item.rating,
    descripcion: item.descripcion,
    tipo: item.tipo,
    ubicacion: item.ubicacion,
    precioE: item.precioE,
  };
}

class EjercicioEspecifico extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detalle: {
        id: this.props.navigation.getParam('id_ejercicio'),
        nombre: this.props.navigation.getParam('nombreEjercicio'),
        musculo: '',
        descripcion: '',
        ejecucion: '',
      },
      modalVisible: false,
      isLoading: true,
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    this.cargarEjercicio();
  }

  cargarEjercicio = async () => {
    base.traerEjercicioEspecifico(await this.props.navigation.getParam('id_ejercicio'), this.okEjercicio.bind(this));
  }

  okEjercicio(data) {
      this.setState({
        detalle: data[0],
        isLoading: false
      });
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
          <ScrollView>
            <View style={styles.todo}>
              <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{this.state.detalle.nombre}</Text></View>
              <Text style={styles.descripcion}>{this.state.detalle.descripcion}</Text>
            </View>
            <View style={styles.todo}>
              <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Ejecucion</Text></View>
              <Text style={styles.descripcion}>{this.state.detalle.ejecucion}</Text>
            </View>
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
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  todo: {
    backgroundColor: 'grey',
    //margin: 20,
    marginHorizontal: wp("4"),
    marginVertical: hp("2"),
   // paddingHorizontal: wp("2"),
  //  paddingVertical: hp("1"),
    //padding: 10,
    //borderRadius: 20
  },
  backgroundTitulo: {
    backgroundColor: 'black',
    alignItems: 'center',
    //margin: 10,
   // marginHorizontal: wp("2"),
   // marginVertical: hp("1"),
    //padding: 10,
    paddingHorizontal: wp("2"),
    paddingVertical: hp("2"),
    //borderRadius: 20
  },
  titulo: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#3399ff'
  },
  descripcion: {
    color: 'white',
    //margin: 10,
    marginHorizontal: wp("5"),
    marginVertical: hp("2"),
    fontSize: 15,
  },

})

export default withNavigation(EjercicioEspecifico);