import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";

export default class fetchDataAd {

    static async  getDonationAds(sortArg='modificationDate', size=10, page=0) {



        return axios.get(`http://vps628622.ovh.net:16233/api/donationAds?sort=${sortArg},desc&size=${size}&page=${page}`)
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

    static async  getExchageAds(sortArg='modificationDate', size=10, page=0) {


        return axios.get(`http://vps628622.ovh.net:16233/api/exchangeAds?sort=${sortArg},desc&size=${size}&page=${page}`)
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

    static getDonationRequestAds(sortArg='modificationDate', size=10, page=0) {

        return axios.get(`http://vps628622.ovh.net:16233/api/DonationRequestAd?sort=${sortArg},desc&size=${size}&page=${page}`)
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

    static async  getAdsByTypeAndCategory(type, category, page=0) {

        var uri='';
        if(type === 'Echange')
            uri='/exchangeAds';
        else if(type === 'Don')
            uri = '/donationAds';
        else if (type === 'Demande')
            uri = '/DonationRequestAd';
        else
            return false;
        uri +=`/category/${category}`;

        return axios.get(`http://vps628622.ovh.net:16233/api${uri}?size=7&page=${page}`)
            .then((response) =>
            {
                if(response.data){
                    return response.data;
                }

                else
                    return false;
            } )
            .catch((error) => {
                console.log("Error with getting donationAds request " + error.message)
            });
    }

    static async  getAllData() {

        return  axios.all([fetchDataAd.getExchageAds(), fetchDataAd.getDonationRequestAds(),fetchDataAd.getDonationAds()])
            .then(axios.spread(function (acct, perms) {
                alert('we get all DATA')
            }));
    }

    static async  getUserAuth() {
        let id =  await cacheOperationService.getItemFromStorage("userId");
        if(id){
            var idUser = id.substr(7, id.length - 1);
            return idUser;
        }else
            return false

        // const authToken =
        //     await cacheOperationService.getItemFromStorage("AuthToken");
    }
}