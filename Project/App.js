import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@expo/vector-icons/Ionicons';
import Ejercicios from './components/Ejercicios'
import EjerciciosEspecifico from './components/EjercicioEspecifico'
import EjercicioAgregar from './components/EjercicioAgregar'
import EjerciciosNew from './components/EjerciciosNew'
import EjercicioModificable from './components/EjercicioModificable'
import Musculo from './components/Musculo'
import MusculoAgregar from './components/MusculoAgregar'
import Suplementacion from './components/Suplementacion'
import SuplementacionTipos from './components/SuplementacionTipos'
import SuplementacionEspecifica from './components/SuplementacionEspecifica'
import SuplementacionFavs from './components/SuplementacionFavs'
import Rutinas from './components/Rutinas';
import RutinaNew from './components/RutinaNew'
import RutinasTipos from './components/RutinasTipos'
import RutinaModificable from './components/RutinaModificable'
import RutinaEspecifica from './components/RutinaEspecifica'
import RutinasFavs from './components/RutinasFavs'
import Favoritos from './components/Favoritos'
import MenuDrawer from './components/MenuDrawer';
import MiPlan from './components/MiPlan'
import Ficha from './components/Ficha'
import Training from './components/Training';
import base from './components/GenerarBase';
import { AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  DrawerItems,
} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import CamaraPage from './components/Camara/CamaraPage';
import MusculoFavs from './components/MusculoFavs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

console.disableYellowBox = true
var { height, width } = Dimensions.get('window');



class App extends Component {
  render() {
    return <AppContainer />
  }
}
export default App;


// *****************************************************
// **********************Log In*************************
// *****************************************************
class TrainingScreen extends React.Component {
  render() {
    return (
      <Training
        onPressPass={this.goPass.bind(this)}
        onPressCreate={this.goPlan.bind(this)}
      />
    )
  }
  goPass() {
    this.props.navigation.navigate('Ejercicios');
  }
  goPlan(caloriasEjercicio, caloriasTotal, objetivoDeseado) {
    this.props.navigation.navigate('Perfil',{caloriasEjercicio: caloriasEjercicio, caloriasTotal: caloriasTotal, objetivoDeseado: objetivoDeseado});
  }
}

