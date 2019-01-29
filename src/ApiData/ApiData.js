import fetchDataAdApi from "../Services/fetchDataAd";
import * as cacheOperationService from "../Services/CacheOperationService";


/**
 * generate  the format of data
 * @param sortArg
 * @param size
 * @param page
 * @returns {Promise<*>}
 */
export async function generateData(sortArg = 'modificationDate', size = 20, page = 0) {
    let annonceDataReady = '';
    annonceDataReady = {
        "type": {
            "Echange": {
                "Categories": {
                    "Animaux": [],
                    "Autre":[],
                    "Bricolage": [],
                    "Habits": [],
                    "Maison": [],
                    "Multimédia": [],
                    "Loisir": [],
                }
            },
            "Don": {
                "Categories": {
                    "Animaux": [],
                    "Autre":[],
                    "Bricolage": [],
                    "Habits": [],
                    "Maison": [],
                    "Multimédia": [],
                    "Loisir": [],
                }
            },
            "Demande": {
                "Categories": {
                    "Animaux": [],
                    "Autre":[],
                    "Bricolage": [],
                    "Habits": [],
                    "Maison": [],
                    "Multimédia": [],
                    "Loisir": [],

                }
            }
        }
    };
    var donationData = await fetchDataAdApi.getDonationAds(sortArg, size, page);
    var exchangeReqData = await fetchDataAdApi.getExchageAds(sortArg, size, page);
    var donationReqData = await fetchDataAdApi.getDonationRequestAds(sortArg, size, page);

    if (donationData && exchangeReqData && donationReqData) {
        console.log("geting data for first time");


        donationData.content.forEach((item, key) => {
            try {
                let currentcategory = item.category.title;
                annonceDataReady.type.Don.Categories[currentcategory].push(item);
            }
            catch (e) {
                console.log('Exception in APIDATA generateDATA Annnonce note valide= ' + e.toString() + 'id= ' + item.id);
                return false;
            }
        });

        exchangeReqData.content.forEach((item, key) => {
            try {
                let currentcategory = item.category.title;
                annonceDataReady.type.Echange.Categories[currentcategory].push(item);
            }
            catch (e) {
                console.log('Exception in APIDATA generateDATA Annnonce note valide= ' + e.toString() + 'id= ' + item.id);
                return false;
            }

        });
        donationReqData.content.forEach((item, key) => {
            try {
                let currentcategory = item.category.title;
                annonceDataReady.type.Demande.Categories[currentcategory].push(item);
            }
            catch (e) {
                console.log('Exception in APIDATA generateDATA Annnonce note valide= ' + e.toString() + 'id= ' + item.id);
                return false;
            }

        });

        return annonceDataReady;


    }
    else {
        alert('We have no Ad for now :D ');
        return false;
    }

}




