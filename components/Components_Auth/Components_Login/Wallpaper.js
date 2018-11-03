import React, {Component} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import Dimensions from "Dimensions";

import bgSrc from '../../../assets/images/back11.png';

export default class Wallpaper extends Component {
    render() {
        return (
            <ImageBackground style={styles.picture} source={bgSrc}>
                <View style={styles.whiteLayer}>
                    {this.props.children}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    picture: {
        //flex: 1,
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',
    },
    whiteLayer:{
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height
    }
});
