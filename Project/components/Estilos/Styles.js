import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var {Platform} = React;

export function BlackShadow() {
    return {
        shadowColor: 'black',
        shadowOffset: {
            width: -5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 100
    }
}
export function BlackShadowForBlack() {
    return {
        shadowColor: 'black',
        shadowOffset: {
            width: -5,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 100
    }
}
export function marginTitlesPlataform() {
    return {
        marginTop: (Platform.OS ==='ios') ? hp(1.1) : 0,
        marginLeft: (Platform.OS ==='ios') ? wp(1.1) : 0
    }
}