// *****************************************************
// *********************Musculos************************
// *****************************************************
class MusculoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('musculo', 'Musculo'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    };
  }
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(id_ejercicio, nombre, descripcion, modificable) {
    if (modificable) {
      this.props.navigation.navigate('EjercicioEspecificoM', { id_ejercicio: id_ejercicio, nombre_Ejercicio: nombre, descripcion_Ejercicio: descripcion });
    } else {
      this.props.navigation.navigate('EjercicioEspecificoNoM', { id_ejercicio: id_ejercicio, nombre_Ejercicio: nombre, descripcion_Ejercicio: descripcion });
    }
  }

  agarrarMusculo() {
    return this.state.musculo
  }
}
class MusculoAgregarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo'),
      rutina: [],
      flag: 0,
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('musculo', 'Musculo'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    };
  }
  render() {
    return (
      <MusculoAgregar
        onPressGo={this.pasarEjercicio.bind(this)}
        onPressSave={this.guardarRutina.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(id_ejercicio, nombre, descripcion) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombreEjercicio: nombre, descripcionEjercicio: descripcion });
  }
  guardarRutina(rutina, tipo, ultimaPos) {
    this._storeData(rutina);
    console.log(rutina)
    if (tipo == 'nuevo') {
      console.log("pito")
      if (rutina[0].combinado) {
        if (rutina[1] == null) {
          this.props.navigation.navigate('EjercicioAgregar', { dia: rutina[0].dia, tipo: tipo, combinado: rutina[0].combinado, ultimaPos: ultimaPos})
        } else {
          this.props.navigation.navigate('RutinaNew', { rutina: rutina })
        }
      } else {
        this.props.navigation.navigate('RutinaNew', { rutina: rutina })
      }
    } else {
      if (rutina[0].combinado) {
        if (rutina[1] == null) {
          this.props.navigation.navigate('EjercicioAgregar', { dia: rutina[0].dia, tipo: tipo, combinado: rutina[0].combinado, ultimaPos: ultimaPos})
        } else {
          this.props.navigation.navigate('RutinaModificable', { rutina: rutina })
        }
      } else {
        this.props.navigation.navigate('RutinaModificable', { rutina: rutina })
      }
    }
  }
  agarrarMusculo() {
    return this.state.musculo
  }
  _storeData = async (rutina) => {
    try {
      await AsyncStorage.setItem('rutina', JSON.stringify(rutina));
    } catch (error) {
      console.log(error);
    }
  };
}
// *****************************************************
// ********************Ejercicios***********************
// *****************************************************
class EjerciciosScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Ejercicios",
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="plus" style={{ marginRight: 20, color: '#3399ff' }}
            onPress={() => navigation.navigate('EjerciciosNew', { tipo: 'nuevo' })}
            size={22}
          />
        </View>
      )
    }
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Ejercicios
        onPressGo={this.pasarMusculo.bind(this)}
      />
    );
  }
  pasarMusculo(musculo) {
    this.props.navigation.navigate('Musculo', { musculo: musculo });
  }
}
class EjerciciosEspecificoMScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    var nombre = navigation.getParam('nombre_Ejercicio');
    var id_ejercicio = navigation.getParam('id_ejercicio');
    return {
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="edit" style={{ marginRight: 20, color: '#3399ff' }}
            onPress={() => navigation.navigate('EjercicioModificable', { nombre_Ejercicio: nombre, id_ejercicio: id_ejercicio })}
            size={22}
          />
        </View>
      ),
      title: navigation.getParam('nombre_Ejercicio', 'Detalles'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      idEjercicio: props.navigation.getParam('id_ejercicio')
    }
  }
  render() {
    return (
      <EjerciciosEspecifico
        onPressGo={this.pasarEjercicio.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio, nombre_Ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_Ejercicio: idEjercicio, nombre_Ejercicio: nombre_Ejercicio });
  }
}
class EjerciciosEspecificoNoMScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nombre_Ejercicio', 'Detalles'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      idEjercicio: props.navigation.getParam('id_ejercicio')
    }
  }
  render() {
    return (
      <EjerciciosEspecifico
        onPressGo={this.pasarEjercicio.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_Ejercicio: idEjercicio });
  }
}
class EjercicioAgregarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo'),
      rutina: [],
      flag: 0,
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Musculos',
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    };
  }
  render() {
    return (
      <EjercicioAgregar
        onPressGo={this.pasarEjercicio.bind(this)}
      />
    );
  }
  pasarEjercicio(dia, musculo, tipo, combinado, ultimaPos) {
    this.props.navigation.navigate('MusculoAgregar', { dia: dia, musculo: musculo, tipo: tipo, combinado: combinado, ultimaPos: ultimaPos});
  }
}
class EjerciciosNewScreen extends React.Component {

