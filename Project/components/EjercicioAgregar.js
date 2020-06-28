import React, { Component } from 'react';
import ExportadorEjercicios from './Fotos/ExportadorEjercicios';
import ExportadorFondo from './Fotos/ExportadorFondo';
import base from './GenerarBase';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Text
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import * as Font from 'expo-font';


function createData(item) {
  return {
    key: item._id,
    idEvento: item._id,
    imagen: item.imagen,
    nombre: item.nombre,
    rating: item.rating,
    descripcion: item.descripcion,
    tipo: item.tipo,
    ubicacion: item.ubicacion,
    precioE: item.precioE,
  };
}

class EjercicioAgregar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      musculos: [],
      isLoading: true,
      isLoadingFont: true, 
      dia: this.props.navigation.getParam('dia'),
      id_tipo: this.props.navigation.getParam('id_tipo'),
      combinado: this.props.navigation.getParam('combinado'),
      ultimaPos: this.props.navigation.getParam('ultimaPos'),
    };
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
  okMusculos(musculos){
    this.setState({musculos: musculos, isLoading: false})
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
      <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()}/>
      <ScrollView>
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
              <TouchableOpacity onPress={() => this.props.onPressGo(this.state.dia, item.id_musculo, item.nombre_musculo, this.state.id_tipo, this.state.combinado, this.state.ultimaPos)}>
                <ImageBackground style={styles.image} source={ExportadorEjercicios.queMusculo(item.id_musculo)}>
                  <Text style={[styles.textImage, {fontFamily: 'font2'}]}>{item.nombre_musculo}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          }} />
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
    backgroundColor: "grey"
  },
  contentList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:2,
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
    alignSelf: 'center',
    fontSize: hp(5),
    textTransform: 'uppercase',
    color: "#2A73E0",
    letterSpacing: wp(1),
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 2.5, height: 2.5},
    textShadowRadius: 0.1
  }
})

export default withNavigation(EjercicioAgregar);