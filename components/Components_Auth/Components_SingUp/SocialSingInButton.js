import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';

import Singup_service from "../../../Services/Auth_Service/Singup_service";

export default class SocialSingInButton extends Component {
    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight
                    style={styles.buttonFacebook}
                    onPress={Singup_service.singInWithFacebookAsync}
                >
                    <Text style={styles.text}> Facebook Login </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttonGoogle}
                    onPress={Singup_service.signInWithGoogleAsync}
                >
                    <Text style={styles.text}> Gmail Login </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        marginLeft:25,
        marginRight:25

    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        margin: 10,
    },
    buttonFacebook: {
        alignItems: 'center',
        backgroundColor: '#3b5998',
        marginBottom: 10,
        borderRadius: 5,
        flex:0.5,
        marginRight:10,
        opacity:0.8
    },
    buttonGoogle: {
        alignItems: 'center',
        backgroundColor: '#c71610',
        marginBottom: 10,
        borderRadius: 5,
        flex:0.5,
        marginLeft:10,
        opacity:0.8
    },
});
