import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image, FlatList, ActivityIndicator, Modal, TextInput, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import DropDownItem from 'react-native-drop-down-item';
import { Rating, AirbnbRating } from 'react-native-elements';
import ApiController from '../controller/ApiController';
import { AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo'



var { height, width } = Dimensions.get('window');

function createData(item) {
    return {
        nombre: item.usuarioId,
        descripcion: item.descripcion,
        fechaComentario: item.fecha,
    };
}
function createUser(item) {
    return {
        username: item.username
    };
}
class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: null,
            idEvento: this.props.navigation.getParam('IdEvento'),
            detalle: {
                "nombre": 'AcDc',
                "descripcion": "Re copada la banduli de rock",
                "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkzHiLqaw3MedLtDd7EPKBlqhPW1IJE9jRFC1je3lLo79mDQ-",
                "genero": "Rock",
                rating: 3,
                votos: [],
                personas: 0,
                "duracion": "165",
                precioE: 10,
                'precios': [],
                'tipo': 'Concierto',
                'latitude': null,
                'longitude': null,
            },
            usuarioDone: false,
            isLoading: true,
            modalVisible: false,
            Max_Rating: 5,
            Voted: false,
            text: "",
            comentarios: [],
            voto: {
                username: null,
                voto: null,
            }
        }
        this._retrieveData();
        this._storeData(this.state.idEvento);
        // this.Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
        // this.Star_With_Border = 'http://aboutreact.com/wp-content/uploads/2018/08/star_corner.png';
        this.Star = 'https://img.icons8.com/color/96/000000/filled-star.png';
        this.Star_With_Border = 'https://img.icons8.com/color/96/000000/star.png';
        this.Star_Half = 'https://img.icons8.com/color/96/000000/star-half-empty.png';
        this.Star_Voted = 'https://img.icons8.com/color/96/000000/christmas-star.png'
        this.changeVote = this.Star;
    }

    componentDidMount() {
        this.cargarDetalle();
        this.cargarComentarios();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('IdUser');
            if (value !== null) {
                this.setState({
                    idUser: value,
                })
            }
        } catch (error) {
            console.log(error);
        }
    };
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('IdEvento', this.state.idEvento);
        } catch (error) {
            console.log(error);
        }
    };

    insertarComentario() {
        if (this.state.idUser != null && this.state.idEvento != null && this.state.text != null) {
            this.setState({ modalVisible: false });
            ApiController.createComment(this.state.idUser, this.state.idEvento, this.state.text, this.state.detalle.nombre, this.okComentario.bind(this));
        }
    }

    okComentario() {
        alert("Se guardo tu comentario");
        this.setState({ modalVisible: false });
        this.cargarComentarios();
    }


    cargarComentarios() {
        ApiController.getComentarioByEvento(this.okComentarioCargar.bind(this), this.state.idEvento);
        //this.okComentarioCargar.bind(this);
    }

    okComentarioCargar(data) {
        if (data != null) {

            var i, comentarios = [];
            for (i = 0; i < data.length; i++) {
                comentarios.push(createData(data[i], i));
            }
            this.setState({ comentarios: comentarios });

        } else {
            alert("Intentar de nuevo")
        }
    }


    cargarDetalle() {
        ApiController.getDetalle(this.okDetalle.bind(this), this.state.idEvento);
        //this.okDetalle(this.state);
    }

    okDetalle(data) {
        if (data != null) {
            this.setState({
                detalle: data[0],
                isLoading: false
            });
            this.yaVoto();
            this.setState({ usuarioDone: true })
            this.props.guardarPos(this.state.detalle.latitude, this.state.detalle.longitude)
        } else {
            alert("Intentar de nuevo")
        }
    }
    yaVoto() {
        for (var i = 0; i < this.state.detalle.votos.length; i++) {
            if (this.state.idUser == this.state.detalle.votos[i].username) {
                this.setState({ Voted: true })
                this.changeVote = this.Star_Voted;
            }
        }
    }
    UpdateRating(key) {
        if (this.state.Voted == false) {
            this.votar(this.state.idUser, key, this.state.votos)
            this.setState({
                detalle: {
                    "nombre": this.state.detalle.nombre,
                    "fecha": this.state.detalle.fecha,
                    "descripcion": this.state.detalle.descripcion,
                    "imagen": this.state.detalle.imagen,
                    "genero": this.state.detalle.genero,
                    rating: key,// HACER EL NUEVO PROMEDIO DE VOTOSSSS
                    votos: this.state.detalle.votos,
                    personas: this.state.detalle.personas + 1,
                    "duracion": this.state.detalle.duracion,
                    "precioE": this.state.detalle.precioE,
                    precios: this.state.detalle.precios,
                    'tipo': this.state.detalle.tipo
                }
            });
            this.setState({ Voted: true })
            this.changeVote = this.Star_Voted;
        }
    }
    votar(user, puntuacion) {
        voto = {
            username: user,
            puntuacion: puntuacion,
        }
        contadorVotos = 0
        contadorUsers = 0
        newRating = 0
        personasNew = this.state.detalle.personas + 1;
        this.state.detalle.votos.push(voto)
        for (var i = 0; i < this.state.detalle.votos.length; i++) {
            contadorVotos = contadorVotos + this.state.detalle.votos[i].puntuacion;
            contadorUsers++;
        }
        newRating = contadorVotos / contadorUsers;
        newRating=newRating.toFixed(1);
        ApiController.votar(this.state.idEvento, voto, newRating, personasNew, this.okVote.bind(this));
    }
    okVote() {
        alert("Su voto ha sido procesado con exito");
    }
    render() {
        rating2 = this.state.detalle.rating
        const { navigation } = this.props;
        const id = this.props.agarrarId()
        let React_Native_Rating_Bar = [];
        var aux = -1;
        //Array to hold the filled or empty Stars
        if (this.state.usuarioDone == true) {
            for (var i = 1; i <= this.state.Max_Rating; i++) {
                aux++;
                React_Native_Rating_Bar.push(
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={i}
                        onPress={this.UpdateRating.bind(this, i)}>
                        <Image
                            style={styles.StarImage}
                            source={
                                i <= rating2
                                    ? { uri: this.changeVote }
                                    : rating2 > (aux)
                                        ? { uri: this.Star_Half }
                                        : { uri: this.Star_With_Border }
                            }
                        />
                    </TouchableOpacity>
                );
                // console.log('rating: '+rating2)
                // console.log('i: '+i)
                // console.log('aux: '+aux)
                if (rating2 < (aux + 1)) {
                    aux = 50;
                }
            }
        }

        if (this.state.isLoading) {
            return (
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                //<View style={styles.container}>
                <View style={styles.detalleContainer}>
                    <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
                //</View>
                // </LinearGradient>
            );
        } else {
            return (
                //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
                <View style={[styles.detalleContainer]}>
                    <ScrollView>
                        <View style={[styles.detalleContainer]}>
                            <View style={[styles.detalleContainer]}>
                                <View style={{ flex: 0.5, flexDirection: 'row' }}>
                                    <Image
                                        style={{ width: 150, height: 250, marginLeft: 10, marginTop: 10, flex: 0.45, borderRadius: 10 }}
                                        source={{ uri: this.state.detalle.imagen }}
                                    />
                                    <View style={{ flex: 0.55, flexDirection: 'column', alignContent: 'center', marginHorizontal: 10, marginTop: 20 }}>
                                        <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10 }}>
                                            <Text style={styles.detalleTitle}>
                                                {this.state.detalle.nombre}
                                            </Text>
                                        </View>

                                        <View style={styles.cositoGris} />

                                        <View style={{ borderRadius: 10, backgroundColor: 'white', height: 40, marginBottom: 10, marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Entypo name="calendar" size={15} color="#3399ff" />
                                                <Text style={styles.detalleEvento}>
                                                    {this.state.detalle.fecha}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.cositoGris} />

                                        <View style={{ borderRadius: 10, backgroundColor: 'white', height: 40, marginBottom: 10, marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Entypo name="clock" size={15} color="#3399ff" />
                                                <Text style={styles.detalleEvento}>
                                                    {this.state.detalle.duracion}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.cositoGris} />

                                        <View style={{ borderRadius: 10, backgroundColor: 'white', height: 50, marginBottom: 10, marginTop: 10 }}>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>



                                                <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                                                <Text>Votes: {this.state.detalle.personas}</Text>



                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10, marginTop: 10, marginHorizontal: 10, paddingBottom: 10 }}>
                                    <DropDownItem key={1} contentVisible={false}
                                        header={
                                            <Text style={styles.detalleGenresTitles}>
                                                Genre
                                                                </Text>
                                        }
                                    >
                                        <Text style={styles.detalleGenres}>
                                            {this.state.detalle.genero}
                                        </Text>

                                    </DropDownItem>
                                </View>
                                <View style={styles.cositoGris2} />

                                <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10, marginTop: 10, marginHorizontal: 10, paddingBottom: 10 }}>
                                    <DropDownItem key={2} contentVisible={false}
                                        header={
                                            <Text style={styles.detalleGenresTitles}>
                                                Summary
                                                                </Text>
                                        }
                                    >
                                        <Text style={styles.detalleGenres}>
                                            {this.state.detalle.descripcion}
                                        </Text>

                                    </DropDownItem>
                                </View>
                                <View style={styles.cositoGris2} />

                                <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10, marginTop: 10, marginHorizontal: 10, paddingBottom: 10 }}>
                                    <DropDownItem key={3} contentVisible={false}
                                        header={
                                            <Text style={styles.detalleGenresTitles}>
                                                Price
                                                                </Text>
                                        }
                                    >
                                        <FlatList
                                            style={styles.contentList}
                                            columnWrapperStyle={styles.listContainer}
                                            data={this.state.detalle.precios}
                                            initialNumToRender={50}
                                            keyExtractor={(item) => {
                                                return item.nombre;
                                            }}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#D2E5FF', marginHorizontal: 10, marginVertical: 5, marginTop: 2, borderRadius: 10, paddingRight: 200, paddingTop: 2 }}>
                                                        <View>
                                                            <Text style={styles.detalleGenres3}>•</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.detalleGenres2}>{item.nombre}:</Text>
                                                        </View>
                                                        <View style={{position: 'absolute', right: 0,marginTop:2.5}}>
                                                            <Text style={styles.detalleGenres1}>
                                                                {item.precio}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                )
                                            }} />


                                    </DropDownItem>
                                </View>
                                <View style={styles.cositoGris2} />


                                <View style={{ borderRadius: 10, backgroundColor: 'white', marginBottom: 10, marginTop: 10, marginHorizontal: 10 }}>
                                    <Text style={styles.detalleComentariosTitles}>
                                        Comments
                                    </Text>
                                    <FlatList
                                        data={this.state.comentarios}
                                        keyExtractor={(item, index) => 'key' + index}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <FlatListItems item={item} index={index}>

                                                </FlatListItems>
                                            );
                                        }}
                                    >
                                    </FlatList>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <TouchableOpacity onPress={() => {
                        this.setModalVisible(true);
                    }} style={styles.fab}>
                        <AntDesign name="form" size={25} color="white" />
                    </TouchableOpacity>

                    <Modal
                        visible={this.state.isModalVisible}
                        animationType="fade"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}  >

                        <View style={styles.modal}>
                            <View>
                                <Text
                                    style={styles.modalText}>Comment</Text>
                            </View>
                            <View style={{ margin: 10, color: '#3399ff', borderColor: 'black', borderWidth: 1, width: width * 0.70, height: 50, backgroundColor: 'white', marginBottom: 10 }}>
                                <TextInput multiline={true} autoFocus={true} maxLength={100} onChangeText={(text) => this.setState({ text })} value={this.state.text}>

                                </TextInput>
                            </View>
                            <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ marginRight: 10, width: width * 0.30, marginBottom: 5, }}>
                                    <View style={[styles.outterButtonCreate]}>

                                        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                            onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                                            <Text style={styles.textButton}> Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 10, width: width * 0.30 }}>
                                    <View style={[styles.outterButtonCreate]}>

                                        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                            onPress={() => this.insertarComentario()}>
                                            <Text style={styles.textButton}>Accept</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                //LinearGradient>
            );
        }

    }
}

