import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import ExportadorFondo from './Fotos/ExportadorFondo'
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
  componentDidMount = async() => {
    this.loadFont()
    this.loadSuplementos()
  }
  loadFont = async() => {
    await Font.loadAsync({
      'font1': require('../assets/fonts/BebasNeue-Regular.ttf'),
      'font2': require('../assets/fonts/BebasNeue-Bold.ttf'),
    });
    this.setState({ isLoadingFont: false })
  }
  loadSuplementos = async() => {
    base.traerTipoSuplementos(this.okSuplementos.bind(this))
  }
  okSuplementos(suplementos, id_idioma){
    this.setState({suplementos: suplementos, id_idioma, isLoading: false})
  }
  render() {
    if (this.state.isLoadingFont || this.state.isLoading) {
      return (
          <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()}/>
              <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
      );
  } else {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#3399ff" barStyle="light-content" />
      <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()}/>
        <FlatList
          style={styles.contentList}
          numColumns={2}
          data={this.state.suplementos}
          initialNumToRender={50}
          keyExtractor={(item) => {
              return item.id_tipo.toString();
            }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => this.props.onPressGo(item.id_tipo, item.nombre_tipo)}>
                <ImageBackground style={styles.image} source={ExportadorSuplementacion.default(this.state.id_idioma)}>
                  <Text style={[styles.textImage, {fontFamily: 'font2'}]} >{item.nombre_tipo}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          }} />
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
  contentList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:2,
    alignSelf: 'center'
  },
  image: {
    width: wp(49),
    height: hp(29.5),
    margin: 1,
    //marginVertical: hp(0.2),
    //marginHorizontal: wp(0.1),
    borderWidth: 1.5,
    borderColor: 'black',
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    overflow: 'hidden'
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
  textImage: {
    textAlign: 'center',
    fontSize: hp(5),
    textTransform: 'uppercase',
    color: "#2A73E0",
    letterSpacing: wp(1),
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 2.2, height: 2.2},
    textShadowRadius: 0.1
  }
})

export default withNavigation(Suplementacion);