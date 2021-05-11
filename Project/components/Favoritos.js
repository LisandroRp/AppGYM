import React, { Component } from 'react';
import ExportadorFrases from './Fotos/ExportadorFrases';
import ExportadorMenus from './Fotos/ExportadorMenus';
import ExportadorFondo from './Fotos/ExportadorFondo';
import * as Font from 'expo-font';
import base from './GenerarBase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BlackShadowForBlack, marginTitlesPlataform } from './Estilos/Styles';
import { BackgroundTitleImage } from './Estilos/PreMadeComponents'

class Favoritos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      modalVisible: false,
      suplementos: [],
      id_idioma: 0,
      isLoading: true,
      isLoadingFont: true,
    };
  }
  componentDidMount = async () => {
    this.loadFont()
    base.traerIdIdioma(this.okIdIdioma.bind(this))
  }
  loadFont = async () => {
    await Font.loadAsync({
      'font1': require('../assets/fonts/MorganFuente-Regular.ttf'),
      'font2': require('../assets/fonts/MorganFuente-Bold.ttf'),
    });
    this.setState({ isLoadingFont: false })
  }

  okIdIdioma(id_idioma) {
    this.setState({ id_idioma: id_idioma, isLoading: false })
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

          <TouchableOpacity style={[styles.imageContainer, BlackShadowForBlack()]} onPress={() => this.props.onPressGoRutinas()}>
            <ImageBackground style={styles.image} source={ExportadorMenus.Rutinas()} >
              <BackgroundTitleImage>
                <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Rutinas(this.state.id_idioma)}</Text>
              </BackgroundTitleImage>
              <Text style={[styles.textImage, marginTitlesPlataform(),{ fontFamily: 'font2' }]}>{ExportadorFrases.Rutinas(this.state.id_idioma)}</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.imageContainer, BlackShadowForBlack()]} onPress={() => this.props.onPressGoEjercicios()}>
            <ImageBackground style={styles.image} source={ExportadorMenus.Ejercicios()} >
              <BackgroundTitleImage>
                <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Ejercicios(this.state.id_idioma)}</Text>
              </BackgroundTitleImage>
              <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Ejercicios(this.state.id_idioma)}</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.imageContainer, BlackShadowForBlack()]} onPress={() => this.props.onPressGoSuplementos()}>
            <ImageBackground style={[styles.image]} source={ExportadorMenus.Suplementacion()} >
              <BackgroundTitleImage>
                <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Suplementos(this.state.id_idioma)}</Text>
              </BackgroundTitleImage>
              <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Suplementos(this.state.id_idioma)}</Text>
            </ImageBackground>
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
    backgroundColor: "grey"
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
    flex: 1,
    marginVertical: hp(0.2),
    marginHorizontal: hp(0.2),
  },
  image: {
    height: "100%",
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  textImage: {
    textAlign: 'center',
    fontSize: wp(12),
    textTransform: 'uppercase',
    color: "#2A73E0",
    letterSpacing: wp(2),
    textShadowColor: 'black',
    textShadowOffset: { width: 2.5, height: 2.5 },
    textShadowRadius: 0.1
  }
})

export default Favoritos;