import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo'
import Icon from '@expo/vector-icons/Ionicons';
import Detalle from './components/Detalle';
import Ejercicios from './components/Ejercicios'
import EjerciciosEspecifico from './components/EjercicioEspecifico'
import ChangePassword from './components/ChangePassword'
import CreateUser from './components/CreateUser'
import Information from './components/DatosPersonales';
import Comments from './components/Comentarios';
import Craigslist from './components/Craigslist'
import LogInCards from './components/LogInCards'
import Festivales from './components/Festivales';
import MapaVarios from './components/MapaVarios';
import MapaUnEvento from './components/MapaUnEvento'
import Search from './components/Search';
import Musculo from './components/Musculo'
import Suplementacion from './components/Suplementacion'
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
    this.props.navigation.navigate('MockedViewScreen');
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
class PechoScreen extends React.Component {

  static navigationOptions = {
    title: 'Pecho',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
  }
}
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
  agarrarMusculo(){
    return this.state.musculo
  }
}
class EspaldaScreen extends React.Component {

  static navigationOptions = {
    title: 'Espalda',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
  }
  }
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
  agarrarMusculo(){
    return this.state.musculo
  }
}
class HombrosScreen extends React.Component {

  static navigationOptions = {
    title: 'Hombros',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
  }
}
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
  agarrarMusculo(){
    return this.state.musculo
  }
}
class BicepScreen extends React.Component {

  static navigationOptions = {
    title: 'Bicep',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
  }
}
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
  agarrarMusculo(){
    return this.state.musculo
  }
}
class TricepScreen extends React.Component {

  static navigationOptions = {
    title: 'Tricep',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
  }
}
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
  agarrarMusculo(){
    return this.state.musculo
  }
}
class PiernasScreen extends React.Component {

  static navigationOptions = {
    title: 'Piernas',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
  }
}
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
  agarrarMusculo(){
    return this.state.musculo
  }
}
class AbdominalesScreen extends React.Component {

  static navigationOptions = {
    title: 'Abdominales',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
  }
}
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
  agarrarMusculo(){
    return this.state.musculo
  }
}
class CardioScreen extends React.Component {

