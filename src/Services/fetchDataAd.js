import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";

export default class fetchDataAd {

    static async  getDonationAds(sortArg='modificationDate', size=0, page=0) {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.get(`http://vps628622.ovh.net/api/donationAds?sort=${sortArg},desc&size=${size}&page=${page}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                if(response.data)
                    return response.data;
                else
                    return false;
            } )
            .catch((error) => {
                console.log("Error with getting donationAds request " + error.message)
            });
    }


    static async  getExchageAds(sortArg='modificationDate', size=0, page=0) {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.get(`http://vps628622.ovh.net/api/exchangeAds?sort=${sortArg},desc&size=${size}&page=${page}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                if(response.data)
                    return response.data;
                else
                    return false;
            } )
            .catch((error) => {
                console.log("Error with getting donationAds request " + error.message)
            });
    }

    static async  getDonationRequestAds(sortArg='modificationDate', size=0, page=0) {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;

        return axios.get(`http://vps628622.ovh.net/api/DonationRequestAd?sort=${sortArg},desc&size=${size}&page=${page}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                if(response.data)
                    return response.data;
                else
                    return false;
            } )
            .catch((error) => {
                console.log("Error with getting donationAds request " + error.message)
            });
    }

    static async  getAllData() {

        const __ret = await this.getUserAuth();
        const authToken = __ret.authToken;
        return  axios.all([fetchDataAd.getExchageAds(), fetchDataAd.getDonationRequestAds(),fetchDataAd.getDonationAds()])
            .then(axios.spread(function (acct, perms) {
                alert('we get all DATA')
            }));
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