  static navigationOptions = {
    title: 'Crear Ejercicio',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <EjerciciosNew
        onPressCancelar={this.cancelar.bind(this)}
      />
    );
  }
  cancelar() {
    this.props.navigation.navigate('EjerciciosScreen');
  }
}
class EjercicioModificableScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Editar ' + '"' + navigation.getParam('nombre_Ejercicio', 'Detalles') + '"',
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    };
  }
  render() {
    return (
      <EjercicioModificable
        onPressGo={this.agregarEjercicio.bind(this)}
        onPressInfo={this.verInfo.bind(this)}
        onPressCancelar={this.cancelar.bind(this)}
        onPressActualizar={this.actualizada.bind(this)}
      />
    );
  }
  agregarEjercicio(dia, tipo) {
    this.props.navigation.navigate('EjercicioAgregar', { dia: dia, tipo: tipo });
  }
  verInfo(id_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio });
  }
  cancelar() {
    this.props.navigation.navigate('EjerciciosScreen', { update: "dale" });
  }
  actualizada(id_rutina, nombre) {
    this.props.navigation.navigate('RutinasScreen', { id_rutina: id_rutina, nombre: nombre });
  }
}
// *****************************************************
// *********************Rutinas*************************
// *****************************************************
class RutinasScreen extends React.Component {
  constructor(props) {
    super(props)
    { update: "update" }
  }
  static navigationOptions = {
    title: 'Rutinas',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  render() {
    return (
      <Rutinas
        onPressGoRutinas={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(tipo_rutina) {
    this.props.navigation.navigate('RutinasTipos', { tipo_rutina: tipo_rutina });
  }

}
class RutinasTiposScreen extends React.Component {
  constructor(props) {
    super(props)
    { update: "update" }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('tipo_rutina', 'Rutinas'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    }
  };
  render() {
    return (
      <RutinasTipos
        onPressGo={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(id_rutina, nombre, modificable) {
    if (modificable) {
      this.props.navigation.navigate('RutinaEspecificaM', { id_rutina: id_rutina, nombre: nombre });
    } else {
      this.props.navigation.navigate('RutinaEspecificaNoM', { id_rutina: id_rutina, nombre: nombre });
    }
  }
}
class RutinaNewScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Nueva Rutina',
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    };
  }
  render() {
    return (
      <RutinaNew
        onPressGo={this.agregarEjercicio.bind(this)}
        onPressInfo={this.verInfo.bind(this)}
        onPressCancelar={this.cancelar.bind(this)}
      />
    );
  }
  agregarEjercicio(dia, tipo, combinado, ultimaPos) {
    this.props.navigation.navigate('EjercicioAgregar', { dia: dia, tipo: tipo, combinado: combinado, ultimaPos: ultimaPos });
  }
  verInfo(id_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio });
  }
  cancelar() {
    this.props.navigation.navigate('RutinasScreen');
  }
  pasarUsuario() {
    //return this.state.idUser
  }
}
class RutinaEspecificaMScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => {
    var nombre = navigation.getParam('nombre');
    var id_rutina = navigation.getParam('id_rutina');
    return {
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="edit" style={{ marginRight: 20, color: '#3399ff' }}
            onPress={() => navigation.navigate('RutinaModificable', { nombre_rutina: nombre, id_rutina: id_rutina })}
            size={22}
          />
        </View>
      ),
      title: navigation.getParam('nombre', 'Rutina'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    };
  }
  render() {
    return (
      <RutinaEspecifica
        editable={this.editar.bind(this)}
        onPressInfo={this.verInfo.bind(this)}
      />
    );
  }
  verInfo(id_ejercicio, nombreEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombreEjercicio: nombreEjercicio });
  }
  editar(id_rutina) {
    this._storeData(id_rutina);
  }
  _storeData = async (id_rutina) => {
    try {
      await AsyncStorage.setItem('rutinaEditable', JSON.stringify(id_rutina));
    } catch (error) {
    }
  }
}
class RutinaEspecificaNoMScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nombre', 'Rutina'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    };
  }
  render() {
    return (
      <RutinaEspecifica
        onPressGo={this.pasarConcierto.bind(this)}
        editable={this.editar.bind(this)}
        onPressInfo={this.verInfo.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
  verInfo(id_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio });
  }
  editar(id) {
    this.setState({ idModificable: id })
  }
}
class RutinaModificableScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Editar ' + navigation.getParam('nombre_rutina'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    };
  }
  render() {
    return (
      <RutinaModificable
        onPressGo={this.agregarEjercicio.bind(this)}
        onPressInfo={this.verInfo.bind(this)}
        onPressCancelar={this.cancelar.bind(this)}
        onPressActualizar={this.actualizada.bind(this)}
      />
    );
  }
  agregarEjercicio(dia, tipo, combinado, ultimaPos) {
    this.props.navigation.navigate('EjercicioAgregar', { dia: dia, tipo: tipo, combinado: combinado, ultimaPos: ultimaPos });
  }
  verInfo(id_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio });
  }
  cancelar() {
    this.props.navigation.navigate('RutinasScreen', { update: "dale" });
  }
  actualizada(id_rutina, nombre) {
    this.props.navigation.navigate('RutinasScreen', { id_rutina: id_rutina, nombre: nombre });
  }
}
// *****************************************************
// ******************Suplementacion*********************
// *****************************************************
class SuplementacionEspecificaScreen extends React.Component {

