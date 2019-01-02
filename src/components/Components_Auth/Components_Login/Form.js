import React, {Component} from 'react';
import {
  StyleSheet,
  View,

} from 'react-native';

import UserInput from '../Commun/UserInput';


import usernameImg from '../../../../assets/images/username.png';
import passwordImg from '../../../../assets/images/password.png';

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
              placeholder="username"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              handler={this.props.handlerUserName}
          />
          <UserInput
              source={passwordImg}
              placeholder="password"
              secureTextEntry={true}
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}
              handler={this.props.handlerUserPassword}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      //flex: 1,
      height:100,
      alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 57,
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
      tintColor: '#bd1115',
  },

});
