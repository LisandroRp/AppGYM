import React, { Component } from 'react';
import ApiController from '../controller/ApiController'
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import {
  StyleSheet,
  Text,
  View,
  Image,
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

class SuplementacionEspecifica extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      detalle: {},
      idSumplemento: this.props.navigation.getParam('id_suplemento'),
      nombre: this.props.navigation.getParam('nombre'),
      isLoading: true,
      refreshing: false,
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    this.cargarSuplemento();
  }
  cargarSuplemento = async () => {
    base.traerSuplementoEspecifico(await this.props.navigation.getParam('id_suplemento'), this.okSuplemento.bind(this));
  }


okSuplemento(data) {
  if (data != null) {
      this.setState({
          detalle: data[0],
          isLoading: false
      });
  } else {
      alert("Intentar de nuevo")
  }
}
  obtenerEventos() {
    ApiController.getEventos(this.okEventos.bind(this));
  }
  render() {
    if (this.state.isLoading) {
      return (
          <View style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')}/>
              <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
      );
  } else {
    return (
      <View style={styles.container}>
      <Image style={styles.bgImage} source={require('./Pared.jpg')}/>
        <ScrollView>
        <View style={styles.todo}>
          <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{this.state.nombre}</Text></View>
          <Text style={styles.descripcion}>Marca: {this.state.detalle.marca}</Text>
          <Text style={styles.descripcion}>{this.state.detalle.descripcion}</Text>
          </View>
          <View style={styles.todo}>
          <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Beneficios</Text></View>
          <Text style={styles.descripcion}>{this.state.detalle.beneficios}</Text>
        </View>
          <View style={styles.todo}>
          <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Uso</Text></View>
          <Text style={styles.descripcion}>{this.state.detalle.uso}</Text>
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
  bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  todo:{
    backgroundColor: 'grey',
    //margin: 20,
    marginHorizontal: wp("4"),
    marginVertical: hp("2"),
    paddingHorizontal: wp("2"),
    paddingVertical: hp("1"),
    //padding: 10,
    borderRadius: 20
  },
  backgroundTitulo:{
    backgroundColor: 'black',
    alignItems: 'center',
    //margin: 10,
    marginHorizontal: wp("2"),
    marginVertical: hp("1"),
    //padding: 10,
    paddingHorizontal: wp("2"),
    paddingVertical: hp("1"),
    borderRadius: 20
  },
  titulo:{
    fontSize: 33,
    fontWeight: 'bold',
    color: '#3399ff'
  },
  descripcion:{
    color: 'white',
    //margin: 10,
    marginHorizontal: wp("2"),
    marginVertical: hp("1"),
    fontSize: 15,
  },
})

export default withNavigation(SuplementacionEspecifica);