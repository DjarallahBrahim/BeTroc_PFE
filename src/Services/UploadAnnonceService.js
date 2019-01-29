import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";
import serverURL from './ServerURL';

function generateFormDataAnnonce(response, data) {
    const imgId = [];
    response.data.images.forEach((image, index) => imgId.push(image.id));
    data.images = imgId;
    return createFormDataAnnonceDon(data);
}


/**
 * send donation ad to server
 * @param imgUrl
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function uploadDonAd(imgUrl, data) {
    const images = storePicture(imgUrl);
    const authToken = await cacheOperationService.getItemFromStorage("AuthToken");

    return axios.post(`${serverURL}/api/uploadMultipleFiles`, images, {
        'headers': {'Authorization': authToken, 'Content-Type': 'multipart/form-data'},
    })
        .then(async (response) => {
            if (response.data) {
                console.log("Uploaded images");
                const annonceCordData = await generateFormDataAnnonce(response, data);
                await uploadDonatonAdPart2(annonceCordData, authToken);
                return true;
            } else {
                console.log("Error with uploading images");
                return false;
            }
        })
        .catch((error) => {
            console.log("Error with Uploade images request" + error.message)
        });
}

/**
 *
 * @param imgUrl
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function uploadEchangeAd(imgUrl, data) {
    const images = storePicture(imgUrl);
    const authToken = await cacheOperationService.getItemFromStorage("AuthToken");

    return axios.post(`${serverURL}/api/uploadMultipleFiles`, images, {
        'headers': {'Authorization': authToken, 'Content-Type': 'multipart/form-data'},
    })
        .then(async (response) => {
            if (response.data) {
                console.log("Uploaded images");
                const annonceCordData = await generateFormDataAnnonce(response, data);
                await uploadExchangeAdParte2(annonceCordData, authToken);
                return true;
            } else {
                console.log("Error with uploading images");
                return false;
            }
        })
        .catch((error) => {
            console.log("Error with Uploade images request" + error.message)
        });
}

/**
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function uploadDemandeAd(data) {
    const authToken = await cacheOperationService.getItemFromStorage("AuthToken");
    const corpRequest = createFormDataAnnonceDemande(data);
    return axios.post(`${serverURL}/api/DonationRequestAd`, corpRequest, {
        'headers': {'Authorization': authToken}
    })
        .then((response) => {
            if (response.data) {
                console.log("[UploadAnnonceService] Annonce demande uploaded");
                return response.data.success;
            }
            else
                return false;
        })
        .catch((error) => {
            console.log("[UploadAnnonceService] Error with uploadDemandeAd request" + error.message)
        });
}

/**
 *
 * @param annonceCordData
 * @param authToken
 */
function uploadDonatonAdPart2(annonceCordData, authToken) {
    axios.post(`${serverURL}/api/donationAds`, annonceCordData, {
        'headers': {'Authorization': authToken}
    })
        .then((response) => {
            if (response.data)
                return response.data.success;
            else
                return false;
        })
        .catch((error) => {
            console.log("Error with uploadDonAd request" + error.message)
        });
}

/**
 *
 * @param annonceCordData
 * @param authToken
 */
function uploadExchangeAdParte2(annonceCordData, authToken) {
    axios.post(`${serverURL}/api/exchangeAds`, annonceCordData, {
        'headers': {'Authorization': authToken}
    })
        .then((response) => {
            if (response.data)
                return response.data.success;
            else
                return false;
        })
        .catch((error) => {
            console.log("Error with uploadEchangeAd request" + error.message)
        });
}

/**
 *
 * @param imgUrls
 * @returns {FormData}
 */
function storePicture(imgUrls) {
    const data = new FormData();
    imgUrls.forEach((photo) => {
        data.append('files', {
            uri: photo,
            type: 'image/jpg', // or photo.type
            name: "my_photo.jpg"
        });
    });
    return data;
}

/**
 *
 * @param data
 * @returns {FormData}
 */
function createFormDataAnnonceDon(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('address', data.address);
    formData.append('category', data.category);
    formData.append('subCategory', data.subCategory);
    formData.append('state', data.state);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    data.images.forEach((photo, index) => formData.append(`images[${index}]`, photo));
    console.log(formData);
    return formData;
}

function createFormDataAnnonceDemande(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('subCategory', data.subCategory);
    return formData;
}

export function formValidation(state) {
    if (state.typeAd === 'Don')
        return state.title !== '' && state.description !== ''
            && state.category !== 0 && state.etatProduit !== '' &&
            state.adLocation !== '' && state.imgUrl.length > 0;
    else if (state.typeAd === 'Échange')
        return state.title !== '' && state.description !== ''
            && state.category !== 0 && state.etatProduit !== '' &&
            state.adLocation !== '' && state.imgUrl.length > 0 &&
            state.estimatedPrice !== '';
    else
        return state.title !== '' && state.description !== ''
            && state.category !== 0;
}

