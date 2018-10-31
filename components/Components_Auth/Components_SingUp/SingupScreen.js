import React, {Component} from 'react';
import EmptySpace from './EmptySpace';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {StyleSheet, KeyboardAvoidingView, TouchableOpacity, Keyboard} from "react-native";
import SocialSingInButton from "./SocialSingInButton";
import Singup_service from "../../../Services/Auth_Service/Singup_service";

export default class SingupScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userMail: "",
            userPassword:""
        };
        this.handlerUserName = this.handlerUserName.bind(this);
        this.handlerUserMail = this.handlerUserMail.bind(this);
        this.handlerUserPassword = this.handlerUserPassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    handlerUserName(username){
        this.setState({userName:username});
    }

    handlerUserMail(email){
        this.setState({userMail:email});
    }

    handlerUserPassword(password){
        this.setState({userPassword:password});
    }

    submit(doneLoading){
        const userName = this.state.userName;
        const userMail = this.state.userMail;
        const password = this.state.userPassword;

        if(SingupScreen.checkInput(userName, userMail, password)){
            //Login_service.loginUser (userName, password, LoginScreen.loginResolve, LoginScreen.loginReject, LoginScreen.handlerError).then(() => doneLoading());
            Singup_service.singupHandler(userName, userMail, password).then((status) => doneLoading(status)); //TODO: create user model and save his data
        }else{
            alert('Veuillez saisir votre username/email et mot de passe')
            doneLoading(false)
        }
    }

    static checkInput(username, password, userMail){
        return username && password && userMail;
    }

render() {
    return (
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
              <Wallpaper>
                  <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <EmptySpace />
                        <Form handlerUserName={this.handlerUserName}
                              handlerUserMail={this.handlerUserMail}
                              handlerUserPassword={this.handlerUserPassword}/>
                        <SignupSection />
                      <SocialSingInButton/>
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