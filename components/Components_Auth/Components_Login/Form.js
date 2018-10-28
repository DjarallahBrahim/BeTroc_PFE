import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';


import usernameImg from '../../../assets/images/username.png';
import passwordImg from '../../../assets/images/password.png';
import eyeImg from '../../../assets/images/eye_black.png';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
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
    return (
      <View style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          handlerInput={this.props.handlerUserName}
        />

        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          handlerInput={this.props.handlerUserPassword}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={this.state.press ? styles.iconEyeOn : styles.iconEyeOff} />
        </TouchableOpacity>
      </View>
    );
  }
}

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
      //flex: 1,
      height:100,
      alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEyeOff: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  iconEyeOn: {
      width: 25,
      height: 25,
      tintColor: '#EEE',
  },

});
