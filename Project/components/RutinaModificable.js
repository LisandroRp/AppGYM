import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorLogos from './Fotos/ExportadorLogos';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Modal,
  AsyncStorage
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
      nombre: this.props.navigation.getParam("nombre_rutina"),
      nombreNuevo: this.props.navigation.getParam("nombre_rutina"),
      modalGuardarVisible: false,
      modalBorrarTodoVisible: false,
      userSelected: [],
      rutina: [],
      rutina2: [],
      rutinaVacia: [],
      ultimoDia: 0,
      imagen: '',
      diasTotal: [1, 2, 3, 4, 5, 6, 7],
      id_rutina: '',
      update: false
    };
  }

  componentWillReceiveProps() {
    this._retrieveData()
  }
  componentWillMount() {
    this._retrieveModificable()
  }
  _retrieveModificable = async () => {
    try {
      const value = await AsyncStorage.getItem('rutinaEditable');
      rutinaNueva2 = []
      if (value !== null) {
        rutinaNueva2 = JSON.parse(value)
        this.setState({ rutina: rutinaNueva2.rutina, rutina2: rutinaNueva2.rutina })
      }
      this.termino()
    } catch (error) {
      console.log(error);
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('rutina');

      if (value !== null) {
        //console.log(value)
        if (this.yaEsta(JSON.parse(value)[0])) {
          this.setState({ isLoading: true })
          this.state.rutina.push(JSON.parse(value)[0])
          this.termino()
        } else {
          this._storeData()
          alert('Este ejercicio ya esta en el dia seleccionado')
        }
      } else {
        this.setState({ isLoading: false })
      }
    } catch (error) {
      console.log(error);
    }
  };
  termino() {
    this._storeData()
  }
  touch(dia) {
    if (this.diaAnterior(dia) || dia == 1) {
      this.setState({ ultimoDia: dia })
      this.props.onPressGo(dia, 'modificar')
    } else {
      alert('Debe agregar ejercicios en el dia ' + (dia - 1) + ' para poder agregar los en este dia')
    }
  }
  diaAnterior(dia) {
    i = 0
    while (i < this.state.rutina.length) {
      if (this.state.rutina[i].dia == (dia - 1)) {
        return true
      }
      i++
    }
    return false
  }
  yaEsta(data) {
    for (i = 0; i < this.state.rutina.length; i++) {
      if (this.state.rutina[i].id_ejercicio == data.id_ejercicio) {
        if (this.state.rutina[i].dia == data.dia)
          return false
      }
    }
    return true
  }
  _storeData = async () => {
    try {
      //await AsyncStorage.setItem('rutina', JSON.stringify(this.state.rutinaVacia));
      await AsyncStorage.removeItem('rutina')
      this.setState({
        isLoading: false,
      })
    } catch (error) {
      console.log(error);
    }
  };

  subir(dia, id_ejercicio, combinado) {
    rutinaNueva = []
    aux = 0
    posicionASubir = 0
    posicionABajar = 0

    for(i=0; i<this.state.rutina.length;i++){
      rutinaNueva.push(this.state.rutina[i])
      if(rutinaNueva[i].id_ejercicio == id_ejercicio && rutinaNueva[i].dia == dia){
        posicionASubir=i
      }
    }
    if(rutinaNueva[posicionASubir].posicion == "1")
    {
      this.termino()
    }else{
      this.setState({isLoading: true})
    for(i=0; i< rutinaNueva.length;i++){
      if((rutinaNueva[i].posicion == rutinaNueva[posicionASubir].posicion-1) && rutinaNueva[i].dia == dia){
        if(rutinaNueva[i].combinado == null){
          posicionABajar=i
        }else{
          posicionABajar=(i-1)
        }
      }
    }
      if (combinado == null) {
        //Ninguno Combinado
        if (rutinaNueva[posicionABajar].combinado == null) {
          console.log("Ninguno Combinado")
          aux= rutinaNueva[posicionASubir].posicion

          rutinaNueva[posicionASubir].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[posicionABajar].posicion = aux

        } else {
          //El que baja es Combinado
          console.log("el que baja es Combinado")
          aux = rutinaNueva[posicionASubir].posicion

          rutinaNueva[posicionASubir].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[posicionABajar].posicion = aux
          rutinaNueva[(posicionABajar + 1)].posicion = aux

        }
      } else {
        //El que sube es combinado
        if (rutinaNueva[posicionABajar].combinado == null) {
          console.log("El que sube es combinado")
          aux= rutinaNueva[posicionASubir].posicion

          rutinaNueva[posicionASubir].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[(posicionASubir + 1)].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[posicionABajar].posicion = aux

        } else {
          //Dos Combinados
          console.log("Dos Combinados")
          aux= rutinaNueva[posicionASubir].posicion

          rutinaNueva[posicionASubir].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[(posicionASubir + 1)].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[posicionABajar].posicion = aux
          rutinaNueva[(posicionABajar + 1)].posicion = aux
        
        }
      }
      this.setState({rutina: rutinaNueva })
      this.termino()
    }
  }

  // bajar(dia, id_ejercicio, combinado) {
  //     var aux
  //     var rutinaNueva = []
  //     var i = 0
  //     var flag = 0
  //     console.log(this.state.rutina)
  //     while (i < this.state.rutina.length) {

  //       rutinaNueva.push(this.state.rutina[i])
  //       console.log(i)
  //       if ((id_ejercicio == this.state.rutina[i].id_ejercicio && dia == this.state.rutina[i].dia) && flag != 1) {
  //         aux = i
  //         aux++

  //         if (aux < this.state.rutina.length) {
  //           if (combinado == null) {
  //             while (aux != this.state.rutina.length && dia != this.state.rutina[aux].dia) {
  //               rutinaNueva.push(this.state.rutina[aux])
  //               aux++
  //             }
  //             if (aux != this.state.rutina.length) {
  //               this.setState({ isLoading: true })
  //               if (this.state.rutina[aux].combinado == null) {
  //                 rutinaNueva.push(this.state.rutina[i])
  //                 rutinaNueva[i] = this.state.rutina[aux]
  //                 i = aux
  //               } else {
  //                 rutinaNueva = []
  //                 for (a = 0; a < i; a++) {
  //                   rutinaNueva.push(this.state.rutina[a])
  //                 }
  //                 console.log("**********************************")
  //                 console.log("rutina nueva mitad")
  //                 console.log(rutinaNueva)
  //                 rutinaNueva.push(this.state.rutina[aux])
  //                 rutinaNueva.push(this.state.rutina[(aux + 1)])
  //                 for (a = (i + 2); a < aux; a++) {
  //                   rutinaNueva.push(this.state.rutina[a])
  //                 }
  //                 console.log("**********************************")
  //                 console.log("rutina nueva mitad mitaddd")
  //                 console.log(rutinaNueva)
  //                 rutinaNueva.push(this.state.rutina[i])
  //                 console.log("**********************************")
  //                 console.log("rutina nueva mitad f inalll")
  //                 console.log(rutinaNueva)
  //                 for (a = (aux + 1); a < this.state.rutina.length; a++) {
  //                   rutinaNueva.push(this.state.rutina[a])
  //                 }
  //                 console.log("**********************************")
  //                 console.log("rutina nueva finalllll")
  //                 console.log(rutinaNueva)
  //               }
  //               this.setState({ rutina: rutinaNueva })
  //               return this.termino()
  //             }
  //             return this.termino()
  //             flag = 1
  //           } else {
  //             aux++
  //             while (aux != this.state.rutina.length && dia != this.state.rutina[aux].dia) {
  //               rutinaNueva.push(this.state.rutina[aux])
  //               aux++
  //             }
  //             if (aux != this.state.rutina.length) {
  //               this.setState({ isLoading: true })
  //               rutinaNueva.push(this.state.rutina[i])
  //               rutinaNueva.push(this.state.rutina[(i + 1)])
  //               rutinaNueva[i] = this.state.rutina[aux]
  //               i = aux
  //               this.setState({ rutina: rutinaNueva })
  //               flag = 1
  //             }
  //             return this.termino()
  //           }
  //         } else {
  //           return this.termino()
  //         }
  //       }
  //       i++
  //     }
  //     this.setState({ rutina: rutinaNueva })
  //     this.termino()
  //   }

  //   borrar(dia, id_ejercicio) {
  //     var rutinaNueva = []
  //     var i = 0
  //     while (i < this.state.rutina.length) {
  //       if (id_ejercicio == this.state.rutina[i].id_ejercicio && dia == this.state.rutina[i].dia) {
  //         i++
  //       }
  //       if (i < this.state.rutina.length) {
  //         rutinaNueva.push(this.state.rutina[i])
  //       } else {
  //         this.setState({ rutina: rutinaNueva })
  //         this.termino()
  //       }
  //       i++
  //     }
  //     this.setState({ rutina: rutinaNueva })
  //     this.termino()
  // }
  bajar(dia, id_ejercicio, combinado) {
    rutinaNueva = []
    aux = 0
    maxPosDia=0
    posicionASubir = (-5)
    posicionABajar = 0
    flag=0

    for(i=0; i<this.state.rutina.length; i++){
      rutinaNueva.push(this.state.rutina[i])
      if(rutinaNueva[i].dia == dia){
      if(rutinaNueva[i].id_ejercicio == id_ejercicio){
        posicionABajar=i
        flag=1
      }
      if(flag != 0 && (rutinaNueva[i].posicion == parseInt(rutinaNueva[posicionABajar].posicion)+1)){
        if(rutinaNueva[i].combinado == null){
          posicionASubir=i
        }else{
          posicionASubir=(i-1)
        }
      }
      maxPosDia++
    }
    }
    if((-5) == posicionASubir)
    {
      this.termino()
    }else{
      this.setState({isLoading: true})
      if (combinado == null) {
        //Ninguno Combinado
        if (rutinaNueva[posicionASubir].combinado == null) {
          console.log("Ninguno Combinado")
          aux= rutinaNueva[posicionABajar].posicion

          rutinaNueva[posicionABajar].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[posicionASubir].posicion = aux

        } else {
          //El que sube es Combinado
          console.log("el que sube es Combinado")
          aux = rutinaNueva[posicionABajar].posicion

          rutinaNueva[posicionABajar].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[posicionASubir].posicion = aux
          rutinaNueva[(posicionASubir + 1)].posicion = aux

        }
      } else {
        //El que baja es combinado
        if (rutinaNueva[posicionASubir].combinado == null) {
          console.log("El que baja es combinado")
          aux= rutinaNueva[posicionABajar].posicion

          rutinaNueva[posicionABajar].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[(posicionABajar + 1)].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[posicionASubir].posicion = aux

        } else {
          //Dos Combinados
          console.log("Dos Combinados")
          aux= rutinaNueva[posicionABajar].posicion

          rutinaNueva[posicionABajar].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[(posicionABajar + 1)].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[posicionASubir].posicion = aux
          rutinaNueva[(posicionASubir + 1)].posicion = aux
        
        }
      }
      this.setState({rutina: rutinaNueva })
      this.termino()
    }
  }


  borrar(dia, id_ejercicio) {
    var rutinaNueva = []
    var i = 0
    while (i < this.state.rutina.length) {
      if (id_ejercicio == this.state.rutina[i].id_ejercicio && dia == this.state.rutina[i].dia) {
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
    if (this.state.rutina.length != 0) {
      this.setState({ isLoading: true, modalBorrarTodoVisible: false })
      this.setState({ rutina: rutinaVacia })
      this.termino()
    }
  }
  guardarRutina() {
    this.setState({ modalGuardarVisible: false })
    var aux = 0
    rutinaNueva = { id_rutina: 0, nombre: '', imagen: require('./Fotos/Ejercicios/PECHO.png'), dias: '', favoritos: 1, rutina: [] }
    for (i = 0; i < this.state.rutina.length; i++) {
      if (this.state.rutina[i].dia > aux) {
        aux = this.state.rutina[i].dia
      }
    }
    rutinaNueva.id_rutina = this.props.navigation.getParam("id_rutina")
    rutinaNueva.nombre = this.state.nombreNuevo
    rutinaNueva.imagen = this.state.imagen
    rutinaNueva.dias = (Math.floor(aux)).toString()
    rutinaNueva.rutina = this.state.rutina
    base.borrarEjerciciosRutina(this.props.navigation.getParam("id_rutina"), rutinaNueva, this.seBorraronEjercicios.bind(this));
  }
  seBorraronEjercicios(rutinaNueva) {
    base.crearEjerciciosRutina(rutinaNueva, this.okEjerciciosRutinaCreados.bind(this))
    //base.conseguirIdRutinaParaGuardar(rutinaNueva, this.okIdRutina.bind(this))
  }
  okIdRutina(rutinaNueva) {
    base.crearEjerciciosRutina(rutinaNueva, this.okEjerciciosRutinaCreados.bind(this))
  }
  okEjerciciosRutinaCreados(rutinaNueva) {
    base.actualizarRutina(rutinaNueva, this.okRutinaActualizada.bind(this))
    //this.props.onPressActualizar(this.props.navigation.getParam("id_rutina"), this.props.navigation.getParam("nombre_rutina"))
  }
  okRutinaActualizada() {
    this.props.onPressActualizar(this.props.navigation.getParam("id_rutina"), this.props.navigation.getParam("nombre_rutina"))
  }
  borrarRutina(id_rutina) {
    this.setModalGuardarVisible(!this.state.modalGuardarVisible)
    base.borrarRutina(id_rutina, this.okRutinaBorrada.bind(this))
  }
  okRutinaBorrada() {
    this.props.onPressCancelar()
  }
  setModalGuardarVisible(visible) {
    this.setState({ modalGuardarVisible: visible });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          <AntDesign name="up" size={1} color="white" />
          <AntDesign name="down" size={1} color="white" />
          <AntDesign name="delete" size={1} color="white" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ScrollView>
            <View style={styles.inputContainer}>
              <TextInput style={styles.TextContainer} maxLength={15} placeholder={this.props.navigation.getParam("nombre_rutina")} placeholderTextColor='black' onChangeText={(nombreNuevo) => this.setState({ nombreNuevo })} value={this.state.nombreNuevo}></TextInput>
              <TouchableOpacity onPress={() => { this.setState({ modalBorrarTodoVisible: true }) }} style={styles.borrarTodo}>
                <AntDesign name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* ************************************************************************
            ******************************DropDownn Aca*********************************
            **************************************************************************** */}
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.diasTotal}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.toString();
              }}
              renderItem={({ item }) => {
                aux = item
                contadorCobinadosFlatlist = false
                local = this.state.rutina
                return (
                  <View style={styles.cuadraditos}>
                    <DropDownItem key={1} contentVisible={false}
                      header={
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                          <Text style={styles.detalleGenresTitles}>
                            Día {item}
                          </Text>
                          <TouchableOpacity onPress={() => {
                            this.touch(item);
                          }} style={styles.fab}>
                            <AntDesign name="plus" size={20} color="white" />
                          </TouchableOpacity>
                        </View>
                      }
                    >
                      <FlatList
                        style={styles.contentList}
                        columnWrapperStyle={styles.listContainer}
                        //data={this.state.rutina}
                        data={local.sort((a, b) => a.posicion.localeCompare(b.posicion))}
                        initialNumToRender={50}
                        keyExtractor={(item) => {
                          return (item.dia + item.id_ejercicio.toString());
                        }}
                        renderItem={({ item }) => {
                          if (item.dia == aux) {
                            if (item.combinado != null) {
                              if (contadorCobinadosFlatlist) {
                                contadorCobinadosFlatlist = false
                                return (
                                  <TouchableOpacity style={styles.cuadraditosDeAdentroSegundoCombinado}
                                    onPress={() => this.props.onPressInfo(item.id_ejercicio)}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                        <View style={{ flexDirection: 'column', width: wp("60") }}>
                                          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: wp("1") }}>{item.nombre}</Text>
                                          <Text>Series: {item.series}</Text>
                                          <Text>Repeticiones:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                )
                              } else {
                                contadorCobinadosFlatlist = true
                                return (
                                  <TouchableOpacity style={styles.cuadraditosDeAdentroPrimerCombinado}
                                    onPress={() => this.props.onPressInfo(item.id_ejercicio)}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                        <View style={{ flexDirection: 'column', width: wp("33") }}>
                                          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: wp("1") }}>{item.nombre}</Text>
                                          <Text>Series: {item.series}</Text>
                                          <Text>Repeticiones:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                      </View>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.subir(item.dia, item.id_ejercicio, item.combinado) }} style={styles.fab}>
                                          <AntDesign name="up" size={15} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id_ejercicio, item.combinado) }} style={styles.fab}>
                                          <AntDesign name="down" size={15} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id_ejercicio, item.combinado), this.setState({ isLoading: true }) }} style={styles.fab}>
                                          <AntDesign name="delete" size={17} color="white" />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                )
                              }
                            } else {
                              return (
                                <TouchableOpacity style={styles.cuadraditosDeAdentro}
                                  onPress={() => this.props.onPressInfo(item.id_ejercicio)}>
                                  <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.musculo)} />
                                      <View style={{ flexDirection: 'column', width: wp("33") }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: wp("1") }}>{item.nombre}</Text>
                                        <Text>Series: {item.series}</Text>
                                        <Text>Repeticiones:{"\n"}{item.repeticiones}</Text>
                                      </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <TouchableOpacity onPress={() => { this.subir(item.dia, item.id_ejercicio) }} style={styles.fab}>
                                        <AntDesign name="up" size={15} color="white" />
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id_ejercicio) }} style={styles.fab}>
                                        <AntDesign name="down" size={15} color="white" />
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id_ejercicio), this.setState({ isLoading: true }) }} style={styles.fab}>
                                        <AntDesign name="delete" size={17} color="white" />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              )
                            }
                          }
                        }} />
                    </DropDownItem>
                  </View>
                )
              }} />
            {/* ************************************************************************
            ******************************Ya no Mas*********************************
            **************************************************************************** */}

            <View style={{ flexDirection: "row", justifyContent: 'center', height: hp("11") }}>
              <TouchableOpacity style={styles.guardarButton} onPress={() => { this.setState({ modalGuardarVisible: true }) }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
                  Borrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.guardarButton} onPress={() => { this.guardarRutina() }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Modal
            animationType="fade"
            visible={this.state.modalGuardarVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalGuardarVisible: false })}  >

            <View style={styles.modal}>
              {/* <View style={{ flexDirection: 'column' }}>
                  <Text>Repeticiones:</Text>
                  <Text>Series:</Text>
                </View> */}
              <View style={{ flexDirection: 'column', marginTop: height * 0.05 }}>
                <Text style={styles.textButton}>Esta seguro que desea borrar la rutina "{this.props.navigation.getParam("nombre_rutina")}"</Text>
              </View>
              <View style={styles.modal2}>

                <TouchableOpacity onPress={() => { this.setModalGuardarVisible(!this.state.modalGuardarVisible); }} style={{ width: width * 0.37, height: height * 0.0775, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', borderRadius: 22 }}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => base.conseguirIdRutinaParaBorrar(this.state.nombre, this.borrarRutina.bind(this))} style={{ width: width * 0.37, height: height * 0.0775, justifyContent: 'center', alignItems: 'center', textAlign: "center", borderLeftWidth: 2, backgroundColor: 'grey', borderBottomRightRadius: 22 }}>
                  <Text style={styles.textButton}>Aceptar</Text>

                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            visible={this.state.modalBorrarTodoVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalBorrarTodoVisible: false })}  >
            <View style={styles.modal}>
              <View style={{ flexDirection: 'column', marginTop: height * 0.05 }}>
                <Text style={styles.textButton}>Esta seguro que desea borrar todos los ejercicios de la rutina "{this.props.navigation.getParam("nombre_rutina")}"</Text>
              </View>
              <View style={styles.modal2}>

                <TouchableOpacity onPress={() => { this.setState({ modalBorrarTodoVisible: false }) }} style={{ width: width * 0.37, height: height * 0.0775, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', borderRadius: 22 }}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.borrarTodo()} style={{ width: width * 0.37, height: height * 0.0775, justifyContent: 'center', alignItems: 'center', textAlign: "center", borderLeftWidth: 2, backgroundColor: 'grey', borderBottomRightRadius: 22 }}>
                  <Text style={styles.textButton}>Borrar</Text>

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
    marginBottom: 5,
    marginTop: 5
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
    paddingLeft: 10,
    // width: 300,
    //height: 45,
    width: wp("70"),
    height: hp("5.5"),
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  borrarTodo: {
    //width: 44,
    //height: 44,
    height: hp("6"),
    width: hp("6"),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 25,
  },
  cuadraditos: {
    backgroundColor: 'black',
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal: 10,
    //paddingBottom: 10,
    alignItems: 'center'
  },
  cuadraditosDeAdentro: {
    backgroundColor: 'grey',
    marginVertical: 5,
    marginTop: 2,
    paddingVertical: 10,
    paddingLeft: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  cuadraditosDeAdentroPrimerCombinado: {
    borderBottomWidth: 0,
    backgroundColor: 'grey',
    marginTop: 5,
    marginTop: 2,
    paddingVertical: 10,
    paddingLeft: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  cuadraditosDeAdentroSegundoCombinado: {
    borderTopWidth: 0,
    backgroundColor: 'grey',
    marginBottom: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
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
  detalleGenresTitles: {
    fontSize: 33,
    margin: 10,
    //marginBottom: 2.5,
    alignSelf: "center",
    color: '#3399ff',
    fontWeight: 'bold'
  },
  fab: {
    //width: 33,
    //height: 33,
    width: hp("5"),
    height: hp("5"),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 10,
  },
  guardarButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.33,
    marginHorizontal: 22,
    alignSelf: 'center'
  },
  DropDownItem: {
    alignItems: 'stretch'
  },
  musculosLogo: {
    width: wp("10.5"),
    height: hp("6"),
    marginRight: 12,
    resizeMode: 'cover',
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
    borderRadius: 22,
    opacity: .95
  },
  modal2: {
    flexDirection: 'row',
    borderColor: 'black',
    borderTopWidth: 2,
    width: width * 0.74,
    height: height * 0.08,
    position: 'absolute',
    bottom: 0,
    opacity: .95
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
  musculosLogo2: {
    width: 40,
    height: 40,
    // width: width*0.05,
    // height: height*0.05,
    marginRight: 10,
    resizeMode: 'cover',
  },
})


export default withNavigation(RutinaModificable);