  static navigationOptions = {
    title: 'Cardio',
    headerStyle: {
      backgroundColor: 'black',
      height: 55,
      borderBottomWidth: 0
    },
    headerTintColor: '#3399ff',
  };
  constructor(props) {
    super(props);
    this.state = {
      musculo: props.navigation.getParam('musculo')
  }
}
  render() {
    return (
      <Musculo
        onPressGo={this.pasarEjercicio.bind(this)}
        queMusculo={this.agarrarMusculo.bind(this)}
      />
    );
  }
  pasarEjercicio(idEjercicio) {
    this.props.navigation.navigate('EjercicioEspecifico', { idEjercicio: idEjercicio });
  }
  agarrarMusculo(){
    return this.state.musculo
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
    if(musculo=='Pecho')
    {
    this.props.navigation.navigate('Pecho', { musculo: musculo });
    }
    if(musculo=='Espalda')
    {
    this.props.navigation.navigate('Espalda', { musculo: musculo });
    }
    if(musculo=='Hombros')
    {
    this.props.navigation.navigate('Hombros', { musculo: musculo });
    }
    if(musculo=='Piernas')
    {
    this.props.navigation.navigate('Piernas', { musculo: musculo });
    }
    if(musculo=='Bicep')
    {
    this.props.navigation.navigate('Bicep', { musculo: musculo });
    }
    if(musculo=='Tricep')
    {
    this.props.navigation.navigate('Tricep', { musculo: musculo });
    }
    if(musculo=='Abdominales')
    {
    this.props.navigation.navigate('Abdominales', { musculo: musculo });
    }
    if(musculo=='Cardio')
    {
    this.props.navigation.navigate('Cardio', { musculo: musculo });
    }
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
  pasarSuplemento(suplemento) {

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
      headerRight: (
        a = '',
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="map-marker" style={{ paddingRight: 20, color: '#3399ff' }}
            onPress={() => navigation.navigate("MapaUnEvento")}
            size={22}
          />
        </View>
      ),
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
  pasarConcierto(id) {
    this.props.navigation.navigate('MapaUnEvento', { IdEvento: id });
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
class MapaVariosScreen extends React.Component {

  static navigationOptions = {
    title: 'Map',
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
      <MapaVarios
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
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
              <FontAwesome name="map" style={{ paddingRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('MapaVarios', { tipo: 'Recomendados' })}
                size={22}
              />
            </View>
          )
        }
      }
    },
    Helado: { screen: SearchScreen },
    Detalle: { screen: DetalleScreen },
    MapaVarios: { screen: MapaVariosScreen },
    MapaUnEvento: { screen: MapaUnEvento },
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
          ),
          headerRight: (
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="search" style={{ marginRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('Helado', { tipo: 'Concierto' })}
                size={22}
              />
              <FontAwesome name="map" style={{ paddingRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate("MapaVarios", { tipo: 'Concierto' })}
                size={22}
              />
            </View>
          )
        }
      }
    },
    Helado: { screen: SearchScreen },
    Detalle: { screen: DetalleScreen },
    Pecho: {screen: PechoScreen},
    Espalda: {screen: EspaldaScreen},
    Hombros: {screen: HombrosScreen},
    Bicep: {screen: BicepScreen},
    Tricep: {screen: TricepScreen},
    Piernas: {screen: PiernasScreen},
    Abdominales: {screen: AbdominalesScreen},
    Cardio: {screen: CardioScreen},
    EjercicioEspecifico: {screen:EjerciciosEspecificoScreen},
    MapaVarios: { screen: MapaVariosScreen },
    MapaUnEvento: { screen: MapaUnEvento },
  },
  {
    initialRouteName: 'EjerciciosScreen',
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
              <FontAwesome name="map" style={{ paddingRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate("MapaVarios", { tipo: 'Festival' })}
                size={22}
              />
            </View>
          )
        }
      }
    },
    Helado: { screen: SearchScreen },
    Detalle: { screen: DetalleScreen },
    MapaVarios: { screen: MapaVariosScreen },
    MapaUnEvento: { screen: MapaUnEvento },
  },
  {
    initialRouteName: 'FestivalesScreen',
  }
);
/*
const DetalleStackNavigator = createStackNavigator(
  {
    DetalleScreen: {
      screen: DetalleScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerRight: (
            <FontAwesome name="map" style={{ paddingRight: 10, color: '#3399ff'}} 
              onPress={() => navigation.navigate("Mapa")}
              size={22}
            />
          )
        }
      }
    },
    Detalle: { screen: DetalleScreen},
    Mapa: {screen: Mapa}
  },
  {
    initialRouteName: 'DetalleScreen',
  }
);
*/
const PerfilTabNavigator = createBottomTabNavigator({
  Information,
  Comments
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
        color: '#3399ff',
        headerStyle: {
          backgroundColor: 'white',
          height: 45,
          borderBottomWidth: 0
        }
      }
    },
    tabBarOptions: {
      activeTintColor: '#6666ff',
      inactiveTintColor: '#3399ff',
      style: {
        backgroundColor: '#D2E5FF',

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
  Inicio: MockedViewStackNavigator,
  Ejercicios: EjerciciosStackNavigator,
  MiRutina: FestivalesStackNavigator,
  Suplementacion: SuplementacionStackNavigator,
  Perfil: PerfilStackNavigator,
},
  // DrawerConfig,
  {
    contentComponent: customDrawerComponent,
    drawerBackgroundColor: 'black',
    contentOptions: {
      //Esto sirve para cambiar algunos colores
      activeTintColor: '#6666ff',
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
  //Login: { screen: LoginScreen },
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