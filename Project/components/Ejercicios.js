import React, { Component } from 'react';
import ExportadorFondo from './Fotos/ExportadorFondo'
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AdMobBanner, setTestDeviceIDAsync} from 'expo-ads-admob';

class Ejercicios extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      musculos: [{id:1,musculo: 'Pecho', imagen: require('./Fotos/Ejercicios/PECHO.png')},
      {id:2,musculo: 'Espalda', imagen: require('./Fotos/Ejercicios/ESPALDA.png')},
      {id:3,"musculo": 'Hombros',"imagen": require('./Fotos/Ejercicios/HOMBROS.png')},
      {id:4,musculo: 'Piernas',imagen: require('./Fotos/Ejercicios/PIERNAS.png')},
      {id:5,musculo: 'Biceps',imagen: require('./Fotos/Ejercicios/BICEPS.png')},
      {id:6,musculo: 'Triceps',imagen: require('./Fotos/Ejercicios/TRICEPS.png')},
      {id:7,musculo: 'Abdominales',imagen: require('./Fotos/Ejercicios/ABS.png')},
      {id:8,musculo: 'Cardio',imagen: require('./Fotos/Ejercicios/CARDIO.png')}],
      isLoading: false, 
    };
    this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
  }

  bannerError() {
    console.log("An error");
    return;
  }

  render() {
    if (this.state.isLoading) {
      return (
          <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()}/>
              <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
      );
  } else {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#3399ff" barStyle="light-content" />
      <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()}/>
        <FlatList
          style={styles.contentList}
          numColumns={2}
          data={this.state.musculos}
          initialNumToRender={50}
          keyExtractor={(item) => {
              return item.id.toString();
            }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => this.props.onPressGo(item.musculo)}>
                <Image style={styles.image} source={item.imagen} />
              </TouchableOpacity>
            )
          }} />
         <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-4175223710505457/8516284384"
          //useEffect  = {setTestDeviceIDAsync('EMULATOR')}
          onDidFailToReceiveAdWithError={err => {
            console.log(err)
          }}
          onAdViewDidReceiveAd={() => {
            console.log("Ad Recieved");
          }}
          adViewDidReceiveAd={ (e) => { console.log('adViewDidReceiveAd', e) } }
          didFailToReceiveAdWithError={this.bannerError()}
        />
        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-4175223710505457/4865400712"
          //useEffect  = {setTestDeviceIDAsync('EMULATOR')}
          onDidFailToReceiveAdWithError={err => {
            console.log(err)
          }}
          onAdViewDidReceiveAd={() => {
            console.log("Ad Recieved");
          }}
          adViewDidReceiveAd={ (e) => { console.log('adViewDidReceiveAd', e) } }
          didFailToReceiveAdWithError={this.bannerError()}
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
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  contentList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:2,
    alignSelf: 'center'
  },
  image: {
    width: wp(49),
    height: hp(28),
    margin: 1,
    borderWidth: 1.5,
    borderColor: 'black'
  },
  bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover'
  },
})

export default Ejercicios;