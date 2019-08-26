import React, { Component } from 'react';
import ApiController from '../controller/ApiController'
import { withNavigation } from 'react-navigation';
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

class EjercicioEspecifico extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      idEjercicio: this.props.navigation.getParam('idEjercicio'),
      nombre:'Diegote Lomonaco',
      eventos: [{musculo: 'Pecho', imagen: 'https://i.blogs.es/247d10/captura-de-pantalla-2015-09-03-a-las-17.02.08/450_1000.png'},
      {musculo: 'Espalda', imagen: 'https://i.blogs.es/247d10/captura-de-pantalla-2015-09-03-a-las-17.02.08/450_1000.png'},
      {musculo: 'Hombros',imagen: 'https://i.blogs.es/247d10/captura-de-pantalla-2015-09-03-a-las-17.02.08/450_1000.png'},
      {musculo: 'Bicep',imagen: 'https://i.blogs.es/247d10/captura-de-pantalla-2015-09-03-a-las-17.02.08/450_1000.png'},
      {musculo: 'Tricep',imagen: 'https://i.blogs.es/247d10/captura-de-pantalla-2015-09-03-a-las-17.02.08/450_1000.png'},
      {musculo: 'Piernas',imagen: 'https://i.blogs.es/247d10/captura-de-pantalla-2015-09-03-a-las-17.02.08/450_1000.png'},
      {musculo: 'Abdominales',imagen: 'https://i.blogs.es/247d10/captura-de-pantalla-2015-09-03-a-las-17.02.08/450_1000.png'},
      {musculo: 'Cardio',imagen: 'https://i.blogs.es/247d10/captura-de-pantalla-2015-09-03-a-las-17.02.08/450_1000.png'}],
      isLoading: false,
      refreshing: false,
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.obtenerEventos()
  }
  obtenerEventos() {
    ApiController.getEventos(this.okEventos.bind(this));
  }

  okEventos(data) {
    if (data != null) {
      var i, newArray = [];
      for (i = 0; i < data.length; i++) {
        newArray.push(createData(data[i], i));
      }
      this.setState({ eventos: newArray, isLoading: false});

    } else {
      alert("Intentar de nuevo")
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
          //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
          //<View style={styles.container}>
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
          //</View>
          // </LinearGradient>
      );
  } else {
    return (
      <View style={styles.container}>
      <ScrollView>
      <Text>{this.state.idEjercicio}</Text>
         
          </ScrollView>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "red"
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
    width: Dimensions.get('window').width /2 -6,
    height: 200,
    margin:2,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'red'
  },
  image: {
    width: Dimensions.get('window').width /2 -6,
    height: 200,
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

export default withNavigation(EjercicioEspecifico);