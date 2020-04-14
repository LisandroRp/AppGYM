import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorGifs from './Fotos/ExportadorGifs'
import ExportadorFondo from './Fotos/ExportadorFondo'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
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
        nombre: this.props.navigation.getParam('nombre_Ejercicio'),
        musculo: '',
        descripcion: '',
        ejecucion: '',
        imagen:'',
      },
      imagen:'',
      modalVisible: false,
      isLoading: true,
    };
    this.cargarEjercicio();
  }

  cargarEjercicio = async () => {
    base.traerEjercicioEspecifico(await this.props.navigation.getParam('id_ejercicio'), this.okEjercicio.bind(this));
  }

  okEjercicio(data) {
    this.setState({
      detalle: data[0],
      isLoading: false,
      imagen: data[0].imagen
    });
  }
  traerImagen(imagen){
    return imagen
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
      if(ExportadorGifs.EncontrarGifs(this.state.detalle.id_ejercicio) != 'nada'){
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ScrollView>
                  <Image style={styles.image} source={ExportadorGifs.EncontrarGifs(this.state.detalle.id_ejercicio)} />
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
    }else{
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
        <ScrollView>
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
    marginHorizontal: wp("4"),
    marginVertical: hp("2"),
    opacity: 2
  },
  backgroundTituloPrincipal:{
    backgroundColor: 'black',
    alignItems: 'center',
    paddingHorizontal: wp("2"),
    paddingVertical: hp("2"),
  },
  backgroundTitulo: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingHorizontal: wp("2"),
    paddingVertical: hp("2"),
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
    color: 'black',
    marginHorizontal: wp("5"),
    marginVertical: hp("2"),
    fontSize: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
    marginBottom: hp(1)
  },
  image: {
    height: height * 0.50,
    width: width,
    //height: 300,
    //width: 215,
  },
})

export default withNavigation(EjercicioEspecifico);