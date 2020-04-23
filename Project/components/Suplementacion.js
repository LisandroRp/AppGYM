import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import ExportadorFondo from './Fotos/ExportadorFondo'
import ExportadorSuplementacion from './Fotos/ExportadorSuplementacion'
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Suplementacion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      suplementacion: [{id:1,suplementacion: 'Aminoacidos', imagen: ExportadorSuplementacion.aminoacidos()},
      {id:2,suplementacion: 'Creatina', imagen: ExportadorSuplementacion.creatina()},
      {id:3,suplementacion: 'Ganador',"imagen": ExportadorSuplementacion.ganador()},
      {id:4,suplementacion: 'Multivitaminico',imagen: ExportadorSuplementacion.multivitaminico()},
      {id:5,suplementacion: 'Proteina',imagen: ExportadorSuplementacion.proteina()},
      {id:6,suplementacion: 'Quemador',imagen: ExportadorSuplementacion.quemador()}],
      isLoading: false, 
    };
  }
  render() {
    if (this.state.isLoading) {
      return (
          <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()}/>
              <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
          </View>
      );
  } else {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#3399ff" barStyle="light-content" />
      <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()}/>
        <FlatList
          style={styles.contentList}
          numColumns={2}
          data={this.state.suplementacion}
          initialNumToRender={50}
          keyExtractor={(item) => {
              return item.id.toString();
            }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => this.props.onPressGo(item.suplementacion)}>
                <Image style={styles.image} source={item.imagen} />
              </TouchableOpacity>
            )
          }} />
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:2,
    alignSelf: 'center'
  },
  image: {
    width: wp(49),
    height: hp(29.5),
    margin: 1,
    borderWidth: 1.5,
    borderColor: 'black'
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
})

export default withNavigation(Suplementacion);