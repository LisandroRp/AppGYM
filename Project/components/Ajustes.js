import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import base from './GenerarBase';
import ExportadorFondo from './Fotos/ExportadorFondo';
import { BlackShadowForBlack } from './Estilos/Styles'
import { AzulPrincipal } from './Estilos/Colors'
import {
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    ActivityIndicator,
    Dimensions,
    Modal
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacityMorgan } from './Estilos/PreMadeComponents'

var { height, width } = Dimensions.get('window');
const blueColor = AzulPrincipal()

class Ajustes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_idioma: 0,
            isLoading: true
        };
    }

    componentDidMount() {
        base.traerIdIdioma(this.okIdIdioma.bind(this))
    }

    okIdIdioma(id_idioma) {
        this.setState({ id_idioma: id_idioma, isLoading: false })
    }

    setIdioma(id_idioma, nombre_idioma) {
        base.setIdioma(id_idioma, nombre_idioma, this.okSetIdIdioma.bind(this))
    }

    okSetIdIdioma(id_idioma, nombre_idioma) {
        this.setState({ id_idioma: id_idioma, isLoading: false })
        this.props.navigation.navigate("Actualizacion", {id_idioma: id_idioma, nombre_idioma: nombre_idioma})
    }

    borderColor(id_flag) {
        if (id_flag == this.state.id_idioma) {
            return 5
        }
    }
    backgroundColor(id_flag) {
        if (id_flag == this.state.id_idioma) {
            return blueColor
        }
    }
    botonFunciona(id_flag) {
        if (id_flag == this.state.id_idioma) {
            return true
        }
        else {
            return false
        }
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.NoItemsContainer}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <ActivityIndicator size="large" color={blueColor} backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
                </View>
            )
        } else {
            return (
                <View style={[styles.NoItemsContainer]}>
                    <Image style={styles.bgImage} source={ExportadorFondo.traerFondo()} />
                    <View style={[styles.NoItemsImageContainer, BlackShadowForBlack()]}>
                        <Image style={styles.NoItemsLogo} source={require('../assets/Logo_Solo.png')} />
                    </View>
                    <View style={styles.LanguageView}>
                        <View style={[styles.flagView, { borderWidth: this.borderColor(1), backgroundColor: this.backgroundColor(1) }]}>
                            <TouchableOpacityMorgan style={[styles.flag, BlackShadowForBlack()]} disabled={this.botonFunciona(1)} onPress={() => this.setIdioma(1, "es")}>
                                <Image style={styles.flagIcon} source={require('./Fotos/Logos/Flag_Spain.png')} />
                                <Text style={styles.flagText}>Español</Text>
                            </TouchableOpacityMorgan>
                        </View>
                        <View style={[styles.flagView, { borderWidth: this.borderColor(2), backgroundColor: this.backgroundColor(2) }]}>
                            <TouchableOpacityMorgan style={[styles.flag, BlackShadowForBlack()]} disabled={this.botonFunciona(2)} onPress={() => this.setIdioma(2, "en")}>
                                <Image style={styles.flagIcon} source={require('./Fotos/Logos/Flag_Ingles.png')} />
                                <Text style={styles.flagText}>English</Text>
                            </TouchableOpacityMorgan>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const resizeMode = 'center';
const styles = StyleSheet.create({

    NoItemsContainer: {
        backgroundColor: 'grey',
        flex: 1,
    },
    NoItemsImageContainer: {
        flex: 0.7,
        padding: wp(5),
        marginHorizontal: wp(5),
        borderRadius: hp(1),
        margin: wp(5),
        alignItems: 'center',
        backgroundColor: 'black'
    },

    NoItemsLogo: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    NoItems: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        opacity: .95,
        marginHorizontal: wp(5),
        marginTop: height * 0.028
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
    image: {
        width: wp("20"),
        height: hp("11"),
        borderWidth: 2,
        borderColor: "#ebf0f7",
        margin: 5,
        marginRight: 5
    },
    LanguageView: {
        marginTop: hp(5),
        justifyContent: "space-around",
        flexDirection: 'row'
    },
    flagView: {
        borderColor: blueColor,
        borderRadius: 10
    },
    flag: {
        backgroundColor: "black",
        borderColor: blueColor,
        borderRadius: 10,
        padding: 10
    },
    flagIcon: {
        height: hp("8"),
        width: hp("8")
    },
    flagText: {
        textAlign: "center",
        color: blueColor,
    }
})

export default withNavigation(Ajustes);