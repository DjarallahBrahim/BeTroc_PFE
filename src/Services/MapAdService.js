import serverURL from './ServerURL';
import axios from 'axios';

export default class MapAdService {

    static async getDonationAds(lat=0, lng=0, size = 10, page = 0) {

        return axios.get(`${serverURL}/api/donationAds/closet/lat/${lat}/long/${lng}?size=${size}&page=${page}`)
            .then(async (response) => {
                if (response.data)
                    return response.data;
                else
                    return false;
            })
            .catch((error) => {
                console.log("Error with getting donationAds request " + error.message)
            });
    }

    static async getDonationAdsByID(id=0) {

        return axios.get(`${serverURL}/api/donationAds/${id}`)
            .then(async (response) => {
                if(response.data)
                        return response.data;
                else
                    return false;
            })
            .catch((error) => {
                console.log("Error with getting donationAds request " + error.message)
            });
    }

    static async getExchangeAdsByID(id=0) {

        return axios.get(`${serverURL}/api/exchangeAds/${id}`)
            .then(async (response) => {
                if(response.data)
                    return response.data;
                else
                    return false;
            })
            .catch((error) => {
                console.log("Error with getting donationAds request " + error.message)
            });
    }

    static async generateMarkersList(data) {
        let markerList = [];
        if(data.content){
            data.content.forEach((item) => {
                //console.log(item.id);
                let mkmodel = {};
                mkmodel.category = item.category.title;
                mkmodel.id = item.id;
                mkmodel.latlng = {latitude: item.latitude, longitude: item.longitude};
                mkmodel.title = item.title;
                mkmodel.state = item.state;
                markerList.push(mkmodel);
            });
            return markerList
        }
    }

    static async getExchageAds(lat=0, lng=0, size = 10, page = 0) {


        return axios.get(`${serverURL}/api/exchangeAds/closet/lat/${lat}/long/${lng}?size=${size}&page=${page}`)
            .then((response) => {
                if (response.data)
                    return response.data;
                else
                    return false;
            })
            .catch((error) => {
                console.log("Error with getting donationAds request " + error.message)
            });
    }


    generateDonationMarker(data){

    }
}