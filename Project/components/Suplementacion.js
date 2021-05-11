import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorFrases from './Fotos/ExportadorFrases';
import ExportadorSuplementacion from './Fotos/ExportadorSuplementacion'
import base from './GenerarBase';
import * as Font from 'expo-font';
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Text
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BlackShadow, BlackShadowForBlack } from './Estilos/Styles';

class Suplementacion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      suplementos: [],
      id_idioma: 0,
      isLoading: true,
      isLoadingFont: true,
    };
  }
  componentDidMount = async () => {
    this.loadFont()
    this.loadSuplementos()
  }
  loadFont = async () => {
    await Font.loadAsync({
      'font1': require('../assets/fonts/MorganFuente-Regular.ttf'),
      'font2': require('../assets/fonts/MorganFuente-Bold.ttf'),
    });
    this.setState({ isLoadingFont: false })
  }
  loadSuplementos = async () => {
    base.traerTipoSuplementos(this.okSuplementos.bind(this))
  }
  okSuplementos(suplementos, id_idioma) {
    this.ordenarSuplementos(suplementos, id_idioma)
  }
  ordenarSuplementos(suplementos, id_idioma) {
    var suplementosNuevos = suplementos.reduce(function (rows, key, index) {
      return (index % 2 == 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows;
    }, []);
    this.setState({ suplementos: suplementosNuevos, id_idioma, isLoading: false })
  }

  render() {
    if (this.state.isLoadingFont || this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#3399ff" barStyle="light-content" />
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          {this.state.suplementos.map((array, arrayPos) => (
            <View style={{ flexDirection: "row", flex: 1 }}>
              {
                array.map((item, itemPos) => (
                  <TouchableOpacity
                    key={item.id_tipo.toString()}
                    accessible={true}
                    accessibilityLabel={item.nombre_tipo}
                    accessibilityHint={ExportadorFrases.EjerciciosHint(this.state.id_idioma) + item.nombre_tipo}
                    onPress={() => this.props.onPressGo(item.id_tipo, item.nombre_tipo)}
                    style={[styles.imageContainer, BlackShadowForBlack()]}>
                    <ImageBackground style={[styles.image]} source={ExportadorSuplementacion.default(this.state.id_idioma)}>
                      <Text style={[styles.textImage, { fontFamily: 'font2' }]} >{item.nombre_tipo}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ))
              }
            </View>
          ))}
        </View>
      );
    }
  }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey"
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    margin: 1,
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    resizeMode: 'stretch',
    overflow: 'hidden'
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
  textImage: {
    textAlign: 'center',
    fontSize: wp(9),
    textTransform: 'uppercase',
    color: "#2A73E0",
    letterSpacing: wp(1),
    textShadowColor: 'black',
    textShadowOffset: { width: 2.2, height: 2.2 },
    textShadowRadius: 0.1
  }
})

export default withNavigation(Suplementacion);