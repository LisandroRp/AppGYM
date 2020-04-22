import React, { Component } from 'react';
import ApiController from '../controller/ApiController'
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

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
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ScrollView>
            <View style={styles.todo}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{this.state.nombre}</Text></View>
                }
              >
                <View style={{flexDirection: "row"}}>
                <Text style={styles.descripcionUnderline}>Marca:</Text> 
                <Text style={styles.descripcion}> {this.state.detalle.marca}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                <Text style={styles.descripcionUnderline}>Sabor:</Text> 
                <Text style={styles.descripcion}>{this.state.detalle.sabores}</Text>
                </View>
                <Text style={styles.descripcion}>{this.state.detalle.descripcion}</Text>
              </DropDownItem>
            </View>

            <View style={styles.todo}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Beneficios</Text></View>
                }
              >


                <Text style={styles.descripcion}>{this.state.detalle.beneficios}</Text>
              </DropDownItem>
            </View>

            <View style={styles.todo}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Uso</Text></View>
                }
              >


                <Text style={styles.descripcion}>{this.state.detalle.uso}</Text>
              </DropDownItem>
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
    marginHorizontal: wp("4"),
    marginVertical: hp("2"),
    opacity: 2
  },
  backgroundTitulo: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingHorizontal: wp("2"),
    paddingVertical: hp("2"),
  },
  titulo: {
    fontSize: height * 0.04,
    fontWeight: 'bold',
    color: '#3399ff'
  },
  descripcion: {
    color: 'black',
    marginHorizontal: wp("5"),
    marginVertical: hp("2"),
    fontSize: height * 0.025,
  },
  descripcionUnderline: {
    color: 'black',
    textDecorationLine: 'underline',
    marginLeft: wp("5"),
    marginVertical: hp("2"),
    fontSize: height * 0.025,
  },
})

export default withNavigation(SuplementacionEspecifica);