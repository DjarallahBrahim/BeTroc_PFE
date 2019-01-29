import serverURL from './ServerURL';
import axios from 'axios';

export default class SearchService {

    /**
     * get donation ads search
     * @param key
     * @param state
     * @param idSubCategory
     * @returns {Promise<AxiosResponse<any>>}
     */
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

    /**
     * get exchange by search
     * @param key
     * @param state
     * @param idSubCategory
     * @returns {Promise<AxiosResponse<any>>}
     */
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

    /**
     * getDonation request by search
     * @param key
     * @param idSubCategory
     * @returns {Promise<AxiosResponse<any>>}
     */
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