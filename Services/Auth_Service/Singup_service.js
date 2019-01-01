import axios from 'axios';
import {AsyncStorage} from "react-native";
import jwt_decode from "jwt-decode";


export default class Singup_service {
    /**
     * function to handling singup operation
     * @param userName
     * @param email
     * @param password
     * @returns {Promise<any>}
     */
    static singupHandler(userName, email, password) {

        return new Promise((resolve, reject) => {
                axios.post("http://vps628622.ovh.net/api/auth/signup", {
                     name: userName,
                     username: userName,
                     email: email,
                     password: password
                })
                    .then((response) => {
                        Singup_service._loginResolve(response);
                        resolve()
                    })
                    .catch((error) => {
                        Singup_service._handlerErrorLogin(error);
                        resolve()
                    });
        });
    }

    /**
     * callback200 to handler a OK login
     * @param res
     * @private
     */
    static _loginResolve(res ){
        if(res.data.success)
            alert("Vous êtes enregistré avec succès, s'il vous plaît confirmer votre email");
        else
            alert("Probléme durant l'opération");

        //alert( res.data.success ) //TODO save token
        //const decodedToken = jwt_decode(res.token);
        //alert(JSON.stringify(decodedToken))
        // AsyncStorage.setItem('token', res.token);
        // AsyncStorage.setItem('tokendecode', decodedToken)
    }

    /**
     * callback404+ to handler any exception for singup operation
     * @param err
     * @private
     */
    static _handlerErrorLogin(err ){
        alert("Connexion failed" + err);
    }

    /**
     * callbackReject when the singup is rejected
     * @param err
     */
    static loginReject(err ){
        //alert( "username/mot de passe:  incorrect " )
    }


    //TODO GET user FB/GOOGLE+ ID and send it to our server

    /**
     * Singup with facebook SDK
     * @returns {Promise<void>}
     */
    static async authWithFacebookAsync() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('255796728390540', {
            permissions: ['public_profile','email'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),email`).then();
            const { id, picture, name, email } = await response.json();

            setTimeout(() => {
                alert(
                    name + ' ' + id + ' ' + email
                );
            }, 2000);

        }
    }

    /**
     * Singup with Google+ SDK
     * @returns {Promise<*>}
     */
    static async authWithGoogleAsync() {
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