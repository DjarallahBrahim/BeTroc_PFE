import axios from 'axios';
import {AsyncStorage} from "react-native";
import jwt_decode from "jwt-decode";


export default class Login_service {

    /**
     * function to handling login operation
     * @param userName
     * @param password
     * @returns {Promise<any>}
     * //TODO Change get method to post and send information
     */

    static loginHandler(userName, password) {

       return new Promise((resolve, reject) => {
               axios.post("http://vps628622.ovh.net:16233/api/auth/signin", {
                   usernameOrEmail: userName,
                   password: password
               })
                   .then(async (response) => {
                       await Login_service._loginResolve(response);
                       resolve()
                   })
                   .catch((error) => {
                       Login_service._handlerErrorLogin(error);
                       resolve()
                   });
       });
    }

    /**
     * callback200 to handler a OK login
     * @param res
     * @private
     */
    static async _loginResolve(res ){
       // alert( res.data.idUser );//TODO save token
        //const decodedToken = jwt_decode(res.token);
        //alert(JSON.stringify(decodedToken))
        await AsyncStorage.setItem('AuthToken', res.data.jwt);
        await AsyncStorage.setItem('userId', `${res.data.idUser}`);
        // AsyncStorage.setItem('tokendecode', decodedToken)
    }

    /**
     * callback404+ to handler any exception for login operation
     * @param err
     * @private
     */
    static _handlerErrorLogin(err ){
        alert("Connexion failed" + err);
    }

    /**
     * callbackReject when the login is rejected
     * @param err
     */
    static loginReject(err ){
        //alert( "username/mot de passe:  incorrect " )
    }


    //TODO GET user FB/GOOGLE+ ID and send it to our server

    /**
     * Sing in with facebook SDK
     * @returns {Promise<void>}
     */
    static async authWithFacebookAsync() {
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

    /**
     * SingIn with Google+ SDK
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