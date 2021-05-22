import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorCreadores from './Fotos/ExportadorCreadores';
import ExportadorFrases from './Fotos/ExportadorFrases';
import { BlackShadowForBlack, BlackShadow } from './Estilos/Styles'
import ExportadorFondo from './Fotos/ExportadorFondo';
import ExportadorLogos from './Fotos/ExportadorLogos';
import ExportadorAds from './Fotos/ExportadorAds';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacityMorgan } from './Estilos/PreMadeComponents'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

function createData(item, nombre) {
    return {
      id_rutina: item.id_rutina,
      nombre_rutina: nombre,
      modificable: item.modificable,
      rutina: [],
    };
  }

class RutinasFavs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rutinas: [],
            isLoading: true,
            modalVisible: false,
            id_ruitna: '',
            nombre_rutina: "",
            idioma: {}
        };
    }
    componentDidMount() {
        base.traerIdioma(this.cargarRutinasFavoritas.bind(this))
    }
    cargarRutinasFavoritas = async (idioma) => {
        base.traerRutinasFavoritas(this.okRutinas.bind(this), idioma)
    }
    okRutinas(rutinas, idioma) {
        this.setState({ rutinas: rutinas, idioma: idioma, isLoading: false });
    }

    modalVisible(id, nombre_rutina) {
        this.setState({ id_rutina: id, nombre_rutina: nombre_rutina, modalVisible: true })
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
        this.cargarRutinasFavoritas(this.state.idioma)
    }
    crearDatosAEnviar(rutina, nombre_rutina) {
        this.props.onPressGo(rutina.id_rutina, nombre_rutina, rutina.modificable)
        //Esta comentado porque forma parte de la funcionalidad de enviar rutinas (al descomentar comentar lo de arriba)
        //this.setState({ isLoading: true })
        //base.traerEjerciciosRutinaJoin(createData(rutina, nombre_rutina), this.enviar.bind(this))

    }
    enviar(rutina) {
        this.props.onPressGo(rutina.id_rutina, rutina.nombre_rutina, rutina.modificable, rutina.rutina)
        this.setState({ isLoading: false })
    }
    creador(creador) {
        if (creador == 'Propia') {
          return ExportadorFrases.Propia(this.state.idioma.id_idioma)
        }
        return creador
      }
    marginSize(item) {
        if (item.id_rutina != this.state.rutinas[this.state.rutinas.length - 1].id_rutina) {
            return { marginTop: hp(2) }
        } else {
            return { marginBottom: hp(2), marginTop: hp(2) }
        }
    }
    queNombreRutina(rutina) {
        if (rutina.nombre_rutina == null) {
            if (this.state.idioma.id_idioma == 1) {
                return rutina.nombre_rutina_es
            }
            if (this.state.idioma.id_idioma == 2) {
                return rutina.nombre_rutina_en
            }
        } else {
            return rutina.nombre_rutina
        }
    }
    diaDias(dias, id_idioma) {
        if (dias > 1) {
            return ExportadorFrases.Dias(id_idioma)
        }
        else {
            return ExportadorFrases.Dia(id_idioma)
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
                        <View style={[styles.NoItemsTextContainer, BlackShadowForBlack()]}>
                            <Text style={styles.NoItemsText}>{ExportadorFrases.RutinasNo(this.state.idioma.id_idioma)}</Text>
                        </View>
                        <View style={[styles.NoItemsImageContainer, BlackShadowForBlack()]}>
                            <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
                        </View>
                        <AdMobBanner
                            accessible={true}
                            accessibilityLabel={"Banner"}
                            accessibilityHint={ExportadorFrases.BannerHint(this.state.idioma.id_idioma)}
                            style={styles.NoItemsBottomBanner}
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
            } else {
                return (
                    <LinearGradient colors={['black', 'grey']} style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <FlatList
                            style={styles.contentList}
                            columnWrapperStyle={styles.listContainer}
                            data={this.state.rutinas.sort((a, b) => {
                                if (a.nombre_rutina != null && b.nombre_rutina != null) {
                                    a.nombre_rutina.localeCompare(b.nombre_rutina)
                                } else {
                                    if (a.nombre_rutina == null) {
                                        if (this.state.idioma.id_idioma == 1) {
                                            a.nombre_rutina_es.localeCompare(b.nombre_rutina)
                                        } else {
                                            a.nombre_rutina_en.localeCompare(b.nombre_rutina)
                                        }
                                    } else {
                                        if (this.state.idioma.id_idioma == 2) {
                                            a.nombre_rutina.localeCompare(b.nombre_rutina_es)
                                        } else {
                                            a.nombre_rutina.localeCompare(b.nombre_rutina_en)
                                        }
                                    }
                                }
                            })}
                            initialNumToRender={50}
                            keyExtractor={(item) => {
                                return item.id_rutina.toString();
                            }}
                            renderItem={({ item }) => {
                                if (item.favoritos) {
                                    return (
                                        <TouchableOpacityMorgan style={[this.marginSize(item), styles.card, BlackShadowForBlack()]}
                                            onPress={() =>  this.crearDatosAEnviar(item, this.queNombreRutina(item))}>
                                            <View style={styles.imageContainer}>
                                                <Image style={styles.image} source={ExportadorCreadores.queImagen(item.id_creador)} />
                                            </View>
                                            <View style={styles.cardContent}>
                                                <Text style={styles.name}>{this.queNombreRutina(item)}</Text>
                                                <Text style={styles.dias}>{item.dias} {this.diaDias(item.dias, this.state.idioma.id_idioma)}</Text>
                                                <Text style={styles.dias}>{ExportadorFrases.Autor(this.state.idioma.id_idioma)}: {this.creador(item.nombre_creador)}</Text>
                                            </View>
                                            <View style={styles.ViewEstrella} >
                                                <TouchableOpacityMorgan onPress={() => { this.modalVisible(item.id_rutina, item.nombre_rutina) }}>
                                                    <Image style={styles.StarImage} source={this.favoritos(item.favoritos)} />
                                                </TouchableOpacityMorgan>
                                            </View>
                                        </TouchableOpacityMorgan>
                                    )
                                }
                            }} />
                        <View style={styles.bannerContainer}></View>
                        <Modal
                            animationType="fade"
                            visible={this.state.modalVisible}
                            transparent={true}
                            onRequestClose={() => this.setState({ modalVisible: false })}  >

                            <View style={[styles.modal, BlackShadow()]}>

                                <View style={styles.modal1}>
                                    <Text style={styles.textButton}>{ExportadorFrases.SacarRutinaFavs1(this.state.idioma.id_idioma)} "{this.state.nombre_rutina}" {ExportadorFrases.SacarRutinaFavs2(this.state.idioma.id_idioma)}?</Text>
                                </View>
                                <View style={styles.modal2}>

                                    <TouchableOpacityMorgan onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                                        <Text style={styles.textButton}>{ExportadorFrases.Cancelar(this.state.idioma.id_idioma)}</Text>
                                    </TouchableOpacityMorgan>

                                    <TouchableOpacityMorgan onPress={() => this.favear(this.state.id_rutina)} style={styles.modalButtonAceptar}>
                                        <Text style={styles.textButton}>{ExportadorFrases.Aceptar(this.state.idioma.id_idioma)}</Text>
                                    </TouchableOpacityMorgan>

                                </View>
                            </View>
                        </Modal>
                        <View style={styles.bannerContainer}>
                        <AdMobBanner
                            accessible={true}
                            accessibilityLabel={"Banner"}
                            accessibilityHint={ExportadorFrases.BannerHint(this.state.idioma.id_idioma)}
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
        backgroundColor: 'black',
    },
    bottomBanner: {
        alignSelf: 'center',
    },
    NoItemsBottomBanner: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "black"
    },
    contentList: {
        flex: 1,
    },
    NoItemsContainer: {
        backgroundColor: 'grey',
        justifyContent: "center",
        flex: 1
    },
    NoItemsTextContainer: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: hp(1),
        opacity: .95,
        marginHorizontal: wp(5),
        marginBottom: height * 0.028
    },

    NoItemsText: {
        alignSelf: "center",
        fontSize: wp(5),
        color: "#3399ff",
        textAlign: 'center'
    },
    NoItemsImageContainer: {
        flex: 0.7,
        paddingHorizontal: wp(5),
        marginHorizontal: wp(5),
        borderRadius: hp(1),
        margin: wp(2.5),
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: height * 0.08,
    },

    NoItemsLogo: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
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
    shadow: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    card: {
        flex: 1,
        backgroundColor: "black",
        marginHorizontal: wp(2),
        flexDirection: 'row'
    },
    cardContent: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 0.4,
        margin: wp(2.5),
        height: wp(20),
        width: wp(20),
        alignItems: 'center',
        justifyContent: "center",
    },
    image: {
        flex: 1,
        height: wp(20),
        width: wp(20),
        borderWidth: 1.5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        resizeMode: 'stretch',
        overflow: 'hidden'
    },
    name: {
        fontSize: wp(4.4),
        color: "#3399ff",
        fontWeight: 'bold'
    },
    dias: {
        marginTop: 1,
        fontSize: wp(3.5),
        color: "white"
    },
    StarImage: {
        width: hp(4.5),
        height: hp(4.5),
    },
    ViewEstrella: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: "center",
    },
    //MODAAAAL
    modal: {
        height: hp(20),
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
    modal1: {
        flex: 1,
        paddingHorizontal: wp(2.5),
        justifyContent: "center",
        marginBottom: hp(6)
      },
    modal2: {
        flexDirection: 'row',
        borderColor: 'black',
        borderTopWidth: 2,
        width: width * 0.74,
        height: hp(6),
        position: 'absolute',
        bottom: 0,
        opacity: .95
    },
    textButton: {
        color: 'white',
        fontSize: wp(3.8),
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    modalButtonCancelar: {
        width: width * 0.37,
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22
    },
    modalButtonAceptar: {
        width: width * 0.37,
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        borderLeftWidth: 2,
        borderBottomRightRadius: 22
    }
})

export default withNavigation(RutinasFavs);