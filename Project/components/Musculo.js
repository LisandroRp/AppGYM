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
  Keyboard,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
//import { LinearGradient, SQLite } from 'expo'
import * as SQLite from 'expo-sqlite'
import Ejercicios from './Ejercicios';
 import { openDatabase } from 'react-native-sqlite-storage';
// //Connction to access the pre-populated user_db.db
const db = SQLite.openDatabase('AppGYM.db');
//Connction to access the pre-populated user_db.db
//var db = openDatabase({ name: 'AppGYM.db', createFromLocation : 1});
//Otro intento
// import { SQLite } from 'expo-sqlite'
// import { BaseModel, types } from 'expo-sqlite-orm'

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
      searchBarFocused: false,
      FlatListItems:[],
      musculo: this.props.navigation.getParam('musculo'),
      modalVisible: false,
      ejercicios: [{ id: 1, musculo: 'Pecho', nombre: 'Press de Banca Plano', descripcion: '', ejecucion: '' },
      { id: 2, musculo: 'Pecho', nombre: 'Pechovich Inclinado' },
      { id: 3, musculo: 'Espalda', nombre: 'Trasnucovich' }],
      memory: [{ id: 1, musculo: 'Pecho', nombre: 'Press de Banca Plano', descripcion: '', ejecucion: '' },
      { id: 2, musculo: 'Pecho', nombre: 'Pechovich Inclinado' },
      { id: 3, musculo: 'Espalda', nombre: 'Trasnucovich' }],
      isLoading: false,
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.Star = 'https://img.icons8.com/color/96/000000/christmas-star.png';
    //this._storeData(this.state.IdUser);
    //this.getUserData()
    //this.obtenerEventos();
    this.obtenerEjercicios();
  }
  // static get database() {
  //   return async () => SQLite.openDatabase('AppGYM.db')
  // }
 
  // static get tableName() {
  //   return 'animals'
  // }
  obtenerEjercicios(){
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Ejercicios', [], (results) => {
        var temp = [];
        console.log(temp +'Pedro')
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(temp +'hola')
        }
        this.setState({
          ejercicios: temp,
        });
      },
      () => {console.log('fail')},
  () => {console.log('success')}
  );
    });
  }
  // ListViewItemSeparator = () => {
  //   return (
  //     <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
  //   );
  // };
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

  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
  }

  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
  }

  keyboardWillShow = () => {
    this.setState({ searchBarFocused: true })
  }

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false })
  }

  searchEjercicio = value => {
    const filterDeEjercicios = this.state.memory.filter(ejercicio => {
      let ejercicioLowercase = (
        ejercicio.nombre +
        ' ' +
        ejercicio.id +
        ' ' +
        ejercicio.genero +
        ' ' +
        ejercicio.tipo
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return ejercicioLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ ejercicios: filterDeEjercicios });
    this.setState({ value })
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <View>
            <SearchBar
              placeholder="Search..."
              platform='ios'
              onChangeText={value => this.searchEjercicio(value)}
              value={this.state.value}
              inputContainerStyle={{ backgroundColor: 'grey' }}
              placeholderTextColor='black'
              containerStyle={{ backgroundColor: 'black', height: 50, paddingBottom: 22 }}
              buttonStyle={{ marginBottom: 30 }}
              searchIcon={{ color: 'black' }}
            />
          </View>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.ejercicios}
            initialNumToRender={50}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              if (this.state.musculo == item.musculo)
                return (
                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id, item.nombre, item.descripcion)}>
                    <View style={{ flexDirection: "row" }} >
                      <Image style={styles.image} source={{ uri: item.imagen }} />
                      <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.nombre}</Text>
                        <Text style={styles.descripcion}>{item.descripcion}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            }
            } />
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
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width: 180,
    flexDirection: "column"
  },
  image: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: "#ebf0f7",
    margin: 5,
    marginRight: 5,
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
  },

  name: {
    paddingTop: 12,
    fontSize: 22,
    //flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  descripcion: {
    fontSize: 15,
    marginTop: 5,
    //flex: 1,
    color: "white",
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