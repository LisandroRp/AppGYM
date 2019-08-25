import React, { Component } from "react";
import ApiController from '../controller/ApiController'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Keyboard,
    Alert,
    ScrollView,
    Modal,
    ActivityIndicator,
    Dimensions
} from 'react-native';
//import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/MaterialIcons'
import { List, ListItem, SearchBar } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-gesture-handler";
// import console = require("console");

var { height, width } = Dimensions.get('window');
function createData(item) {
    return {
        key: item._id,
        idEvento: item._id,
        imagen: item.imagen,
        nombre: item.nombre,
        rating: item.rating,
        descripcion: item.descripcion,
        tipo: item.tipo,
        genero: item.genero,
        ubicacion: item.ubicacion,
        precioE: item.precioE
    };
}

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarFocused: false,
            value: '',
            modalVisible: false,
            userSelected: [],
            eventos: [],
            memory: [],
            tipo: this.props.agarrarTipo(),
            isLoading: true,
            filtrarPrecio: false,
            maxPrice: null,
            minPrice: null,
        };
        this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
        this.obtenerEventos()
    }
    obtenerEventos() {
        ApiController.getEventos(this.okEventos.bind(this));
    }
    okEventos(data) {
        if (data != null) {
            var i, newArray = [];
            console.log(this.state.tipo)
            for (i = 0; i < data.length; i++) {
                //console.log(this.state.tipo+'=='+data[i].tipo)
                if (this.state.filtrarPrecio == false ) {
                    console.log(this.state.tipo+'======='+data[i].tipo)
                    newArray.push(createData(data[i], i));
                } else {
                    if (data[i].precioE <= this.state.maxPrice && data[i].precioE >= this.state.minPrice ) {
                        // && data[i].tipo == this.state.tipo
                        console.log(this.state.tipo+'===='+data[i].tipo)
                        newArray.push(createData(data[i], i));
                    }
                }
            }
            this.setState({ eventos: newArray });
            this.setState({ memory: newArray })
            this.setState({ isLoading: false })
        } else {
            alert("Intentar de nuevo")
        }
    }
    componentDidMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }

    keyboardDidShow = () => {
        this.setState({ searchBarFocused: true })
    }

    keyboardWillShow = () => {
        this.setState({ searchBarFocused: true })
    }

    keyboardWillHide = () => {
        this.setState({ searchBarFocused: false })
    }


    clickEventListener = (item) => {
        Alert.alert('Message', 'Item clicked. ' + JSON.stringify(item));
    }

    OrdenarPorPrecio(flag) {
        let resultt = this.state.eventos
        if (flag == 0) {
            resultt = this.state.eventos.sort((a, b) => {
                return b.precioE - a.precioE
            });
        } else {
            resultt = this.state.eventos.sort((a, b) => {
                return a.precioE - b.precioE
            });
        }
        this.setState({ eventos: resultt, minPrice:null, maxPrice:null });
    }
    searchEvent = value => {
        const filteredevents = this.state.memory.filter(event => {
            let eventLowercase = (
                event.ubicacion +
                ' ' +
                event.nombre +
                ' ' +
                event.genero +
                ' ' +
                event.tipo
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return eventLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ eventos: filteredevents });
        this.setState({ value })
    };
    noFiltrar() {
        this.setState({ filtrarPrecio: false, isLoading: true, minPrice:null, maxPrice:null })
        this.obtenerEventos()
    }
    filtrarPrecio() {
        if(this.state.maxPrice==null || this.state.minPrice==null || this.state.minPrice=='' || this.state.maxPrice=='')
        {
            alert('There is an empty price')
        }else{
        this.setState({ filtrarPrecio: true, isLoading: true,modalVisible:false })
        this.obtenerEventos()
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible, minPrice:null, maxPrice:null });
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
            if (this.state.filtrarPrecio == false) {
                return (
                    <View style={styles.container}>
                        <View>
                            <SearchBar
                                placeholder="Name/Place/Type/Genre"
                                platform='ios'
                                onChangeText={value => this.searchEvent(value)}
                                value={this.state.value}
                                containerStyle={{ backgroundColor: 'white', height: 50, paddingBottom: 22 }}
                                buttonStyle={{ paddingBottom: 22 }}
                            />
                        </View>
                        {/*                 
                <View style={{ height: 80, backgroundColor: '#c45653', justifyContent: 'center', paddingHorizontal: 5 }}>

                    <Animatable.View animation="slideInRight" duration={500} style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                        <Animatable.View animation={this.state.searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={400}>
                            <Icon name={this.state.searchBarFocused ? "md-arrow-back" : "ios-search"} style={{ fontSize: 24 }} />
                        </Animatable.View>
                        <TextInput placeholder="Search" style={{ fontSize: 24, marginLeft: 15, flex: 1 }} />
                    </Animatable.View>

                </View> */}
                        <ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={() => this.OrdenarPorPrecio(0)}>
                                    <Text style={styles.loginText}>Price: High to Low</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setModalVisible(true);
                                }} style={styles.fab}>
                                    <AntDesign name="attach-money" size={25} color="white" style={{ marginLeft: 0.5 }} />
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={() => this.OrdenarPorPrecio(1)}>
                                    <Text style={styles.loginText}>Price: Low to High</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.container}>
                            <FlatList
                                style={{ flex: 1 }}
                                columnWrapperStyle={styles.listContainer}
                                data={this.state.eventos}
                                initialNumToRender={50}
                                // keyExtractor={(item) => {
                                //     return item.id;
                                // }}
                                renderItem={({ item }) => {
                                    console.log(this.state.tipo);
                                    if ('Recomendados' == this.state.tipo) {
                                        console.log('entro');
                                        if (item.rating > 4) {
                                            return (
                                                <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.idEvento)}>
                                                    <View style={{ flexDirection: "row" }} >
                                                        <Image style={styles.image} source={{ uri: item.imagen }} />
                                                        <View style={styles.cardContent}>
                                                            <Text style={styles.name}>{item.nombre}</Text>
                                                            <Text style={styles.count}>{item.ubicacion}</Text>
                                                            <Text style={{ fontSize: 11 }}>Entrada General: {item.precioE}$</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "column", alignItems: 'center', paddingLeft: 300, paddingTop: 15, position: 'absolute' }} >
                                                            <Image style={styles.StarImage} source={{ uri: this.Star }} />
                                                            <Text style={styles.followButtonText}>{item.rating}/5</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                    } else {
                                        console.log(this.state.eventos.length);
                                        if (item.tipo == this.state.tipo) {
                                            return (
                                                <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.idEvento)}>
                                                    <View style={{ flexDirection: "row" }} >
                                                        <Image style={styles.image} source={{ uri: item.imagen }} />
                                                        <View style={styles.cardContent}>
                                                            <Text style={styles.name}>{item.nombre}</Text>
                                                            <Text style={styles.count}>{item.ubicacion}</Text>
                                                            <Text style={{ fontSize: 11 }}>Entrada General: {item.precioE}$</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "column", alignItems: 'center', paddingLeft: 300, paddingTop: 15, position: 'absolute' }} >
                                                            <Image style={styles.StarImage} source={{ uri: this.Star }} />
                                                            <Text style={styles.followButtonText}>{item.rating}/5</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                    }
                                }
                                } />
                                </View>
                            <Modal
                                //visible={this.state.isModalVisible}
                                animationType="fade"
                                visible={this.state.modalVisible}
                                transparent={true}
                                onRequestClose={() => this.setState({ modalVisible: false })}  >

                                <View style={styles.modal}>
                                    <View>
                                        <Text
                                            style={styles.modalText}>Price filter</Text>
                                    </View>
                                    <Text style={styles.modalText2}>select your price preference</Text>
                                    <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 10, marginBottom: 18 }}>
                                        <View style={{ backgroundColor: 'white', marginRight:22, marginLeft:10 , width: 100, height: 40, borderRadius: 15,justifyContent:'center'}}>
                                            <TextInput placeholder='Min. Price' onChangeText={value => this.setState({ minPrice: value })}
                                                style={{ textDecorationColor: 'grey', marginHorizontal: 5, fontSize: 18}}></TextInput>
                                        </View>
                                        <View style={{ backgroundColor: 'white', marginRight:10, marginLeft:22, width: 100, height: 40, borderRadius: 15,justifyContent:'center'}}>
                                            <TextInput placeholder='Max. Price' onChangeText={value => this.setState({ maxPrice: value })}
                                                style={{ textDecorationColor: 'grey', marginHorizontal: 5, fontSize: 18}}></TextInput>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 13 }}>
                                        <View style={{ marginRight: 10, width: width * 0.30, marginBottom: 5, }}>
                                            <View style={[styles.outterButtonCreate]}>
                                                <TouchableOpacity style={[styles.buttonContainer2, styles.loginButton]}
                                                    onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                                                    <Text style={styles.textButton}> Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 10, width: width * 0.30 }}>
                                            <View style={[styles.outterButtonCreate]}>

                                                <TouchableOpacity style={[styles.buttonContainer2, styles.loginButton]}
                                                    onPress={() => this.filtrarPrecio()}>
                                                    <Text style={styles.textButton}>Accept</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </ScrollView>
                    </View>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <View>
                            <SearchBar
                                placeholder="Name/Place/Type/Genre"
                                platform='ios'
                                onChangeText={value => this.searchEvent(value)}
                                value={this.state.value}
                                containerStyle={{ backgroundColor: 'white', height: 50, paddingBottom: 22 }}
                                buttonStyle={{ paddingBottom: 22 }}
                            />
                        </View>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={() => this.OrdenarPorPrecio(0)}>
                                    <Text style={styles.loginText}>Price: High to Low</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.noFiltrar();
                                }} style={styles.fab}>
                                    <AntDesign name="money-off" size={25} color="white" style={{ marginLeft: 0.5 }} />
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={() => this.OrdenarPorPrecio(1)}>
                                    <Text style={styles.loginText}>Price: Low to High</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ flex: 1 }}
                                columnWrapperStyle={styles.listContainer}
                                data={this.state.eventos}
                                renderItem={({ item }) => {
                                    if ('Recomendados' == this.state.tipo) {
                                        if (item.rating > 4) {
                                            return (
                                                <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.idEvento)}>
                                                    <View style={{ flexDirection: "row" }} >
                                                        <Image style={styles.image} source={{ uri: item.imagen }} />
                                                        <View style={styles.cardContent}>
                                                            <Text style={styles.name}>{item.nombre}</Text>
                                                            <Text style={styles.count}>{item.ubicacion}</Text>
                                                            <Text style={{ fontSize: 11 }}>Entrada General: {item.precioE}$</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "column", alignItems: 'center', paddingLeft: 300, paddingTop: 15, position: 'absolute' }} >
                                                            <Image style={styles.StarImage} source={{ uri: this.Star }} />
                                                            <Text style={styles.followButtonText}>{item.rating}/5</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                    } else {
                                        if (item.tipo == this.state.tipo) {
                                            return (
                                                <TouchableOpacity style={styles.card} onPress={() => this.props.onPressGo(item.idEvento)}>
                                                    <View style={{ flexDirection: "row" }} >
                                                        <Image style={styles.image} source={{ uri: item.imagen }} />
                                                        <View style={styles.cardContent}>
                                                            <Text style={styles.name}>{item.nombre}</Text>
                                                            <Text style={styles.count}>{item.ubicacion}</Text>
                                                            <Text style={{ fontSize: 11 }}>Entrada General: {item.precioE}$</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "column", alignItems: 'center', paddingLeft: 300, paddingTop: 15, position: 'absolute' }} >
                                                            <Image style={styles.StarImage} source={{ uri: this.Star }} />
                                                            <Text style={styles.followButtonText}>{item.rating}/5</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                    }
                                }
                                } />
                        </ScrollView>
                    </View>
                );
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    justifyContent: 'center',
    backgroundColor: "#ebf0f7"
    },
    contentList: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10,
        width: 180,
        flexDirection: "column",
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
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
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    name: {
        paddingTop: 12,
        fontSize: 18,
        flex: 1,
        //alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold'
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
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 5,
        width: 150,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    buttonContainer2: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        width: 120,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    outterButtonCreate: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 39,
        paddingBottom: 5,
    },
    loginButton: {
        backgroundColor: "#3399ff",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    fab: {
        width: 33,
        height: 33,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3399ff',
        borderRadius: 30,
        marginHorizontal:5
    },
    modal: {
        height: height * 0.30,
        width: width * 0.75,
        position: 'absolute',
        top: height * 0.3,
        left: width * 0.13,
        backgroundColor: '#ebf0f7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: 'black',
        shadowOpacity: 5.0,
        paddingBottom: 33,
    },
    modalText: {
        fontSize: 20,
        margin: 10,
        color: '#3399ff',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    modalText2: {
        fontSize: 15,
        marginTop: 3,
        marginBottom: 10,
        color: '#6666ff',
        fontWeight: 'bold'
    },
    textInput: {
        color: '#3399ff',
        fontSize: 20,
        alignSelf: 'center',
    },
})