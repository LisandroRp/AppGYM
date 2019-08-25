import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Keyboard,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import { SearchBar } from "react-native-elements";
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { Marker } from 'react-native-maps';
import ApiController from '../controller/ApiController';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-gesture-handler";
import UserDataManager from './UserDataManager';
var { height, width } = Dimensions.get('window');
function createData(item,distance) {
  //console.log("This is the distance comming into the funciton create data: "+ distance)
  return {
    key: item._id,
    imagen: item.imagen,
    idEvento: item._id,
    nombre: item.nombre,
    rating: item.rating,
    descripcion: item.descripcion,
    tipo: item.tipo,
    fecha: item.fecha,
    duracion: item.duracion,
    personas: item.personas,
    ubicacion: item.ubicacion,
    latitude: item.latitude,
    precioE: item.precioE,
    longitude: item.longitude,
    distance: distance

  };
}
function createCoord(item) {
  return {
    //key: item._id,
    coordenadas: item.results[0].geometry.location

  };
}

function parseCoordenadasReact(item){
    return {
      longitude: item.coords.longitude,
      latitude: item.coords.latitude
    }
}
function createCoordForDistance(item){
  /*console.log("Creating coord for distance: " +  JSON.stringify(item));
  console.log("Creadting coord for: " + item.routes[0].legs[0].distance.text)*/
  return {
    distance: item.routes[0].legs[0].distance.text
  }
}

class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo: props.navigation.getParam('tipo'),
      modalVisible: false,
      userSelected: [],
      idEvento: null,
      isLoading: true,
      eventos: [],
      coordenadasNew: [],
      longitude: 0, //UserDataManager.getInstance().getLongitude(),
      latitude: 0, //UserDataManager.getInstance().getLatitude(),
      markerOk: false,
      coordenadasGuardadas: [],
      searchBarFocused: false,
      regionPosta: null,
      eventoMarcado: {
      },
      miLongitude: 0,
      miLatitude: 0,
      cambiados: [],
      cambiados2:[],
    };
    this.obtenerEventos()
    this.handlePress = this.handlePress.bind(this);
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    this.divididor=1500;
  }
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'white',
      height: 45,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };

  obtenerPos(){
      this.setState({ longitude: UserDataManager.getInstance().getLongitude(), })
      this.setState({ latitude: UserDataManager.getInstance().getLatitude(), })
      this.setState({ isLoading: false });
  }


//   getCurrentDistanceToEvent(Event){
//     let lat1 = this.state.latitude
//     let lon1 = this.state.longitude
//     if (this.state.latitude == null || this.state.longitude == null) {
//       return;
//     }
//     let lat2 = Event.latitude
//     let lon2 = Event.longitude
//     return this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)
// }

// getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//   var R = 6371; // Radius of the earth in km
//   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   var dLon = deg2rad(lon2-lon1); 
//   var a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2)
//     ; 
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   var d = R * c; // Distance in km
//   //console.log("Distance in KM " + d)
//   return d;
// }

