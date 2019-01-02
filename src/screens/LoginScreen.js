import React, {Component} from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard,
    Image,
    TouchableHighlight,
    View
} from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';

import EmptySpace from '../components/Components_Auth/Commun/EmptySpace';
import ButtonSubmit from '../components/Components_Auth/Commun/ButtonSubmit';
import SocialAuthButton from "../components/Components_Auth/Commun/SocialAuthButton";

import Form from '../components/Components_Auth/Components_Login/Form';
import Wallpaper from '../components/Components_Auth/Commun/Wallpaper';
import SignupSection from '../components/Components_Auth/Components_Login/SignupSection';
import Login_service from "../Services/Auth_Service/Login_service";


import backbuttonimg from "../../assets/images/left-arrow.png";
const MIN_PASS_LENGTH = 6;

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
        this.handleSubmit = this.handleSubmit.bind(this);

        //Get navigation props
        this.navigation = this.props.navigation;
    }


    handlerUserName(username) {
        this.setState({userName: username});
    }

    handlerUserPassword(password) {
        this.setState({userPassword: password});
    }


    handleSubmit(doneLoading) {
        const userName = this.state.userName;
        const password = this.state.userPassword;

        if (LoginScreen.checkInput(userName, password)) {
            Login_service.loginHandler(userName, password).then((status) => doneLoading()); //TODO: creat user model and save his data
        } else {
            doneLoading()
        }
    }

    static checkPasswordLength(pass) {
        return pass.length >= MIN_PASS_LENGTH;
    }

    static checkInput(...argument) {
        if(argument.includes(""))
            alert('Veuillez saisir votre identifiants')
        else if(!LoginScreen.checkPasswordLength(argument[1]))
            alert("Password must have at least 6 caracters");
        else
            return true;
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
                    <Wallpaper typescreen="Login">
                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                            <TouchableHighlight underlayColor="transparent"
                                                style={{flex: 1}}
                                                onPress={() => this.navigation.navigate('Profil')}>
                                <Image source={backbuttonimg} style={{top: 25, left: 10, width: 30, height: 30}}/>
                            </TouchableHighlight>
                            <EmptySpace/>
                            {/*<View style={{*/}
                                {/*flexDirection: "column",*/}
                                {/*alignItems: 'center',*/}
                                {/*justifyContent: 'center',*/}
                                {/*backgroundColor: 'rgba(255, 255, 255, 0.3)',*/}
                                {/*height:200,*/}
                                {/*padding: 10,*/}
                                {/*margin: 10,*/}
                                {/*borderRadius: 20,*/}
                                {/*}}>*/}
                                <Form handlerUserName={this.handlerUserName}
                                      handlerUserPassword={this.handlerUserPassword}/>
                                <SignupSection navigation={this.props.navigation}/>
                                <SocialAuthButton service={Login_service}/>
                            {/*</View>*/}
                            <ButtonSubmit text="Login" handleSubmit={this.handleSubmit} />
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