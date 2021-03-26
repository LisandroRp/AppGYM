import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {BlackShadow, BlackShadowForBlack} from '../Estilos/Shadows'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//////////////////////////
//Botones
//////////////////////////
export function BlueButton({ invalid, ...props }) {
    return (
        <TouchableOpacity {...props} style={[styles.blueButton, BlackShadow()]}>
        </TouchableOpacity>
    );
}

export function BlueParallelButton({ invalid, ...props }) {
    return (
        <TouchableOpacity {...props} style={[styles.blueParallelButton, BlackShadow()]}>
        </TouchableOpacity>
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
        fontSize: wp(4.4)
    },
    modalText: {
        fontWeight: 'bold',
        fontSize: wp(4)
    },
})