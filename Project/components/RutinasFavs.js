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

class RutinasFavs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rutinas: [],
            isLoading: true,
        };
        this.Star = require('./Logos/Star_Llena.png');
        this.Star_With_Border = require('./Logos/Star_Borde.png');
        //this.Star = 'https://img.icons8.com/color/96/000000/christmas-star.png';
        this.cargarRutinasFavoritas();
    }
  
    cargarRutinasFavoritas = async () => {
      base.traerRutinasFavoritas(this.okRutinas.bind(this))
    }
    okRutinas(rutinas){
      this.setState({ rutinas: rutinas, isLoading: false });
      console.log(rutinas)
    }

    favear(id_rutina) {
        var i = 0
        aux = 0
        rutinas2 = []
        while (i < this.state.rutinas.length) {
            if (this.state.rutinas[i].id_rutina == id_rutina) {
                aux = i
                console.log(aux)
            }
            rutinas2.push(this.state.rutinas[i])
            i++
        }
        if (rutinas2[aux].favoritos == 1) {
            rutinas2[aux].favoritos = 0
        } else {
            rutinas2[aux].favoritos = 1
        }
        this.setState({ rutinas: rutinas2 })
        this.termino()
    }
    termino() {
        this.setState({ isLoading: false })
    }
    render() {
        if (this.state.isLoading) {
            return (
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                //<View style={styles.container}>
                <View style={styles.container}>
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
                            data={this.state.rutinas}
                            initialNumToRender={50}
                            keyExtractor={(item) => {
                                return item.id_rutina;
                            }}
                            renderItem={({ item }) => {
                                if (item.favoritos == 1) {
                                    return (
                                        <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.id_rutina, item.nombre, item.modificable)}>
                                            <View style={{ flexDirection: "row" }} >
                                                <Image style={styles.image} source={item.imagen} />
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.name}>{item.nombre}</Text>
                                                    <Text style={styles.descripcion}>{item.dias} Dias</Text>
                                                    {/* <Text style={styles.count}>{item.ubicacion}</Text>
                        <Text style={{ fontSize: 11 }}>Entrada General: {item.precioE}$</Text> */}
                                                </View>
                                                <View style={{ alignItems: 'center', justifyContent: "center" }} >
                                                    <TouchableOpacity onPress={() => { this.setState({ isLoading: true }), this.favear(item.id_rutina) }}>
                                                        <Image style={styles.StarImage} source={this.Star } />
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

export default withNavigation(RutinasFavs);