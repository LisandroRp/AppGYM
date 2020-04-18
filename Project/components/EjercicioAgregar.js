import React, { Component } from 'react';
import ExportadorFondo from './Fotos/ExportadorFondo';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';


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
      musculos: [{id:1,musculo: 'Pecho', imagen: require('./Fotos/Ejercicios/PECHO.png')},
      {id:2,musculo: 'Espalda', imagen: require('./Fotos/Ejercicios/ESPALDA.png')},
      {id:3,"musculo": 'Hombros',"imagen": require('./Fotos/Ejercicios/HOMBROS.png')},
      {id:4,musculo: 'Piernas',imagen: require('./Fotos/Ejercicios/PIERNAS.png')},
      {id:5,musculo: 'Biceps',imagen: require('./Fotos/Ejercicios/BICEPS.png')},
      {id:6,musculo: 'Triceps',imagen: require('./Fotos/Ejercicios/TRICEPS.png')},
      {id:7,musculo: 'Abdominales',imagen: require('./Fotos/Ejercicios/ABS.png')},
      {id:8,musculo: 'Cardio',imagen: require('./Fotos/Ejercicios/CARDIO.png')}],
      isLoading: false, 
      dia: this.props.navigation.getParam('dia'),
      tipo: this.props.navigation.getParam('tipo'),
      combinado: this.props.navigation.getParam('combinado'),
      ultimaPos: this.props.navigation.getParam('ultimaPos'),
    };
  }

  render() {
    if (this.state.isLoading) {
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
              return item.id;
            }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => this.props.onPressGo(this.state.dia, item.musculo,this.state.tipo, this.state.combinado, this.state.ultimaPos)}>
                <Image style={styles.image} source={item.imagen} />
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
    borderColor: 'black'
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
})

export default withNavigation(EjercicioAgregar);