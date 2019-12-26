import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@expo/vector-icons/Ionicons';
import Detalle from './components/Detalle';
import Ejercicios from './components/Ejercicios'
import EjerciciosEspecifico from './components/EjercicioEspecifico'
import EjercicioAgregar from './components/EjercicioAgregar'
import ChangePassword from './components/ChangePassword'
import CreateUser from './components/CreateUser'
import Informacion from './components/DatosPersonales';
import MisRutinas from './components/Comentarios';
import Craigslist from './components/Craigslist'
import LogInCards from './components/LogInCards'
import Festivales from './components/Festivales';
import Search from './components/Search';
import Musculo from './components/Musculo'
import MusculoAgregar from './components/MusculoAgregar'
import Suplementacion from './components/Suplementacion'
import SuplementacionEspecifica from './components/SuplementacionEspecifica'
import Rutinas from './components/Rutinas';
import RutinaNew from './components/RutinaNew'
import RutinaModificable from './components/RutinaModificable'
import RutinaEspecifica from './components/RutinaEspecifica'
import RutinasFavs from './components/RutinasFavs'
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
  pasarEjercicio(idEjercicio,nombre,descripcion) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio, nombreEjercicio:nombre, descripcionEjercicio: descripcion });
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
  pasarEjercicio(idEjercicio,nombre,descripcion) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio, nombreEjercicio:nombre, descripcionEjercicio: descripcion });
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
      idEjercicio: props.navigation.getParam('idEjercicio')
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
    // this.state = {
    //   idUser: this.props.navigation.getParam('idUser'),
    //   idEvento: null
    // }
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
        onPressGo={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(id,nombre,modificable) {
    if(modificable=="true"){
    this.props.navigation.navigate('RutinaEspecificaM', { id_rutina: id ,nombre: nombre});
    }else{
      this.props.navigation.navigate('RutinaEspecificaNoM', { id_rutina: id ,nombre: nombre});
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
  verInfo(nombre,idEjercicio){
    this.props.navigation.navigate('EjercicioEspecifico',{nombreEjercicio:nombre, id:idEjercicio});
  }
  cancelar(){
    this.props.navigation.navigate('RutinasScreen');
  }
  pasarUsuario() {
    //return this.state.idUser
  }
}
class RutinaModificableScreen extends React.Component{
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Editar ' + navigation.getParam('nombre'),
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
      />
    );
  }
  agregarEjercicio(dia,tipo) {
    this.props.navigation.navigate('EjercicioAgregar',{dia:dia,tipo: tipo});
  }
  verInfo(nombre,idEjercicio){
    this.props.navigation.navigate('EjercicioEspecifico',{nombreEjercicio:nombre, idEjercicio:idEjercicio});
  }
  cancelar(){
    this.props.navigation.navigate('RutinasScreen');
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
            onPress={() => navigation.navigate('RutinaModificable', {nombre: nombre, id_rutina: id_rutina})}
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
        onPressGo={this.pasarConcierto.bind(this)}
        editable={this.editar.bind(this)}
        onPressInfo={this.verInfo.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
  verInfo(nombre, idEjercicio){
    this.props.navigation.navigate('EjercicioEspecifico',{nombreEjercicio:nombre, idEjercicio:idEjercicio});
  }
  editar(id){
    this._storeData(id);
  }
  _storeData = async (id) => {
    try {
        await AsyncStorage.setItem('rutinaEditable', JSON.stringify(id));
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
  verInfo(nombre, idEjercicio){
    this.props.navigation.navigate('EjercicioEspecifico',{nombreEjercicio:nombre, idEjercicio:idEjercicio});
  }
  editar(id){
    this.setState({idModificable:id})
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
//   static navigationOptions = {
//       title: 'Mis Rutinas',
//     headerStyle: {
//       backgroundColor: 'black',
//       height: 55,
//       borderBottomWidth: 0
//     },
//     headerTintColor: '#3399ff',
// }
  render() {
    return (
      <RutinasFavs
        onPressGo={this.irRutina.bind(this)}
      />
    );
  }
  irRutina(id,nombre,modificable) {
    if(modificable){
    this.props.navigation.navigate('RutinaEspecificaMScreen', { id: id ,nombre: nombre});
    }else{
      this.props.navigation.navigate('RutinaEspecificaNoMScreen', { id: id ,nombre: nombre});
    }
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
  constructor(props) {
    super(props)
    this.state = {
      idEjercicio: props.navigation.getParam('idEjercicio')
    }
  }
  render() {
    return (
      <SuplementacionEspecifica
        onPressGo={this.pasarEjercicio.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate(' SuplementacionEspecifica', { idEjercicio: idEjercicio });
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
  pasarSuplemento(id, nombre) {
    this.props.navigation.navigate('SuplementacionEspecifica', { id: id, nombre:nombre});
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
  RutinasFavs: RutinasFavsScreen
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

const AppContainer = createAppContainer(AppSwitchNavigator);

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