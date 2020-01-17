import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@expo/vector-icons/Ionicons';
import Ejercicios from './components/Ejercicios'
import EjerciciosEspecifico from './components/EjercicioEspecifico'
import EjercicioAgregar from './components/EjercicioAgregar'
import EjerciciosFavs from './components/EjerciciosFavs'
import ChangePassword from './components/ChangePassword'
import CreateUser from './components/CreateUser'
import Informacion from './components/DatosPersonales';
import LogInCards from './components/LogInCards'
import Musculo from './components/Musculo'
import MusculoAgregar from './components/MusculoAgregar'
import Suplementacion from './components/Suplementacion'
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
console.disableYellowBox=true

function handleSearch() {

}

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;


// *****************************************************
// **********************Log In*************************
// *****************************************************
class SignUpClass extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <LogInCards
        onPressLogin={this.checkLogin.bind(this)}
        onPressPass={this.goPass.bind(this)}
        onPressCreate={this.goCreate.bind(this)}
      />
    )
  }
  checkLogin(IdUser) {
    //this.props.navigation.navigate('MockedViewScreen', { IdUser: IdUser });
    this.props.navigation.navigate('Ejercicios');
  }

  goPass() {
    this.props.navigation.navigate('ChangePassword');
  }

  goCreate() {
    this.props.navigation.navigate('CreateUser');
  }
}
class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ChangePassword
        onPress={this.checkPassword.bind(this)}
      />
    );
  }
  checkPassword() {
    this.props.navigation.navigate('SignUpClass')
  }
}
class CreateUserScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <CreateUser
        onPress={this.checkPassword.bind(this)}
      />
    );
  }
  checkPassword() {
    this.props.navigation.navigate('SignUpClass')
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
  pasarEjercicio(id_ejercicio,nombre,descripcion) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombreEjercicio:nombre, descripcionEjercicio: descripcion });
  }
  agarrarMusculo(){
    return this.state.musculo
  }
}
class MusculoAgregarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo'),
      rutina:[],
      flag:0,
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
  pasarEjercicio(id_ejercicio,nombre,descripcion) {
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombreEjercicio:nombre, descripcionEjercicio: descripcion });
  }
  guardarRutina(rutina,tipo){
    this._storeData(rutina);
    if(tipo=='nuevo'){
    this.props.navigation.navigate('RutinaNew', { rutina: rutina})
    }else{
      this.props.navigation.navigate('RutinaModificable', { rutina: rutina})
    }
  }
  agarrarMusculo(){
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
    this.props.navigation.navigate('Musculo', { musculo: musculo });
  }
}
class EjerciciosEspecificoScreen extends React.Component {

