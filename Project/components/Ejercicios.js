import React, { Component } from 'react';
import ExportadorEjercicios from './Fotos/ExportadorEjercicios';
import ExportadorFrases from './Fotos/ExportadorFrases';
import ExportadorFondo from './Fotos/ExportadorFondo';
import base from './GenerarBase';

import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  FlatList,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import * as Font from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import { BlackShadowForBlack, marginTitlesPlataform } from './Estilos/Styles';
import { BackgroundTitleImage, TouchableOpacityMorgan } from './Estilos/PreMadeComponents'

var {Platform} = React;

class Ejercicios extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      musculos: [],
      isLoading: true,
      id_idioma: 0,
      isLoadingFont: true,
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
  }
  componentDidMount = async () => {
    this.loadFont()
    this.loadMuscles()
  }

  loadFont = async () => {
    await Font.loadAsync({
      'font1': require('../assets/fonts/MorganFuente-Regular.ttf'),
      'font2': require('../assets/fonts/MorganFuente-Bold.ttf'),
    })
    this.setState({ isLoadingFont: false })
  }
  loadMuscles = async () => {
    base.traerMusculos(this.okMusculos.bind(this))
  }
  okMusculos(musculos) {
    this.ordenarMusculos(musculos)
  }
  ordenarMusculos(musculos) {
    var musculosOrdenados = musculos.reduce(function (rows, key, index) {
      return (index % 2 == 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows;
    }, []);
    this.setState({ musculos: musculosOrdenados, isLoading: false })
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
          {this.state.musculos.map((array, arrayPos) => (
            <View key={arrayPos.toString()} style={{ flexDirection: "row", flex: 1 }}>
              {
                array.map((item, itemPos) => (
                  <TouchableOpacityMorgan
                    key={item.id_musculo.toString()}
                    accessible={true}
                    accessibilityLabel={item.nombre_musculo}
                    accessibilityHint={ExportadorFrases.EjerciciosHint(this.state.id_idioma) + item.nombre_musculo}
                    onPress={() => this.props.onPressGo(item.nombre_musculo, item.id_musculo)}
                    style={[styles.imageContainer, BlackShadowForBlack()]}>
                    <ImageBackground style={[styles.image]} source={ExportadorEjercicios.queMusculo(item.id_musculo)}>
                      <BackgroundTitleImage>
                        <Text style={[styles.textImage, marginTitlesPlataform(), {fontFamily: 'font2'}]}>{item.nombre_musculo}</Text>
                      </BackgroundTitleImage>
                      <Text style={[styles.textImage, marginTitlesPlataform(), {fontFamily: 'font2'}]}>{item.nombre_musculo}</Text>
                    </ImageBackground>
                  </TouchableOpacityMorgan>
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
    flex:1,
    margin: 1,
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    overflow: 'hidden'
  },
  bgImage: {
    position: 'absolute',
    width: wp(100),
    height: hp(100),
  },
  textImage: {
    textAlign: "center",
    fontSize: wp(10),
    textTransform: 'uppercase',
    color: "#2A73E0",
    letterSpacing: wp(1),
    textShadowColor: 'black',
    textShadowOffset: { width: 2.2, height: 2.2 },
    textShadowRadius: 1
  }
})
export default withNavigation(Ejercicios);