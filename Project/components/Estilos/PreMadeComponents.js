import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {BlackShadow, BlackShadowForBlack} from './Styles'
import Elevations from 'react-native-elevation'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//////////////////////////
//Botones
//////////////////////////
export function TouchableOpacityMorgan({ invalid, ...props }) {
    return (
        <TouchableOpacity {...props} activeOpacity = {0.69}>
        </TouchableOpacity>
    );
}

export function BlueButton({ invalid, ...props }) {
    return (
        <TouchableOpacityMorgan {...props} style={[styles.blueButton, BlackShadow()]}>
        </TouchableOpacityMorgan>
    );
}

export function BlueParallelButton({ invalid, ...props }) {
    return (
        <TouchableOpacityMorgan {...props} style={[styles.blueParallelButton, BlackShadow()]}>
        </TouchableOpacityMorgan>
    );
}

//////////////////////////
//Botones
//////////////////////////
//////////////////////////
//Texto
//////////////////////////
export function BlackButtonText({ invalid, ...props }) {
    return (
        <Text {...props} style={styles.buttonText}>
        </Text>
    );
}
export function WhiteButtonText({ invalid, ...props }) {
    return (
        <Text {...props} style={[styles.buttonText, {color: "white"}]}>
        </Text>
    );
}
export function WhiteModalText({ invalid, ...props }) {
    return (
        <Text {...props} style={[styles.modalText, {color: "white"}]}>
        </Text>
    );
}

export function BackgroundTitleImage({ invalid, ...props }) {
    return (
        <View {...props} style={{backgroundColor: 'black', opacity: 0.6, position: "absolute"}}>
        </View>
    );
}
//////////////////////////
//Texto
//////////////////////////
const styles = StyleSheet.create({
    blueButton: {
        backgroundColor: "#2D84DB",
        borderRadius: 10,
        alignItems: 'center',
        padding: wp(4.4),
        marginTop: hp(2),
        alignSelf: 'center',
        opacity: .95
    },
    blueParallelButton: {
        backgroundColor: "#2D84DB",
        borderRadius: 10,
        alignItems: 'center',
        width: wp(33),
        padding: wp(4.4),
        marginTop: hp(2),
        alignSelf: 'center',
        opacity: .95
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: wp(4),
        textAlign: "center"
    },
    modalText: {
        fontWeight: 'bold',
        fontSize: wp(4)
    },
})