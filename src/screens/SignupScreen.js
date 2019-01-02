import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableHighlight, Image} from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';

//Components
import Wallpaper from '../components/Components_Auth/Commun/Wallpaper';
import EmptySpace from '../components/Components_Auth/Commun/EmptySpace';
import ButtonSubmit from '../components/Components_Auth/Commun/ButtonSubmit';

import Form from '../components/Components_Auth/Components_SingUp/Form';
import Singup_service from "../Services/Auth_Service/Singup_service";

//images
import backbuttonimg from "../../assets/images/left-arrow.png";
import SocialAuthButton from "../components/Components_Auth/Commun/SocialAuthButton";

const MIN_PASS_LENGTH = 6;
export default class SignupScreen extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userMail: "",
            userPassword: "",
            userPasswordConfirmation: "",
            socialAuthButtonStatu: true
        };
        this.handlerUserName = this.handlerUserName.bind(this);
        this.handlerUserMail = this.handlerUserMail.bind(this);
        this.handlerUserPassword = this.handlerUserPassword.bind(this);
        this.handlerPasswordConfirmation = this.handlerPasswordConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.keyboardDidShow = this.keyboardDidShow.bind(this);
        this.keyboardDidHide = this.keyboardDidHide.bind(this);

        //Get navigation props
        this.navigation = this.props.navigation;
    }

    handlerUserName(username) {
        this.setState({userName: username});
    }

    handlerUserMail(email) {
        this.setState({userMail: email});
    }

    handlerUserPassword(password) {
        this.setState({userPassword: password});
    }

    handlerPasswordConfirmation(password) {
        this.setState({userPasswordConfirmation: password});
    }

    handleSubmit(doneLoading) {
        const userName = this.state.userName;
        const userMail = this.state.userMail;
        const password = this.state.userPassword;
        const passwordConfirmation = this.state.userPasswordConfirmation;


        if (SignupScreen.checkInput(userName, userMail, password, passwordConfirmation)) {
            Singup_service.singupHandler(userName, userMail, password).then(() => doneLoading()); //TODO: create user model and save his data
        } else {
            //alert('Veuillez saisir votre username/email et mot de passe')
            doneLoading()
        }
    }

    static checkPasswordLength(pass) {
        return pass.length >= MIN_PASS_LENGTH;
    }

    static checkPasswordConfirm(pass, passConfirm) {
        return pass === passConfirm;
    }

    static checkInput(...argument) {
        if (argument.includes("")) {
            alert("Veuillez saisir votre username/email et mot de passe");
        }
        else if (!SignupScreen.checkPasswordLength(argument[2].toString())) {
            alert("Password must have at least 6 caracters");
        }
        else if (!SignupScreen.checkPasswordConfirm(argument[2], argument[3])) {
            alert("Password's confirmation doesn't match");
        } else
            return true;
    }


    onSwipeDown() {
        this.navigation.navigate('Profil');
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

     keyboardDidShow () {
         this.setState({socialAuthButtonStatu:false})
    }
     keyboardDidHide () {
         this.setState({socialAuthButtonStatu:true})
    }

    render() {
        let SocialAuthButtonView;
        if (this.state.socialAuthButtonStatu)
            SocialAuthButtonView = <SocialAuthButton service={Singup_service}/>;

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
                    <Wallpaper typescreen="Singup">
                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                            <TouchableHighlight underlayColor="transparent"
                                                style={{flex: 1}}
                                                onPress={() => this.navigation.navigate('Profil')}>
                                <Image source={backbuttonimg} style={{top: 25, left: 10, width: 30, height: 30}}/>
                            </TouchableHighlight>
                            <EmptySpace/>
                            <Form handlerUserName={this.handlerUserName}
                                  handlerUserMail={this.handlerUserMail}
                                  handlerUserPassword={this.handlerUserPassword}
                                  handlerPasswordConfirmation={this.handlerPasswordConfirmation}/>


                            {SocialAuthButtonView}
                            <ButtonSubmit text="Register" handleSubmit={this.handleSubmit}/>
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