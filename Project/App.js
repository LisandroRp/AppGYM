import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Share, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@expo/vector-icons/Ionicons';
import { FontAwesome, FontAwesome5, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
import Actualizacion from './components/Actualizacion';
import Training from './components/Training';
import Ajustes from './components/Ajustes';
import ExportadorLogos from './components/Fotos/ExportadorLogos';
import ExportadorFrases from './components/Fotos/ExportadorFrases';
import { AzulPrincipal } from './components/Estilos/Colors';
import { BlackShadow, BlackShadowForBlack } from './components/Estilos/Styles'
import base from './components/GenerarBase';
import { AsyncStorage } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { ScrollView } from 'react-native-gesture-handler';
import MusculoFavs from './components/MusculoFavs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Localization from 'expo-localization';
import i18n, { localize } from 'i18n-js';
import Version from './app.json';
import { SearchBar } from 'react-native-elements';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};
SearchBar.defaultProps = {
  ...(SearchBar.defaultProps || {}),
  allowFontScaling: false,
};
console.disableYellowBox = true
var { height, width } = Dimensions.get('window');
//var id_idioma = base.traerIdIdiomaSideMenu()
var id_idioma = 1
var nombre_idioma = "es"
const azulPrincipal = AzulPrincipal()

i18n.translations = {
  es: { id_idioma: 1, ejercicios: 'Ejercicios', rutinas: 'Rutinas', suplementos: 'Suplementos', favoritos: 'Favoritos', ajustes: 'Ajustes', perfil: 'Perfil' },
  en: { id_idioma: 2, ejercicios: 'Exercises', rutinas: 'Routines', suplementos: 'Supplements', favoritos: 'Favorites', ajustes: 'Settings', perfil: 'Profile' },
};
i18n.locale = Localization.locale
i18n.defaultLocale = 'en'
i18n.fallbacks = true;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_idioma: 0
    }
  }
  componentDidMount() {
    //base.traerIdIdioma(this.okIdIdioma.bind(this))
  }
  okIdIdioma(id_idiomaApp) {
    console.log(" ")
    _storeData(id_idiomaApp)
    id_idioma = id_idiomaApp
  }
  render() {
    return <AppContainer />
  }
}
export default App;

// *****************************************************
// **********************Log In*************************
// *****************************************************
class ActualizacionScreen extends React.Component {

  render() {
    return (
      <Actualizacion
        onPressStart={this.goTraining.bind(this)}
        onOmitir={this.goPass.bind(this)}
      />
    )
  }
  goTraining(id_idioma1) {
    id_idioma = id_idioma1
    this.props.navigation.navigate('Training', { id_idioma: id_idioma });
  }
  goPass() {
    base.traerIdioma(this.okIdIdioma.bind(this))
  }
  okIdIdioma(idioma) {
    id_idioma = idioma.id_idioma
    nombre_idioma = idioma.nombre_idioma
    i18n.locale = idioma.nombre_idioma
    this.props.navigation.navigate('EjerciciosScreen', { id_idioma: id_idioma });
  }
}

class TrainingScreen extends React.Component {

  render() {
    return (
      <Training
        onPressCrear={this.goPlan.bind(this)}
        onOmitir={this.goPass.bind(this)}
      />
    )
  }

  goPlan(id_idioma) {
    id_idioma = id_idioma
    this.props.navigation.navigate('Perfil');
  }
  goPass() {
    this.props.navigation.navigate('EjerciciosScreen', { id_idioma: id_idioma });
  }
}

