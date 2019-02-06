import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";
import serverURL from './ServerURL';

export default class ProfileService {

    /**
     * get user email
     * @param idUser
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  getUserEmail(idUser) {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.get(`${serverURL}/api/user/${idUser}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
              if(response.data)
                  return response.data.email;
              else
                  return false
            } )
            .catch((error) => {
                console.log("Error with getting user Email request " + error.message)
            });
    }

    /**
     * get user info
     * @param handlerUserInfoSeccus
     * @param handlerUserInfoField
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  getUserInfo(handlerUserInfoSeccus,handlerUserInfoField) {

        const __ret = await this.getUserAuth();
        let idUser = __ret.idUser;
        const authToken = __ret.authToken;

        return axios.get(`${serverURL}/api/user/${idUser}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                handlerUserInfoSeccus(response.data)
            } )
            .catch((error) => {
                handlerUserInfoField();
                console.log("Error with getting user info request " + error.message)
            });
    }


    /**
     * deelte Donation ads
     * @param idAnnonce
     * @param handlerUserInfoSeccus
     * @param handlerUserInfoField
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  deleteDonAD(idAnnonce,handlerUserInfoSeccus,handlerUserInfoField) {
        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.delete(`${serverURL}/api/donationAds/delete/${idAnnonce}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                handlerUserInfoSeccus(response.data);
                return(response.data.success);
            } )
            .catch((error) => {
                handlerUserInfoField();
                console.log("Error with getting user info request " + error.message)
            });
    }

    /**
     * delete exchange ads
     * @param idAnnonce
     * @param handlerUserInfoSeccus
     * @param handlerUserInfoField
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  deleteEchangeAD(idAnnonce,handlerUserInfoSeccus,handlerUserInfoField) {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.delete(`${serverURL}/api/exchangeAds/delete/${idAnnonce}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {

                handlerUserInfoSeccus(response.data)
            } )
            .catch((error) => {
                handlerUserInfoField();
                console.log("Error with getting user info request " + error.message)
            });
    }

    /**
     * delete demande ad
     * @param idAnnonce
     * @param handlerUserInfoSeccus
     * @param handlerUserInfoField
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  deleteDemandeAD(idAnnonce,handlerUserInfoSeccus,handlerUserInfoField) {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.delete(`${serverURL}/api/DonationRequestAd/delete/${idAnnonce}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {

                handlerUserInfoSeccus(response.data)
            } )
            .catch((error) => {
                handlerUserInfoField();
                console.log("Error with getting user info request " + error.message)
            });
    }


    /**
     * delete user Account
     * @param password
     * @returns {Promise<AxiosResponse<any> | boolean>}
     */
    static async  deleteAccount(password) {
        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;
        return axios.post(`${serverURL}/api/user/deleteAccount/${password}`, password,{
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                if(response.data.success)
                {
                    alert('account deleted successfully');
                    return true;
                }
                else
                {
                    alert('Votre compte n\'était supprimé');
                    return false;
                }
            } )
            .catch((error) => {
                console.log("Error with delete user account request " + error.message)
                alert('Votre compte n\'était supprimé');
                return false;
            });

    }

    /**
     * update user name
     * @param username
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  updateEUserName(username) {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;
        const body={
            "newUsername": username,
        };
        return axios.post(`${serverURL}/api/user/username/update/${username}`, body,{
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                console.log(response.data);
                if(response.data.success)
                    return response.data.message;
                else
                    'Vérifier vos données'
            } )
            .catch((error) => {
                console.log("Error with update user email request " + error.message)
            });
    }

    /**
     * update user email
     * @param email
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  updateEmail(email) {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;
        const id = __ret.idUser;
        const body={
            "newEmail": email,
            "userId": id
        }
        return axios.post(`${serverURL}/api/user/email/update`, body,{
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                if(response.data.success)
                     return response.data.message;
                else
                    'Vérifier vos données'
            } )
            .catch((error) => {
                console.log("Error with update user email request " + error.message)
            });
    }

    /**
     * update user password
     * @param newPassword
     * @param oldPassword
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  updatePassword(newPassword, oldPassword) {
        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;
        const id = __ret.idUser;
        const body={
            "newPassword": newPassword,
            "oldPassword": oldPassword,
            "userId": id
        }
        return axios.post(`${serverURL}/api/user/password/update`, body,{
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                if(response.data.success)
                    return response.data.message;
                else
                    'Vérifier vos données'
            } )
            .catch((error) => {
                console.log("Error with update user email request " + error.message)
            });
    }

    /**
     * upload image profile
     * @param uri
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  uploadImageProfile(uri) {

        const image = this.storePicture(uri);

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.post(`${serverURL}/api/uploadImage`, image, {
            'headers': {'Authorization': authToken, 'Content-Type': 'multipart/form-data'},
        })
            .then(async (response) => {
                if (response.data) {
                    console.log("Uploaded images");
                    this.updateUserImageProfil(response.data.id, authToken).then();
                    return true;
                } else {
                    console.log("Error with uploading images");
                    return false;
                }
            })
            .catch((error) => {
                console.log("Error with Upload images profile request" + error.message)
            });
    }


    /**
     * update user image profile
     * @param imageId
     * @param authToken
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  updateUserImageProfil(imageId, authToken) {


        return axios.post(`${serverURL}/api/user/profileimage/update/${imageId}`, null, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                if(response.data)
                    console.log(response.data.message);
                else
                    console.log('Votre image n\'était pas changé')

            } )
            .catch((error) => {

                console.log("Error with update user image profile request " + error.message)
            });
    }


    static async  getUserAuth() {
        let id =  await cacheOperationService.getItemFromStorage("userId");
        if(id)
            var idUser = id.substr(7, id.length - 1);

        const authToken =
            await cacheOperationService.getItemFromStorage("AuthToken");
        return {idUser, authToken};
    }

    static storePicture(uri) {
        const data = new FormData();
        data.append('file', {
            uri: uri,
            type: 'image/jpg', // or photo.type
            name: "profile.jpg"
        });
        return data;
    }
}