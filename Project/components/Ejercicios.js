import React, { Component } from 'react';
import ApiController from '../controller/ApiController'
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
import { LinearGradient } from 'expo-linear-gradient'
import { Reducer } from 'react-native-router-flux';


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
    //this.obtenerEventos()
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
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width:180,
    flexDirection: "column"
  },
  imageContainer: {
    width: Dimensions.get('window').width /2 -4,
    height: 200,
    margin:1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'black'
  },
  image: {
    width: Dimensions.get('window').width /2 -4,
    height: 200,
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
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name: {
    paddingTop:12,
    fontSize: 18,
    flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  count: {
    fontSize: 14,
    paddingBottom:11,
    flex: 1,
    //alignSelf: 'center',
    color: "#6666ff"
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
 followButtonText: {
    color: "black",
    marginTop:4,
    fontSize: 15,
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
},
})

export default Ejercicios;