  static navigationOptions = {
    title: 'Detalles',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  render() {
    return (
      <SuplementacionEspecifica
      />
    );
  }
}
class SuplementacionTiposScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('tipo_suplementacion', 'Suplementos'),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    }
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SuplementacionTipos
        onPressGo={this.pasarSuplemento.bind(this)}
      />
    );
  }
  pasarSuplemento(id_suplemento, nombre) {
    this.props.navigation.navigate('SuplementacionEspecifica', { id_suplemento: id_suplemento, nombre: nombre });
  }
}
class SuplementacionScreen extends React.Component {

  static navigationOptions = {
    title: 'Suplementacion',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Suplementacion
        onPressGo={this.pasarSuplemento.bind(this)}
      />
    );
  }
  pasarSuplemento(tipo_suplementacion) {
    this.props.navigation.navigate('SuplementacionTipos', { tipo_suplementacion: tipo_suplementacion });
  }
}
// *****************************************************
// **********************Camara*************************
// *****************************************************
class CamaraPageScreen extends React.Component {

  static navigationOptions = {
    title: 'Camara',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <CamaraPage />
    );
  }
}
// *****************************************************
// ********************Favoritos************************
// *****************************************************
class FavoritosScreen extends React.Component {
  static navigationOptions = {
    title: 'Favoritos',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Favoritos
        onPressGoRutinas={this.pasarRutinas.bind(this)}
        onPressGoSuplementos={this.pasarSuplementos.bind(this)}
        onPressGoEjercicios={this.pasarEjercicios.bind(this)}
      />
    );
  }
  pasarRutinas() {
    this.props.navigation.navigate('RutinasFavs');
  }
  pasarSuplementos() {
    this.props.navigation.navigate('SuplementacionFavs');
  }
  pasarEjercicios() {
    this.props.navigation.navigate('MusculoFavs');
  }
}
class EjerciciosFavsScreen extends React.Component {

