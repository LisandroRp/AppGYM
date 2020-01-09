import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class RutinasTipos extends Component {


  constructor(props) {
    super(props);
    this.state = {
      searchStatus: 'none',
      Status: 'none',
      modalVisible: false,
      userSelected: [],
      // rutinas: [{ id: 1, nombre: 'Arnold N1', imagen: require('./Fotos/PECHO.png'), dias: 7, fav: 1,modificable:false },
      // { id: 2, nombre: 'La Roca', imagen: require('./Fotos/ESPALDA.png'), dias: 6, fav: 1,modificable:true },
      // { "id": 3, "nombre": 'Vin Disell', "imagen": require('./Fotos/HOMBROS.png'), dias: 5, fav: 1,modificable:true },
      // { id: 4, nombre: 'Wachiturro', imagen: require('./Fotos/PIERNAS.png'), dias: 1, fav: 0,modificable:true },
      // { id: 5, nombre: 'Navy SEAL', imagen: require('./Fotos/BICEPS.png'), dias: 15, fav: 0,modificable:true },],
      rutinas:[],
      isLoading: true,
      generoEvento: [],
    };
    this.Star = require('./Logos/Star_Llena.png');
    this.Star_With_Border = require('./Logos/Star_Borde.png');
    //this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.Star_With_Border = 'https://img.icons8.com/color/96/000000/star.png';
    //this.Star = 'https://img.icons8.com/color/96/000000/christmas-star.png';
    this.cargarRutinas();
  }

  componentWillReceiveProps() {
    console.log('chauuuu')
    this.setState({isLoading:true})
    this.cargarRutinas()
  }

  cargarRutinas = async () => {
    base.traerRutinas(this.okRutinas.bind(this))
  }
  okRutinas(rutinas){
    this.setState({ rutinas: rutinas, isLoading: false });
    console.log(rutinas)
  }
  
  _storeData = async (id_rutina) => {
    try {
      await AsyncStorage.setItem('rutinaEditable', id_rutina);
    } catch (error) {
      console.log(error);
    }
  };

  favear(id_rutina) {
    var i = 0
    var fav
    aux = 0
    rutinas2 = []
    while (i < this.state.rutinas.length) {
      if (this.state.rutinas[i].id_rutina == id_rutina) {
        aux = i
        console.log(this.state.rutinas[aux].favoritos)
      }
      rutinas2.push(this.state.rutinas[i])
      i++
    }
    if (rutinas2[aux].favoritos) {
      rutinas2[aux].favoritos = 0
      fav= 0
    } else {
      rutinas2[aux].favoritos = 1
      fav= 1
    }
    //this.setState({ rutinas: rutinas2 })   
    base.favoritearRutina(id_rutina, fav, this.okFavorito.bind(this))  
  }

  okFavorito() {
    this.cargarRutinas()
    //this.setState({ isLoading: false })
  }

  favoritos(favoritos){
    if(favoritos){
      return this.Star
    }
    else{
      return this.Star_With_Border
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
        //<View style={styles.container}>
        <LinearGradient colors={['black', 'grey']} style={styles.container}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <ScrollView>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.rutinas}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.nombre;
              }}
              renderItem={({ item }) => {
                  return (
                    <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_rutina, item.nombre,item.modificable)}>
                      <View style={{ flexDirection: "row" }} >
                        <Image style={styles.image} source={item.imagen} />
                        <View style={styles.cardContent}>
                          <Text style={styles.name}>{item.nombre}</Text>
                          <Text style={styles.dias}>{item.dias} Dias</Text>
                        </View>
                        <View style={styles.ViewEstrella} >
                          <TouchableOpacity onPress={() => {this.favear(item.id_rutina)}}>
                            <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
              }} />
          </ScrollView>
        </LinearGradient>
        //</View>
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
    //marginTop: 10,
    paddingRight: 5,
    width: wp("40"),
    justifyContent: 'center',
  },
  image: {
    //width: 90,
    width: wp("20"),
    //height: 90,
    height: hp("11"),
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
    fontSize: 22,
    //flex: 1,
    //alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  dias: {
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
  StarImage: {
    width: wp("10%"),
    height: hp("5%"),
    resizeMode: 'cover',
  },
  ViewEstrella: {
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: wp("5")
  }
})

export default withNavigation(RutinasTipos);