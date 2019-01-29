import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";
import serverURL from './ServerURL'
export default class fetchDataAd {

    /**
     * get donation ad by pages
     * @param sortArg
     * @param size
     * @param page
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  getDonationAds(sortArg='modificationDate', size=10, page=0) {

        return axios.get(`${serverURL}/api/donationAds?sort=${sortArg},desc&size=${size}&page=${page}`)
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

    /**
     * get echange ads by pages
     * @param sortArg
     * @param size
     * @param page
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async  getExchageAds(sortArg='modificationDate', size=10, page=0) {


        return axios.get(`${serverURL}/api/exchangeAds?sort=${sortArg},desc&size=${size}&page=${page}`)
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

    /**
     * get donation request ads by pages
     * @param sortArg
     * @param size
     * @param page
     * @returns {Promise<AxiosResponse<any>>}
     */
    static getDonationRequestAds(sortArg='modificationDate', size=10, page=0) {

        return axios.get(`${serverURL}/api/DonationRequestAd?sort=${sortArg},desc&size=${size}&page=${page}`)
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

    /**
     * get ads by type and Category
     * @param type
     * @param category
     * @param page
     * @returns {Promise<*>}
     */
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

        return axios.get(`${serverURL}/api${uri}?size=7&page=${page}`)
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

    /**
     * get all data
     * @returns {Promise<any[]>}
     */
    static async  getAllData() {

        return  axios.all([fetchDataAd.getExchageAds(), fetchDataAd.getDonationRequestAds(),fetchDataAd.getDonationAds()])
            .then(axios.spread(function (acct, perms) {
                alert('we get all DATA')
            }));
    }

    /**
     * get user authentification info token and id
     * @returns {Promise<*>}
     */
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