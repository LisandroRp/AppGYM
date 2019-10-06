import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator,Image, TouchableOpacity, Modal, Dimensions,ScrollView, RefreshControl, TextInput } from 'react-native';
// import { LinearGradient } from 'expo'
import ApiController from '../controller/ApiController';
import { AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
// import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';

var { height, width } = Dimensions.get('window');
function createData(item) {
  return {
    id:item._id,
    nombre: item.usuarioId,
    descripcion: item.descripcion,
    fechaComentario: item.fecha,
    eventoId: item.eventoId,
  }
}

class Comentarios extends Component {

  constructor(props) {
    super(props);
    this.state = {
      IdUser: null,
      isLoading: false,
      comentarios: [],
      modalVisible: false,
      refreshing: false,
    }
    //this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('IdUser');
      if (value !== null) {
        this.setState({
          IdUser: value
        })
        this.getComments(this.state.IdUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getComments(IdUser) {
    ApiController.getCommentByIdUser(IdUser, this.okComments.bind(this));
  }

  okComments(data) {
    if (data != null) {

      var i, comentarios = [];
      for (i = 0; i < data.length; i++) {
        comentarios.push(createData(data[i], i));
      }
      this.setState({
        comentarios: comentarios,
        isLoading: false,
        isFetching: false,
      });

    } else {
      alert("Intentar de nuevo")
    }
  }

  pasarDetalle(idEvento, IdUser) {
    this.props.navigation.navigate('Detalle', { IdEvento: idEvento, IdUser: IdUser })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
}
  render() {
    if (this.state.isLoading) {
      return (
        //<LinearGradient colors={['#584150', '#1e161b']} style={{ flex: 1 }}>
          <View style={styles.detalleContainer}>
            <ActivityIndicator size="large" color="#3399ff" style={{ flex: 1 }}></ActivityIndicator>
          </View>
       // </LinearGradient>
      );
    } else {
      return (
          <View style={[styles.detalleContainer]}>
          <Image style={styles.bgImage} source={require('./Pared.jpg')} />
          <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.getComments(this.state.IdUser)}
          />
        }>
            <FlatList
              data={this.state.comentarios}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.pasarDetalle(item.eventoId, this.state.IdUser)}
                  >
                    <FlatListItems item={item} index={index}>
                    </FlatListItems>
                  </TouchableOpacity>
                );
              }}
            >
            </FlatList>
            </ScrollView>
          </View>
      )
    }
  }

}


class FlatListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      IdUser: null,
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
}
borrarComentario(id,IdUser){
  console.log(id)
  this.setState({IdUser:IdUser})
  console.log(this.state.IdUser)
  ApiController.deleteComentario(id,this.okDelete.bind(this))
}
okDelete(){
  alert("The comment was successfully deleted");
  console.log(this.state.IdUser)
}
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
          <TouchableOpacity onPress={() => {
                        this.borrarComentario(this.props.item.id,this.props.item.nombre);
                    }} style={styles.fab}>
                        {/* <AntDesign name="close" size={18} color="white" style={{marginTop:1}}/> */}
          </TouchableOpacity>
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
                                <Text style={styles.modalText2}>Do you really want to erase this comment?</Text>
                            <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 13 }}>
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
                                            onPress={() => this.borrarComentario()}>
                                            <Text style={styles.textButton}>Accept</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
      </View>

    );

  }
}


const resizeMode = 'center';
const styles = StyleSheet.create({
  detalleContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
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
  FlatListItems: {
    color: 'black',
    padding: 10,
    fontSize: 16,
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
  fab: {
    position: 'absolute',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    right: 12,
    bottom: 28,
    backgroundColor: '#3399ff',
    borderRadius: 30,
    //elevation: 8
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
  fontWeight: 'bold',
  textDecorationLine: 'underline',
},
modalText2: {
  fontSize: 15,
  margin: 10,
  color: '#6666ff',
  fontWeight: 'bold'
},
textInput: {
  color: '#3399ff',
  fontSize: 20,
  alignSelf: 'center',
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

export default withNavigation(Comentarios);