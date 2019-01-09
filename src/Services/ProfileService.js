import axios from 'axios';
import * as cacheOperationService from "./CacheOperationService";

export default class ProfileService {

    static async  getUserInfo(handlerUserInfoSeccus,handlerUserInfoField) {

        const __ret = await this.getUserAuth();
        let idUser = __ret.idUser;
        const authToken = __ret.authToken;

        return axios.get(`http://192.168.1.47:5000/api/user/${idUser}`, {
            'headers': {'Authorization': authToken},
        })
            .then((response) =>
            {
                handlerUserInfoSeccus(response.data)
            } )
            .catch((error) => {
                handlerUserInfoField();
                console.log("Error with getting user info request " + error.message)
            });
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