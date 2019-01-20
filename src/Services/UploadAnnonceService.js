import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";


function generateFormDataAnnonce(response, data) {
    const imgId = [];
    response.data.images.forEach((image, index) => imgId.push(image.id));
    data.images = imgId;
    return createFormDataAnnonceDon(data);
}


export async function postImages(imgUrl, data) {
    const images = storePicture(imgUrl);
    let idUser = await cacheOperationService.getItemFromStorage("userId");
    idUser = idUser.substr(7, idUser.length - 1);
    data.user = parseInt(idUser);

    const authToken = await cacheOperationService.getItemFromStorage("AuthToken");
    return axios.post("http://vps628622.ovh.net:16233/api/uploadMultipleFiles", images, {
        'headers': {'Authorization': authToken, 'Content-Type': 'multipart/form-data'},
    })
        .then((response) => {
            if (response.data) {
                console.log("Uploaded images");
                return generateFormDataAnnonce(response, data);
            } else {
                console.log("Error with uploading images");
                return false;
            }
        })
        .catch((error) => {
            console.log("Error with Uploade images request" + error.message)
        });
}


export async function uploadDonAd(data) {
    const authToken = await cacheOperationService.getItemFromStorage("AuthToken");
    return axios.post("http://vps628622.ovh.net:16233/api/donationAds", data, {
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

export async function uploadEchangeAd(data) {
    const authToken = await cacheOperationService.getItemFromStorage("AuthToken");
    return axios.post("http://vps628622.ovh.net:16233/api/exchangeAds", data, {
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

export async function uploadDemandeAd(data) {
    const authToken = await cacheOperationService.getItemFromStorage("AuthToken");
    return axios.post("http://vps628622.ovh.net:16233/api/DonationRequestAd", data, {
        'headers': {'Authorization': authToken}
    })
        .then((response) => {
            if (response.data)
                return response.data.success;
            else
                return false;
        })
        .catch((error) => {
            console.log("Error with uploadDemandeAd request" + error.message)
        });
}


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

function createFormDataAnnonceDon(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('user', data.user);
    formData.append('address', data.address);
    formData.append('category', data.category);
    formData.append('state', data.state);
    data.images.forEach((photo, index) => formData.append(`images[${index}]`, photo))
    return formData;
}

export function formValidation(state){
    if (state.typeAd === 'Don')
        return state.title !== '' && state.description !== ''
                && state.category !== 0 && state.etatProduit !== '' &&
                state.adLocation !== '' && state.imgUrl.length > 0 ;
    else if(state.typeAd === 'Échange')
            return state.title !== '' && state.description !== ''
                    && state.category !== 0 && state.etatProduit !== '' &&
                    state.adLocation !== '' && state.imgUrl.length > 0 &&
                    state.estimatedPrice !== '' ;
    else
        return state.title !== '' && state.description !== ''
                && state.category !== 0;
}

