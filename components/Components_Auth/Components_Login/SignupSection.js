import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, Button} from 'react-native';
import SocialIcon from "react-native-elements/src/social/SocialIcon";

export default class SignupSection extends Component {
    render() {
        return (
                <View style={styles.textOption}>
                    <Text style={styles.text}>Create Account</Text>
                    <Text style={styles.text}>Forgot Password?</Text>
                </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({

    textOption: {
        flex: 0.4,
        //top: 65,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },

});
