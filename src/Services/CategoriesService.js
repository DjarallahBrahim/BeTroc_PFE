import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";


export default class CategoriesService {

    /**
     * function to handling Get Categories from the server
     * @param userName
     * @param password
     * @returns
     * //TODO Change get method to post and send information
     */

    async getCategoriesHandler() {
        const categoriesCache = await cacheOperationService.getItemFromStorage('categoriesCache');
        if (categoriesCache) {
            const result = categoriesCache.substr(7, categoriesCache.length - 1);
            const cat = await JSON.parse(result);
            return cat;
        }
        const authToken = await cacheOperationService.getItemFromStorage("AuthToken");
        return axios.get("http://vps628622.ovh.net:16233/api/getCategories", {
            'headers': {'Authorization': authToken}
        })
            .then(async (response) => {
                if (response.data) {
                    if(response.data) {
                        await cacheOperationService.saveItemInStorage('categoriesCache', JSON.stringify(response.data));
                        return (response.data);
                    }else
                        return false;
                } else
                    this.handlerErrorRequest();


            })
            .catch((error) => {
                return ("Error with GetCategories request" + error.message)
            });
    }

    handlerErrorRequest() {
        alert("Les categories sont vide");
    }

}