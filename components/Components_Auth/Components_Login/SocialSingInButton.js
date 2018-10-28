import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';

import logoImg from '../../../assets/images/logo.png';
import SocialIcon from "react-native-elements/src/social/SocialIcon";

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/*<SocialIcon*/}
                    {/*title='Facebook SingIn'*/}
                    {/*button*/}
                    {/*type='facebook'*/}
                    {/*iconSize={15}*/}
                    {/*style={{width: 160, fontSize:10}}*/}

                {/*/>*/}
                {/*<SocialIcon*/}
                    {/*title='Gmail SingIn'*/}
                    {/*button*/}
                    {/*type='google-plus-official'*/}
                    {/*iconSize={15}*/}
                    {/*style={{width: 160}}*/}
                {/*/>*/}

                <TouchableHighlight
                    style={styles.buttonFacebook}
                    onPress={this.onPress}
                >
                    <Text style={styles.text}> Facebook Login </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttonGoogle}
                    onPress={this.onPress}
                >
                    <Text style={styles.text}> Gmail Login </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 3,
        flexDirection: "row",
        alignItems: 'flex-end',
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
