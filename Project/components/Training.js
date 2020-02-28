import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Swiper from "react-native-web-swiper";
import base from './GenerarBase';

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
                    <Swiper>
                        <View style={[styles.slideContainer, styles.slide1]}>
                            <Text>Slide 1</Text>
                        </View>
                        <View style={[styles.slideContainer, styles.slide2]}>
                            <Text>Slide 2</Text>
                        </View>
                        <View style={[styles.slideContainer, styles.slide3]}>
                            <Text>Slide 3</Text>
                            <TouchableOpacity style={styles.guardarButton} onPress={() => { this.props.onPressPass()}}>
                                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 18 }}>
                                    Terminar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Swiper>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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
    },
});