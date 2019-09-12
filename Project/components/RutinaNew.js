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
import { LinearGradient } from 'expo'
import DropDownItem from 'react-native-drop-down-item';
import { Reducer } from 'react-native-router-flux';
import { TextInput } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';


function createData(item) {
  return {
    key: item.id,
    id: item.id,
    nombre: item.nombre,
    musculo: item.musculo,
    repeticiones: item.repeticiones,
    series: item.series,
  };
}

class RutinaNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: 'lorenzo',
      modalVisible: false,
      userSelected: [],
      rutina1: [],
      rutina: [],
      musculos: [{ id: 1, musculo: 'Pecho', imagen: require('./Fotos/PECHO.png') },
      { id: 2, musculo: 'Espalda', imagen: require('./Fotos/ESPALDA.png') },
      { "id": 3, "musculo": 'Hombros', "imagen": require('./Fotos/HOMBROS.png') },
      { id: 4, musculo: 'Piernas', imagen: require('./Fotos/PIERNAS.png') },
      { id: 5, musculo: 'Biceps', imagen: require('./Fotos/BICEPS.png') },
      { id: 6, musculo: 'Triceps', imagen: require('./Fotos/TRICEPS.png') },
      { id: 7, musculo: 'Abdominales', imagen: require('./Fotos/ABS.png') },
      { id: 8, musculo: 'Cardio', imagen: require('./Fotos/CARDIO.png') }],
      isLoading: false,
      refreshing: false,
      rutinaVacia: [],
      flag: 1,
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.obtenerEventos()
  }

  cargar() {
    if (this.state.flag == 0) {
      this.setState({ isLoading: true })
      this._retrieveData()
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('rutina');
      if (value !== null) {
        if (this.yaEsta(JSON.parse(value)[0])) {
          this.state.rutina.push(JSON.parse(value)[0])
          this.termino()
        }
        else{
          this._storeData()
          alert('Este ejercicio ya esta en el dia seleccionado')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  termino() {
    console.log(this.state.rutina)
    this._storeData()
  }
  touch(musculo) {
    this.setState({
      flag: 0
    })
    this.props.onPressGo(musculo)
  }
  yaEsta(data){
    for(i=0;i<this.state.rutina.length;i++){
      if(this.state.rutina[i].id==data.id)
      {
        return false
      }
    }
    return true
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('rutina', JSON.stringify(this.state.rutinaVacia));
      this.setState({
        isLoading: false,
        flag: 1
      })
    } catch (error) {
      console.log(error);
    }
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
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.cargar.bind(this)}
            />
          }>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputContainer} placeholder='Nombre' placeholderTextColor='black'></TextInput>
            </View>
            <View style={styles.cuadraditos}>
              <DropDownItem key={1} contentVisible={false}
                header={
                  <View style={{flexDirection: 'row',justifyContent: "space-between", alignItems:'center'}}>
                    <Text style={styles.detalleGenresTitles}>
                      Pecho
                </Text>
                    <TouchableOpacity onPress={() => {
                      this.touch('Pecho');
                    }} style={styles.fab}>
                      <AntDesign name="plus" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                }
              >
                <FlatList
                  style={styles.contentList}
                  columnWrapperStyle={styles.listContainer}
                  data={this.state.rutina}
                  initialNumToRender={50}
                  keyExtractor={(item) => {
                    return item.id;
                  }}
                  renderItem={({ item }) => {
                    if (item.musculo == 'Pecho')
                      return (
                        <TouchableOpacity style={styles.card} onPress={() => this.props.onPressInfo(item.nombre)}>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={{fontWeight: 'bold'}}>{item.nombre}</Text>
                          <Text>Reps: {item.repeticiones}</Text>
                          <Text>Series: {item.series}</Text>
                          </View>
                          </TouchableOpacity>
                      )
                  }} />
              </DropDownItem>
            </View>
            <View style={styles.cuadraditos}>
              <DropDownItem key={2} contentVisible={false}
                header={
                  <Text style={styles.detalleGenresTitles}>
                    Espalda
                </Text>
                }
              >
              <FlatList
                  style={styles.contentList}
                  columnWrapperStyle={styles.listContainer}
                  data={this.state.rutina}
                  initialNumToRender={50}
                  keyExtractor={(item) => {
                    return item.id;
                  }}
                  renderItem={({ item }) => {
                    if (item.musculo == 'Espada')
                      return (
                        <TouchableOpacity style={styles.card} onPress={() => this.props.onPressInfo(item.nombre)}>
                          <Text>{item.nombre}</Text></TouchableOpacity>
                      )
                  }} />
              </DropDownItem>
            </View>
            <View style={styles.cuadraditos}>
              <DropDownItem key={1} contentVisible={false}
                header={
                  <Text style={styles.detalleGenresTitles}>
                    Hombros
                </Text>
                }
              >
              </DropDownItem>
            </View>
            <View style={styles.cuadraditos}>
              <DropDownItem key={1} contentVisible={false}
                header={
                  <Text style={styles.detalleGenresTitles}>
                    Piernas
                </Text>
                }
              >
              </DropDownItem>
            </View>
            <View style={styles.cuadraditos}>
              <DropDownItem key={1} contentVisible={false}
                header={
                  <Text style={styles.detalleGenresTitles}>
                    Biceps
                </Text>
                }
              >
              </DropDownItem>
            </View>
            <View style={styles.cuadraditos}>
              <DropDownItem key={1} contentVisible={false}
                header={
                  <Text style={styles.detalleGenresTitles}>
                    Triceps
                </Text>
                }
              >
              </DropDownItem>
            </View>
            <View style={styles.cuadraditos}>
              <DropDownItem key={1} contentVisible={false}
                header={
                  <Text style={styles.detalleGenresTitles}>
                    Abdominales
                </Text>
                }
              >
              </DropDownItem>
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
    backgroundColor: "grey"
  },
  contentList: {
    flexDirection: 'row',
    padding: 2,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width: 180,
    flexDirection: "column"
  },
  inputContainer: {
    backgroundColor: 'grey',
    borderRadius: 30,
    width: 300,
    height: 45,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width / 2 - 4,
    height: 200,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  image: {
    width: Dimensions.get('window').width / 2 - 4,
    height: 200,
  },
  cuadraditos: {
    borderRadius: 10, backgroundColor: 'black', marginBottom: 10, marginTop: 10, marginHorizontal: 10, paddingBottom: 10
  },
  cuadraditosDeAdentro: {
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
    backgroundColor: "grey",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
    color: 'white'
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
  fab: {
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 10,
    marginTop: 10,
},
})


export default withNavigation(RutinaNew);