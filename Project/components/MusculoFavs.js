import React, { Component } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorEjercicios from './Fotos/ExportadorEjercicios'
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorLogos from './Fotos/ExportadorLogos'
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
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
            nombre: ""
        };
        this.cargarEjerciciosFavoritas();
    }

    cargarEjerciciosFavoritas = async () => {
        base.traerEjerciciosFavoritos(this.okEjercicios.bind(this))
    }
    okEjercicios(ejercicios) {
        this.setState({ ejercicios: ejercicios, isLoading: false, memory: ejercicios, });
    }

    modalVisible(id, nombre) {
        this.setState({id_ejercicio: id, nombre: nombre, modalVisible: true })
    }

    favear(id_ejercicio) {
        var i = 0
        var fav
        aux = 0
        ejercicios2 = []
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
        this.setState({modalVisible: false})
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
    searchEjercicio = value => {
        const filterDeEjercicios = this.state.memory.filter(ejercicio => {
            let ejercicioLowercase = (
                ejercicio.nombre +
                ' ' +
                ejercicio.elemento +
                ' ' +
                ejercicio.musculo
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return ejercicioLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ ejercicios: filterDeEjercicios });
        this.setState({ value })
    };

    render() {
        if (this.state.isLoading) {
            return (
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                //<View style={styles.container}>
                <View style={styles.container}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
                </View>
                //</View>
                // </LinearGradient>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <View>
                        <SearchBar
                            placeholder="Nombre/Musculo/Elemento"
                            platform='ios'
                            onChangeText={value => this.searchEjercicio(value)}
                            value={this.state.value}
                            inputContainerStyle={{ backgroundColor: 'grey' }}
                            placeholderTextColor='black'
                            containerStyle={{ backgroundColor: 'black' }}
                            //containerStyle={{ backgroundColor: 'black', height: 50, paddingBottom: 22 }}
                            buttonStyle={{}}
                            searchIcon={{ color: 'black' }}
                        />
                    </View>
                    <ScrollView>
                        <FlatList
                            style={styles.contentList}
                            columnWrapperStyle={styles.listContainer}
                            data={this.state.ejercicios}
                            initialNumToRender={50}
                            keyExtractor={(item) => {
                                return item.id_rutina;
                            }}
                            renderItem={({ item }) => {
                                if (item.favoritos) {
                                    return (
                                        <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_ejercicio, item.nombre, item.descripcion)}>
                                            <View style={{ flexDirection: "row" }} >
                                                <Image style={styles.image} source={ExportadorEjercicios.queMusculo(item.musculo)} />
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.name}>{item.nombre}</Text>
                                                    <Text style={styles.elemento}>{item.elemento}</Text>
                                                </View>
                                                <View style={styles.ViewEstrella} >
                                                    <TouchableOpacity onPress={() => this.modalVisible(item.id_ejercicio, item.nombre) }>
                                                        <Image style={styles.StarImage} source={ExportadorLogos.traerEstrella(true)} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }} />
                    </ScrollView>
                    <Modal
                        animationType="fade"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}  >

                        <View style={styles.modal}>

                            <View style={{ flexDirection: 'column', marginTop: height * 0.05, marginHorizontal: width * 0.05 }}>
                                <Text style={styles.textButton}>Desea sacar el ejercicio "{this.state.nombre}" de su lista de favoritos</Text>
                            </View>
                            <View style={styles.modal2}>

                                <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={styles.modalButtonCancelar}>
                                    <Text style={styles.textButton}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.favear(this.state.id_ejercicio)} style={styles.modalButtonAceptar}>
                                    <Text style={styles.textButton}>Aceptar</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
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
    contentList: {
        flex: 1,
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
        marginLeft: 20,
        //marginTop: 10,
        paddingRight: 5,
        width: wp("40"),
        justifyContent: 'center'
    },
    image: {
        //width: 90,
        width: wp("20"),
        //height: 90,
        height: hp("11"),
        borderWidth: 2,
        borderColor: "#ebf0f7",
        margin: 5,
        marginRight: 5,
        alignSelf: "center"
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

        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "black",
        padding: 10,
        flexDirection: 'row',
    },

    name: {
        fontSize: 20,
        //flex: 1,
        //alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold'
    },

    elemento: {
        marginTop: 1,
        fontSize: 15,
        // color: "#6666ff"
        color: "white"
    },

    StarImage: {
        width: hp(5.5),
        height: hp(5.5),
        //resizeMode: 'cover',
    },
    ViewEstrella: {
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: wp("5")
    },
    //MODAAAAL
modal: {
    height: height * 0.22,
    width: width * 0.75,
    position: 'absolute',
    top: height * 0.3,
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
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalButtonCancelar: {
    width: width * 0.37,
    height: height * 0.0775,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 22
  },
  modalButtonAceptar: {
    width: width * 0.37,
    height: height * 0.0775,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    borderLeftWidth: 2,
    backgroundColor: 'grey',
    borderBottomRightRadius: 22
  }
})

export default withNavigation(MusculoFavs);