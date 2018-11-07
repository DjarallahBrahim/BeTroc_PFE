import React, {Component} from 'react';
import {StyleSheet, View,Image, TouchableHighlight, Text} from 'react-native';
import Login_service from "../../../Services/Auth_Service/Login_service";

import logoImg from '../../../assets/images/logo.png';
import Singup_service from "../../../Services/Auth_Service/Singup_service";

export default class SocialAuthButton extends Component {
    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight
                    style={styles.buttonFacebook}
                    onPress={this.props.service.authWithFacebookAsync}
                >
                    <Text style={styles.text}> Use Facebook </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttonGoogle}
                    onPress={this.props.service.authWithGoogleAsync}
                >
                    <Text style={styles.text}> Use Gmail </Text>
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
        marginRight:25,
        marginTop: 20,
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