// deg2rad(deg) {
//   return deg * (Math.PI/180)
// }
  obtenerEventos() {
    //this.getCurrentPositionFromReact()
    ApiController.getEventos(this.okEventos.bind(this));
  }
  okEventos(data) {
    if (data != null) {
      var i, newArray = [];
      for (i = 0; i < data.length; i++) {
        if (this.state.tipo == 'Recomendados') {
          if (data[i].rating >= 4) {
            newArray.push(createData(data[i]));
          }
        } else {
          if (data[i].tipo == this.state.tipo) {
            newArray.push(createData(data[i]));
          }
        }
      }
      // this.setState({ eventos: newArray, isLoading: false });
      this.setState({ eventos: newArray});
      this.obtenerPos()
      // newArray.map( (element) => {
      //   console.log("This is the element in the new array: " + JSON.stringify(element))
      //   console.log("This is the element's distance" + element.distance)
      // })
    } else {
      alert("Intentar de nuevo")
    }
  }
  okCoordenadas(data) {
    if (data != null) {
      var i, newArray = [];
      newArray = createCoord(data)
      this.setState({ coordenadasNew: newArray, longitude: newArray.coordenadas.lng, latitude: newArray.coordenadas.lat });
    } else {
      alert("Intentar de nuevo")
    }
  }
  handlePress(e) {
    console.log(e.nativeEvent.coordinate)
  }
  comprobar(marker){
    for(i=0;i<this.state.cambiados.length;i++){
      // console.log(marker.nombre)
      // console.log(marker.latitude)
      // console.log(marker.longitude)
      // console.log(this.state.cambiados[i].nombre)
      // console.log(this.state.cambiados[i].latitude)
      // console.log(this.state.cambiados[i].longitude)
      // console.log(this.state.cambiados[i].contador)
      if(marker.latitude == this.state.cambiados[i].latitude && marker.longitude == this.state.cambiados[i].longitude){
        if(this.state.cambiados[i].contador==0){

          this.state.cambiados[i].contador=1

        return(1)
        }
        if(this.state.cambiados[i].contador==1){

          this.state.cambiados[i].contador=2

          return(2)
        }
      }
    }
    Pos = {
      latitude: marker.latitude,
      longitude: marker.longitude,
      nombre: marker.nombre,
      contador: 0
    }
    this.state.cambiados.push(Pos)
    //this.setState({cambiados: this.state.cambiados2})
    //this.setState({cambiados2: []})
    return(0)
  }
  createMarker(marker) {
    cantidad=0;
    for (i = 0; i < this.state.coordenadasGuardadas.length; i++) {
      if (marker.latitude == this.state.coordenadasGuardadas[i].latitude && marker.longitude == this.state.coordenadasGuardadas[i].longitude) {
        cantidad= this.comprobar(this.state.coordenadasGuardadas[i])
        if(cantidad==0)
        {
          Pos = {
            latitude: marker.latitude + (0.1 / 1500),
            longitude: marker.longitude + (0.1 / 1500),
            nombre: marker.nombre,
            contador: 0
          }
          this.state.coordenadasGuardadas.push(Pos)
          return Pos;
        }
        if(cantidad==1){
          Pos = {
            latitude: marker.latitude + (0.1 / -1500),
            longitude: marker.longitude + (0.1 / -1500),
            nombre: marker.nombre,
            contador: 0
          }
          this.state.coordenadasGuardadas.push(Pos)
          return Pos;
        }
        if(cantidad==2){
          Pos = {
            latitude: marker.latitude + (0.1 / 750),
            longitude: marker.longitude + (0.1 / 750),
            nombre: marker.nombre,
            contador: 0
          }
          this.state.coordenadasGuardadas.push(Pos)
          return Pos;
        }
      }
    }
    Pos = {
      latitude: marker.latitude,
      longitude: marker.longitude,
      nombre: marker.nombre,
      contador: 0
    }
    this.state.coordenadasGuardadas.push(Pos)
    return Pos;
  }

  newKey() {
    var newKey = this.state.key++
    this.setState({ key: newKey })
    return newKey;
  }
  searchEvent2() {
    if (this.state.regionPosta != null) {
      ApiController.getCoordenadas(this.state.regionPosta, this.okCoordenadas.bind(this))
    }
  };
  searchEvent = value => {
    this.setState({ regionPosta: value })
    this.setState({ value })
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
    this.searchEvent2()
  }
  setModalVisible(visible, marker) {
    //console.log(marker)
    this.setState({ modalVisible: visible, eventoMarcado: marker, coordenadasGuardadas: [], cambiados:[]});
  }
  setModalInvisible(visible, marker) {
    this.setState({ modalVisible: visible, longitude: marker.longitude, latitude: marker.latitude});
  }
  detalles(){
    this.setModalInvisible(false,this.state.eventoMarcado)
    this.props.onPressGo(this.state.eventoMarcado.idEvento)
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
        </View>
      );
    } else {
      if (this.state.modalVisible == false) {
        return (
          <View style={styles.container}>
            {/* <View style={{ height: 50, backgroundColor: '#c45653', justifyContent: 'center', paddingHorizontal: 5 }}>

            <Animatable.View style={{ height: 30, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center', borderRadius: 45, }}>
              <Animatable.View animation={this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={1000}>
                <Icon name={this.state.searchBarFocused ? "md-arrow-back" : "ios-search"} style={{ fontSize: 24 }} />
              </Animatable.View>
              <TextInput placeholder="Search" style={{ fontSize: 24, marginLeft: 15, flex: 1 }} onChangeText={value => this.searchEvent2(value)} />
            </Animatable.View> 
            </View>
            */}
            <SearchBar
              placeholder="Search"
              platform='ios'
              onChangeText={value => this.searchEvent(value)}
              value={this.state.value}
              containerStyle={{ backgroundColor: 'white', height: 50, paddingBottom: 22 }}
              buttonStyle={{ paddingBottom: 22 }}
            />
            <MapView style={{ backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'red', position: 'absolute', top: 50, left: 0, bottom: 0, right: 0 }}
              showsUserLocation={true} initialRegion={{
                longitude: this.state.miLongitude,
                latitude: this.state.miLatitude,
                // longitude: this.state.longitude,
                // latitude: this.state.latitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={{
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            //onPress={this.handlePress}
            >
              {this.state.eventos.map(marker => (
                <Marker
                  key={marker.key}
                  coordinate={this.createMarker(marker)}
                  title={marker.nombre}
                  description={marker.ubicacion}
                  onPress={() => this.setModalVisible(true, marker)}>
                  <TouchableOpacity>
                    <Image style={{ width: 33, height: 33 }}
                      source={{ uri: "https://img.icons8.com/color/96/000000/marker.png" }} />
                  </TouchableOpacity>
                  {/* <View style={styles.marker}>
                  <Text style={styles.text}>{marker.nombre}</Text>
                  <Text>{marker.ubicacion}</Text>
                </View> */}
                </Marker>

              ))}
            </MapView>
          </View>
        );
      } else {
        return (
          <View style={styles.container2}>
          <Image style={styles.bgImage} source={require('./Mapa.jpg')}/>
          <Modal
            animationType="fade"
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}>

            <View style={styles.modal}>
              <TouchableOpacity onPress={() => {
                this.setModalInvisible(false, this.state.eventoMarcado);
              }} style={styles.fab}>
                <AntDesign name="close" size={22} color="white" style={{ marginLeft: 1, marginTop: 1.1 }} />
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
                <View style={{ flex: 0.5, flexDirection: 'row' }}>
                  <Image
                    style={{ width: 150, height: 245, marginLeft: 10, marginTop: 10, flex: 0.45, borderRadius: 10 }}
                    source={{ uri: this.state.eventoMarcado.imagen }}
                  />
                  <View style={{ flex: 0.55, flexDirection: 'column', alignContent: 'center', marginHorizontal: 10, marginTop: 20 }}>
                    <View style={{ borderRadius: 10, backgroundColor: 'white', height: 44, marginBottom: 10 }}>
                        <Text style={styles.detalleTitle}>
                          {this.state.eventoMarcado.nombre}
                        </Text>
                    </View>

                    <View style={styles.cositoGris} />

                    <View style={{ borderRadius: 10, backgroundColor: 'white', height: 40, marginBottom: 10, marginTop: 10, justifyContent: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name="calendar" size={15} color="#3399ff" />
                        <Text style={styles.detalleEvento}>
                          {this.state.eventoMarcado.fecha}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cositoGris} />

                    <View style={{ borderRadius: 10, backgroundColor: 'white', height: 40, marginBottom: 10, marginTop: 10, justifyContent: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name="clock" size={15} color="#3399ff" />
                        <Text style={styles.detalleEvento}>
                          {this.state.eventoMarcado.duracion}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cositoGris} />

                    <View style={{ borderRadius: 10, backgroundColor: 'white', height: 50, marginBottom: 10, marginTop: 10, justifyContent: 'center' }}>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <View style={styles.childView}><Text style={{fontSize: 15,textAlign: 'center',color: "#6666ff"}}>Entrada General:</Text>
                        <Text style={{fontSize: 15,textAlign: 'center',color: "#6666ff"}}>{this.state.eventoMarcado.precioE}$</Text>
                        </View>

                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop:270 }}>
                  <View style={[styles.outterButtonCreate]}>

                    <TouchableOpacity style={[styles.buttonContainer2, styles.loginButton]}
                      onPress={() => this.detalles(this.state.eventoMarcado.idEvento)}>
                      <Text style={styles.textButton}>Details</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'column', marginRight:30  }}>
                    <View style={styles.cositoGris} />

                    <View style={{ borderRadius: 10, backgroundColor: 'white', height: 50, marginBottom: 10, marginTop: 10, justifyContent: 'center', width:155}}>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>



                        <View style={{flexDirection:'row'}}><Image style={styles.StarImage} source={{ uri: this.Star }} /><Text style={styles.detalleEvento}>{this.state.eventoMarcado.rating}/5</Text></View>



                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          </View>
        )
      }
    }
  }
}


