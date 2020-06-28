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
  TouchableOpacity,
  FlatList,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import * as Font from 'expo-font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';

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
  componentDidMount = async() => {
    this.loadFont()
    this.loadMuscles()
  }
  
  loadFont = async() => {
    await Font.loadAsync({
      'font1': require('../assets/fonts/BebasNeue-Regular.ttf'),
      'font2': require('../assets/fonts/BebasNeue-Bold.ttf'),
    });
    this.setState({ isLoadingFont: false })
  }
  loadMuscles = async() => {
    base.traerMusculos(this.okMusculos.bind(this))
  }
  okMusculos(musculos, id_idioma){
    this.setState({musculos: musculos, id_idioma, isLoading: false})
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
          data={this.state.musculos}
          initialNumToRender={50}
          keyExtractor={(item) => {
              return item.id_musculo.toString();
            }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              accessible={true}
              accessibilityLabel={item.nombre_musculo}
              accessibilityHint={ExportadorFrases.EjerciciosHint(this.state.id_idioma) + item.nombre_musculo}
               onPress={() => this.props.onPressGo(item.nombre_musculo, item.id_musculo)}>
                <ImageBackground style={styles.image} source={ExportadorEjercicios.queMusculo(item.id_musculo)}>
                  <Text style={[styles.textImage, {fontFamily: 'font2'}]}>{item.nombre_musculo}</Text>
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
    height: hp(28),
    margin: 1,
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
export default withNavigation(Ejercicios);