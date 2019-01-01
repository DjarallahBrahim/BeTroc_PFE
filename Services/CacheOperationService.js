import {AsyncStorage} from "react-native";



/**
     * Save Value in application Storage
     * @param key
     * @param value
     * @returns {Promise<void>}
     */
      export  async function saveItemInStorage(key, value){
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    };

    /**
     * Get Value from application Storage
     * @param key
     * @returns {Promise<string>}
     */
    export async function getItemFromStorage(key) {
        try {
            const token = await AsyncStorage.getItem(key);
            if (token !== null) {
                return 'Bearer '.concat(token);
            }
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    };
