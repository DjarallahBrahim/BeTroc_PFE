import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";
import serverURL from './ServerURL';

export default class ProfileService {

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



    static async  deleteDonAD(idAnnonce,handlerUserInfoSeccus,handlerUserInfoField) {
        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.delete(`${serverURL}/api/donationAds/delete/${idAnnonce}`, {
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

    static async  getUserAuth() {
        let id =  await cacheOperationService.getItemFromStorage("userId");
        if(id)
            var idUser = id.substr(7, id.length - 1);

        const authToken =
            await cacheOperationService.getItemFromStorage("AuthToken");
        return {idUser, authToken};
    }
}