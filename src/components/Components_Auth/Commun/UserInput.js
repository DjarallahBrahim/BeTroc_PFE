import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, TextInput, Image, TouchableOpacity} from 'react-native';
import eyeImg from '../../../../assets/images/eye_black.png';

export default class UserInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPass: props.secureTextEntry,
            press: false,

        };
        this.showPass = this.showPass.bind(this);

    }

    showPass() {
        this.state.press === false
            ? this.setState({showPass: false, press: true})
            : this.setState({showPass: true, press: false});
    }


    render() {
        let eyeBtn;
        if(this.props.secureTextEntry)
            eyeBtn = <TouchableOpacity
                activeOpacity={0.7}
                style={styles.eye}
                onPress={this.showPass}>
                <Image source={eyeImg} style={this.state.press ? styles.inlineImgOn : styles.inlineImg}/>
            </TouchableOpacity>;
        return (
            <View style={styles.inputWrapper}>
                <Image source={this.props.source} style={styles.inlineImg}/>
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                    secureTextEntry={this.state.showPass}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    returnKeyType={this.props.returnKeyType}
                    underlineColorAndroid='transparent'
                    onChangeText={this.props.handler}
                />
                {eyeBtn}
            </View>
        );
    }
}

UserInput.propTypes = {
    source: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
    handler: PropTypes.func.isRequired
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 10,
        color: 'black',
    },
    inputWrapper: {
        width: DEVICE_WIDTH,
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
        tintColor:'black'
    },inlineImgOn: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
        tintColor:"#bd1115"
    },
    eye: {
        position: 'absolute',
        zIndex: 99,
        right: 65,
        top: 0,
        width: 25,
        height: 25,
    },
});