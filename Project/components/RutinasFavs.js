import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

class RutinasFavs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rutinas: [],
            isLoading: true,
            modalVisible: false,
            id_ruitna: '',
            nombre: ""
        };
        this.cargarRutinasFavoritas();
    }

    cargarRutinasFavoritas = async () => {
        base.traerRutinasFavoritas(this.okRutinas.bind(this))
    }
    okRutinas(rutinas) {
        this.setState({ rutinas: rutinas, isLoading: false });
    }

    modalVisible(id, nombre) {
        this.setState({ id_rutina: id, nombre: nombre, modalVisible: true })
    }

    favear(id_rutina) {
        var i = 0
        var fav
        var aux = 0
        var rutinas2 = []
        while (i < this.state.rutinas.length) {
            if (this.state.rutinas[i].id_rutina == id_rutina) {
                aux = i
            }
            rutinas2.push(this.state.rutinas[i])
            i++
        }
        if (rutinas2[aux].favoritos) {
            rutinas2[aux].favoritos = 0
            fav = 0
        } else {
            rutinas2[aux].favoritos = 1
            fav = 1
        }
        this.setState({ modalVisible: false })
        base.favoritearRutina(id_rutina, fav, this.okFavorito.bind(this))
    }
    favoritos(favoritos) {
        if (favoritos) {
            return ExportadorLogos.traerEstrella(true)
        }
        else {
            return ExportadorLogos.traerEstrella(false)
        }
    }

    okFavorito() {
        this.cargarRutinasFavoritas()
        //this.setState({ isLoading: false })
    }
    marginSize(item){
        if(item.id_rutina !=  this.state.rutinas[this.state.rutinas.length-1].id_rutina){
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

            if (this.state.rutinas.length == 0) {
                return (
                    <View style={[styles.NoItemsContainer]}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={styles.NoItems}>
                            <Text style={styles.NoItemsText}>Ups! {"\n"} No hay Rutinas agregadas a tu lista</Text>
                        </View>
                        <View style={styles.NoItemsImageContainer}>
                            <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
                        </View>
                        <AdMobBanner
                            accessible={true}
                            accessibilityLabel={"Add Banner"}
                            accessibilityHint={"Navega al Anuncio"}
                            style={styles.bottomBanner}
                            adUnitID={ExportadorAds.Banner()}
                            useEffect={setTestDeviceIDAsync('EMULATOR')}
                            onDidFailToReceiveAdWithError={err => {
                                console.log(err)
                            }}
                            onAdViewDidReceiveAd={() => {
                                console.log("Ad Recieved");
                            }}
                            adViewDidReceiveAd={(e) => { console.log('adViewDidReceiveAd', e) }}
                        //didFailToReceiveAdWithError={this.bannerError()}
                        />
                    </View>
                );
            } else {
                return (
                    <LinearGradient colors={['black', 'grey']} style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <FlatList
                            style={styles.contentList}
                            columnWrapperStyle={styles.listContainer}
                            data={this.state.rutinas.sort((a, b) => a.nombre.localeCompare(b.nombre))}
                            initialNumToRender={50}
                            keyExtractor={(item) => {
                                return item.id_rutina.toString();
                            }}
                            renderItem={({ item }) => {
                                if (item.favoritos) {
                                    return (
                                        <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.props.onPressGo(item.id_rutina, item.nombre, item.modificable)}>
                                            <View style={styles.cardContent}>
                                                <Text style={styles.name}>{item.nombre}</Text>
                                                <Text style={styles.dias}>{item.dias} Dias</Text>
                                            </View>
                                            <View style={styles.ViewEstrella} >
                                                <TouchableOpacity onPress={() => { this.modalVisible(item.id_rutina, item.nombre) }}>
                                                    <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }} />
                            <View style={styles.bannerContainer}></View>
                        <Modal
                            animationType="fade"
                            visible={this.state.modalVisible}
                            transparent={true}
                            onRequestClose={() => this.setState({ modalVisible: false })}  >

                            <View style={styles.modal}>

                                <View style={{ flexDirection: 'column', marginTop: height * 0.05, marginHorizontal: width * 0.05 }}>
                                    <Text style={styles.textButton}>Desea sacar la rutina "{this.state.nombre}" de su lista de favoritos</Text>
                                </View>
                                <View style={styles.modal2}>

                                    <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                                        <Text style={styles.textButton}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.favear(this.state.id_rutina)} style={styles.modalButtonAceptar}>
                                        <Text style={styles.textButton}>Aceptar</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>
                        <AdMobBanner
                            accessible={true}
                            accessibilityLabel={"Add Banner"}
                            accessibilityHint={"Navega al Anuncio"}
                            style={styles.bottomBanner}
                            adUnitID={ExportadorAds.Banner()}
                            useEffect={setTestDeviceIDAsync('EMULATOR')}
                            onDidFailToReceiveAdWithError={err => {
                                console.log(err)
                            }}
                            onAdViewDidReceiveAd={() => {
                                console.log("Ad Recieved");
                            }}
                            adViewDidReceiveAd={(e) => { console.log('adViewDidReceiveAd', e) }}
                        //didFailToReceiveAdWithError={this.bannerError()}
                        />
                    </LinearGradient>
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
        backgroundColor: "grey"
    },
    bannerContainer: {
        height: height * 0.08,
        backgroundColor: 'black',
      },
      bottomBanner: {
        position: "absolute",
        bottom: 0,
        height: height * 0.08
      },
    contentList: {
        flex: 1,
    },
    NoItemsContainer: {
        backgroundColor: 'grey',
        flex: 1,
      },
      NoItemsText: {
        alignSelf: "center",
        fontSize: height * 0.028,
        color: "#3399ff",
        textAlign: 'center'
      },
      NoItemsImageContainer: {
        height: height * 0.55,
        width: height * 0.50,
        marginBottom: height * 0.028,
        marginTop: height * 0.028,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: 'black',
        borderWidth: 4,
        borderRadius: 10,
      },
    
      NoItemsLogo: {
        height: height * 0.45,
        width: height * 0.45,
        alignSelf: "center",
        marginTop: hp(9),
        marginBottom: hp(6.6)
      },
      NoItems: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        opacity: .95,
        marginHorizontal: wp(5),
        marginTop: height * 0.028
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
    cardContent: {
        marginLeft: height * 0.028,
        paddingRight: 5,
        width: wp("40"),
        justifyContent: 'center'
    },
    image: {
        width: wp("20"),
        height: hp("11"),
        borderWidth: 2,
        borderColor: "#ebf0f7",
        margin: 5,
        marginRight: 5
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: height * 0.028,
        marginRight: height * 0.028,
        marginTop: height * 0.028,
        backgroundColor: "black",
        padding: 10,
        flexDirection: 'row',
    },

    name: {
        fontSize: height * 0.028,
        color: "#3399ff",
        fontWeight: 'bold'
    },
    dias: {
        fontSize: height * 0.02,
        marginTop: 5,
        color: "white",
    },
    StarImage: {
        width: hp(5.5),
        height: hp(5.5),
        alignSelf: "center"
    },
    ViewEstrella: {
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: "center",
        paddingHorizontal: wp("5"),
        position: "absolute",
        right: 0,
    },
    //MODAAAAL
    modal: {
        height: height * 0.22,
        width: width * 0.75,
        position: 'absolute',
        top: height * 0.4,
        left: width * 0.13,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'grey',
        shadowColor: 'black',
        shadowOpacity: 5.0,
        borderRadius: 22,
        opacity: .95
    },
    modal2: {
        flexDirection: 'row',
        borderColor: 'black',
        borderTopWidth: 2,
        width: width * 0.74,
        height: height * 0.08,
        position: 'absolute',
        bottom: 0,
        opacity: .95
    },
    textButton: {
        color: 'white',
        fontSize: height * 0.02,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    modalButtonCancelar: {
        width: width * 0.37,
        height: height * 0.0775,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22
    },
    modalButtonAceptar: {
        width: width * 0.37,
        height: height * 0.0775,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        borderLeftWidth: 2,
        borderBottomRightRadius: 22
    }
})

export default withNavigation(RutinasFavs);