import React, { Component } from 'react';
import base from './GenerarBase';
import ExportadorFrases from './Fotos/ExportadorFrases'
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
import { BlackShadow, BlackShadowForBlack } from './Estilos/Shadows'
import { AzulPrincipal } from './Estilos/Colors'
import { BlueParallelButton, BlackButtonText, WhiteModalText } from './Estilos/PreMadeComponents'
import { withNavigation } from 'react-navigation';
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
  AsyncStorage,
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AwesomeAlert from 'react-native-awesome-alerts';
import { AdMobInterstitial } from 'expo-ads-admob';


var { height, width } = Dimensions.get('window');

class RutinaNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      id_tipo: '',
      modalGuardarVisible: false,
      modalBorrarTodoVisible: false,
      modalTipoEjercicioTodoVisible: false,
      userSelected: [],
      rutina: [],
      isLoading: true,
      actualizando: false,
      rutinaVacia: [],
      ultimoDia: 0,
      imagen: '',
      diasTotal: [1, 2, 3, 4, 5, 6, 7],
      showAlert: false,
      dia: 0,
      combinado: 1,
      id_idioma: 0
    };
  }
  UNSAFE_componentWillReceiveProps() {
    this._retrieveData()
  }

  componentDidMount() {
    base.traerIdIdioma(this.okIdIdioma.bind(this))
  }
  okIdIdioma(id_idioma) {
    this.setState({ id_idioma: id_idioma, isLoading: false })
  }
  showInterstitial = async () => {
    AdMobInterstitial.setAdUnitID(ExportadorAds.Interracial()); // Test ID, Replace with your-admob-unit-id

    try {
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    }
    catch (e) {
      console.log(e);
    }
  }
  showInterstitialTiempo = async () => {
    AdMobInterstitial.setAdUnitID(ExportadorAds.InterracialTiempo()); // Test ID, Replace with your-admob-unit-id

    try {
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    }
    catch (e) {
      console.log(e);
    }
  }

  _retrieveData = async () => {
    this.showInterstitialTiempo()
    try {
      const value = await AsyncStorage.getItem('rutina');
      if (value !== null) {
        if (JSON.parse(value)[0].combinado) {
          var combinada1 = JSON.parse(value)[0]
          var combinada2 = JSON.parse(value)[1]
          if (this.yaEsta(combinada1) || this.yaEsta(combinada2)) {
            this.setState({ isLoading: true })
            var ultimoCombinado = this.queCombinado(combinada1.dia)
            combinada1.combinado = ultimoCombinado.toString()
            combinada2.combinado = ultimoCombinado.toString()
            this.setState({ combinado: this.state.combinado + 1 })
            this.state.rutina.push(combinada1)
            this.state.rutina.push(combinada2)
            this.termino()
          } else {
            alert(ExportadorFrases.EjercicioRepetido(this.state.id_idioma))
            this._storeData()
          }
        } else {
          var simple = JSON.parse(value)[0]
          if (this.yaEsta(simple)) {
            this.setState({ isLoading: true })
            simple.combinado = null
            this.state.rutina.push(simple)
            this.termino()
          } else {
            alert(ExportadorFrases.EjercicioRepetido(this.state.id_idioma))
            this._storeData()
          }
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
  queCombinado(dia) {
    var ultimoCombinado = 0
    for (var i = 0; i < this.state.rutina; i++) {
      if (this.state.rutina[i].dia == dia && this.state.rutina[i].combinado != null) {
        ultimoCombinado = this.state.rutina[i].combinado
      }
    }
    return parseInt(ultimoCombinado + 1)
  }
  touch(dia) {

    if (this.diaAnterior(dia) || dia == 1) {
      this.setState({ ultimoDia: dia, modalTipoEjercicioTodoVisible: true, dia: dia })

    } else {
      alert(ExportadorFrases.DiaParte1(this.state.id_idioma) + ' ' + (dia - 1) + ' ' + ExportadorFrases.DiaParte2(this.state.id_idioma))
    }
  }
  diaAnterior(dia) {
    var i = 0
    while (i < this.state.rutina.length) {
      if (this.state.rutina[i].dia == (dia - 1)) {
        return true
      }
      i++
    }
    return false
  }
  agregarEjercicio() {
    this.setState({ modalTipoEjercicioTodoVisible: false })
    this.props.onPressGo(this.state.ultimoDia, 'nuevo', false, this.ultimaPos(), this.state.id_idioma)
  }
  agregarEjercicioCombinado() {
    this.setState({ modalTipoEjercicioTodoVisible: false })
    this.props.onPressGo(this.state.ultimoDia, 'nuevo', true, this.ultimaPos(), this.state.id_idioma)
  }
  ultimaPos() {
    var ultimaPosicion = 0
    for (var i = 0; i < this.state.rutina.length; i++) {
      if (this.state.rutina[i].dia == this.state.ultimoDia && this.state.rutina[i].posicion > ultimaPosicion) {
        ultimaPosicion = this.state.rutina[i].posicion
      }
    }
    return parseInt(ultimaPosicion) + 1
  }
  yaEsta(data) {
    for (var i = 0; i < this.state.rutina.length; i++) {
      if (this.state.rutina[i].id_ejercicio == data.id_ejercicio) {
        if (this.state.rutina[i].dia == data.dia) {
          return false
        }
      }
    }
    return true
  }
  _storeData = async () => {
    try {
      //await AsyncStorage.setItem('rutina', JSON.stringify(this.state.rutinaVacia));
      await AsyncStorage.removeItem('rutina')
      this.setState({ isLoading: false })
    } catch (error) {
      console.log(error);
    }
  };

  subir(dia, id_ejercicio, combinado) {
    var rutinaNueva = []
    var aux = 0
    var posicionASubir = 0
    var posicionABajar = 0
    for (var i = 0; i < this.state.rutina.length; i++) {
      rutinaNueva.push(this.state.rutina[i])
      if (rutinaNueva[i].id_ejercicio == id_ejercicio && rutinaNueva[i].dia == dia) {
        posicionASubir = i
      }
    }
    if (rutinaNueva[posicionASubir].posicion == "1") {
      this.termino()
    } else {
      this.setState({ isLoading: true })
      for (var i = 0; i < rutinaNueva.length; i++) {
        if ((rutinaNueva[i].posicion == rutinaNueva[posicionASubir].posicion - 1) && rutinaNueva[i].dia == dia) {
          if (rutinaNueva[i].combinado == null) {
            posicionABajar = i
          } else {
            posicionABajar = (i - 1)
          }
        }
      }
      if (combinado == null) {
        //Ninguno Combinado
        if (rutinaNueva[posicionABajar].combinado == null) {
          console.log("Ninguno Combinado")
          aux = rutinaNueva[posicionASubir].posicion

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
          aux = rutinaNueva[posicionASubir].posicion

          rutinaNueva[posicionASubir].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[(posicionASubir + 1)].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[posicionABajar].posicion = aux

        } else {
          //Dos Combinados
          console.log("Dos Combinados")
          aux = rutinaNueva[posicionASubir].posicion

          rutinaNueva[posicionASubir].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[(posicionASubir + 1)].posicion = rutinaNueva[posicionABajar].posicion
          rutinaNueva[posicionABajar].posicion = aux
          rutinaNueva[(posicionABajar + 1)].posicion = aux

        }
      }
      this.setState({ rutina: rutinaNueva })
      this.termino()
    }
  }

  bajar(dia, id_ejercicio, combinado) {
    var rutinaNueva = []
    var aux = 0
    var maxPosDia = 0
    var posicionASubir = (-5)
    var posicionABajar = 0
    var flag = 0

    for (var i = 0; i < this.state.rutina.length; i++) {
      rutinaNueva.push(this.state.rutina[i])
      if (rutinaNueva[i].dia == dia) {
        if (rutinaNueva[i].id_ejercicio == id_ejercicio) {
          posicionABajar = i
          flag = 1
        }
        if (flag != 0 && (rutinaNueva[i].posicion == parseInt(rutinaNueva[posicionABajar].posicion) + 1)) {
          if (rutinaNueva[i].combinado == null) {
            posicionASubir = i
          } else {
            posicionASubir = (i - 1)
          }
        }
        maxPosDia++
      }
    }
    if ((-5) == posicionASubir) {
      this.termino()
    } else {
      this.setState({ isLoading: true })
      if (combinado == null) {
        //Ninguno Combinado
        if (rutinaNueva[posicionASubir].combinado == null) {
          console.log("Ninguno Combinado")
          aux = rutinaNueva[posicionABajar].posicion

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
          aux = rutinaNueva[posicionABajar].posicion

          rutinaNueva[posicionABajar].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[(posicionABajar + 1)].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[posicionASubir].posicion = aux

        } else {
          //Dos Combinados
          console.log("Dos Combinados")
          aux = rutinaNueva[posicionABajar].posicion

          rutinaNueva[posicionABajar].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[(posicionABajar + 1)].posicion = rutinaNueva[posicionASubir].posicion
          rutinaNueva[posicionASubir].posicion = aux
          rutinaNueva[(posicionASubir + 1)].posicion = aux

        }
      }
      this.setState({ rutina: rutinaNueva })
      this.termino()
    }
  }

  borrar(dia, id_ejercicio, combinado) {
    var rutinaNueva = []
    var i = 0
    var flag = 0
    var valorPosicionBorrada = 0
    while (i < this.state.rutina.length) {
      if (id_ejercicio == this.state.rutina[i].id_ejercicio && dia == this.state.rutina[i].dia) {
        if (combinado == null) {
          valorPosicionBorrada = this.state.rutina[i].posicion
          i++
          flag = 1
        } else {
          valorPosicionBorrada = this.state.rutina[i].posicion
          i = (i + 2)
          flag = 1
        }
      }
      if (i < this.state.rutina.length) {
        rutinaNueva.push(this.state.rutina[i])
        if (flag != 0 && this.state.rutina[i].dia == dia) {
          rutinaNueva[(rutinaNueva.length) - 1].posicion = valorPosicionBorrada
          valorPosicionBorrada = (valorPosicionBorrada - 1)
        }
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
    this.setState({ modalGuardarVisible: false, isLoading: true, actualizando: true })
    var aux = 0
    var rutinaNueva = { id_rutina: 0, nombre_rutina: '', imagen: require('./Fotos/Ejercicios/PECHO.png'), dias: '', favoritos: 1, rutina: [], id_tipo: this.state.id_tipo }
    for (var i = 0; i < this.state.rutina.length; i++) {
      if (this.state.rutina[i].dia > aux) {
        aux = this.state.rutina[i].dia
      }
    }
    rutinaNueva.nombre_rutina = this.state.nombre
    rutinaNueva.dias = (Math.floor(aux)).toString()
    rutinaNueva.rutina = this.state.rutina
    base.crearRutina(rutinaNueva, this.okRutinaCreada.bind(this));
  }
  okRutinaCreada(rutinaNueva) {
    base.conseguirIdRutinaParaGuardar(rutinaNueva, this.okIdRutina.bind(this))
  }
  okIdRutina(rutinaNueva) {
    base.crearEjerciciosRutina(rutinaNueva, this.okEjerciciosRutinaCreados.bind(this))
  }
  okEjerciciosRutinaCreados() {
    this.showInterstitial()
    this.props.onPressCancelar();
  }
  cancelarRutina() {
    this.props.onPressCancelar()
  }
  botonGuardar() {
    if (this.state.nombre == '') {
      alert("Debes escribir el nombre de la rutina")
      return
    }
    if (this.state.id_tipo == '') {
      alert("Debes seleccionar un tipo de rutina")
      return
    }
    if (this.state.rutina.length == 0) {
      alert("Debes agregar almenos un ejercicio a la rutina")
      return
    }
    this.setState({ modalGuardarVisible: true })
  }

  render() {
    if (this.state.isLoading) {
      if (this.state.actualizando) {
        return (
          <View style={styles.container}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <View style={styles.insideContainer} >
              <ActivityIndicator size="large" color="#3399ff" style={{}} />
              <Text style={styles.slideText}>{ExportadorFrases.CreandoRutina(this.state.id_idioma)}</Text>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
            <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ScrollView>
            <View style={styles.inputContainer}>
              <View style={styles.inputContainerInside}>
                <TextInput style={[styles.TextContainer, BlackShadow()]} maxLength={15} placeholder={ExportadorFrases.Nombre(this.state.id_idioma)} placeholderTextColor='black' onChangeText={(nombre) => this.setState({ nombre })} value={this.state.nombre}></TextInput>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: ExportadorFrases.TipoRutina(this.state.id_idioma),
                    value: '',
                  }}
                  value={this.state.id_tipo}
                  placeholderTextColor="black"
                  style={{
                    inputIOS: [styles.largePikerIOS, BlackShadow()],
                    inputAndroid: [styles.largePikerAndroid, BlackShadow()]
                  }}
                  onValueChange={(value) => this.setState({ id_tipo: value })}
                  items={[
                    { label: ExportadorFrases.TipoRutinaOpciones(this.state.id_idioma, 1), value: 1 },
                    { label: ExportadorFrases.TipoRutinaOpciones(this.state.id_idioma, 2), value: 2 },
                  ]}
                />
              </View>
              <TouchableOpacity onPress={() => { this.setState({ modalBorrarTodoVisible: true }) }} style={[styles.roundButtonBorrar, BlackShadow()]}>
                <AntDesign name="delete" size={wp(6.6)} color="white" />
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
                var aux = item
                var contadorCobinadosFlatlist = false
                var rutinaLocal = this.state.rutina
                return (
                  <View style={[styles.cuadraditos, BlackShadowForBlack()]}>
                    <DropDownItem key={1} contentVisible={false}
                      header={
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                          <Text style={styles.dropDownTitle}>
                            {ExportadorFrases.Dia(this.state.id_idioma)} {item}
                          </Text>
                          <TouchableOpacity onPress={() => {
                            this.touch(item);
                          }} style={styles.roundButtonPlus}>
                            <AntDesign name="plus" size={wp(5)} color="white" />
                          </TouchableOpacity>
                        </View>
                      }
                    >
                      <FlatList
                        style={styles.contentList}
                        columnWrapperStyle={styles.listContainer}
                        data={rutinaLocal.sort((a, b) => a.posicion.localeCompare(b.posicion))}
                        initialNumToRender={50}
                        keyExtractor={(item) => {
                          return (item.dia + item.id_ejercicio).toString();
                        }}
                        renderItem={({ item }) => {
                          if (item.dia == aux) {
                            if (item.tiempo == null) {
                              if (item.combinado != null) {
                                if (contadorCobinadosFlatlist) {
                                  contadorCobinadosFlatlist = false
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroSegundoCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio)}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.musculosLogoContainer}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                        </View>
                                        <View style={styles.subTituloContainer}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                        <View style={styles.roundButtonContainer}></View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                } else {
                                  contadorCobinadosFlatlist = true
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroPrimerCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio)}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.musculosLogoContainer}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                        </View>
                                        <View style={styles.subTituloContainer}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                        <View style={styles.roundButtonContainer}>
                                          <TouchableOpacity onPress={() => { this.subir(item.dia, item.id_ejercicio, item.combinado) }} style={styles.roundButton}>
                                            <AntDesign name="up" size={15} color="white" />
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id_ejercicio, item.combinado) }} style={styles.roundButton}>
                                            <AntDesign name="down" size={15} color="white" />
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id_ejercicio, item.combinado), this.setState({ isLoading: true }) }} style={styles.roundButton}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <View style={styles.musculosLogoContainer}>
                                        <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                      </View>
                                      <View style={styles.subTituloContainer}>
                                        <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                        <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                        <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
                                      </View>
                                      <View style={styles.roundButtonContainer}>
                                        <TouchableOpacity onPress={() => { this.subir(item.dia, item.id_ejercicio, item.combinado) }} style={styles.roundButton}>
                                          <AntDesign name="up" size={15} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id_ejercicio, item.combinado) }} style={styles.roundButton}>
                                          <AntDesign name="down" size={15} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id_ejercicio, item.combinado), this.setState({ isLoading: true }) }} style={styles.roundButton}>
                                          <AntDesign name="delete" size={17} color="white" />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                )
                              }
                            } else {
                              if (item.combinado != null) {
                                if (contadorCobinadosFlatlist) {
                                  contadorCobinadosFlatlist = false
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroSegundoCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio)}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.musculosLogoContainer}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                        </View>
                                        <View style={styles.subTituloContainer}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                        <View style={styles.roundButtonContainer}></View>
                                      </View>
                                    </TouchableOpacity>
                                  )
                                } else {
                                  contadorCobinadosFlatlist = true
                                  return (
                                    <TouchableOpacity style={styles.cuadraditosDeAdentroPrimerCombinado}
                                      onPress={() => this.props.onPressInfo(item.id_ejercicio)}>
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.musculosLogoContainer}>
                                          <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                        </View>
                                        <View style={styles.subTituloContainer}>
                                          <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                          <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
                                        </View>
                                        <View style={styles.roundButtonContainer}>
                                          <TouchableOpacity onPress={() => { this.subir(item.dia, item.id_ejercicio, item.combinado) }} style={styles.roundButton}>
                                            <AntDesign name="up" size={15} color="white" />
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id_ejercicio, item.combinado) }} style={styles.roundButton}>
                                            <AntDesign name="down" size={15} color="white" />
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id_ejercicio, item.combinado), this.setState({ isLoading: true }) }} style={styles.roundButton}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <View style={styles.musculosLogoContainer}>
                                        <Image style={styles.musculosLogo} source={ExportadorLogos.traerLogo(item.id_musculo)} />
                                      </View>
                                      <View style={styles.subTituloContainer}>
                                        <Text style={styles.nombreEjercicio}>{item.nombre_ejercicio}</Text>
                                        <Text style={styles.subsEjercicio}>{ExportadorFrases.Series(this.state.id_idioma)}: {item.series}</Text>
                                        <Text style={styles.subsEjercicio}>{ExportadorFrases.Repeticiones(this.state.id_idioma)}:{"\n"}{item.repeticiones}</Text>
                                      </View>
                                      <View style={styles.roundButtonContainer}>
                                        <TouchableOpacity onPress={() => { this.subir(item.dia, item.id_ejercicio, item.combinado) }} style={styles.roundButton}>
                                          <AntDesign name="up" size={15} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.bajar(item.dia, item.id_ejercicio, item.combinado) }} style={styles.roundButton}>
                                          <AntDesign name="down" size={15} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.borrar(item.dia, item.id_ejercicio, item.combinado), this.setState({ isLoading: true }) }} style={styles.roundButton}>
                                          <AntDesign name="delete" size={17} color="white" />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                )
                              }
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

            <View style={{ flexDirection: "row", justifyContent: 'space-around', height: hp("11") }}>
              <BlueParallelButton onPress={() => this.cancelarRutina()}>
                <BlackButtonText>
                  {ExportadorFrases.Cancelar(this.state.id_idioma)}
                </BlackButtonText>
              </BlueParallelButton>
              <BlueParallelButton onPress={() => this.botonGuardar()}>
                <BlackButtonText>
                  {ExportadorFrases.Guardar(this.state.id_idioma)}
                </BlackButtonText>
              </BlueParallelButton>
            </View>
          </ScrollView>

          {/* ************************************************************************
            ******************************   Modal   *********************************
            **************************************************************************** */}
          <Modal
            animationType="fade"
            visible={this.state.modalGuardarVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalGuardarVisible: false })}  >

            <View style={[styles.modal, BlackShadow()]}>
              <View style={styles.modal1}>
                <Text style={styles.modalText}>{ExportadorFrases.CrearRutina(this.state.id_idioma)} "{this.state.nombre}"</Text>
              </View>
              <View style={styles.modal2}>

                <TouchableOpacity onPress={() => { this.setState({ modalGuardarVisible: false }) }} style={styles.modalButtonCancelar}>
                  <WhiteModalText>{ExportadorFrases.Cancelar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.guardarRutina()} style={styles.modalButtonAceptar}>
                  <WhiteModalText>{ExportadorFrases.Aceptar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            visible={this.state.modalBorrarTodoVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalBorrarTodoVisible: false })}  >
            <View style={[styles.modal, BlackShadow()]}>
              <View style={styles.modal1}>
                <Text style={styles.modalText}>{ExportadorFrases.BorrarEjerciciosRutina(this.state.id_idioma)} "{this.state.nombre}" ?</Text>
              </View>
              <View style={styles.modal2}>
                <TouchableOpacity onPress={() => { this.setState({ modalBorrarTodoVisible: false }) }} style={styles.modalButtonCancelar}>
                  <WhiteModalText>{ExportadorFrases.Cancelar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.borrarTodo()} style={styles.modalButtonAceptar}>
                  <WhiteModalText>{ExportadorFrases.Borrar(this.state.id_idioma)}</WhiteModalText>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            visible={this.state.modalTipoEjercicioTodoVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalTipoEjercicioTodoVisible: false })}  >
            <TouchableOpacity style={{ height: height, width: width, position: "absolute", top: 0, left: 0 }} onPress={() => { this.setState({ modalTipoEjercicioTodoVisible: false }) }}>
              <View style={styles.modalTipoEjericios}>
                <View style={styles.modal2TipoEjericios}>
                  <TouchableOpacity onPress={() => this.agregarEjercicio()} style={{ width: width * 0.4, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', borderTopLeftRadius: 22, borderBottomLeftRadius: 22 }}>
                    <Text style={styles.textButtonTipoEjercicios}>{ExportadorFrases.EjercicioSimple(this.state.id_idioma)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.agregarEjercicioCombinado()} style={{ width: width * 0.4, justifyContent: 'center', alignItems: 'center', textAlign: "center", borderLeftWidth: 2, backgroundColor: 'grey', borderBottomRightRadius: 22, borderTopRightRadius: 22 }}>
                    <Text style={styles.textButtonTipoEjercicios}>{ExportadorFrases.EjercicioCombinado(this.state.id_idioma)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title="Error"
            message="Este ejercicio ya esta en el dia seleccionado!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Aceptar"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              this.setState({ showAlert: false })
            }}
          />
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
  insideContainer: {
    backgroundColor: "black",
    justifyContent: 'center',
    alignSelf: "center",
    borderRadius: 20,
    padding: wp(5)
  },
  slideText: {
    marginTop: hp(2.5),
    fontSize: wp(4),
    color: "#3399ff"
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  inputContainerInside: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ////////////////////////////////
  //////Piker
  ///////////////////////////////
  largePikerIOS: {
    backgroundColor: 'grey',
    borderRadius: 10,
    width: wp("70"),
    height: hp("5.5"),
    marginBottom: height * 0.028,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: wp(3.5),
    color: "black",
    paddingLeft: wp(2.5)
  },
  largePikerAndroid: {
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: wp("70"),
    height: hp("5.5"),
    marginBottom: height * 0.028,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: wp(2.5),
    fontWeight: 'bold',
    fontSize: wp(3.5),
    color: "black",
    textAlign: 'center'
  },
  ////////////////////////////////
  //////Piker
  ///////////////////////////////
  TextContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    width: wp("70"),
    height: hp("5.5"),
    margin: height * 0.028,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: wp(3.5),
    color: "black",
    paddingLeft: wp(2.5)
  },
  roundButtonBorrar: {
    height: wp(13),
    width: wp(13),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: height * 0.03,
  },
  image: {
    height: height * 0.28,
    width: width * 0.51,
    borderWidth: 4,
    borderColor: "#ebf0f7"
  },
  cuadraditos: {
    backgroundColor: 'black',
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal: 10,
    alignItems: 'center'
  },
  cuadraditosDeAdentro: {
    backgroundColor: 'grey',
    marginVertical: 5,
    marginTop: 2,
    paddingVertical: 10,

    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  cuadraditosDeAdentroPrimerCombinado: {
    borderBottomWidth: 0,
    backgroundColor: 'grey',
    marginTop: 5,
    marginTop: 2,
    paddingVertical: 10,

    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.88
  },
  cuadraditosDeAdentroSegundoCombinado: {
    borderTopWidth: 0,
    backgroundColor: 'grey',
    marginBottom: 5,
    paddingVertical: 10,
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
  dropDownTitle: {
    fontSize: wp(7),
    margin: 10,
    alignSelf: "center",
    color: AzulPrincipal(),
    fontWeight: 'bold'
  },
  roundButtonPlus: {
    width: wp(8),
    height: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    borderRadius: 30,
    marginRight: 10,
  },
  roundButton: {
    width: wp(7.7),
    height: wp(7.7),
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
    marginHorizontal: height * 0.025,
    alignSelf: 'center',
    opacity: .95
  },
  DropDownItem: {
    alignItems: 'stretch'
  },
  musculosLogoContainer: {
    flex: 0.45,
    margin: wp(2.5)
  },
  musculosLogo: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  subTituloContainer: {
    flex: 1.2,
    marginRight: wp(2.5)
  },
  roundButtonContainer: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: 'center'
  },

  nombreEjercicio: {
    fontWeight: 'bold',
    fontSize: wp(4),
    marginBottom: wp("1")
  },
  subsEjercicio: {
    fontSize: wp(3.5),
  },

  /*************************************** */
  //MODAAAAL
  modal: {
    height: hp(20),
    width: width * 0.75,
    position: 'absolute',
    top: height * 0.4,
    left: width * 0.13,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 5.0,
    borderRadius: 22,
    opacity: .95
  },
  modal1: {
    flex: 1,
    paddingHorizontal: wp(2),
    justifyContent: "center"
  },
  modal2: {
    flexDirection: 'row',
    borderColor: 'black',
    borderTopWidth: 2,
    width: width * 0.74,
    height: hp(6),
    opacity: .95
  },
  modalTipoEjericios: {
    width: width * 0.80,
    height: height * 0.33,
    position: 'absolute',
    top: height * 0.33,
    left: width * 0.10,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 5.0,
    borderRadius: 22,
    opacity: .95
  },
  modal2TipoEjericios: {
    flexDirection: 'row',
    width: width * 0.80,
    height: height * 0.33,
    position: 'absolute',
    bottom: 0,
    opacity: .95
  },
  modalText: {
    color: 'white',
    fontSize: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: hp(2),
  },
  textButtonTipoEjercicios: {
    color: 'white',
    fontSize: wp(5),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalButtonCancelar: {
    width: width * 0.37,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 22
  },
  modalButtonAceptar: {
    width: width * 0.366,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    borderLeftWidth: 2,
    borderBottomRightRadius: 22
  }
})


export default withNavigation(RutinaNew);