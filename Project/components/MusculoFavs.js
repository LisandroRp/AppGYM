import React, { Component } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ActivityIndicator,
    RefreshControl,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Ejercicios from './Ejercicios';

function createData(item) {
    return {
        key: item._id,
        idEvento: item._id,
        imagen: item.imagen,
        nombre: item.nombre,
        rating: item.rating,
        descripcion: item.descripcion,
        tipo: item.tipo,
        ubicacion: item.ubicacion,
        precioE: item.precioE,
        genero: item.genero,
    };
}

class MusculoFavs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ejercicios: [],
            isLoading: true,
        };
        this.Pecho= require('./Fotos/PECHO.png')
        this.Espalda= require('./Fotos/ESPALDA.png')
        this.Hombros= require('./Fotos/HOMBROS.png')
        this.Piernas= require('./Fotos/PIERNAS.png')
        this.Bicep= require('./Fotos/BICEPS.png')
        this.Triceps= require('./Fotos/TRICEPS.png')
        this.Abs= require('./Fotos/ABS.png')
        this.Cardio= require('./Fotos/CARDIO.png')
        this.Star = require('./Logos/Star_Llena.png');
        this.Star_With_Border = require('./Logos/Star_Borde.png');
        this.cargarEjerciciosFavoritas();
    }

    cargarEjerciciosFavoritas = async () => {
        base.traerEjerciciosFavoritos(this.okEjercicios.bind(this))
    }
    okEjercicios(ejercicios) {
        this.setState({ ejercicios: ejercicios, isLoading: false });
        console.log(ejercicios)
    }

    favear(id_ejercicio) {
        var i = 0
        var fav
        aux = 0
        ejercicios2 = []
        while (i < this.state.ejercicios.length) {
            if (this.state.ejercicios[i].id_ejercicio == id_ejercicio) {
                aux = i
                console.log(this.state.ejercicios[aux].favoritos)
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
        base.favoritearEjercicio(id_ejercicio, fav, this.okFavorito.bind(this))
    }

    okFavorito() {
        this.cargarEjerciciosFavoritas()
    }

    favoritos(favoritos) {
        if (favoritos) {
            return this.Star
        }
        else {
            return this.Star_With_Border
        }
    }

    queMusculo(musculo) {
        if (musculo == "Abdominales") {
            return this.Abs
        }
        if (musculo == "Bicep") {
            return this.Bicep
        }
        if (musculo == "Cardio") {
            return this.Cardio
        }
        if (musculo == "Espalda") {
            return this.Espalda
        }
        if (musculo == "Hombros") {
            return this.Hombros
        }
        if (musculo == "Pecho") {
            return this.Pecho
        }
        if (musculo == "Piernas") {
            return this.Piernas
        }
        if (musculo == "Tricep") {
            return this.Tricep
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                //<View style={styles.container}>
                <View style={styles.container}>
                    <Image style={styles.bgImage} source={require('./Pared.jpg')} />
                    <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
                </View>
                //</View>
                // </LinearGradient>
            );
        } else {
            return (
                //<View style={styles.container}>
                <LinearGradient colors={['black', 'grey']} style={styles.container}>
                    <Image style={styles.bgImage} source={require('./Pared.jpg')} />
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
                                                <Image style={styles.image} source={this.queMusculo(item.musculo)} />
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.name}>{item.nombre}</Text>
                                                    <Text style={styles.descripcion}>{item.dias} Dias</Text>
                                                    {/* <Text style={styles.count}>{item.ubicacion}</Text>
                        <Text style={{ fontSize: 11 }}>Entrada General: {item.precioE}$</Text> */}
                                                </View>
                                                <View style={{ alignItems: 'center', justifyContent: "center" }} >
                                                    <TouchableOpacity onPress={() => this.favear(item.id_ejercicio)}>
                                                        <Image style={styles.StarImage} source={this.Star} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }} />
                    </ScrollView>
                </LinearGradient>
                //</View>
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
        marginTop: 10,
        width: 180,
        flexDirection: "column"
    },
    image: {
        width: 90,
        height: 90,
        borderWidth: 2,
        borderColor: "#ebf0f7"
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
        paddingTop: 12,
        fontSize: 18,
        flex: 1,
        //alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold'
    },
    descripcion: {
        fontSize: 15,
        marginTop: 5,
        //flex: 1,
        color: "white",
    },
    count: {
        fontSize: 14,
        paddingBottom: 11,
        flex: 1,
        //alignSelf: 'center',
        color: "#6666ff"
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#dcdcdc",
    },
    followButtonText: {
        color: "black",
        fontSize: 15,
        marginTop: 4,
    },
    StarImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    detalleGenresTitles: {
        fontSize: 33,
        margin: 10,
        marginBottom: 2.5,
        color: '#3399ff',
        fontWeight: 'bold'
    },
})

export default withNavigation(MusculoFavs);