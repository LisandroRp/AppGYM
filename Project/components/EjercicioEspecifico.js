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
    idEjercicio: item._id,
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
      id: this.props.navigation.getParam('idEjercicio'),
      nombre: this.props.navigation.getParam('nombreEjercicio'),
      descripcion: this.props.navigation.getParam('descripcionEjercicio'),
      ejecucion:'',
      isLoading: false,
      refreshing: false,
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
  }
  componentDidMount() {
    //this.cargarEjercicio();
}

cargarEjercicio() {
  ApiController.getDetalle(this.okEjercicio.bind(this), this.state.idEjercicio);
}

okEjercicio(data) {
  if (data != null) {
      this.setState({
          detalle: data[0],
          isLoading: false
      });
  } else {
      alert("Intentar de nuevo")
  }
}
  obtenerEventos() {
    ApiController.getEventos(this.okEventos.bind(this));
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
        <View style={styles.todo}>
          <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{this.state.nombre}</Text></View>
          <Text style={styles.descripcion}>{this.state.descripcion}</Text>
          </View>
          <View style={styles.todo}>
          <View style={styles.backgroundTitulo}><Text style={styles.titulo}>Ejecucion</Text></View>
          <Text style={styles.descripcion}>{this.state.ejecucion}</Text>
        </View>
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
    backgroundColor: "black"
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
  todo:{
    backgroundColor: 'grey',
    margin: 20,
    padding: 10,
    borderRadius: 20
  },
  backgroundTitulo:{
    backgroundColor: 'black',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 20
  },
  titulo:{
    fontSize: 33,
    fontWeight: 'bold',
    color: '#3399ff'
  },
  descripcion:{
    color: 'white',
    margin:10,
    fontSize: 15,
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