import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorFrases from './Fotos/ExportadorFrases';
import ExportadorGifs from './Fotos/ExportadorGifs';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorAds from './Fotos/ExportadorAds';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { height, width } = Dimensions.get('window');
import {AdMobBanner} from 'expo-ads-admob';

class EjercicioEspecifico extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detalle: {
        id: this.props.navigation.getParam('id_ejercicio'),
        nombre: this.props.navigation.getParam('nombre_Ejercicio'),
        musculo: '',
        descripcion: '',
        ejecucion: '',
      },
      modalVisible: false,
      isLoading: true,
    };
    this.cargarEjercicio();
  }

  cargarEjercicio = async () => {
    base.traerEjercicioEspecifico(await this.props.navigation.getParam('id_ejercicio'), this.okEjercicio.bind(this));
  }

  okEjercicio(data, idioma) {
    this.setState({
      detalle: data[0],
      isLoading: false,
      idioma: idioma
    });
  }
  marginSize(item){
    if(item.id_suplemento !=  this.state.suplementos[this.state.suplementos.length-1].id_suplemento){
      return {marginTop: height * 0.02}
    }else{
      return {marginBottom: height * 0.02, marginTop: height * 0.02}
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      if(ExportadorGifs.EncontrarGifs(this.state.detalle.id_ejercicio) != 'nada'){
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ScrollView>
                  <Image style={styles.image} source={ExportadorGifs.EncontrarGifs(this.state.detalle.id_ejercicio)} />
            <View style={styles.todo}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{ExportadorFrases.Descripcion(this.state.idioma)}</Text></View>
                }
              >
                <Text style={styles.descripcion}>{this.state.detalle.descripcion}</Text>
              </DropDownItem>
            </View>
            <View style={styles.todo}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{ExportadorFrases.Ejecucion(this.state.idioma)}</Text></View>
                }
              >

                <Text style={styles.descripcion}>{this.state.detalle.ejecucion}</Text>
              </DropDownItem>
            </View>
          </ScrollView>
          <View style={styles.bannerContainer}></View>
          <AdMobBanner
          style={styles.bottomBanner}
          adUnitID={ExportadorAds.Banner()}
          onDidFailToReceiveAdWithError={err => {
            console.log(err)
          }}
          onAdViewDidReceiveAd={() => {
            console.log("Ad Recieved");
          }}
          adViewDidReceiveAd={ (e) => { console.log('adViewDidReceiveAd', e) } }
        />
        </View>
      );
    }else{
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
        <ScrollView>
          <View style={styles.todo}>
            <DropDownItem contentVisible={false}
              header={
                <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{ExportadorFrases.Descripcion(this.state.idioma)}</Text></View>
              }
            >
              <Text style={styles.descripcion}>{this.state.detalle.descripcion}</Text>
            </DropDownItem>
          </View>
          <View style={styles.todo}>
            <DropDownItem contentVisible={false}
              header={
                <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{ExportadorFrases.Ejecucion(this.state.idioma)}</Text></View>
              }
            >

              <Text style={styles.descripcion}>{this.state.detalle.ejecucion}</Text>
            </DropDownItem>
          </View>
        </ScrollView>
        <View style={styles.bannerContainer}></View>
        <AdMobBanner
          accessible={true}
          accessibilityLabel={"Add Banner"}
          accessibilityHint={ExportadorFrases.BannerHint(this.state.idioma)}
          style={styles.bottomBanner}
          adUnitID={ExportadorAds.Banner()}
          onDidFailToReceiveAdWithError={err => {
            console.log(err)
          }}
          onAdViewDidReceiveAd={() => {
            console.log("Ad Recieved");
          }}
          adViewDidReceiveAd={ (e) => { console.log('adViewDidReceiveAd', e) } }
        />
      </View>
    );
  }
  }
}
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "black"
  },
  bannerContainer: {
    height: height * 0.08,
    backgroundColor: 'black'
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
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
  todo: {
    backgroundColor: 'grey',
    marginHorizontal: wp("4"),
    marginVertical: hp("2"),
    opacity: 2
  },
  backgroundTitulo: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingHorizontal: wp("2"),
    paddingVertical: hp("2"),
  },
  titulo: {
    fontSize: height * 0.04,
    fontWeight: 'bold',
    color: '#3399ff'
  },
  descripcion: {
    color: 'black',
    marginHorizontal: wp("5"),
    marginVertical: hp("2"),
    fontSize: height * 0.025,
  },
  image: {
    height: height * 0.55,
    width: width,
  },
})

export default withNavigation(EjercicioEspecifico);