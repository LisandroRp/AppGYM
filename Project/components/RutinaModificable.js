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
import { Reducer } from 'react-native-router-flux';
import { TextInput } from 'react-native-gesture-handler';
import { AsyncStorage, Modal } from 'react-native';
// import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
var { height, width } = Dimensions.get('window');

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

class RutinaModificable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      nombre: 'Nombre',
      modalVisible: false,
      userSelected: [],
      rutina: [],
      rutinaVacia: [],
      ultimoDia: 0,
      imagen:'',
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
    //this.obtenerEventos()
  }
  componentWillReceiveProps() {
    console.log('chauuuu')
    this._retrieveData()
  }
  componentWillMount(){
    this._retrieveModificable()
  }
  _retrieveModificable = async () => {
    try {
      const value = await AsyncStorage.getItem('rutinaEditable');
      rutinaNueva2=[]
      if (value !== null) {
          rutinaNueva2=JSON.parse(value)
          this.setState({rutina: rutinaNueva2.rutina, nombre:rutinaNueva2.nombre})
        }
        this.termino()
      }catch (error) {
      console.log(error);
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('rutina');
      if (value !== null) {
        if (this.yaEsta(JSON.parse(value)[0])) {
          this.setState({ isLoading: true })
          this.state.rutina.push(JSON.parse(value)[0])
          this.termino()
        } else {
          this._storeData()
          alert('Este ejercicio ya esta en el dia seleccionado')
        }
      }else{
        this.setState({isLoading:false})
      }
    } catch (error) {
      console.log(error);
    }
  };
  termino() {
    //console.log(this.state.rutina)
    this._storeData()
  }
  touch(dia) {
    if(this.diaAnterior(dia) || dia==1){
      this.setState({ ultimoDia: dia })
      this.props.onPressGo(dia,'modificar')
    }else{
      alert('Debe agregar ejercicios en el dia '+(dia-1)+' para poder agregar los en este dia')
    }
  }
  diaAnterior(dia){
    i=0
    while(i<this.state.rutina.length){
      if(this.state.rutina[i].dia== (dia-1)){
        return true
      }
      i++
    }
    return false
  }
  yaEsta(data) {
    for (i = 0; i < this.state.rutina.length; i++) {
      if (this.state.rutina[i].id == data.id) {
        if (this.state.rutina[i].dia == data.dia)
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
      })
    } catch (error) {
      console.log(error);
    }
  };
  subir(dia, id) {
    var aux
    var rutinaNueva = []
    var i = 0
    var flag = 0
    var fallador = 0
    while (i < this.state.rutina.length) {
      rutinaNueva.push(this.state.rutina[i])
      if (dia == this.state.rutina[i].dia && flag != 1) {
        fallador++
        if (id == this.state.rutina[i].id) {
          if (fallador != 1) {
            this.setState({ isLoading: true })
            rutinaNueva[i] = this.state.rutina[aux]
            rutinaNueva[aux] = this.state.rutina[i]
            flag = 1
          } else {
            return this.termino()
          }
        } else {
          aux = i
        }
      }
      i++
    }
    this.setState({ rutina: rutinaNueva })
    this.termino()
  }

  bajar(dia, id) {
    var aux
    var rutinaNueva = []
    var i = 0
    var flag = 0
    while (i < this.state.rutina.length) {
      rutinaNueva.push(this.state.rutina[i])
      if ((id == this.state.rutina[i].id && dia == this.state.rutina[i].dia) && flag != 1) {
          aux = i
          aux++
          if (aux < this.state.rutina.length) {
            while (aux != this.state.rutina.length && dia != this.state.rutina[aux].dia) {
              rutinaNueva.push(this.state.rutina[aux])
              aux++
            }
            if (aux != this.state.rutina.length) {
              this.setState({ isLoading: true })
              rutinaNueva.push(this.state.rutina[i])
              rutinaNueva[i] = this.state.rutina[aux]
              i = aux
              flag = 1
            }else {
              return this.termino()
            }
          } else {
            return this.termino()
          }
      }
      i++
    }
    this.setState({ rutina: rutinaNueva })
    this.termino()
  }
  borrar(dia, id) {
    var rutinaNueva = []
    var i = 0
    while (i < this.state.rutina.length) {
      if (id == this.state.rutina[i].id && dia == this.state.rutina[i].dia) {
        i++
      }
      if (i < this.state.rutina.length) {
        rutinaNueva.push(this.state.rutina[i])
      } else {
        this.setState({ rutina: rutinaNueva })
        this.termino()
      }
      i++
    }
    this.setState({ rutina: rutinaNueva })
    this.termino()
  }
  borrarTodo() {
    var rutinaVacia = []
    if(this.state.rutina.length != 0)
    {
      this.setState({ isLoading: true }) 
      this.setState({ rutina: rutinaVacia })
      this.termino()
    }
  }
  guardarRutina(){
    var aux=0
    rutinaNueva={id:0,nombre: '', imagen: require('./Fotos/PECHO.png'),dias:'',fav: 1, rutina:[]}
    for(i=0;i<this.state.rutina.length;i++){
      if(this.state.rutina[i].dia > aux){
        aux=this.state.rutina[i].dia
      }
    }
    rutinaNueva.id=this.nuevoId()
    rutinaNueva.nombre= this.state.nombre
    rutinaNueva.imagen= this.state.imagen
    rutinaNueva.dias=aux
    rutinaNueva.rutina=this.state.rutina
    console.log(rutinaNueva)
  }
  borrarRutina(){
    this.props.onPressCancelar()
  }
  nuevoId(){
    //buscar el ultimo id en la base de datos
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible});
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          {/* <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          <AntDesign name="up" size={1} color="white" />
                                <AntDesign name="down" size={1} color="white" />
                                <AntDesign name="delete" size={1} color="white" /> */}
        </View>
      );
    } else {
      return (
        // <View style={styles.container}>
        //   <Image style={styles.bgImage} source={require('./Pared.jpg')} />
        //   <ScrollView>
        //     <View style={styles.inputContainer}>
        //       <TextInput style={styles.TextContainer} maxLength={15} placeholder='Nombre' placeholderTextColor='black' onChangeText={(nombre) => this.setState({ nombre })} value={this.state.nombre}></TextInput>
        //       <TouchableOpacity onPress={() => { this.borrarTodo()}} style={styles.borrarTodo}>
        //         <AntDesign name="delete" size={20} color="white" />
        //       </TouchableOpacity>
        //     </View>
        //     <View style={styles.cuadraditos}>
        //       <DropDownItem key={1} contentVisible={false}
        //         header={
        //           <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //             <Text style={styles.detalleGenresTitles}>
        //               Dia 1
        //         </Text>
        //             <TouchableOpacity onPress={() => {
        //               this.touch('1');
        //             }} style={styles.fab}>
        //               <AntDesign name="plus" size={20} color="white" />
        //             </TouchableOpacity>
        //           </View>
        //         }
        //       >
        //         <FlatList
        //           style={styles.contentList}
        //           columnWrapperStyle={styles.listContainer}
        //           data={this.state.rutina}
        //           initialNumToRender={50}
        //           keyExtractor={(item) => {
        //             return item.key;
        //           }}
        //           renderItem={({ item }) => {
        //             if (item.dia == 1)
        //               return (
        //                 <TouchableOpacity style={styles.cuadraditosDeAdentro}
        //                   onPress={() => this.props.onPressInfo(item.nombre)}>
        //                   <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //                     <View style={{ flexDirection: 'column' }}>
        //                       <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
        //                       <Text>Reps: {item.repeticiones}</Text>
        //                       <Text>Series: {item.series}</Text>
        //                     </View>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                       <TouchableOpacity onPress={() => { this.subir(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="up" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="down" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id), this.setState({ isLoading: true }) }} style={styles.fab}>
        //                         <AntDesign name="delete" size={15} color="white" />
        //                       </TouchableOpacity>
        //                     </View>
        //                   </View>
        //                 </TouchableOpacity>
        //               )
        //           }} />
        //       </DropDownItem>
        //     </View>
        //     <View style={styles.cuadraditos}>
        //       <DropDownItem key={2} contentVisible={false}
        //         header={
        //           <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //             <Text style={styles.detalleGenresTitles}>
        //               Dia 2
        //         </Text>
        //             <TouchableOpacity onPress={() => {
        //               this.touch('2');
        //             }} style={styles.fab}>
        //               <AntDesign name="plus" size={20} color="white" />
        //             </TouchableOpacity>
        //           </View>
        //         }
        //       >
        //         <FlatList
        //           style={styles.contentList}
        //           columnWrapperStyle={styles.listContainer}
        //           data={this.state.rutina}
        //           initialNumToRender={50}
        //           keyExtractor={(item) => {
        //             return item.key;
        //           }}
        //           renderItem={({ item }) => {
        //             if (item.dia == 2)
        //               return (
        //                 <TouchableOpacity style={styles.cuadraditosDeAdentro}
        //                   onPress={() => this.props.onPressInfo(item.nombre)}>
        //                   <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //                     <View style={{ flexDirection: 'column' }}>
        //                       <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
        //                       <Text>Reps: {item.repeticiones}</Text>
        //                       <Text>Series: {item.series}</Text>
        //                     </View>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                       <TouchableOpacity onPress={() => { this.subir(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="up" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="down" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id), this.setState({ isLoading: true }) }} style={styles.fab}>
        //                         <AntDesign name="delete" size={15} color="white" />
        //                       </TouchableOpacity>
        //                     </View>
        //                   </View>
        //                 </TouchableOpacity>
        //               )
        //           }} />
        //       </DropDownItem>
        //     </View>
        //     <View style={styles.cuadraditos}>
        //       <DropDownItem key={3} contentVisible={false}
        //         header={
        //           <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //             <Text style={styles.detalleGenresTitles}>
        //               Dia 3
        //         </Text>
        //             <TouchableOpacity onPress={() => {
        //               this.touch('3');
        //             }} style={styles.fab}>
        //               <AntDesign name="plus" size={20} color="white" />
        //             </TouchableOpacity>
        //           </View>
        //         }
        //       >
        //         <FlatList
        //           style={styles.contentList}
        //           columnWrapperStyle={styles.listContainer}
        //           data={this.state.rutina}
        //           initialNumToRender={50}
        //           keyExtractor={(item) => {
        //             return item.key;
        //           }}
        //           renderItem={({ item }) => {
        //             if (item.dia == 3)
        //               return (
        //                 <TouchableOpacity style={styles.cuadraditosDeAdentro}
        //                   onPress={() => this.props.onPressInfo(item.nombre)}>
        //                   <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //                     <View style={{ flexDirection: 'column' }}>
        //                       <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
        //                       <Text>Reps: {item.repeticiones}</Text>
        //                       <Text>Series: {item.series}</Text>
        //                     </View>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                       <TouchableOpacity onPress={() => { this.subir(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="up" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="down" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id), this.setState({ isLoading: true }) }} style={styles.fab}>
        //                         <AntDesign name="delete" size={15} color="white" />
        //                       </TouchableOpacity>
        //                     </View>
        //                   </View>
        //                 </TouchableOpacity>
        //               )
        //           }} />
        //       </DropDownItem>
        //     </View>
        //     <View style={styles.cuadraditos}>
        //       <DropDownItem key={4} contentVisible={false}
        //         header={
        //           <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //             <Text style={styles.detalleGenresTitles}>
        //               Dia 4
        //         </Text>
        //             <TouchableOpacity onPress={() => {
        //               this.touch('4');
        //             }} style={styles.fab}>
        //               <AntDesign name="plus" size={20} color="white" />
        //             </TouchableOpacity>
        //           </View>
        //         }
        //       >
        //         <FlatList
        //           style={styles.contentList}
        //           columnWrapperStyle={styles.listContainer}
        //           data={this.state.rutina}
        //           initialNumToRender={50}
        //           keyExtractor={(item) => {
        //             return item.key;
        //           }}
        //           renderItem={({ item }) => {
        //             if (item.dia == 4)
        //               return (
        //                 <TouchableOpacity style={styles.cuadraditosDeAdentro}
        //                   onPress={() => this.props.onPressInfo(item.nombre)}>
        //                   <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //                     <View style={{ flexDirection: 'column' }}>
        //                       <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
        //                       <Text>Reps: {item.repeticiones}</Text>
        //                       <Text>Series: {item.series}</Text>
        //                     </View>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                       <TouchableOpacity onPress={() => { this.subir(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="up" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="down" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id), this.setState({ isLoading: true }) }} style={styles.fab}>
        //                         <AntDesign name="delete" size={15} color="white" />
        //                       </TouchableOpacity>
        //                     </View>
        //                   </View>
        //                 </TouchableOpacity>
        //               )
        //           }} />
        //       </DropDownItem>
        //     </View>
        //     <View style={styles.cuadraditos}>
        //       <DropDownItem key={5} contentVisible={false}
        //         header={
        //           <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //             <Text style={styles.detalleGenresTitles}>
        //               Dia 5
        //         </Text>
        //             <TouchableOpacity onPress={() => {
        //               this.touch('5');
        //             }} style={styles.fab}>
        //               <AntDesign name="plus" size={20} color="white" />
        //             </TouchableOpacity>
        //           </View>
        //         }
        //       >
        //         <FlatList
        //           style={styles.contentList}
        //           columnWrapperStyle={styles.listContainer}
        //           data={this.state.rutina}
        //           initialNumToRender={50}
        //           keyExtractor={(item) => {
        //             return item.key;
        //           }}
        //           renderItem={({ item }) => {
        //             if (item.dia == 5)
        //               return (
        //                 <TouchableOpacity style={styles.cuadraditosDeAdentro}
        //                   onPress={() => this.props.onPressInfo(item.nombre)}>
        //                   <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //                     <View style={{ flexDirection: 'column' }}>
        //                       <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
        //                       <Text>Reps: {item.repeticiones}</Text>
        //                       <Text>Series: {item.series}</Text>
        //                     </View>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                       <TouchableOpacity onPress={() => { this.subir(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="up" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="down" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id), this.setState({ isLoading: true }) }} style={styles.fab}>
        //                         <AntDesign name="delete" size={15} color="white" />
        //                       </TouchableOpacity>
        //                     </View>
        //                   </View>
        //                 </TouchableOpacity>
        //               )
        //           }} />
        //       </DropDownItem>
        //     </View>
        //     <View style={styles.cuadraditos}>
        //       <DropDownItem key={6} contentVisible={false}
        //         header={
        //           <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //             <Text style={styles.detalleGenresTitles}>
        //               Dia 6
        //         </Text>
        //             <TouchableOpacity onPress={() => {
        //               this.touch('6');
        //             }} style={styles.fab}>
        //               <AntDesign name="plus" size={20} color="white" />
        //             </TouchableOpacity>
        //           </View>
        //         }
        //       >
        //         <FlatList
        //           style={styles.contentList}
        //           columnWrapperStyle={styles.listContainer}
        //           data={this.state.rutina}
        //           initialNumToRender={50}
        //           keyExtractor={(item) => {
        //             return item.key;
        //           }}
        //           renderItem={({ item }) => {
        //             if (item.dia == 6)
        //               return (
        //                 <TouchableOpacity style={styles.cuadraditosDeAdentro}
        //                   onPress={() => this.props.onPressInfo(item.nombre)}>
        //                   <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //                     <View style={{ flexDirection: 'column' }}>
        //                       <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
        //                       <Text>Reps: {item.repeticiones}</Text>
        //                       <Text>Series: {item.series}</Text>
        //                     </View>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                       <TouchableOpacity onPress={() => { this.subir(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="up" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="down" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id), this.setState({ isLoading: true }) }} style={styles.fab}>
        //                         <AntDesign name="delete" size={15} color="white" />
        //                       </TouchableOpacity>
        //                     </View>
        //                   </View>
        //                 </TouchableOpacity>
        //               )
        //           }} />
        //       </DropDownItem>
        //     </View>
        //     <View style={styles.cuadraditos}>
        //       <DropDownItem key={7} contentVisible={false}
        //         header={
        //           <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //             <Text style={styles.detalleGenresTitles}>
        //               Dia 7
        //         </Text>
        //             <TouchableOpacity onPress={() => {
        //               this.touch('7');
        //             }} style={styles.fab}>
        //               <AntDesign name="plus" size={20} color="white" />
        //             </TouchableOpacity>
        //           </View>
        //         }
        //       >
        //         <FlatList
        //           style={styles.contentList}
        //           columnWrapperStyle={styles.listContainer}
        //           data={this.state.rutina}
        //           initialNumToRender={50}
        //           keyExtractor={(item) => {
        //             return item.key;
        //           }}
        //           renderItem={({ item }) => {
        //             if (item.dia == 7)
        //               return (
        //                 <TouchableOpacity style={styles.cuadraditosDeAdentro}
        //                   onPress={() => this.props.onPressInfo(item.nombre)}>
        //                   <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        //                     <View style={{ flexDirection: 'column' }}>
        //                       <Text style={{ fontWeight: 'bold' }}>{item.nombre}:</Text>
        //                       <Text>Reps: {item.repeticiones}</Text>
        //                       <Text>Series: {item.series}</Text>
        //                     </View>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                       <TouchableOpacity onPress={() => { this.subir(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="up" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id) }} style={styles.fab}>
        //                         <AntDesign name="down" size={15} color="white" />
        //                       </TouchableOpacity>
        //                       <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id), this.setState({ isLoading: true }) }} style={styles.fab}>
        //                         <AntDesign name="delete" size={15} color="white" />
        //                       </TouchableOpacity>
        //                     </View>
        //                   </View>
        //                 </TouchableOpacity>
        //               )
        //           }} />
        //       </DropDownItem>
        //     </View>
        //     <View style={{flexDirection: "row",justifyContent:'center', height:100}}>
        //     <TouchableOpacity style={styles.guardarButton} onPress={() => {this.setState({modalVisible:true})}}>
        //       <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
        //         Borrar
        //         </Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.guardarButton} onPress={() => {this.guardarRutina()}}>
        //       <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
        //         Guardar
        //         </Text>
        //     </TouchableOpacity>
        //     </View>
        //   </ScrollView>
        //   <Modal
        //     animationType="fade"
        //     visible={this.state.modalVisible}
        //     transparent={true}
        //     onRequestClose={() => this.setState({ modalVisible: false })}  >

        //     <View style={styles.modal}>
        //       {/* <View style={{ flexDirection: 'column' }}>
        //           <Text>Repeticiones:</Text>
        //           <Text>Series:</Text>
        //         </View> */}
        //       <View style={{ flexDirection: 'column', marginTop: height * 0.05}}>
        //       <Text style={styles.textButton}>Esta seguro que desea borrar la rutina "{this.state.nombre}"</Text>
        //       </View>
        //       <View style={styles.modal2}>
        //         <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: width * 0.12, backgroundColor: 'grey', borderRadius: 22 }}>
        //             <View style={[styles.buttonContainer]}
        //               onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
        //               <Text style={styles.textButton}> Cancel</Text>
        //             </View>
        //         </TouchableOpacity>
        //         {/* <View style={{borderColor: 'red', borderRightWidth: '2'}} /> */}
        //         <TouchableOpacity onPress={() => this.borrarRutina()} style={{ justifyContent: 'center', alignItems: 'center', borderLeftWidth: 2, paddingHorizontal: width * 0.12, backgroundColor: 'grey', borderBottomRightRadius: 22 }}>
        //             <View style={[styles.buttonContainer]}>
        //               <Text style={styles.textButton}>Accept</Text>
        //             </View>
        //         </TouchableOpacity>
        //       </View>
        //     </View>
        //   </Modal>
        // </View>
        <View></View>
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
    padding: 2
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    width: 180,
    flexDirection: "column"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 15,
    justifyContent: "space-between"
  },
  TextContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding:10,
    width: 300,
    height: 45,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  borrarTodo: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 25,
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
    backgroundColor: 'black', marginBottom: 5, marginTop: 5, marginHorizontal: 10, paddingBottom: 10, alignItems: 'center'
  },
  cuadraditosDeAdentro: {
    backgroundColor: 'grey', marginVertical: 5, marginTop: 2, paddingVertical: 10, paddingLeft: 10, alignSelf: 'stretch', width: Dimensions.get('window').width * 0.88
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
    backgroundColor: "grey",
    padding: 10,
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
  fab2: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 10,
    marginTop: 10,
  },
  guardarButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.33,
    marginHorizontal:22,
    alignSelf:'center'
  },
  DropDownItem: {
    alignItems: 'stretch'
  },
  //MODAAAAL
  modal: {
    height: height * 0.22,
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
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
})


export default withNavigation(RutinaModificable);