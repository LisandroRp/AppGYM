import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo'
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
import RutinaEspecifica from './components/RutinaEspecifica'
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
console.disableYellowBox=true

function handleSearch() {

}

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

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
class MockedViewScreen extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   idUser: this.props.navigation.getParam('idUser'),
    //   idEvento: null
    // }
  }
  static navigationOptions = {
    title: 'Inicio',
    headerStyle: {
      backgroundColor: 'black',
      height: 50,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  render() {
    return (
      <Craigslist
        onPressGo={this.pasarConcierto.bind(this)}
        agarrarId={this.pasarIdEvento.bind(this)}
        agarrarIdUsuario={this.pasarUsuario.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
  pasarIdEvento() {
    return this.state.idEvento
  }
  pasarUsuario() {
    //return this.state.idUser
  }

}
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
  guardarRutina(rutina){
    this._storeData(rutina);
    this.props.navigation.navigate('RutinaNew', { rutina: rutina})
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
  pasarEjercicio(dia, musculo) {
    this.props.navigation.navigate('MusculoAgregar', {dia:dia,musculo:musculo});
  }
}
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
  irRutina(id,nombre) {
    this.props.navigation.navigate('RutinaEspecifica', { id: id ,nombre: nombre});
  }

}
class RutinaNewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
          pedro: this.props.navigation.getParam('isLoading'),
    }
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
      />
    );
  }
  agregarEjercicio(dia) {
    this.props.navigation.navigate('EjercicioAgregar',{dia:dia});
  }
  verInfo(nombre){
    this.props.navigation.navigate('EjercicioEspecifico',{nombreEjercicio:nombre});
  }
  pasarUsuario() {
    //return this.state.idUser
  }
}
class RutinaEspecificaScreen extends React.Component {
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
        agarrarId={this.pasarIdEvento.bind(this)}
        agarrarIdUsuario={this.pasarUsuario.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
  pasarIdEvento() {
    return this.state.idEvento
  }
  pasarUsuario() {
    //return this.state.idUser
  }
}
class FestivalesScreen extends React.Component {

  static navigationOptions = {
    title: 'Festivals',
    headerStyle: {
      backgroundColor: 'white',
      height: 45
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Festivales
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
}
class DetalleScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Details',
      headerStyle: {
        backgroundColor: 'white',
        height: 45
      },
      headerTintColor: '#3399ff',
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.navigation.getParam('id'),
      latitude: null,
      longitude: null,
    }
  }
  render() {
    return (
      <Detalle
        agarrarId={this.pasarId.bind(this)}
        onPress={this.pasarConcierto.bind(this)}
        guardarPos={this.guardarPos.bind(this)}

      />
    );
  }
  pasarId() {
    return this.state.id
  }
  guardarPos(lat, long) {
    this.setState({ latitude: lat })
    this.setState({ longitude: long })
  }
}
class SearchScreen extends React.Component {

  static navigationOptions = {
    title: 'Search',
    headerStyle: {
      backgroundColor: 'white',
      height: 45,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };

  constructor(props) {
    super(props);
    this.state = {
      tipo: this.props.navigation.getParam('tipo'),
    }
  }
  render() {
    return (
      <Search
        onPressGo={this.pasarConcierto.bind(this)}
        agarrarTipo={this.pasarTipo.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
  pasarTipo() {
    return this.state.tipo
  }
}
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
const MockedViewStackNavigator = createStackNavigator(
  {
    MockedViewScreen: {
      screen: MockedViewScreen,


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
              <FontAwesome name="search" style={{ marginRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('Helado', { tipo: 'Recomendados' })}
                size={22}
              />
            </View>
          )
        }
      }
    },
    Helado: { screen: SearchScreen },
    Detalle: { screen: DetalleScreen },
  },
  {
    initialRouteName: 'MockedViewScreen',
  }
);

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
    // Helado: { screen: SearchScreen },
    // Detalle: { screen: DetalleScreen },
    // Pecho: {screen: PechoScreen},
    // Espalda: {screen: EspaldaScreen},
    // Hombros: {screen: HombrosScreen},
    // Bicep: {screen: BicepScreen},
    // Tricep: {screen: TricepScreen},
    // Piernas: {screen: PiernasScreen},
    // Abdominales: {screen: AbdominalesScreen},
    // Cardio: {screen: CardioScreen},
    Musculo: {screen: MusculoScreen},
    MusculoAgregar: {screen: MusculoAgregarScreen},
    EjercicioEspecifico: {screen:EjerciciosEspecificoScreen},
  },
  {
    initialRouteName: 'EjerciciosScreen',
  }
);
// const EjerciciosAgregarStackNavigator = createStackNavigator(
//   {
//     EjerciciosScreen: {
//       screen: EjerciciosAgregarScreen,
//       navigationOptions: ({ navigation }) => {
//         return {
//           headerLeft: (
//             <Icon
//               style={{ paddingLeft: 10, color: '#3399ff' }}
//               onPress={() => navigation.openDrawer()}
//               name="md-menu"
//               size={30}
//             />
//           )
//         }
//       }
//     },
//     Detalle: { screen: DetalleScreen },
//     Pecho: {screen: PechoScreen},
//     Espalda: {screen: EspaldaScreen},
//     Hombros: {screen: HombrosScreen},
//     Bicep: {screen: BicepScreen},
//     Tricep: {screen: TricepScreen},
//     Piernas: {screen: PiernasScreen},
//     Abdominales: {screen: AbdominalesScreen},
//     Cardio: {screen: CardioScreen},
//     EjercicioEspecifico: {screen:EjerciciosEspecificoScreen},
//   },
//   {
//     initialRouteName: 'EjerciciosAgregarScreen',
//   }
// );
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
                onPress={() => navigation.navigate('RutinaNew',{ tipo: 'Recomendados' })}
                size={22}
              />
            </View>
          )
        }
      }
    },
    RutinaEspecifica: { screen: RutinaEspecificaScreen },
    RutinaNew: { screen: RutinaNewScreen },
    EjercicioAgregar: {screen:EjercicioAgregarScreen},
    MusculoAgregar: {screen: MusculoAgregarScreen},
    EjercicioEspecifico: {screen: EjerciciosEspecificoScreen}
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
const FestivalesStackNavigator = createStackNavigator(
  {
    FestivalesScreen: {
      screen: FestivalesScreen,
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
              <FontAwesome name="search" style={{ marginRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('Helado', { tipo: 'Festival' })}
                size={22}
              />
            </View>
          )
        }
      }
    },
    Helado: { screen: SearchScreen },
    Detalle: { screen: DetalleScreen },
  },
  {
    initialRouteName: 'FestivalesScreen',
  }
);
const PerfilTabNavigator = createBottomTabNavigator({
  Informacion,
  MisRutinas
}, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index]
      return {
        headerTitle: 'Profile',
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
          height: 50,
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
  PerfilTabNavigator: PerfilTabNavigator
});

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
  //Inicio: MockedViewStackNavigator,
  Ejercicios: EjerciciosStackNavigator,
  Rutinas: RutinasStackNavigator,
  Suplementacion: SuplementacionStackNavigator,
  Perfil: PerfilStackNavigator,
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


const AppSwitchNavigator = createSwitchNavigator({
  SignUpClass: { screen: SignUpClass },
  Craigslist: { screen: MockedViewScreen },
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