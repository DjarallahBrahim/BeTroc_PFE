import React, {Component} from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {StyleSheet, KeyboardAvoidingView, TouchableOpacity, Keyboard, SafeAreaView, Platform} from "react-native";
import Login_service from "../../../Services/Auth_Service/Login_service";
import {Actions} from "react-native-router-flux/index";

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
            Login_service.loginUser (userName, password, LoginScreen.loginResolve, LoginScreen.loginReject, LoginScreen.handlerError).then(() => doneLoading());
        }else{
            alert('Veuillez saisir votre username/email et mot de passe')
            doneLoading()
        }
    }

    static checkInput(username, password){
        return username && password;
    }

    static loginResolve(res ){
        // alert( res )

        Actions.secondScreen() //TODO GO to ex Screen
    }

    static loginReject(err ){
        alert( "username/mot de passe:  incorrect " )
    }

    static handlerError(err ){
        alert("Connexion failed" + JSON.stringify(err));
    }


render() {
    return (
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
              <Wallpaper>
                  <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <Logo />
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
        marginTop: Platform.OS === 'android' ? 30 : 10,
    }
});