class FlatListItems extends Component {
    render() {
        return (

            <View style={{
                flex: 1,
                backgroundColor: '#D2E5FF',
                marginHorizontal: 10,
                marginVertical: 5,
                borderRadius: 10
            }}>
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
                    <View style={styles.CircleShapeView}>
                        <Text style={{ fontSize: 15, color: 'white', marginTop: 8 }}>
                            {this.props.item.nombre.slice(0, 1).toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                        <View>
                            <Text style={{
                                color: '#3399ff',
                                padding: 5,
                                fontSize: 20,
                                marginTop: 5,
                                fontWeight: 'bold',
                            }}>
                                {this.props.item.nombre}
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                color: 'black',
                                paddingTop: 3,
                                paddingLeft: 5,
                                paddingBottom: 5,
                                fontSize: 11,
                            }}>
                                {this.props.item.fechaComentario}
                            </Text>
                        </View>
                    </View>

                </View>


                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        fontSize: 20,

                    }}
                />
                <Text style={styles.FlatListItems}>
                    {this.props.item.descripcion}
                </Text>
            </View>

        );

    }
}







const styles = StyleSheet.create({
    detalleContainer: {
        flex: 1,
        backgroundColor: '#ebf0f7'
    },
    detalleComentario: {
        flex: 1,
        backgroundColor: 'white',
    },
    detalleTitle: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: '#3399ff',
        fontWeight: 'bold',
    },
    detalleEvento: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: "#6666ff"
    },
    detalleGenres: {
        fontSize: 15,
        margin: 10,
        marginTop: 2.5,
        color: "#6666ff",
    },
    detalleGenres1: {
        fontSize: 15,
        margin: 10,
        marginTop: 2.5,
        color: "#6666ff",
        alignSelf: 'flex-end',
    },
    detalleGenres2: {
        fontSize: 15,
        margin: 10,
        marginTop: 2.5,
        color: "#6666ff",
        textDecorationLine: 'underline',
    },
    detalleGenres3: {
        fontSize: 15,
        margin: 2,
        marginTop: 2.5,
        marginLeft: 4,
        color: "#6666ff",
    },
    detalleGenresTitles: {
        fontSize: 17,
        margin: 10,
        marginBottom: 2.5,
        color: '#3399ff',
        fontWeight: 'bold'
    },
    detalleComentariosTitles: {
        fontSize: 17,
        margin: 10,
        color: '#3399ff',
        fontWeight: 'bold'
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#3399ff',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: '#3399ff'
    },
    FlatListItems: {
        color: 'black',
        padding: 10,
        fontSize: 16,
    },
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#ebf0f7"
    },
    modal: {
        height: height * 0.25,
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
        fontWeight: 'bold'
    },
    textInput: {
        color: '#3399ff',
        fontSize: 20,
        alignSelf: 'center',
    },
    CircleShapeView: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: '#6666ff',
        marginTop: 15,
        alignItems: 'center',
        alignContent: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    SubmitButtonStyle: {
        width: 100,
        height: 50,
        marginTop: 5,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#373737',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#fff'
    },
    outterButtonCreate: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 39,
        paddingBottom: 5,
    },
    cositoGris: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    cositoGris2: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginHorizontal: 10,
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 7,
    },
    StarImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        width: 120,
        borderRadius: 30,
        backgroundColor: "#3399ff"
    },



})

export default withNavigation(Detalle)