import React from 'react';
import AppNavigator from "./src/navigation/AppNavigator";
import {
    Notifications,
} from 'expo';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

// This refers to the function defined earlier in this guide
import * as ExpoNotificationToken from "./src/Services/NotificationService/ExpoNotificationToken";
import * as SendbirdNotification from "./src/Services/NotificationService/SendbirdNotification";
import SendBirdService from "./src/Services/chatService/SendBirdService";
import fetchDataAd from "./src/Services/fetchDataAd";

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            notification: {},
            currentUser:0
        };
        this._handleNotification=this._handleNotification.bind(this);
        this.handlerConnectToChat=this.handlerConnectToChat.bind(this);
        this.getExpoNotificationToken=this.getExpoNotificationToken.bind(this);
        this.connectToSendbirdNotification=this.connectToSendbirdNotification.bind(this);
    }


    async startConnecteNotificationOperation(){
        await this.connectToChat()

    }

    connectToChat() {
        if (this.state.currentUser>0){
            SendBirdService.connectUser(this.state.currentUser, this.handlerConnectToChat)
        }else
            console.log('[App.js] no user login , the currentUser is ' + this.state.currentUser)
    }

    async getExpoNotificationToken(){
        //Get expo Token and return Promise with Token
        const token = await ExpoNotificationToken.registerForPushNotificationsAsync();

        return token;
    }


    componentDidMount() {
        fetchDataAd.getUserAuth().then((idUser) => {
            if (idUser)
                this.setState({currentUser:idUser}, this.startConnecteNotificationOperation)
            else
                console.log(`[App.js] no user founded`);

        });
    }

    async connectToSendbirdNotification(TOKEN) {
        //must called after connect and getting TOKEN
       await SendbirdNotification.registerForPushNotificationsAsync(SendBirdService.getInstance(), TOKEN);

    }

    _handleNotification = (notification) => {
        console.log(`[App.js] notification received: ${notification} `);
    };

    handlerConnectToChat = async () => {
        console.log(`[App.js] user is connected to chatService`);
        const token = await this.getExpoNotificationToken();
        const stateOfOperation = await this.connectToSendbirdNotification(token);
        Notifications.addListener(this._handleNotification);
        console.log('[App.js] resulte of connecting to notification is:', stateOfOperation);

    };




    render() {
        return (
            <View style={styles.container}>
                <AppNavigator />
            </View>
        );
    }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
