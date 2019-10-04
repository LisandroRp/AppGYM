import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
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
import DropDownItem from 'react-native-drop-down-item';
import { LinearGradient } from 'expo'
import { Reducer } from 'react-native-router-flux';
var { height, width } = Dimensions.get('window');

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

class RutinaEspecifica extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: this.props.navigation.getParam('nombre'),
      modalVisible: false,
      rutina: { id: 1, nombre: 'Arnold N1', imagen: require('./arnold-schwarzenegger-biceps_0.jpg'), dias: 7, fav: 1,modificable:false,
      rutina:[{key:'50', id: 55,dia:'2', nombre: 'Press Plano', series: '4', repeticiones: '15-12-10-8' },
      {key:'55',id: 11,dia: '1', nombre: 'espalda', series: '4', repeticiones: '5-4-3-2-1' },
      {key:'51',id: 87,dia: '3', nombre: 'caca', series: '4', repeticiones: '5-4-3-2-1' },
      {key:'58',id: 12,dia: '2', nombre: 'oh my god', series: '4', repeticiones: '5-4-3-2-1' }]},
      diasTotal:'',
      contador:1
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.obtenerEventos()
  }
  componentDidMount(){
    this.props.editable(this.state.rutina)
    this.contarDias()
  }
  contarDias(){
    aux=1
    num=1
    cant=[]
    cant.push(num)
    num++
    for(i=0;i<this.state.rutina.rutina.length;i++){
      if(this.state.rutina.rutina[i].dia>aux){
        aux=this.state.rutina.rutina[i].dia
        cant.push(num)
        num++
      }
    }
    this.setState({diasTotal:cant})
  }
  cuanto1(item){
    this.setState({contador:item})
  }
  cuanto2(){
    return this.state.contador
  }
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
          <ScrollView>
          <View style={{alignItems:'center', marginVertical:height*0.03}}>
          <TouchableOpacity onPress={() => {}}>
                <View style={styles.imageContainer}>
                <Image style={styles.image} source={this.state.rutina.imagen} />
                </View>
          </TouchableOpacity>
          </View>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.diasTotal}
              initialNumToRender={50}
              keyExtractor={(item) => {
                    return item;
                  }}
              renderItem={({ item }) => {
                aux=item
                return (
                  <View style={styles.cuadraditos}>
                    <DropDownItem key={item} contentVisible={false}
                      header={
                        <Text style={styles.detalleGenresTitles}>
                          Día {item}
                        </Text>
                      }
                    >
                      <FlatList
                  style={styles.contentList}
                  columnWrapperStyle={styles.listContainer}
                  data={this.state.rutina.rutina}
                  initialNumToRender={50}
                  keyExtractor={(item) => {
                    return item.key;
                  }}
                  renderItem={({ item }) => {
                    if (item.dia == aux){
                      return (
                        <TouchableOpacity style={styles.cuadraditosDeAdentro}
                          onPress={() => this.props.onPressInfo(item.nombre)}>
                          <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column' }}>
                              <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
                              <Text>Reps: {item.repeticiones}</Text>
                              <Text>Series: {item.series}</Text>
                            </View>

                          </View>
                        </TouchableOpacity>
                      )
                    }
                  }} />
                    </DropDownItem>
                  </View>
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
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width: 180,
    flexDirection: "column"
  },
  imageContainer: {
    height: height * 0.28,
    width: width * 0.51,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 4,
    borderColor: "#ebf0f7"
  },
  image: {
    height: height * 0.28,
    width: width * 0.51,
    borderWidth: 4,
    borderColor: "#ebf0f7"
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
    marginTop: 4,
    fontSize: 15,
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  detalleGenresTitles: {
    fontSize: 33,
    margin: 10,
    marginBottom: 2.5,
    color: '#3399ff',
    fontWeight: 'bold'
  },
  cuadraditos: {
    backgroundColor: 'black', marginBottom: 5, marginTop: 5, marginHorizontal: 10, paddingBottom: 10
  },
  cuadraditosDeAdentro: {
    backgroundColor: 'grey', marginVertical: 5, marginTop: 2, paddingVertical: 10, paddingLeft: 10, alignSelf: 'stretch', width: Dimensions.get('window').width * 0.88
  },
})

export default withNavigation(RutinaEspecifica);