  static navigationOptions = {
    title: 'Ejercicios',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Ejercicios
        onPressGo={this.pasarMusculo.bind(this)}
      />
    );
  }
  pasarMusculo(musculo) {
    this.props.navigation.navigate('MusculoFavs', { musculo: musculo });
  }
}
class MusculoFavsScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => {
    return {
    }, {
      title: 'Ejercicios Favoritos',
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    }
  }
  render() {
    return (
      <MusculoFavs
        onPressGo={this.pasarMusculo.bind(this)}
      />
    );
  }
  pasarMusculo(id_ejercicio, nombre, descripcion) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombreEjercicio: nombre, descripcionEjercicio: descripcion });
  }
}
class RutinasFavsScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => {
    return {
    }, {
      title: 'Mis Rutinas',
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      },
      headerTintColor: '#3399ff',
    }
  }
  render() {
    return (
      <RutinasFavs
        onPressGo={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(id_rutina, nombre, modificable) {
    if (modificable) {
      this.props.navigation.navigate('RutinaEspecificaM', { id_rutina: id_rutina, nombre: nombre });
    } else {
      this.props.navigation.navigate('RutinaEspecificaNoM', { id_rutina: id_rutina, nombre: nombre });
    }
  }
}
class SuplementacionFavsScreen extends React.Component {
  static navigationOptions = {
    title: 'Suplementacion',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SuplementacionFavs
        onPressGo={this.pasarSuplemento.bind(this)}
      />
    );
  }
  pasarSuplemento(id_suplemento, nombre) {
    this.props.navigation.navigate('SuplementacionEspecifica', { id_suplemento: id_suplemento, nombre: nombre });
  }
}
// *****************************************************
// **********************Mi Plan*************************
// *****************************************************
class MiPlanScreen extends React.Component {
  static navigationOptions = {
    title: 'Mi Plan',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <MiPlan
      />
    );
  }
}
class FichaScreen extends React.Component {
  static navigationOptions = {
    title: 'Cambiar Plan',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Ficha
        onPressUpdate={this.cambiarPlan.bind(this)}
      />
    );

  }
  cambiarPlan(caloriasEjercicio, caloriasTotal, objetivoDeseado) {
    this.props.navigation.navigate("MiPlan",{caloriasEjercicio: caloriasEjercicio, caloriasTotal: caloriasTotal, objetivoDeseado: objetivoDeseado});
  }
}
// *****************************************************
// **********************Stacks*************************
// *****************************************************
const EjerciciosStackNavigator = createStackNavigator(
  {
    EjerciciosScreen: {
      screen: EjerciciosScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: '#3399ff' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          )
        }
      }
    },
    Musculo: { screen: MusculoScreen },
    EjerciciosNew: { screen: EjerciciosNewScreen },
    EjercicioEspecificoM: { screen: EjerciciosEspecificoMScreen },
    EjercicioEspecificoNoM: { screen: EjerciciosEspecificoNoMScreen },
    EjercicioModificable: { screen: EjercicioModificableScreen },
    MusculoAgregar: { screen: MusculoAgregarScreen },
  },
  {
    initialRouteName: 'EjerciciosScreen',
  }
);

const RutinasStackNavigator = createStackNavigator(
  {
    RutinasScreen: {
      screen: RutinasScreen,


      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: '#3399ff' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),
          headerRight: (
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="plus" style={{ marginRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('RutinaNew', { tipo: 'nuevo' })}
                size={22}
              />
            </View>
          )
        }
      }
    },
    RutinasTipos: { screen: RutinasTiposScreen },
    RutinaEspecificaM: { screen: RutinaEspecificaMScreen },
    RutinaEspecificaNoM: { screen: RutinaEspecificaNoMScreen },
    RutinaModificable: { screen: RutinaModificableScreen },
    RutinaNew: { screen: RutinaNewScreen },
    EjercicioAgregar: { screen: EjercicioAgregarScreen },
    MusculoAgregar: { screen: MusculoAgregarScreen },
    EjercicioEspecifico: { screen: EjerciciosEspecificoNoMScreen },
  },
  {
    initialRouteName: 'RutinasScreen',
  }
);
const SuplementacionStackNavigator = createStackNavigator(
  {
    SuplementacionScreen: {
      screen: SuplementacionScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: '#3399ff' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),
        }
      }
    },
    SuplementacionTipos: { screen: SuplementacionTiposScreen },
    SuplementacionEspecifica: { screen: SuplementacionEspecificaScreen }
  },
  {
    initialRouteName: 'SuplementacionScreen',
  }
);
const FavoritosStackNavigator = createStackNavigator(
  {
    FavoritosScreen: {
      screen: FavoritosScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: '#3399ff' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),
        }
      }
    },
    RutinasFavs: RutinasFavsScreen,
    MusculoFavs: MusculoFavsScreen,
    EjerciciosFavs: EjerciciosFavsScreen,
    SuplementacionFavs: SuplementacionFavsScreen,
    SuplementacionEspecifica: SuplementacionEspecificaScreen,
    RutinaEspecificaM: RutinaEspecificaMScreen,
    RutinaEspecificaNoM: RutinaEspecificaNoMScreen,
    RutinaModificable: RutinaModificableScreen,
    EjercicioEspecifico: { screen: EjerciciosEspecificoNoMScreen },
  },
  {
    initialRouteName: 'FavoritosScreen',
  }
);


