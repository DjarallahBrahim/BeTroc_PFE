import React, {Component} from 'react';
import EmptySpace from '../components/Components_Auth/Components_Login/EmptySpace';
import Form from '../components/Components_Auth/Components_Login/Form';
import Wallpaper from '../components/Components_Auth/Components_Login/Wallpaper';
import ButtonSubmit from '../components/Components_Auth/Components_Login/ButtonSubmit';
import SignupSection from '../components/Components_Auth/Components_Login/SignupSection';
import {StyleSheet, KeyboardAvoidingView, TouchableOpacity, Keyboard, Image, TouchableHighlight} from "react-native";
import Login_service from "../Services/Auth_Service/Login_service";
import SocialSingInButton from "../components/Components_Auth/Components_Login/SocialSingInButton";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import backbuttonimg from "../assets/images/left-arrow.png";

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userPassword: ""
        };
        //Bind the handlers
        this.handlerUserName = this.handlerUserName.bind(this);
        this.handlerUserPassword = this.handlerUserPassword.bind(this);
        this.submit = this.submit.bind(this);

        //Get navigation props
        this.navigation = this.props.navigation;
    }


    handlerUserName(username) {
        this.setState({userName: username});
    }

    handlerUserPassword(password) {
        this.setState({userPassword: password});
    }


    submit(doneLoading) {
        const userName = this.state.userName;
        const password = this.state.userPassword;

        if (LoginScreen.checkInput(userName, password)) {
            //Login_service.loginUser (userName, password, LoginScreen.loginResolve, LoginScreen.loginReject, LoginScreen.handlerError).then(() => doneLoading());
            Login_service.loginHandler(userName, password).then((status) => doneLoading(status)); //TODO: creat user model and save his data
        } else {
            alert('Veuillez saisir votre username/email et mot de passe')
            doneLoading(false)
        }
    }

    static checkInput(username, password) {
        return username && password;
    }

    onSwipeDown() {
        this.navigation.navigate('Profil');
    }

    render() {
        const config = {
            velocityThreshold: 1,
            directionalOffsetThreshold: 80
        };
        return (
            <GestureRecognizer onSwipeDown={() => this.onSwipeDown()}
                               config={config}
                               style={{
                                   flex: 1,
                               }}
            >
                <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
                    <Wallpaper>
                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                            <TouchableHighlight underlayColor="transparent"
                                                style={{flex: 1}}
                                                onPress={() => this.navigation.navigate('Profil')}>
                                <Image source={backbuttonimg} style={{top: 25, left: 10, width: 30, height: 30}}/>
                            </TouchableHighlight>
                            <EmptySpace/>
                            <Form handlerUserName={this.handlerUserName}
                                  handlerUserPassword={this.handlerUserPassword}/>
                            <SignupSection navigation={this.props.navigation}/>
                            <SocialSingInButton/>
                            <ButtonSubmit submit={this.submit}/>
                        </KeyboardAvoidingView>

                    </Wallpaper>
                </TouchableOpacity>
            </GestureRecognizer>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});