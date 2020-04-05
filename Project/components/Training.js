import React from "react";
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo'
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <ActivityIndicator size="large" color="#3399ff"style={{ flex: 2 }}></ActivityIndicator>
                </View>
            );
        } else {
            return (               
                <View style={styles.container}>
                <StatusBar backgroundColor="#3399ff" barStyle="light-content" />
                <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />

                    <Swiper>
                        <View style={[styles.slideContainer, styles.slide1]}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                        <Image style={styles.Logo} source={require('../assets/Logo_Solo.png')} />
                        </View>
                        <View style={[styles.slideContainer, styles.slide2]}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                            <Text style={styles.headerText}>Slide 2</Text>
                        </View>
                        <View style={[styles.slideContainer, styles.slide3]}>
                        <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
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
        flex: 1,
        backgroundColor: "grey"
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
    Logo: {
        height: hp(50),
        width: wp(50)
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