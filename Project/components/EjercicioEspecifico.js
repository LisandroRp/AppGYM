import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import gifs from './Gifs/Gifs'
import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  Dimensions,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { height, width } = Dimensions.get('window');

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
        imagen1:'',
        imagen2:''
      },
      imagen:'',
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
      isLoading: false,
      imagen: data[0].imagen1
    });
    console.log(data[0].imagen1)
    console.log(data[0].imagen2)
    console.log(this.state.detalle.imagen1)
  }
  traerImagen(imagen){
    return imagen
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
          <View style={styles.backgroundTituloPrincipal}><Text style={styles.tituloPrincipal}>{this.state.detalle.nombre}</Text></View>
          <ScrollView>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={gifs.EncontrarGifs(this.state.detalle.nombre)} />
                </View>
            <View style={styles.todo}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Descripcion</Text></View>
                }
              >
                <Text style={styles.descripcion}>{this.state.detalle.descripcion}</Text>
              </DropDownItem>
            </View>
            <View style={styles.todo}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Ejecucion</Text></View>
                }
              >

                <Text style={styles.descripcion}>{this.state.detalle.ejecucion}</Text>
              </DropDownItem>
            </View>
            {/* <View style={styles.todo}>
              <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{this.state.detalle.nombre}</Text></View>
              <Text style={styles.descripcion}>{this.state.detalle.descripcion}</Text>
            </View>
            <View style={styles.todo}>
              <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Ejecucion</Text></View>
              <Text style={styles.descripcion}>{this.state.detalle.ejecucion}</Text>
            </View> */}
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
    opacity: 2,
    // paddingHorizontal: wp("2"),
    //  paddingVertical: hp("1"),
    //padding: 10,
    //borderRadius: 20
  },
  backgroundTituloPrincipal:{
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
  tituloPrincipal: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#3399ff'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3399ff'
  },
  descripcion: {
    color: 'white',
    //margin: 10,
    marginHorizontal: wp("5"),
    marginVertical: hp("2"),
    fontSize: 20,
    shadowOpacity: 5.0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
    marginBottom: hp(1)
  },
  image: {
    height: height * 0.50,
    width: width * 0.70,
    //height: 300,
    //width: 215,
    borderWidth: 4,
    borderColor: "#3399ff"
  },
})

export default withNavigation(EjercicioEspecifico);