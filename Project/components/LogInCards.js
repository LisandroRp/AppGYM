import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'; 
import ApiController from '../controller/ApiController';
import {KeyboardAvoidingView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import base from './GenerarBase'

class LogInCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    }
  }

  componentDidMount(){
   // base.CrearTodo();
   //base.MiBase();
   //base.openFile();
   base.AbrirTabla();
  }

  checkLogin() {
    //ApiController.getUsuario(this.checkUsuario.bind(this), this.state.username)
    this.props.onPressLogin(this.state.username);
  }

  checkUsuario(data) {
    if (data.username == this.state.username && data.password == this.state.password && this.state.username != null) {
        this.props.onPressLogin(this.state.username);
    } else {
        alert("Contraseña incorrecta");
    }
  }
 
  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: '#9FA8DA' }} behavior="padding" enabled>
       <LinearGradient colors={['#1D71B8', '#2D2E83']} style={styles.container}>
       <Image style={styles.bgImage} source={require('./Pared.jpg')}/>
       {/* <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/8/" }}/> */}
       <View>
                        <Image
                            style={{height:hp("30%"), width:wp("80%"),resizeMode: 'contain',}}
                            source={require('./Licha-enjoy.png')}></Image>
                    </View>
       <View style={{paddingTop:50}}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ username: text })}
              />
          <Image style={styles.inputIcon} source={{uri: "https://img.icons8.com/office/40/000000/user.png"}}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ password: text })}
              />
          <Image style={styles.inputIcon} source={{uri: "https://img.icons8.com/office/40/000000/forgot-password.png"}}/>
        </View>


        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
         onPress={() => this.checkLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

      <View style={{alignItems:'center'}}>
        <TouchableOpacity style={styles.buttonContainerAcco} onPress={() => this.props.onPressCreate()}>
            <Text style={styles.btnText}>Create an account</Text>
        </TouchableOpacity>
        {/* <View style={{flexDirection:'center', width:100}}> */}
        <TouchableOpacity style={styles.buttonContainerPass} onPress={() => this.props.onPressPass()}>
            <Text style={styles.btnText}>Change password</Text>
        </TouchableOpacity>
        </View>
      </View>
      </LinearGradient>
      </KeyboardAvoidingView>
      
    );
  }
}

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#9FA8DA',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:wp("75%"),
    height:hp("6.2%"),
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:hp("6.2%"),
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:hp("6.2%"),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    marginBottom:5,
    width:wp("75%"),
    borderRadius:30,
    backgroundColor:'transparent'
  },
  buttonContainerAcco: {
    height:hp("5%"),
    justifyContent: 'center',
    alignItems: 'center',
    width:wp("75%"),
    borderRadius:30,
    marginTop:10,
    backgroundColor:'transparent'
  },
  buttonContainerPass: {
    height:hp("5%"),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:wp("75%"),
    borderRadius:30,
    backgroundColor:'transparent'
  },

  loginButton: {
    backgroundColor: "#00b5ec",

    //shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 30,

    elevation: 19,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  btnText:{
    color:"white",
    fontWeight:'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
})
export default LogInCards;  