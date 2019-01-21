import React from 'react';
import {
    View,
    Text, StyleSheet, Button
} from "react-native";
import {Platform} from "react-native";
import Searchbar from "../components/Components_Home/SearchBar";
import { Divider } from 'react-native-elements'
import TabsBarView from "../components/Components_Home/TabsBarView";
import Colors from "../constants/Colors";
import * as ApiData from "../ApiData/ApiData";
import Spinner from 'react-native-loading-spinner-overlay';
import ProfileService from "../Services/ProfileService";
import TabsBarViewV2 from "../components/Components_Home/TabsBarViewV2";
import fetchDataAd from "../Services/fetchDataAd";
import SendBirdService from "../Services/chatService/SendBirdService";
import * as ExpoNotificationToken from "../Services/NotificationService/ExpoNotificationToken";
import * as SendbirdNotification from "../Services/NotificationService/SendbirdNotification";
import {Notifications} from "expo";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


  constructor(props) {
        super(props);
      this.state = {
            query: "",
            spinner: true,
            data: false,
            demandeData:{
                "Categories": {
                    "Animaux":[],
                    "Bricolage": [],
                    "Habits":[],
                    "Maison":[],
                    "Multimédia": [],
                    "Loisir":[],
                }
            },
            echangeData:{
                "Categories": {
                    "Animaux":[],
                    "Bricolage": [],
                    "Habits":[],
                    "Maison":[],
                    "Multimédia": [],
                    "Loisir":[],
                }
            },
            donData:{
                "Categories": {
                    "Animaux":[],
                    "Bricolage": [],
                    "Habits":[],
                    "Maison":[],
                    "Multimédia": [],
                    "Loisir":[],
                }
            },
            page:0,
            idUser:0
        };
    }

    getInput = (query) => {
        this.setState(state => ({ ...state, query: query || "" }));
    };

    componentDidMount(){
        this.fetchDataAd();
        this.connectToChat()
            .then(()=> ExpoNotificationToken.registerForPushNotificationsAsync()
                .then((token)=> {
                    console.log('Token received');
                    SendbirdNotification.registerForPushNotificationsAsync(SendBirdService.getInstance(),token)
                        .then(()=> {
                            console.log("start notif listener");
                            SendBirdService.setForegroundState();
                            Notifications.addListener(this._handleNotification);
                           // SendbirdNotification.setPushNotification(SendBirdService.getInstance(),token,true,Platform.OS).then()
                        })
                }));



        // Handle notifications that are received or selected while the app
        // is open. If the app registerForPushNotificationsAsyncwas closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.

    }

    _handleNotification = (notification) => {
        console.log('Notification');
       alert(notification);
    };

    connectToChat() {

        return fetchDataAd.getUserAuth().then((idUser) => {
            if (idUser)
                SendBirdService.connectUser(idUser);
        });
    }

    fetchDataAd() {
        console.log('Fetchin data HomeScreen');
        ApiData.generateData(undefined,undefined ,this.state.page).then((result) => {
            if (result) {
                let demandeData = result.type["Demande"];
                let echangeData = result.type["Echange"];
                let donData = result.type["Don"];
                this.setState({data: true, demandeData, echangeData, donData,},this.handlerSpinner);

            }else{
                this.handlerSpinner()
            }
        }).catch(()=> this.handlerSpinner())
    }

    handlerSpinner() {
        this.setState({
            spinner: !this.state.spinner
        });

    }

    render() {
        console.log("HomeScreen Render")
        return (
            <View style={styles.container}>

                <View style={{backgroundColor: Colors.tintColor}}>
                    <Searchbar submitSearch={this.getInput}/>
                </View>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{color: "white", fontSize: 17, lineHeight: 22}}
                />
                {this.state.data?
                    <TabsBarView navigation={this.props.navigation} demandeData={this.state.demandeData} echangeData={this.state.echangeData} donData={this.state.donData}/>:null

                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