// *****************************************************
// ***********************Tab***************************
// *****************************************************

const PerfilTabNavigator = createBottomTabNavigator({
  MiPlan: MiPlanScreen,
  Ficha: FichaScreen
}, {
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: 'Perfil',
      headerTintColor: '#3399ff',
      headerLeft: (
        <Icon
          style={{ paddingLeft: 10, color: '#3399ff' }}
          onPress={() => navigation.openDrawer()}
          name="md-menu"
          size={30}
        />
      ),
      headerStyle: {
        backgroundColor: 'black',
        height: 55,
        borderBottomWidth: 0
      }
    }
  },
  Title: 'Ficha',
  tabBarOptions: {
    Title: 'Mi Plan',
    activeTintColor: 'white',
    inactiveTintColor: '#3399ff',
    style: {
      backgroundColor: 'black',

    },
    labelStyle: {
      fontSize: 18,
      paddingVertical: 10
    }

  }
});

const PerfilStackNavigator = createStackNavigator({
  PerfilTabNavigator: PerfilTabNavigator
});

// *****************************************************
// **********************Drawer*************************
// *****************************************************

const DrawerConfig = {
  contentComponent: ({ navigation }) => {
    return (<MenuDrawer navigation={navigation} />)
  },
  contentOptions: {
    activeTintColor: '#3399ff'
  }
}
const customDrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <LinearGradient colors={['grey', 'black']} style={styles.profile}>
      <Image style={styles.bgImage} source={require('./assets/Pared_Fondo_Drawer.jpg')} />
      <Image
        style={{ width: width * 0.64, resizeMode: 'contain', alignSelf: 'center' }}
        source={require('./assets/Logo_Drawer.png')}></Image>
    </LinearGradient>
    <ScrollView style={{ borderTopWidth: 0, marginTop: 0, paddingTop: 0 }}>
      <DrawerItems {...props} style={{ borderTopWidth: 0, marginTop: 0, paddingTop: 0 }} />
    </ScrollView>
  </View>
)
const AppDrawerNavigator = createDrawerNavigator({
  Ejercicios: EjerciciosStackNavigator,
  Rutinas: RutinasStackNavigator,
  Suplementacion: SuplementacionStackNavigator,
  Favoritos: FavoritosStackNavigator,
  Perfil: PerfilStackNavigator,
  //Camara: CamaraPageScreen,
},
  // DrawerConfig,
  {
    contentComponent: customDrawerComponent,
    drawerBackgroundColor: 'black',
    //drawerWidth: width * 0.56,
    contentOptions: {
      //Esto sirve para cambiar algunos colores
      activeTintColor: 'white',
      inactiveTintColor: '#3399ff',
    },
  },
  {
    Perfil: {
      Title: "Mi Plan"
    }

  }
  //  {
  //     drawerBackgroundColor: '#ebf0f7',
  //     contentOptions: {
  //       //Esto sirve para cambiar algunos colores
  //       activeTintColor: '#6666ff',
  //       inactiveTintColor:'#3399ff'
  //     }
  //   }
);

// *****************************************************
// **********************Switch*************************
// *****************************************************

const AppSwitchNavigator = createSwitchNavigator({
  Training: { screen: TrainingScreen },
  // SignUpClass: { screen: SignUpClass },
  // ChangePassword: { screen: ChangePasswordScreen },
  // CreateUser: { screen: CreateUserScreen },
  Drawer: { screen: AppDrawerNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);
//const AppContainer = createAppContainer(AppDrawerNavigator);

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, name: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 5,
    color: 'white',
    textAlign: 'left',
  },
  profile: {
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomWidth: 0,
    borderBottomColor: '#3399ff',
    backgroundColor: '#3399ff',
    height: hp(22),
  },
  imgView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  profileText: {
    flex: 3,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bgImage: {
    position: 'absolute',
    height: hp(22),
    width: '100%',
    justifyContent: 'center',
  }
});