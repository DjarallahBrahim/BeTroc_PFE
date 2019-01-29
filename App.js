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
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from "./src/constants/Colors";


const slides = [

    {
        key: 'somethun-dos',
        title: 'Dans votre accueil',
        text: 'Naviguer dans les différents types d\'annonce ! \n Échange, Don et Demande !',
        image: require('./assets/images/home.jpg'),
        imageStyle: {
            width: 320,
            height: 320,
            borderRadius:20,

        },
        titleStyle:{
          color:'white',
            fontWeight:'500'
        },
        textStyle:{
          color:'white',
            fontSize:19
        },
        backgroundColor: '#22bcb5',
    },

    {
        title: 'Autour de vous ?',
        key: 'somethun-tree',
        text: 'Visualiser les annonces sur votre map !',
        image: require('./assets/images/map.jpg'),
        imageStyle: {
            width: 320,
            height: 320,
            borderRadius:20,
            resizeMode:"cover",
        },
        titleStyle:{
            color:'white',
            fontWeight:'500'
        },
        textStyle:{
            color:'white',
            fontWeight:'400',
            fontSize:19
        },
        backgroundColor: '#2792b6',
    },
    {
        key: 'somethun',
        title: 'Vous avez un besoin ?',
        text: 'Trouvez votre besoin à travers les trois types d\'annonces',
        image: require('./assets/images/ajouterAnnonce.jpg'),
        imageStyle: {
            width: 320,
            height: 340,
            resizeMode:'stretch',
            borderRadius:20,
        },
        titleStyle:{
            color:'white',
            fontWeight:'500'
        },
        textStyle:{
            color:'white',
            fontWeight:'400',
            fontSize:19
        },
        backgroundColor: '#fb6d53',
    },
    {
        key: 'somethun2',
        title: 'Vous êtes prêt ?',
        text: 'Découvrez les autres fonctionnalités avec beTroc',
        image: require('./assets/images/logoAndImage2.png'),
        imageStyle: {
            width: 320,
            height: 320,
            resizeMode:'stretch',
            borderRadius:20,
        },
        titleStyle:{
            color:'white',
            fontWeight:'500'
        },
        textStyle:{
            color:'white',
            fontWeight:'400',
            fontSize:19
        },
        backgroundColor: Colors.tintColor,
    }
];

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            notification: {},
            currentUser:0,
            showRealApp:false
        };
        this._handleNotification=this._handleNotification.bind(this);
        this.handlerConnectToChat=this.handlerConnectToChat.bind(this);
        this.getExpoNotificationToken=this.getExpoNotificationToken.bind(this);
        this.connectToSendbirdNotification=this.connectToSendbirdNotification.bind(this);
    }


    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
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
            if (this.state.showRealApp) {
                return <AppNavigator />;
            } else {
                return <AppIntroSlider showSkipButton={true} slides={slides} onSkip={this._onDone} onDone={this._onDone}/>;
            }

    }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    image: {
        width: 320,
        height: 320,
    }
});
