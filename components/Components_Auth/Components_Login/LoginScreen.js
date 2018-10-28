import React, {Component} from 'react';
import SocialSingInButton from './SocialSingInButton';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {StyleSheet, KeyboardAvoidingView, TouchableOpacity, Keyboard} from "react-native";
import Login_service from "../../../Services/Auth_Service/Login_service";

export default class LoginScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userPassword:""
        };
        this.handlerUserName = this.handlerUserName.bind(this);
        this.handlerUserPassword = this.handlerUserPassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    handlerUserName(username){
        this.setState({userName:username});
    }

    handlerUserPassword(password){
        this.setState({userPassword:password});
    }


    submit(doneLoading){
        const userName = this.state.userName;
        const password = this.state.userPassword;

        if(LoginScreen.checkInput(userName, password)){
            //Login_service.loginUser (userName, password, LoginScreen.loginResolve, LoginScreen.loginReject, LoginScreen.handlerError).then(() => doneLoading());
            Login_service.loginUser2 (userName, password).then((status) => doneLoading(status)); //TODO: creat user model and save his data
        }else{
            alert('Veuillez saisir votre username/email et mot de passe')
        }
    }

    static checkInput(username, password){
        return username && password;
    }

render() {
    return (
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
              <Wallpaper>
                  <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <SocialSingInButton />
                        <Form handlerUserName={this.handlerUserName} handlerUserPassword={this.handlerUserPassword}/>
                        <SignupSection />
                        <ButtonSubmit submit={this.submit} />
                  </KeyboardAvoidingView>

              </Wallpaper>
            </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});