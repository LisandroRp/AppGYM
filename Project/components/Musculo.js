import React, { Component } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import ApiController from '../controller/ApiController'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo'

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
    genero: item.genero,
  };
}

class Musculo extends Component {


  constructor(props) {
    super(props);
    this.state = {
      //IdUser: props.navigation.getParam('IdUser'),
      musculo: this.props.navigation.getParam('musculo'),
      searchStatus: 'none',
      Status: 'none',
      modalVisible: false,
      userSelected: [],
      eventos: [],
      ejercicios:[{id: 1,tipo: 'Pecho',nombre: 'Pechoide Plano'},
    {id:2, tipo:'Pecho', nombre:'Pechovich Inclinado'},
  {id:3, tipo:'Espalda', nombre: 'Trasnucovich'}],
      isLoading: false,
      generoEvento: [],
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.Star = 'https://img.icons8.com/color/96/000000/christmas-star.png';
    //this._storeData(this.state.IdUser);
    //this.getUserData()
    //this.obtenerEventos();
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'white',
      height: 50
    },
  };
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('IdUser', this.state.IdUser);
    } catch (error) {
      console.log(error);
    }
  };
  esGenero(genero) {
    for (i = 0; i <= this.state.generoEvento.length; i++) {
      if (this.state.generoEvento[i] == genero) {
        return true
      }
    }
    return false
  }
  clickEventListener = (item) => {
    Alert.alert('Message', 'Item clicked. ' + JSON.stringify(item));
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
        //<View style={styles.container}>
        <LinearGradient colors={['grey', 'black']} style={styles.container}>
          <FlatList      
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.ejercicios}
            initialNumToRender={50}
            // keyExtractor={(item) => {
            //   return item.id;
            // }}
            renderItem={({ item }) => {
              if(this.state.musculo==item.tipo)
                return (
                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id)}>
                    <View style={{ flexDirection: "row" }} >
                      <Image style={styles.image} source={{ uri: item.imagen }} />
                      <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.nombre}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
            } />
        </LinearGradient>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "grey"
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width: 180,
    flexDirection: "column"
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7"
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
    backgroundColor: "black",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name: {
    paddingTop: 12,
    fontSize: 18,
    flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  count: {
    fontSize: 14,
    paddingBottom: 11,
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
    fontSize: 15,
    marginTop: 4,
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
})

export default withNavigation(Musculo);