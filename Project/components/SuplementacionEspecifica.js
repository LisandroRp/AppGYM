import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorFrases from './Fotos/ExportadorFrases';
import { BlackShadowForBlack } from './Estilos/Shadows'
import { AzulPrincipal } from './Estilos/Colors'
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorAds from './Fotos/ExportadorAds';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';
import { AntDesign } from '@expo/vector-icons';

var { height, width } = Dimensions.get('window');

class SuplementacionEspecifica extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      detalle: {},
      idSumplemento: this.props.navigation.getParam('id_suplemento'),
      nombre_suplemento: this.props.navigation.getParam('nombre_suplemento'),
      isLoading: true,
      refreshing: false,
      id_idioma: 0
    };
    this.cargarSuplemento();
  }
  cargarSuplemento = async () => {
    base.traerSuplementoEspecifico(await this.props.navigation.getParam('id_suplemento'), this.okSuplemento.bind(this));
  }


  okSuplemento(data, id_idioma) {
    if (data != null) {
      this.setState({
        detalle: data,
        id_idioma: id_idioma,
        isLoading: false
      });
    } else {
      alert("Intentar de nuevo")
    }
  }
  obtenerEventos() {
    ApiController.getEventos(this.okEventos.bind(this));
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
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
          <ScrollView>
            <View style={[styles.todo, BlackShadowForBlack()]}>
              <View style={{ paddingBottom: hp(2) }}>
                <View style={styles.backgroundTitulo}>
                  <Text style={styles.titulo}>{this.state.nombre_suplemento}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.descripcionUnderline}>{ExportadorFrases.Marca(this.state.id_idioma)}:</Text>
                  <Text style={styles.descripcion}> {this.state.detalle.marca}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.descripcionUnderline}>{ExportadorFrases.Sabor(this.state.id_idioma)}:</Text>
                  <Text style={styles.descripcion}>{this.state.detalle.sabores}</Text>
                </View>
                <Text style={styles.descripcion}>{this.state.detalle.descripcion}</Text>
              </View>
            </View>

            <View style={[styles.todo, BlackShadowForBlack()]}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.titulo}>{ExportadorFrases.Beneficios(this.state.id_idioma)}</Text>
                    </View>
                    <AntDesign style={{ textAlign: 'center', marginRight: wp(3.3) }} name={"caretdown"} size={wp(3.3)} color={AzulPrincipal()} />
                  </View>
                }
              >


                <Text style={styles.descripcion}>{this.state.detalle.beneficios}</Text>
              </DropDownItem>
            </View>

            <View style={[styles.todo, BlackShadowForBlack()]}>
              <DropDownItem contentVisible={false}
                header={
                  <View style={styles.backgroundTitulo}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.titulo}>{ExportadorFrases.Uso(this.state.id_idioma)}</Text>
                    </View>
                    <AntDesign style={{ textAlign: 'center', marginRight: wp(3.3) }} name={"caretdown"} size={wp(3.3)} color={AzulPrincipal()} />
                  </View>
                }
              >


                <Text style={styles.descripcion}>{this.state.detalle.uso}</Text>
              </DropDownItem>
            </View>

          </ScrollView>
          <View style={styles.bannerContainer}></View>
          <AdMobBanner
            accessible={true}
            accessibilityLabel={"Banner"}
            accessibilityHint={ExportadorFrases.BannerHint(this.state.id_idioma)}
            style={styles.bottomBanner}
            adUnitID={ExportadorAds.Banner()}
            onDidFailToReceiveAdWithError={err => {
              console.log(err)
            }}
            onAdViewDidReceiveAd={() => {
              console.log("Ad Recieved");
            }}
            adViewDidReceiveAd={(e) => { console.log('adViewDidReceiveAd', e) }}
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
    marginVertical: hp(1),
    opacity: 2
  },
  backgroundTitulo: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingHorizontal: wp("2"),
    paddingVertical: hp("2"),
    flexDirection: "row"
  },
  titulo: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: '#3399ff',
    paddingLeft: wp(5)
  },
  descripcion: {
    color: 'black',
    marginTop: wp(4),
    marginHorizontal: wp(4.5),
    fontSize: wp(4.5),
    paddingBottom: hp("1.1")
  },
  descripcionUnderline: {
    color: 'black',
    marginTop: wp(4),
    marginHorizontal: wp(4.5),
    fontSize: wp(5),
    textDecorationLine: 'underline',
  },
})

export default withNavigation(SuplementacionEspecifica);