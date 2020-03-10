import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import Swiper from "react-native-web-swiper";
import base from './GenerarBase';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Right } from "native-base";

var { height, width } = Dimensions.get('window');

export default class Training extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }
    componentDidMount() {
       base.abrirBase(this.existeBase.bind(this));
    }
    existeBase = async (existe) => {
        if (existe == false) {
            base.crearBase(this.okBase.bind(this))
        }
        else {
            this.props.onPressPass();
        }
    }

    okBase = async () => {
        this.setState({ isLoading: false })
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Image style={styles.bgImage} source={require('./Pared.jpg')} />
                    <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
                </View>
            );
        } else {
            return (               
                <View style={styles.container}>
                <StatusBar backgroundColor="#3399ff" barStyle="light-content" />
                <Image style={styles.bgImage} source={require('./Pared.jpg')} />
                    <Swiper>
                        <View style={[styles.slideContainer, styles.slide1]}>
                        <Image style={styles.bgImage} source={require('./Pared.jpg')} />
                            <Text style={styles.headerText}>Slide 1</Text>
                        </View>
                        <View style={[styles.slideContainer, styles.slide2]}>
                        <Image style={styles.bgImage} source={require('./Pared.jpg')} />
                            <Text style={styles.headerText}>Slide 2</Text>
                        </View>
                        <View style={[styles.slideContainer, styles.slide3]}>
                        <Image style={styles.bgImage} source={require('./Pared.jpg')} />
                            <Text style={styles.headerText}>Slide 3</Text>
                            <TouchableOpacity style={styles.guardarButton} onPress={() => { this.props.onPressPass()}}>
                                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
                                    Terminar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Swiper>
                    {/* <View style={styles.header}>
                    <TouchableOpacity style={styles.headerContent} onPress={() => {this.props.onPressPass()}}>
                            <Text style={styles.headerText}>Saltar</Text>
                    </TouchableOpacity>
                    </View> */}
                </View>
            )
        }
    }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        position: "absolute",
        backgroundColor: "black",
        top: 0,
        height: hp(9),
        width: "100%",
        flexDirection: "row-reverse"
    },
    headerContent: {
        justifyContent: "center",
        marginRight: wp(5)
    },
    headerText: {
        fontSize: 18,
        //flex: 1,
        alignSelf: 'center',
        color: "#3399ff",
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
    slideContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    slide1: {
        backgroundColor: "rgba(20,20,200,0.3)"
    },
    slide2: {
        backgroundColor: "rgba(20,200,20,0.3)"
    },
    slide3: {
        backgroundColor: "rgba(200,20,20,0.3)"
    }
});