import React, { Component } from 'react';
import ExportadorMenus from './Fotos/ExportadorMenus'
import ExportadorFondo from './Fotos/ExportadorFondo'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';

class Rutinas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBarFocused: false,
      modalVisible: false,
      suplementos: [],
      isLoading: false,
    };
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
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />

            <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoRutinas("Musculacion")}>
              <Image style={styles.image} source={ExportadorMenus.Musculacion()} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoRutinas("Aerobico")}>
              <Image style={styles.image} source={ExportadorMenus.Aerobico()} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoRutinas("Propias")}>
              <Image style={styles.image} source={ExportadorMenus.Propias()} />
            </TouchableOpacity>

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
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: hp(29.5),
    width: wp(99),
    margin: 1,
    borderWidth: 1.5,
    borderColor: 'black'
  }
})

export default withNavigation(Rutinas);