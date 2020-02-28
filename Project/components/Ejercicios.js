import React, { Component } from 'react';
import base from './GenerarBase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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

class Ejercicios extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      musculos: [{id:1,musculo: 'Pecho', imagen: require('./Fotos/PECHO.png')},
      {id:2,musculo: 'Espalda', imagen: require('./Fotos/ESPALDA.png')},
      {"id":3,"musculo": 'Hombros',"imagen": require('./Fotos/HOMBROS.png')},
      {id:4,musculo: 'Piernas',imagen: require('./Fotos/PIERNAS.png')},
      {id:5,musculo: 'Biceps',imagen: require('./Fotos/BICEPS.png')},
      {id:6,musculo: 'Triceps',imagen: require('./Fotos/TRICEPS.png')},
      {id:7,musculo: 'Abdominales',imagen: require('./Fotos/ABS.png')},
      {id:8,musculo: 'Cardio',imagen: require('./Fotos/CARDIO.png')}],
      isLoading: false, 
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //base.ejerciciosRutina(this.listo.bind(this))
  }
  render() {
    if (this.state.isLoading) {
      return (
          <View style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')}/>
              <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
      );
  } else {
    return (
      <View style={styles.container}>
      <Image style={styles.bgImage} source={require('./Pared.jpg')}/>
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
              <TouchableOpacity onPress={() => this.props.onPressGo(item.musculo)}>
                <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.imagen} />
                </View>
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
  imageContainer: {
    width: Dimensions.get('window').width /2 -4,
    height: hp("28"),
    // height: 200,
    margin:1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'black'
  },
  image: {
    width: Dimensions.get('window').width /2 -4,
    height: hp("28"),
    // height: 200,
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

export default Ejercicios;