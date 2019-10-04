import React, { Component } from 'react';
import { SearchBar, Icon, ThemeConsumer } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, Modal, TextInput } from 'react-native';
import ApiController from '../controller/ApiController'
import { FontAwesome } from '@expo/vector-icons';
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
import Ejercicios from './Ejercicios';
import { openDatabase } from 'react-native-sqlite-storage';
import RutinaNew from './RutinaNew';
// //Connction to access the pre-populated user_db.db
//const db = SQLite.openDatabase('AppGYM.db');
//Connction to access the pre-populated user_db.db
//var db = openDatabase({ name: 'AppGYM.db', createFromLocation : 1});
//Otro intento
// import { SQLite } from 'expo-sqlite'
// import { BaseModel, types } from 'expo-sqlite-orm'

var { height, width } = Dimensions.get('window');
function createData(item) {
  return {
    id: item.id,
    nombreEjercicio: item.no
  };
}

class MusculoAgregar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      //IdUser: props.navigation.getParam('IdUser'),
      searchBarFocused: false,
      FlatListItems: [],
      musculo: this.props.navigation.getParam('musculo'),
      dia: this.props.navigation.getParam('dia'),
      tipo: this.props.navigation.getParam('tipo'),
      modalVisible: false,
      ejercicios: [{ id: 1, musculo: 'Pecho', nombre: 'Press de Banca Plano', descripcion: '', ejecucion: '' },
      { id: 2, musculo: 'Pecho', nombre: 'Pechovich Inclinado' },
      { id: 3, musculo: 'Espalda', nombre: 'Trasnucovich' }],
      memory: [{ id: 1, musculo: 'Pecho', nombre: 'Press de Banca Plano', descripcion: '', ejecucion: '' },
      { id: 2, musculo: 'Pecho', nombre: 'Pechovich Inclinado' },
      { id: 3, musculo: 'Espalda', nombre: 'Trasnucovich' }],
      isLoading: false,
      modalVisible: false,
      idEjercicio: 0,
      nombreEjercicio: '',
      musculoEjercicio: '',
      series: '',
      repeticiones: '',
      rutinaNueva: [],
      ejercicioNuevo: [{ id: 0, nombre: '', repeticiones: '', series: '' }]
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.Star = 'https://img.icons8.com/color/96/000000/christmas-star.png';
    //this._storeData(this.state.IdUser);
    //this.getUserData()
    //this.obtenerEventos();
    //this.obtenerEjercicios();
  }
  // static get database() {
  //   return async () => SQLite.openDatabase('AppGYM.db')
  // }

  // static get tableName() {
  //   return 'animals'
  // }
  // obtenerEjercicios(){
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM Ejercicios', [], (tx, results) => {
  //       var temp = [];
  //       console.log(temp +'Pedro')
  //       for (let i = 0; i < results.rows.length; ++i) {
  //         temp.push(results.rows.item(i));
  //         console.log(temp +'hola')
  //       }
  //       this.setState({
  //         ejercicios: temp,
  //       });
  //     },
  //     () => {console.log('fail')},
  // () => {console.log('success')}
  // );
  //   });
  // }
  // ListViewItemSeparator = () => {
  //   return (
  //     <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
  //   );
  // };
  esGenero(genero) {
    for (i = 0; i <= this.state.generoEvento.length; i++) {
      if (this.state.generoEvento[i] == genero) {
        return true
      }
    }
    return false
  }
  guardarEjercicio() {
    this.setState({ modalVisible: false})
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('rutina');
      if (value != null) {
        this.setState({
          rutinaNueva: JSON.parse(value),

        })
        this.cargarEjercicio();
      }
      else {
        this.cargarEjercicio()
      }
    } catch (error) {
      console.log(error);
    }
  };
  cargarEjercicio() {
    terminada = {
      key: this.state.dia +'.'+ this.state.idEjercicio,
      id: this.state.idEjercicio,
      musculo: this.state.musculoEjercicio,
      nombre: this.state.nombreEjercicio,
      repeticiones: this.state.repeticiones,
      series: this.state.series,
      dia: this.state.dia
    }
    this.state.rutinaNueva.push(terminada)
    this.props.onPressSave(this.state.rutinaNueva,this.state.tipo)
  }
  setModalVisible(visible, id, nombre, musculo) {
    this.setState({ modalVisible: visible, nombreEjercicio: nombre, idEjercicio: id, musculoEjercicio: musculo });
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
                  <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id, item.nombre, item.descripcion, this.state.dia)}>
                    <View style={{ flexDirection: "row" }} >
                      <Image style={styles.image} source={{ uri: item.imagen }} />
                      <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.nombre}</Text>
                        <Text style={styles.descripcion}>{item.descripcion}</Text>
                      </View>
                      <View style={styles.masita}>
                        <FontAwesome name="plus" style={styles.plus}
                          onPress={() => this.setModalVisible(true, item.id, item.nombre, item.musculo)}
                          size={44}
                        /></View>
                    </View>
                  </TouchableOpacity>
                )
            }
            } />
          <Modal
            animationType="fade"
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}  >

            <View style={styles.modal}>
              {/* <View style={{ flexDirection: 'column' }}>
                  <Text>Repeticiones:</Text>
                  <Text>Series:</Text>
                </View> */}
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: height * 0.03 }}>
                <View style={styles.containerInput}>
                  <TextInput placeholder='Series' style={styles.textInput} multiline={true} autoFocus={true} maxLength={1} onChangeText={(text) => this.setState({ series: text })} value={this.state.series}></TextInput>
                </View>
                <View style={styles.containerInput}>
                  <TextInput placeholder='Repeticiones' style={styles.textInput} multiline={true} autoFocus={true} maxLength={15} onChangeText={(text) => this.setState({ repeticiones: text })} value={this.state.repeticiones}></TextInput>
                </View>
              </View>
              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: width * 0.12, backgroundColor: 'grey', borderRadius: 22 }}>
                    <View style={[styles.buttonContainer]}
                      onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                      <Text style={styles.textButton}> Cancel</Text>
                    </View>
                </TouchableOpacity>
                {/* <View style={{borderColor: 'red', borderRightWidth: '2'}} /> */}
                <TouchableOpacity onPress={() => this.guardarEjercicio()} style={{ justifyContent: 'center', alignItems: 'center', borderLeftWidth: 2, paddingHorizontal: width * 0.12, backgroundColor: 'grey', borderBottomRightRadius: 22 }}>
                    <View style={[styles.buttonContainer]}>
                      <Text style={styles.textButton}>Accept</Text>
                    </View>

                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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

  textInput: {
    color: '#3399ff',
    fontSize: 20,
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  CircleShapeView: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#6666ff',
    marginTop: 15,
    alignItems: 'center',
    alignContent: 'center'
  },
  textButton: {
    color: '#3399ff',
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  SubmitButtonStyle: {
    width: 100,
    height: 50,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#373737',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#fff'
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
  masita: {
    alignItems: "center",
    alignContent: 'center',
    justifyContent: 'center',
  },
  plus: {
    alignItems: "center",
    alignContent: 'center',
    alignSelf: 'center',
    color: 'white',
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
  modal: {
    height: height * 0.25,
    width: width * 0.75,
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.13,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 5.0,
    borderRadius: 22
  },
  modal2: {
    flexDirection: 'row', borderColor: 'black', borderTopWidth: 2, width: width * 0.74, height: height * 0.08, position: 'absolute', bottom: 0
  },
  modalText: {
    fontSize: 20,
    margin: 10,
    color: '#3399ff',
    fontWeight: 'bold'
  },
  textInput: {
    color: '#3399ff',
    fontSize: 20,
    alignSelf: 'center',
  },
  CircleShapeView: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#6666ff',
    marginTop: 15,
    alignItems: 'center',
    alignContent: 'center'
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  SubmitButtonStyle: {
    width: 100,
    height: 50,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#373737',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#fff'
  },
  containerInput: {
    backgroundColor: 'white',
    marginVertical: 4,
    borderRadius: 22,
    height: height * 0.04,
    width: width * 0.5
  }
})

export default withNavigation(MusculoAgregar);