const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf0f7"
  },
  container2: {
    flex: 1,
    backgroundColor: "#ebf0f7"
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
  Mapa: {
    position: 'absolute',
    top: 50,
    left: 0,
    bottom: 0,
    right: 0
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  },
  modal: {
    height: height * 0.50,
    width: width * 0.80,
    position: 'absolute',
    top: height * 0.22,
    left: width * 0.11,
    backgroundColor: '#ebf0f7',
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: 'black',
    shadowOpacity: 5.0,
    paddingBottom: 33,
  },
  modalText: {
    fontSize: 20,
    margin: 10,
    color: '#3399ff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  fab: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginHorizontal: 5,
    marginTop: 8,
    marginRight:5,
    alignSelf: 'flex-end'
  },
  detalleTitle: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    marginTop:7,
    color: '#3399ff',
    fontWeight: 'bold',
  },
  cositoGris: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  detalleEvento: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: "#6666ff"
  },
  buttonContainer2: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
    marginRight: 15,
    marginLeft:22,
    width: 120,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  outterButtonCreate: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    marginLeft:5,
    paddingBottom: 3,
  },
  loginButton: {
    backgroundColor: "#3399ff",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    //elevation: 19,
  },
  StarImage: {
    marginTop:3,
    width: 33,
    height: 33,
    resizeMode: 'cover',
  },
})

export default withNavigation(Mapa);