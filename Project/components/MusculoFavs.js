import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorEjercicios from './Fotos/ExportadorEjercicios'
import ExportadorFrases from './Fotos/ExportadorFrases';
import { BlackShadowForBlack, BlackShadow } from './Estilos/Styles'
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorLogos from './Fotos/ExportadorLogos'
import ExportadorAds from './Fotos/ExportadorAds'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

var { height, width } = Dimensions.get('window');

class MusculoFavs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ejercicios: [],
            memory: [],
            isLoading: true,
            modalVisible: false,
            id_ejercicio: '',
            nombre_ejercicio: "",
            id_idioma: 0
        };
    }
    componentDidMount = async () => {
        base.traerIdIdioma(this.okIdIdioma.bind(this))
    }
    
    okIdIdioma(id_idioma) {
        base.traerEjerciciosFavoritos(id_idioma, this.okEjercicios.bind(this))
    }

    okEjercicios(ejercicios) {
        console.log(ejercicios)
        this.setState({ ejercicios: ejercicios, memory: ejercicios, isLoading: false});
    }

    modalVisible(id, nombre_ejercicio) {
        this.setState({ id_ejercicio: id, nombre_ejercicio: nombre_ejercicio, modalVisible: true })
    }

    favear(id_ejercicio) {
        var i = 0
        var fav
        var aux = 0
        var ejercicios2 = []
        while (i < this.state.ejercicios.length) {
            if (this.state.ejercicios[i].id_ejercicio == id_ejercicio) {
                aux = i
            }
            ejercicios2.push(this.state.ejercicios[i])
            i++
        }
        if (ejercicios2[aux].favoritos) {
            ejercicios2[aux].favoritos = 0
            fav = 0
        } else {
            ejercicios2[aux].favoritos = 1
            fav = 1
        }
        this.setState({ modalVisible: false })
        base.favoritearEjercicio(id_ejercicio, fav, this.okFavorito.bind(this))
    }

    okFavorito() {
        this.cargarEjerciciosFavoritas()
    }

    favoritos(favoritos) {
        if (favoritos) {
            return ExportadorLogos.traerEstrella(true)
        }
        else {
            return ExportadorLogos.traerEstrella(false)
        }
    }
    favoritosLabel(favoritos) {
        if (favoritos) {
            return ExportadorFrases.FavoritosLabel(this.state.id_idioma)
        }
        else {
            return ExportadorFrases.FavoritosNoLabel(this.state.id_idioma)
        }
    }
    favoritosHint(favoritos) {
        if (favoritos) {
            return ExportadorFrases.FavoritosNoHint(this.state.id_idioma)
        }
        else {
            return ExportadorFrases.FavoritosHint(this.state.id_idioma)
        }
    }
    searchEjercicio = value => {
        const filterDeEjercicios = this.state.memory.filter(ejercicio => {
            let ejercicioLowercase = (
                ejercicio.nombre_ejercicio +
                ' ' +
                ejercicio.nombre_elemento +
                ' ' +
                ejercicio.nombre_musculo
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return ejercicioLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ ejercicios: filterDeEjercicios });
        this.setState({ value })
    };
    marginSize(item) {
        if (item.id_ejercicio != this.state.ejercicios[this.state.ejercicios.length - 1].id_ejercicio) {
            return { marginTop: hp(2) }
        } else {
            return { marginBottom: hp(2), marginTop: hp(2) }
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
            if (this.state.ejercicios.length == 0 && this.state.memory.length == 0) {
                return (
                    <View style={[styles.NoItemsContainer]}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={[styles.NoItemsTextContainer, BlackShadowForBlack()]}>
                            <Text style={styles.NoItemsText}>{ExportadorFrases.EjerciciosNo(this.state.id_idioma)}</Text>
                        </View>
                        <View style={[styles.NoItemsImageContainer, BlackShadowForBlack()]}>
                            <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
                        </View>
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
            } else {
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <View style={BlackShadowForBlack()}>
                            <SearchBar
                                placeholder={ExportadorFrases.SearchOpciones(this.state.id_idioma)}
                                platform='ios'
                                onChangeText={value => this.searchEjercicio(value)}
                                value={this.state.value}
                                inputContainerStyle={{ backgroundColor: 'grey' }}
                                placeholderTextColor='black'
                                containerStyle={{ backgroundColor: 'black' }}
                                buttonStyle={{}}
                                searchIcon={{ color: 'black' }}
                            />
                        </View>
                        <FlatList
                            style={styles.contentList}
                            columnWrapperStyle={styles.listContainer}
                            data={this.state.ejercicios.sort((a, b) => a.nombre_ejercicio.localeCompare(b.nombre_ejercicio))}
                            initialNumToRender={50}
                            keyExtractor={(item) => {
                                return item.id_ejercicio.toString();
                            }}
                            renderItem={({ item }) => {
                                if (item.favoritos) {
                                    return (
                                        <TouchableOpacity style={[this.marginSize(item), styles.card, BlackShadowForBlack()]} onPress={() => this.props.onPressGo(item.id_ejercicio, item.nombre_ejercicio, item.descripcion)}>
                                            <View style={styles.imageContainer}>
                                                <Image style={styles.image} source={ExportadorEjercicios.queMusculo(item.id_musculo)} />
                                            </View>
                                            <View style={styles.cardContent}>
                                                <Text style={styles.name}>{item.nombre_ejercicio}</Text>
                                                <Text style={styles.elemento}>{item.nombre_elemento}</Text>
                                            </View>
                                            <View style={styles.ViewEstrella} >
                                                <TouchableOpacity
                                                    accessible={true}
                                                    accessibilityLabel={this.favoritosLabel(item.favoritos)}
                                                    accessibilityHint={this.favoritosHint(item.favoritos)}
                                                    onPress={() => this.modalVisible(item.id_ejercicio, item.nombre_ejercicio)}>
                                                    <Image style={styles.StarImage} source={ExportadorLogos.traerEstrella(true)} />
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

                            <View style={[styles.modal, BlackShadow()]}>

                                <View style={{ flexDirection: 'column', marginTop: height * 0.033, marginHorizontal: width * 0.05 }}>
                                    <Text style={styles.textButton}>{ExportadorFrases.SacarEjercicioFavs1(this.state.id_idioma)} "{this.state.nombre_ejercicio}" {ExportadorFrases.SacarEjercicioFavs2(this.state.id_idioma)}?</Text>
                                </View>
                                <View style={styles.modal2}>

                                    <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                                        <Text style={styles.textButton}>{ExportadorFrases.Cancelar(this.state.id_idioma)}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.favear(this.state.id_ejercicio)} style={styles.modalButtonAceptar}>
                                        <Text style={styles.textButton}>{ExportadorFrases.Aceptar(this.state.id_idioma)}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>
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
}
const resizeMode = 'center';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "grey"
    },
    contentList: {
        flex: 1,
    },
    bannerContainer: {
        height: height * 0.08,
        backgroundColor: 'black',
    },
    bottomBanner: {
        position: "absolute",
        bottom: 0,
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
        paddingVertical: wp(1.5),
        flexDirection: 'row'
    },
    cardContent: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 0.4,
        height: wp(18),
        width: wp(18),
        margin: wp(2.5),
        alignItems: 'center',
        justifyContent: "center",
    },
    image: {
        flex: 1,
        height: wp(18),
        width: wp(18),
        borderWidth: 1.5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden'
    },

    name: {
        fontSize: wp(4.4),
        color: "#3399ff",
        fontWeight: 'bold'
    },

    elemento: {
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
        borderBottomLeftRadius: 22
    },
    modalButtonAceptar: {
        width: width * 0.366,
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        borderLeftWidth: 2,
        borderBottomRightRadius: 22
    }
})

export default withNavigation(MusculoFavs);