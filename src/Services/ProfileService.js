import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";

export default class ProfileService {

    static async  getUserInfo(handlerUserInfoSeccus,handlerUserInfoField) {

        const __ret = await this.getUserAuth();
        let idUser = __ret.idUser;
        const authToken = __ret.authToken;

        return axios.get(`http://vps628622.ovh.net:16233/api/user/${idUser}`, {
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

        return axios.delete(`http://vps628622.ovh.net:16233/api/donationAds/delete/${idAnnonce}`, {
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

        return axios.delete(`http://vps628622.ovh.net:16233/api/exchangeAds/delete/${idAnnonce}`, {
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

        return axios.delete(`http://vps628622.ovh.net:16233/api/DonationRequestAd/delete/${idAnnonce}`, {
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

    static async  getUserAuth() {
        let id =  await cacheOperationService.getItemFromStorage("userId");
        if(id)
            var idUser = id.substr(7, id.length - 1);

        const authToken =
            await cacheOperationService.getItemFromStorage("AuthToken");
        return {idUser, authToken};
    }
}