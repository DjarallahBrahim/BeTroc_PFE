import axios from 'axios';
import {AsyncStorage} from "react-native";
import jwt_decode from "jwt-decode";


export default class Login_service {

    // static loginUser(userName, password, resoleveLogin, rejectLogin, handlerError) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             fetch('http://192.168.43.236:3000/posts', {
    //                 method: 'post',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     name: "sam",
    //                     password: "sam"
    //                 })
    //             }).then((res) => {
    //                     res.json().then(resJson => {
    //                         if (res.status === 401) {
    //                             rejectLogin(resJson);
    //                         } else if (res.status === 201) {
    //                             resoleveLogin(resJson)
    //                             resolve()
    //                         } else {
    //                             handlerError(resJson);
    //                         }
    //                     });
    //                 }
    //             ).catch((error) => {
    //                 handlerError(error);
    //             });
    //
    //         }, 2000);
    //     });
    // }

    static loginUser2(userName, password) {

       return new Promise((resolve, reject) => {
           setTimeout(() => {
               axios.get("http://192.168.43.236:3001/posts/signup", {
                   // name: userName,
                   // password: password //TODO send userName password
               })
                   .then((response) => {
                       Login_service._loginResolve(response.data);
                       resolve(true)
                   })
                   .catch((error) => {
                       Login_service._handlerErrorLogin(error);
                       resolve(false)
                   });
           }, 2000);
       });
    }


    static _loginResolve(res ){
        //alert( res.token ) //TODO save token
        const decodedToken = jwt_decode(res.token);
        //alert(JSON.stringify(decodedToken))
        AsyncStorage.setItem('token', res.token);
        AsyncStorage.setItem('tokendecode', decodedToken)
    }

    static _handlerErrorLogin(err ){
        alert("Connexion failed" + err);
    }

    static loginReject(err ){
        //alert( "username/mot de passe:  incorrect " )
    }


    static async logIn() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('255796728390540', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`).then();
            const { id, picture, name, birthday } = await response.json();

            setTimeout(() => {
                alert(
                    name + ' ' + id
                );
            }, 2000);


        }
    }

    static async signInWithGoogleAsync() {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: "299540432340-nfb0n0fpjkl1b18png98ufi4d1sr59f1.apps.googleusercontent.com",
                iosClientId: "299540432340-6h379skldnmrqti9dbl2i13rhhti9adr.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                return alert(result.accessToken);
            } else {
                return {cancelled: true};
            }
        } catch(e) {
            return {error: true};
        }
    }
}