import React, {Component} from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {StyleSheet, KeyboardAvoidingView} from "react-native";

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Logo />
                <Form />
                <SignupSection />
                <ButtonSubmit />
          </KeyboardAvoidingView>

      </Wallpaper>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});