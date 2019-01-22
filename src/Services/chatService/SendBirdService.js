import sendBird from './SendBridConst'
import {Alert} from "react-native";
import fetchDataAd from "../fetchDataAd";

export default class SendBirdService{

    static getInstance(){
        sendBird.setForegroundState();
        //sendBird.setBackgroundState();
        return sendBird;
    }

    static connectUser(idUser, callback){
        console.log('[SendBirdService] start to connect user to sendBird')
        sendBird.connect(idUser, (user, error) => {
            if (error) {
                console.log('[SendBirdService] currentUser could not connecte not sendbird service ', error.message, error.code)
            } else {
                console.log('[SendBirdService] currentUser is connected to sendbird service with url: ' + user.profileUrl);
                if(callback)
                    callback()
            }
        })
    }


    static connectUSerManual(){
        console.log('trying to connecte SENDBIRD')
        fetchDataAd.getUserAuth().then((idUser) => {
            if (idUser)
                SendBirdService.connectUser(idUser);
            else
                alert('Vous n\'êtes pas authentifié!')

        });
    }

    static disconnectUser(){
        sendBird.disconnect(() => {
            console.log('user disconnect')
        })
    }

    static createGroupOneToOne(curentUser, userToContact, typeAnnonce='DEFAULT'){
        let userIds = [curentUser, userToContact];

        if(curentUser.toString() === userToContact.toString()){
            return new Promise(()=> alert('Vous pouvez pas résever votre annonce'));
        }else
            return new Promise((resolve) => {
            sendBird.GroupChannel.createChannelWithUserIds(userIds, true, `${curentUser}${typeAnnonce}${userToContact}`, null, null,
                    (createdChannel, error) => {
                        if (error) {
                            console.log('Create chat room failed with ' + curentUser + ' and ' +
                                userToContact + ' with annonce type: ' + typeAnnonce + ' Error status: ' + error.message + error.code);
                            if(error.code === 800101)
                                alert('Please connect to your messenger');
                            Alert.alert(
                                'Messanger',
                                'Please connect to your messenger',
                                [
                                    {text: 'Cancel', onPress: () => console.log('Cancel Connecting to messanger Pressed'), style: 'cancel'},
                                    {text: 'Connecter', onPress: () => SendBirdService.connectUSerManual()},
                                ],
                                { cancelable: false }
                            );
                            return false;
                        } else {
                            console.log('Create chat room successful with ' + curentUser + ' and ' +
                                userToContact);
                            resolve(createdChannel);
                        }
            });
    })
    }


    static setForegroundState(){
        sendBird.setForegroundState();
    }
}