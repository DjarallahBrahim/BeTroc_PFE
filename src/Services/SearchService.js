import serverURL from './ServerURL';
import axios from 'axios';

export default class SearchService {

    static async getDonationAds(key='', state='', idSubCategory='' ) {
        console.log(`${serverURL}/api/donationAds/search?key=${key}&state=${state}&category=${idSubCategory}`)
        return axios.get(`${serverURL}/api/donationAds/search?key=${key}&state=${state}&category=${idSubCategory}`)
            .then(async (response) => {
                if (response.data)
                    return response.data;
                else
                    return false;
            })
            .catch((error) => {
                console.log("[SearcheService] Error with getting donationAds request " + error.message)
            });
    }

    static async getExchangeAds(key='', state='', idSubCategory='' ) {
        console.log(`${serverURL}/api/exchangeAds/search?key=${key}&state=${state}&category=${idSubCategory}`)
        return axios.get(`${serverURL}/api/exchangeAds/search?key=${key}&state=${state}&category=${idSubCategory}`)
            .then(async (response) => {
                if (response.data)
                    return response.data;
                else
                    return false;
            })
            .catch((error) => {
                console.log("[SearcheService] Error with getting exchangeAds request " + error.message)
            });
    }

    static async getDonationRequestAds(key='', idSubCategory='' ) {
        console.log(`${serverURL}/api/DonationRequestAd/search?key=${key}&category=${idSubCategory}`);
        return axios.get(`${serverURL}/api/DonationRequestAd/search?key=${key}&category=${idSubCategory}`)
            .then(async (response) => {
                if (response.data)
                    return response.data;
                else
                    return false;
            })
            .catch((error) => {
                console.log("[SearcheService] Error with getting DonationRequestAd request " + error.message)
            });
    }
}