// *****************************************************
// *********************Musculos************************
// *****************************************************
class MusculoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('nombre_musculo')
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nombre_musculo', 'Musculo'),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0,
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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
  pasarEjercicio(id_ejercicio, nombre, id_idioma, modificable) {
    if (modificable) {
      this.props.navigation.navigate('EjercicioEspecificoM', { id_ejercicio: id_ejercicio, nombre_ejercicio: nombre, id_idioma: id_idioma });
    } else {
      this.props.navigation.navigate('EjercicioEspecificoNoM', { id_ejercicio: id_ejercicio, nombre_ejercicio: nombre, id_idioma: id_idioma });
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
      musculo: props.navigation.getParam('nombre_musculo'),
      rutina: [],
      flag: 0,
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nombre_musculo', 'Musculo'),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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
  pasarEjercicio(id_ejercicio, nombre_ejercicio, descripcion_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombre_ejercicio: nombre_ejercicio, descripcion_ejercicio: descripcion_ejercicio });
  }
  guardarRutina(rutina, tipo, ultimaPos) {
    this._storeData(rutina);
    if (tipo == 'nuevo') {
      if (rutina[0].combinado) {
        if (rutina[1] == null) {
          this.props.navigation.navigate('EjercicioAgregar', { dia: rutina[0].dia, tipo: tipo, combinado: rutina[0].combinado, ultimaPos: ultimaPos })
        } else {
          this.props.navigation.navigate('RutinaNew', { rutina: rutina })
        }
      } else {
        this.props.navigation.navigate('RutinaNew', { rutina: rutina })
      }
    } else {
      if (rutina[0].combinado) {
        if (rutina[1] == null) {
          this.props.navigation.navigate('EjercicioAgregar', { dia: rutina[0].dia, tipo: tipo, combinado: rutina[0].combinado, ultimaPos: ultimaPos })
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

  componentDidMount() {
    base.traerIdIdioma(this.okIdIdioma.bind(this))
  }
  okIdIdioma(id_idiomaApp) {
    id_idioma = id_idiomaApp
    console.log("cambio" + id_idioma)
  }

  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('idioma')
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: ExportadorFrases.Ejercicios(navigation.getParam('id_idioma')),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="plus" style={{ marginRight: 20, color: azulPrincipal }}
            onPress={() => navigation.navigate('EjerciciosNew', { id_idioma: navigation.getParam('id_idioma') })}
            size={wp(5.5)}
          />
        </View>
      ),
    }
  };
  render() {
    return (
      <Ejercicios
        onPressGo={this.pasarMusculo.bind(this)}
      />
    );
  }
  pasarMusculo(nombre_musculo, id_musculo) {
    this.props.navigation.navigate('Musculo', { nombre_musculo: nombre_musculo, id_musculo: id_musculo });
  }
}
class EjerciciosEspecificoMScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    var nombre = navigation.getParam('nombre_ejercicio');
    var id_ejercicio = navigation.getParam('id_ejercicio');
    return {
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="edit" style={{ marginRight: 20, color: azulPrincipal }}
            onPress={() => navigation.navigate('EjercicioModificable', { nombre_ejercicio: nombre, id_ejercicio: id_ejercicio })}
            size={wp(5.5)}
          />
        </View>
      ),
      title: navigation.getParam('nombre_ejercicio', 'Detalles'),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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
  pasarEjercicio(idEjercicio, nombre_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_Ejercicio: idEjercicio, nombre_ejercicio: nombre_ejercicio });
  }
}
class EjerciciosEspecificoNoMScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nombre_ejercicio', 'Detalles'),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      }
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
      title: ExportadorFrases.Musculos(navigation.getParam('id_idioma')),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    };
  }
  render() {
    return (
      <EjercicioAgregar
        onPressGo={this.pasarEjercicio.bind(this)}
      />
    );
  }
  pasarEjercicio(dia, id_musculo, nombre_musculo, tipo, combinado, ultimaPos) {
    this.props.navigation.navigate('MusculoAgregar', { dia: dia, id_musculo: id_musculo, nombre_musculo: nombre_musculo, tipo: tipo, combinado: combinado, ultimaPos: ultimaPos });
  }
}
class EjerciciosNewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: ExportadorFrases.CrearEjercicios(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    }
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
      title: ExportadorFrases.Editar(id_idioma) + ' ' + '"' + navigation.getParam('nombre_ejercicio', 'Detalles') + '"',
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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
    this.props.navigation.navigate('EjerciciosScreen');
  }
  actualizada() {
    this.props.navigation.navigate('RutinasScreen');
  }
}
// *****************************************************
// *********************Rutinas*************************
// *****************************************************
class RutinasScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: ExportadorFrases.Rutinas(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    }
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Rutinas
        onPressGoRutinas={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(id_tipo, tipo_rutina) {
    this.props.navigation.navigate('RutinasTipos', { id_tipo: id_tipo, tipo_rutina: tipo_rutina });
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
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      headerTitleStyle: {
        fontSize: wp(4),
      },
      height: hp(6),
      headerTintColor: azulPrincipal
    }
  };
  render() {
    return (
      <RutinasTipos
        onPressGo={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(id_rutina, nombre_rutina, modificable, rutina) {

    if (modificable) {
      //Funcionalidad de compartir rutinas
      //this.props.navigation.navigate('RutinaEspecificaM', { id_rutina: id_rutina, nombre_rutina: nombre_rutina, rutina: JSON.stringify(rutina) });
      this.props.navigation.navigate('RutinaEspecificaM', { id_rutina: id_rutina, nombre_rutina: nombre_rutina });
    } else {
      this.props.navigation.navigate('RutinaEspecificaNoM', { id_rutina: id_rutina, nombre_rutina: nombre_rutina });
    }

  }
}
class RutinaNewScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = () => {
    return {
      title: ExportadorFrases.RutinaNueva(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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
  agregarEjercicio(dia, id_tipo, combinado, ultimaPos, id_idioma) {
    this.props.navigation.navigate('EjercicioAgregar', { dia: dia, id_tipo: id_tipo, combinado: combinado, ultimaPos: ultimaPos, id_idioma: id_idioma });
  }
  verInfo(id_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio });
    // this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombre_ejercicio: nombre_ejercicio });
  }
  cancelar() {
    this.props.navigation.navigate('RutinasScreen');
  }
  pasarUsuario() {
    //return this.state.idUser
  }
}
class RutinaEspecificaMScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    var nombre = navigation.getParam('nombre_rutina');
    var id_rutina = navigation.getParam('id_rutina');
    var rutina = navigation.getParam('rutina');

    return {
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          {/* <FontAwesome name="share" style={{ marginRight: 20, color: azulPrincipal }}
            onPress={() => Share.share(({ message: rutina }))}
            size={22}
          /> */}
          <FontAwesome name="edit" style={{ marginRight: 20, color: azulPrincipal }}
            onPress={() => navigation.navigate('RutinaModificable', { nombre_rutina: nombre, id_rutina: id_rutina })}
            size={wp(5.5)}
          />
        </View>
      ),
      title: navigation.getParam('nombre_rutina', 'Rutina'),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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
  editar(rutina) {
    this._storeData(rutina);
  }
  _storeData = async (rutina) => {
    try {
      await AsyncStorage.setItem('rutinaEditable', JSON.stringify(rutina));
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
      title: navigation.getParam('nombre_rutina', 'Rutina'),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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
  verInfo(id_ejercicio, nombre_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombre_ejercicio: nombre_ejercicio });
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
      title: ExportadorFrases.Editar(id_idioma) + ' ' + navigation.getParam('nombre_rutina'),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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

  static navigationOptions = ({ }) => {
    return {
      title: ExportadorFrases.Detalles(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    };
  }
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
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
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
  pasarSuplemento(id_suplemento, nombre_suplemento) {
    this.props.navigation.navigate('SuplementacionEspecifica', { id_suplemento: id_suplemento, nombre_suplemento: nombre_suplemento });
  }
}
class SuplementacionScreen extends React.Component {

  static navigationOptions = ({ }) => {
    return {
      title: ExportadorFrases.Suplementos(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    };
  }
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
  pasarSuplemento(id_suplemento, tipo_suplementacion) {
    this.props.navigation.navigate('SuplementacionTipos', { tipo_suplementacion: tipo_suplementacion, id_suplemento: id_suplemento });
  }
}
// *****************************************************
// ********************Favoritos************************
// *****************************************************
class FavoritosScreen extends React.Component {
  static navigationOptions = ({ }) => {
    return {
      title: ExportadorFrases.Favoritos(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    }
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

  static navigationOptions = ({ }) => {
    return {
      title: ExportadorFrases.Ejercicios(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    };
  }
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
  static navigationOptions = () => {
    return {
    }, {
      title: ExportadorFrases.EjerciciosFavs(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    }
  }
  render() {
    return (
      <MusculoFavs
        onPressGo={this.pasarMusculo.bind(this)}
      />
    );
  }
  pasarMusculo(id_ejercicio, nombre_ejercicio, descripcion_ejercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombre_ejercicio: nombre_ejercicio, descripcion_ejercicio: descripcion_ejercicio });
  }
}
class RutinasFavsScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = () => {
    return {
      title: ExportadorFrases.RutinasFavs(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    }
  }
  render() {
    return (
      <RutinasFavs
        onPressGo={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(id_rutina, nombre_rutina, modificable, rutina) {
    if (modificable) {
      //Funcionalidad de compartir rutinas
      //this.props.navigation.navigate('RutinaEspecificaM', { id_rutina: id_rutina, nombre_rutina: nombre_rutina, rutina: JSON.stringify(rutina) });
      this.props.navigation.navigate('RutinaEspecificaM', { id_rutina: id_rutina, nombre_rutina: nombre_rutina });
    } else {
      this.props.navigation.navigate('RutinaEspecificaNoM', { id_rutina: id_rutina, nombre_rutina: nombre_rutina });
    }
  }
}
class SuplementacionFavsScreen extends React.Component {
  static navigationOptions = ({ }) => {
    return {
      title: ExportadorFrases.Suplementos(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      headerTitleStyle: {
        fontSize: wp(4),
      },
      height: hp(6),
      headerTintColor: azulPrincipal
    }
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
  static navigationOptions = ({ }) => {
    return {
      title: ExportadorFrases.MiPlan(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    }
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
  static navigationOptions = ({ }) => {
    return {
      title: ExportadorFrases.CambiarPlan(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    }
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
  cambiarPlan(recargar) {
    this.props.navigation.navigate('MiPlan', { isLoading: recargar });
  }
}
class AjustesScreen extends React.Component {
  static navigationOptions = ({ }) => {
    return {
      title: ExportadorFrases.Ajustes(id_idioma),
      headerStyle: [{
        backgroundColor: 'black',
        borderBottomWidth: 0
      }, BlackShadowForBlack()],
      height: hp(6),
      headerTintColor: azulPrincipal,
      headerTitleStyle: {
        fontSize: wp(4),
      },
    }
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Ajustes
        cambiarIdioma={this.cambiarIdioma.bind(this)}
      />
    );
  }
  cambiarIdioma() {
    this.props.navigation.navigate("idioma");
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
              style={{ paddingLeft: 10, color: azulPrincipal }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={wp(6.6)}
            />
          ),
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
              style={{ paddingLeft: 10, color: azulPrincipal }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={wp(6.6)}
            />
          ),
          headerRight: (
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="plus" style={{ marginRight: 20, color: azulPrincipal }}
                onPress={() => navigation.navigate('RutinaNew', { tipo: 'nuevo' })}
                size={wp(5.5)}
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
              style={{ paddingLeft: 10, color: azulPrincipal }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={wp(6.6)}
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
              style={{ paddingLeft: 10, color: azulPrincipal }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={wp(6.6)}
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
const AjustesStackNavigator = createStackNavigator(
  {
    AjustesScreen: {
      screen: AjustesScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: azulPrincipal }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={wp(6.6)}
            />
          ),
        }
      }
    },
    idioma: { screen: Actualizacion },
  },
  {
    initialRouteName: 'AjustesScreen',
  }
);

// *****************************************************
// ***********************Tab***************************
// *****************************************************

const PerfilTabNavigator = createBottomTabNavigator({
  MiPlan: {
    screen: MiPlanScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text style={{ fontSize: wp(3), textAlign: "center", color: (focused ? "white" : azulPrincipal) }}>Mi Plan</Text>,
      tabBarIcon: ({ tintColor }) => { return (<MaterialCommunityIcons name="playlist-check" size={wp(6.6)} color={tintColor} />) }
    }
  },
  Ficha: {
    screen: FichaScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text style={{ fontSize: wp(3), textAlign: "center", color: (focused ? "white" : azulPrincipal) }}>Cambiar Plan</Text>,
      tabBarIcon: ({ tintColor }) => { return (<MaterialCommunityIcons name="playlist-edit" size={wp(6.6)} color={tintColor} />) }
    }
  },
},
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index]
      return {
        headerTitle: 'Perfil',
        headerTintColor: azulPrincipal,
        headerTitleStyle: {
          fontSize: wp(4),
        },
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10, color: azulPrincipal }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={wp(6.6)}
          />
        ),
        headerStyle: [{
          backgroundColor: 'black',
          borderBottomWidth: 0
        }, BlackShadowForBlack()],
        height: hp(6),
      }
    },
    swipeEnabled: true,
    Title: 'Ficha',
    tabBarOptions: {
      Title: 'Mi Plan',
      activeTintColor: 'white',
      inactiveTintColor: azulPrincipal,
      style: {
        backgroundColor: 'black',
        borderTopColor: 'black'

      },
      labelStyle: {
        fontSize: wp(4.4),
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
    activeTintColor: azulPrincipal
  }
}
const customDrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <LinearGradient colors={['grey', 'black']} style={styles.profile}>
      <Image style={styles.bgImage} source={require('./assets/Pared_Fondo_Drawer.jpg')} />
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={require('./assets/Logo_Drawer.png')} />
      </View>
    </LinearGradient>
    <ScrollView style={{ borderTopWidth: 0, marginTop: 0, paddingTop: 0 }}>
      <DrawerItems {...props} style={{ borderTopWidth: 0, marginTop: 0, paddingTop: 0 }} />
    </ScrollView>
    <Text style={{ alignSelf: 'flex-end', color: azulPrincipal, padding: 5 }}>Version: {Version.expo.version}</Text>
  </View>
)
const AppDrawerNavigator = createDrawerNavigator({
  Ejercicios: {
    screen: EjerciciosStackNavigator,
    navigationOptions: {
      title: i18n.t('ejercicios'),
      drawerIcon: ({ tintColor }) => (<Entypo name="home" size={wp(5.5)} color={tintColor} />)
    }
  },
  Rutinas: {
    screen: RutinasStackNavigator,
    navigationOptions: {
      title: i18n.t('rutinas'),
      drawerIcon: ({ tintColor }) => (<Ionicons name="md-list" size={wp(6.6)} color={tintColor} />)
    }
  },
  Suplementacion: {
    screen: SuplementacionStackNavigator,
    navigationOptions: {
      title: i18n.t('suplementos'),
      drawerIcon: ({ tintColor }) => (<FontAwesome5 name="prescription-bottle" size={wp(5.5)} color={tintColor} />)
    }
  },
  Favoritos: {
    screen: FavoritosStackNavigator,
    navigationOptions: {
      title: i18n.t('favoritos'),
      drawerIcon: ({ tintColor }) => (<Entypo name="star" size={wp(6.6)} color={tintColor} />)
    }
  },
  Ajustes: {
    screen: AjustesStackNavigator,
    navigationOptions: {
      title: i18n.t('ajustes'),
      drawerIcon: ({ tintColor }) => (<Ionicons name="md-settings" size={wp(6)} color={tintColor} />)
    }
  },
  Perfil: {
    screen: PerfilStackNavigator,
    navigationOptions: {
      title: i18n.t('perfil'),
      drawerIcon: ({ tintColor }) => (<FontAwesome name="user" size={wp(6)} color={tintColor} />)
    }
  }
},
  // DrawerConfig,

  {
    //drawerType: 'slide',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    contentComponent: customDrawerComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DraweClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: 'black',
    drawerWidth: wp(66),
    contentOptions: {
      //Esto sirve para cambiar algunos colores
      activeTintColor: 'white',
      inactiveTintColor: azulPrincipal,
      labelStyle: {
        fontSize: wp(3.8)
      }
    },
  },
  //  {
  //     drawerBackgroundColor: '#ebf0f7',
  //     contentOptions: {
  //       //Esto sirve para cambiar algunos colores
  //       activeTintColor: '#6666ff',
  //       inactiveTintColor:azulPrincipal
  //     }
  //   }
);

// *****************************************************
// **********************Switch*************************
// *****************************************************

const AppSwitchNavigator = createSwitchNavigator({
  Actualizacion: { screen: ActualizacionScreen },
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
    height: hp(18),
    paddingTop: hp(1)
  },
  profileImageContainer: {
    flex: 1,
    paddingHorizontal: wp(5)
  },
  profileImage: {
    flex: 1,
    width: "100%",
    resizeMode: 'contain'
  },
  bgImage: {
    position: 'absolute',
    height: hp(18),
    width: '100%',
    justifyContent: 'center',
    opacity: 0.7
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
  }
});