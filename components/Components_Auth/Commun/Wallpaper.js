import React, {Component} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import Dimensions from "Dimensions";

import bgSrcLogin from '../../../assets/images/back11.png';
import bgSrcSingup from '../../../assets/images/back22.png';

export default class Wallpaper extends Component {
    render() {
        return (
            <ImageBackground style={styles.picture} source={this.props.typescreen==="Login" ? bgSrcLogin : bgSrcSingup }>
                <View style={styles.whiteLayer}>
                    {this.props.children}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    picture: {
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
