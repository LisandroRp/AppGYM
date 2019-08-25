import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';


export default class MenuDrawer extends React.Component {
  navLink(nav, text) {
    return (
      <TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.TopLinks}>
          <View style={styles.profile}>
            <View style={styles.imgView}>
            <TouchableOpacity style={styles.name} onPress={() => this.props.navigation.navigate('Perfil')}>
              <Image style={styles.img} source={require('./FACHA.png')} ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.profileText}>
              <TouchableOpacity style={styles.name} onPress={() => this.props.navigation.navigate('Perfil')}>
              <Text style={styles.name}>Lisandro Rodriguez Prados</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
        <View style={styles.bottomLinks}>
          {this.navLink('Recomendados', 'Recomendados')}
          <View style={styles.cositoGris} />
          {this.navLink('Conciertos', 'Conciertos')}
          <View style={styles.cositoGris} />
          {this.navLink('Festivales', 'Festivales')}
          <View style={styles.cositoGris} />
        </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  link: {
    flex: 1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: 'left',
  },
  profileText: {
    flex: 3,
    paddingLeft:10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  name: {
    fontSize:20,
    paddingLeft:10,
    paddingTop:5,
    color: 'black',
    textAlign: 'left',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#3399ff',
    backgroundColor: '#3399ff',
  },
  imgView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  topLinks: {
    backgroundColor: 'black',
    paddingBottom: 40,
  },
  bottomLinks: {
    flex: 1,
    paddingTop:5,
    backgroundColor: 'white',
  },
  cositoGris: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
},
})