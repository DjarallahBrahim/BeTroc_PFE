import React, {Component} from 'react';
import {StyleSheet, View,Image, TouchableHighlight, Text} from 'react-native';
import Login_service from "../../../Services/Auth_Service/Login_service";

import logoImg from '../../../assets/images/logo.png';

export default class EmptySpace extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    },
});