  static navigationOptions = {
    title: 'Detalles',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
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
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
}
class EjercicioAgregarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo'),
      rutina:[],
      flag:0,
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
      <EjercicioAgregar
        onPressGo={this.pasarEjercicio.bind(this)}
      />
    );
  }
  pasarEjercicio(dia, musculo, tipo) {
    this.props.navigation.navigate('MusculoAgregar', {dia:dia,musculo:musculo,tipo:tipo});
  }
}
// *****************************************************
// *********************Rutinas*************************
// *****************************************************
class RutinasScreen extends React.Component {
  constructor(props) {
    super(props)
    {update: "update"}
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
    this.props.navigation.navigate('RutinasTipos', { tipo_rutina: tipo_rutina});
  }

}
class RutinasTiposScreen extends React.Component {
  constructor(props) {
    super(props)
    {update: "update"}
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
      <RutinasTipos
        onPressGo={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(id_rutina,nombre,modificable) {
    console.log(modificable);
    if(modificable){
    this.props.navigation.navigate('RutinaEspecificaM', { id_rutina: id_rutina ,nombre: nombre});
    }else{
      this.props.navigation.navigate('RutinaEspecificaNoM', { id_rutina: id_rutina ,nombre: nombre});
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
  agregarEjercicio(dia,tipo) {
    this.props.navigation.navigate('EjercicioAgregar',{dia:dia,tipo: tipo});
  }
  verInfo(id_ejercicio){
    this.props.navigation.navigate('EjercicioEspecifico',{id_ejercicio: id_ejercicio});
  }
  cancelar(){
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
  static navigationOptions = ({ navigation}) => {
    var nombre= navigation.getParam('nombre');
    var id_rutina = navigation.getParam('id_rutina');
    return {
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="edit" style={{ marginRight: 20, color: '#3399ff' }}
            onPress={() => navigation.navigate('RutinaModificable', {nombre_rutina: nombre, id_rutina: id_rutina})}
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
  verInfo(id_ejercicio){
    this.props.navigation.navigate('EjercicioEspecifico',{id_ejercicio:id_ejercicio});
  }
  editar(id_rutina){
    this._storeData(id_rutina);
  }
  _storeData = async (id_rutina) => {
    try {
        await AsyncStorage.setItem('rutinaEditable', JSON.stringify(id_rutina));
    } catch (error) {
        console.log(error);
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
  verInfo(id_ejercicio){
    this.props.navigation.navigate('EjercicioEspecifico',{id_ejercicio: id_ejercicio});
  }
  editar(id){
    this.setState({idModificable:id})
  }
}
class RutinaModificableScreen extends React.Component{
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
  agregarEjercicio(dia,tipo) {
    this.props.navigation.navigate('EjercicioAgregar',{dia:dia,tipo: tipo});
  }
  verInfo(id_ejercicio){
    this.props.navigation.navigate('EjercicioEspecifico',{id_ejercicio: id_ejercicio});
  }
  cancelar(){
    this.props.navigation.navigate('RutinasScreen',{update: "dale"});
  }
  actualizada(id_rutina, nombre){
    this.props.navigation.navigate('RutinasScreen', { id_rutina: id_rutina ,nombre: nombre});
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
  pasarSuplemento(id_suplemento, nombre) {
    this.props.navigation.navigate('SuplementacionEspecifica', { id_suplemento: id_suplemento, nombre:nombre});
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
      <CamaraPage/>
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
    //this.props.navigation.navigate('EjerciciosFavs');
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
  static navigationOptions= ({ navigation }) => {
    return {
    },{
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
    this.props.navigation.navigate('EjercicioEspecifico', { id_ejercicio: id_ejercicio, nombreEjercicio:nombre, descripcionEjercicio: descripcion });
  }
}
class RutinasFavsScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions= ({ navigation }) => {
    return {
    },{
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
  irRutina(id_rutina,nombre,modificable) {
    if(modificable){
    this.props.navigation.navigate('RutinaEspecificaMScreen', { id_rutina: id_rutina ,nombre: nombre});
    }else{
      this.props.navigation.navigate('RutinaEspecificaNoMScreen', { id_rutina: id_rutina ,nombre: nombre});
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
    this.props.navigation.navigate('SuplementacionEspecifica', { id_suplemento: id_suplemento, nombre:nombre});
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
    Musculo: {screen: MusculoScreen},
    MusculoAgregar: {screen: MusculoAgregarScreen},
    EjercicioEspecifico: {screen:EjerciciosEspecificoScreen},
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
                onPress={() => navigation.navigate('RutinaNew',{ tipo: 'nuevo' })}
                size={22}
              />
            </View>
          )
        }
      }
    },
    RutinasTipos: { screen: RutinasTiposScreen},
    RutinaEspecificaM: { screen: RutinaEspecificaMScreen },
    RutinaEspecificaNoM: { screen: RutinaEspecificaNoMScreen },
    RutinaModificable: {screen: RutinaModificableScreen},
    RutinaNew: { screen: RutinaNewScreen },
    EjercicioAgregar: {screen:EjercicioAgregarScreen},
    MusculoAgregar: {screen: MusculoAgregarScreen},
    EjercicioEspecifico: {screen: EjerciciosEspecificoScreen},
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
    SuplementacionEspecifica: { screen: SuplementacionEspecificaScreen },
  },
  {
    initialRouteName: 'SuplementacionScreen',
  }
);


// *****************************************************
// ***********************Tab***************************
// *****************************************************

const PerfilTabNavigator = createBottomTabNavigator({
  Perfil: Informacion,
  FavoritosScreen: FavoritosScreen
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
    tabBarOptions: {
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
    PerfilTabNavigator: PerfilTabNavigator,
    RutinasFavs: RutinasFavsScreen,
    MusculoFavs: MusculoFavsScreen,
    EjerciciosFavs: EjerciciosFavsScreen,
    SuplementacionFavs: SuplementacionFavsScreen,
    SuplementacionEspecifica: SuplementacionEspecificaScreen,
    RutinaEspecificaMScreen: RutinaEspecificaMScreen,
    RutinaEspecificaNoMScreen: RutinaEspecificaNoMScreen,
    RutinaModificable: RutinaModificableScreen,
    EjercicioEspecifico: EjerciciosEspecificoScreen
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
    <View style={{alignContent:'center',alignItems:'center'}}>
      <Image
        style={{ height: 100, width:200, resizeMode: 'contain', alignSelf:'center' }}
        source={require('./components/Licha-enjoy.png')}></Image>
        </View>
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
  Perfil: PerfilStackNavigator,
  Camara: CamaraPageScreen,
},
  // DrawerConfig,
  {
    contentComponent: customDrawerComponent,
    drawerBackgroundColor: 'black',
    contentOptions: {
      //Esto sirve para cambiar algunos colores
      activeTintColor: 'white',
      inactiveTintColor: '#3399ff'
    }
  },
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
  SignUpClass: { screen: SignUpClass },
  ChangePassword: { screen: ChangePasswordScreen },
  CreateUser: { screen: CreateUserScreen },
  Drawer: { screen: AppDrawerNavigator },
});

//const AppContainer = createAppContainer(AppSwitchNavigator);
const AppContainer = createAppContainer(AppDrawerNavigator);

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
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomWidth: 0,
    borderBottomColor: '#3399ff',
    backgroundColor: '#3399ff',
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
});