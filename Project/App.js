import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo'
import Icon from '@expo/vector-icons/Ionicons';
import Detalle from './components/Detalle';
import Prueba from './components/MapaConAnimaciones'
import Conciertos from './components/Conciertos'
import Shows from './components/Shows'
import Exposicion from './components/Exposicion'
import ChangePassword from './components/ChangePassword'
import CreateUser from './components/CreateUser'
import Gastronomy from './components/Gastronomy'
import Information from './components/DatosPersonales';
import Comments from './components/Comentarios';
import Craigslist from './components/Craigslist'
import Deportes from './components/Deportes';
import LogInCards from './components/LogInCards'
import Festivales from './components/Festivales';
import Bares from './components/Bar'
import MapaVarios from './components/MapaVarios';
import MapaUnEvento from './components/MapaUnEvento'
import Search from './components/Search';
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
class ConciertosScreen extends React.Component {

  static navigationOptions = {
    title: 'Concerts',
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
      <Conciertos
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
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
class ShowsScreen extends React.Component {

  static navigationOptions = {
    title: 'Shows',
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
      <Shows
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
}
class BaresScreen extends React.Component {

  static navigationOptions = {
    title: 'Bars',
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
      <Bares
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
}
class DeportesScreen extends React.Component {

  static navigationOptions = {
    title: 'Sports',
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
      <Deportes
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
}
class ExposicionScreen extends React.Component {

  static navigationOptions = {
    title: 'Exposure',
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
      <Exposicion
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
}
class GastronomyScreen extends React.Component {

  static navigationOptions = {
    title: 'Gastronomy',
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
      <Gastronomy
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
    Prueba: {screen: Prueba},
    Helado: { screen: SearchScreen },
    Detalle: { screen: DetalleScreen },
    MapaVarios: { screen: MapaVariosScreen },
    MapaUnEvento: { screen: MapaUnEvento },
  },
  {
    initialRouteName: 'MockedViewScreen',
  }
);

const ConciertosStackNavigator = createStackNavigator(
  {
    ConciertosScreen: {
      screen: ConciertosScreen,
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
    MapaVarios: { screen: MapaVariosScreen },
    MapaUnEvento: { screen: MapaUnEvento },
  },
  {
    initialRouteName: 'ConciertosScreen',
  }
);
const ShowsStackNavigator = createStackNavigator(
  {
    ShowsScreen: {
      screen: ShowsScreen,
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
                onPress={() => navigation.navigate('Helado', { tipo: 'Show' })}
                size={22}
              />
              <FontAwesome name="map" style={{ paddingRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate("MapaVarios", { tipo: 'Show' })}
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
    initialRouteName: 'ShowsScreen',
  }
);
const ExposicionStackNavigator = createStackNavigator(
  {
    ExposicionScreen: {
      screen: ExposicionScreen,


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
                onPress={() => navigation.navigate('Helado', { tipo: 'Exposicion' })}
                size={22}
              />
              <FontAwesome name="map" style={{ paddingRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('MapaVarios', { tipo: 'Exposicion' })}
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
    initialRouteName: 'ExposicionScreen',
  }
);
const BaresStackNavigator = createStackNavigator(
  {
    BaresScreen: {
      screen: BaresScreen,


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
                onPress={() => navigation.navigate('Helado', { tipo: 'Bar' })}
                size={22}
              />
              <FontAwesome name="map" style={{ paddingRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('MapaVarios', { tipo: 'Bar' })}
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
    initialRouteName: 'BaresScreen',
  }
);
const DeportesStackNavigator = createStackNavigator(
  {
    DeportesScreen: {
      screen: DeportesScreen,


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
                onPress={() => navigation.navigate('Helado', { tipo: 'Deporte' })}
                size={22}
              />
              <FontAwesome name="map" style={{ paddingRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('MapaVarios', { tipo: 'Deporte' })}
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
    initialRouteName: 'DeportesScreen',
  }
);

const GastronomyStackNavigator = createStackNavigator(
  {
    GastronomyScreen: {
      screen: GastronomyScreen,


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
                onPress={() => navigation.navigate('Helado', { tipo: 'Gastronomia' })}
                size={22}
              />
              <FontAwesome name="map" style={{ paddingRight: 20, color: '#3399ff' }}
                onPress={() => navigation.navigate('MapaVarios', { tipo: 'Gastronomia' })}
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
    initialRouteName: 'GastronomyScreen',
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
    <LinearGradient colors={['#1D71B8', '#2D2E83']} style={styles.profile}>
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
  GuiaDeEjercicios: ConciertosStackNavigator,
  MiRutina: FestivalesStackNavigator,
  Suplementacion: ExposicionStackNavigator,
  Perfil: PerfilStackNavigator,
},
  // DrawerConfig,
  {
    contentComponent: customDrawerComponent,
    drawerBackgroundColor: '#ebf0f7',
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