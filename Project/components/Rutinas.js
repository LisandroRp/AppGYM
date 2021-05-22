import React, { Component } from 'react';
import ExportadorFrases from './Fotos/ExportadorFrases'
import ExportadorMenus from './Fotos/ExportadorMenus'
import ExportadorFondo from './Fotos/ExportadorFondo'
import base from './GenerarBase';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  Text
} from 'react-native';
import * as Font from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import { BlackShadowForBlack, marginTitlesPlataform } from './Estilos/Styles';
import { BackgroundTitleImage, TouchableOpacityMorgan } from './Estilos/PreMadeComponents'

class Rutinas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      modalVisible: false,
      suplementos: [],
      isLoadingFont: true,
      isLoading: true,
      id_idioma: 0
    };
  }
  componentDidMount = async () => {
    this.loadFont()
    this.loadIdioma()
  }
  loadFont = async () => {
    await Font.loadAsync({
      'font1': require('../assets/fonts/MorganFuente-Regular.ttf'),
      'font2': require('../assets/fonts/MorganFuente-Bold.ttf'),
    });
    this.setState({ isLoadingFont: false })
  }
  loadIdioma = async () => {
    base.traerIdIdioma(this.okIdIdioma.bind(this))
  }
  okIdIdioma(id_idioma) {
    this.setState({ id_idioma: id_idioma, isLoading: false })
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
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />

          <TouchableOpacityMorgan style={[styles.imageContainer, BlackShadowForBlack()]} onPress={() => this.props.onPressGoRutinas(1, ExportadorFrases.Musculacion(this.state.id_idioma))}>
            <ImageBackground style={styles.image} source={ExportadorMenus.Musculacion()}>
              <BackgroundTitleImage>
                <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Musculacion(this.state.id_idioma)}</Text>
              </BackgroundTitleImage>
              <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Musculacion(this.state.id_idioma)}</Text>
            </ImageBackground>
          </TouchableOpacityMorgan>

          <TouchableOpacityMorgan style={[styles.imageContainer, BlackShadowForBlack()]} onPress={() => this.props.onPressGoRutinas(2, ExportadorFrases.Aerobico(this.state.id_idioma))}>
            <ImageBackground style={styles.image} source={ExportadorMenus.Aerobico()}>
              <BackgroundTitleImage>
                <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Aerobico(this.state.id_idioma)}</Text>
              </BackgroundTitleImage>
              <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.Aerobico(this.state.id_idioma)}</Text>
            </ImageBackground>
          </TouchableOpacityMorgan>

          <TouchableOpacityMorgan style={[styles.imageContainer, BlackShadowForBlack()]} onPress={() => this.props.onPressGoRutinas(null, ExportadorFrases.MisRutinas(this.state.id_idioma))}>
            <ImageBackground style={[styles.image]} source={ExportadorMenus.Propias()}>
              <BackgroundTitleImage>
                <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.MisRutinas(this.state.id_idioma)}</Text>
              </BackgroundTitleImage>
              <Text style={[styles.textImage, marginTitlesPlataform(), { fontFamily: 'font2' }]}>{ExportadorFrases.MisRutinas(this.state.id_idioma)}</Text>
            </ImageBackground>
          </TouchableOpacityMorgan>

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
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  imageContainer: {
    flex: 1,
    marginVertical: hp(0.2),
    marginHorizontal: hp(0.2)
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

export default withNavigation(Rutinas);