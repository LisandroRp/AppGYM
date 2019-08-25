import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import {SearchBar } from "react-native-elements";
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import {AsyncStorage} from 'react-native';
import { Marker } from 'react-native-maps';
import ApiController from '../controller/ApiController';





class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      idEvento: null,
      evento: {},
      isLoading: true,
      marker: {},
    };
    
    this.handlePress = this.handlePress.bind(this);
    this._retrieveData();
  }
  static navigationOptions = {
    title: 'Map',
    headerStyle: {
      backgroundColor: 'white',
      height:45,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
cargarDetalle() {
  ApiController.getDetalle(this.okDetalle.bind(this), this.state.idEvento);
}
okDetalle(data) {
  if (data != null) {
      this.setState({
          evento: data[0],
      });
      this.createMarker();
  } else {
      alert("Intentar de nuevo")
  }
}
      handlePress(e) {
          //console.log(e.nativeEvent.coordinate)
      }

      _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('IdEvento');
            if (value !== null) {
                this.setState({idEvento: value})
                this.cargarDetalle();
            }
        } catch (error) {
            console.log(error);
        }
    };
    createMarker(){
      Pos={
        latitude:this.state.evento.latitude,
        longitude:this.state.evento.longitude,
      }
      this.setState({marker: Pos})
      this.setState({isLoading: false})
    }
  render() {
    if (this.state.isLoading) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
          </View>
      );
  } else {
    return (
      <View style={styles.container}>
      <MapView style={styles.Mapa} 
                showsUserLocation={true} initialRegion={{
                    latitude: this.state.evento.latitude,
                    longitude: this.state.evento.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={this.handlePress}
          >
    <Marker
        coordinate={this.state.marker}
        title={this.state.evento.nombre}
        description={this.state.evento.ubicacion}>
        <Image style={{ width: 33, height: 33}}
               source={{uri: "https://img.icons8.com/color/96/000000/marker.png"}}/>
     </Marker>
        </MapView>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ebf0f7"
  },
  Mapa:{
      position: 'absolute',
      top: 0,
      left:0,
      bottom: 0,
      right: 0
  },
  marker:{
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }

})

export default withNavigation(Mapa);