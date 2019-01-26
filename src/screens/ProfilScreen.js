import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button, TouchableHighlight, SafeAreaView, Platform, RefreshControl
} from 'react-native';
import ProfileInformation from "../components/Components_profil/ProfileInformation";
import AdsProfile from "../components/Components_profil/AdsProfile";
import ProfileService from "../Services/ProfileService";
import {Icon} from "react-native-elements";
import Colors from "../constants/Colors";
import * as cacheOperationService from "../Services/CacheOperationService";
import LoginSignupScreen from "./LoginSignupScreen";
import {NavigationActions, StackActions} from "react-navigation";
import SendBirdService from "../Services/chatService/SendBirdService";

export default class ProfilScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Profil',
            headerRight: (
                <TouchableHighlight
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Profil'})],
                        });
                        navigation.dispatch(resetAction);
                    }}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 13, marginHorizontal: 5, color: Colors.tintColor}}>Actualiser</Text>
                        <Icon size={18}
                              iconStyle={{marginRight: 8}}
                              name='refresh'
                              type='font-awesome'
                              color={Colors.tintColor}
                              underlayColor={'#00000000'}
                        />
                    </View>
                </TouchableHighlight>
            ),
        }
    };

    constructor(){
        super();
        this.state={
            userInfo: {
                username: 'Please wait...',
                email: 'Please wait...',
                nb_annonce: 'Please wait...'
            },
            userInfoProblem: {
                username: 'Please try later',
                email: 'Please try later',
                nb_annonce: 'Please try later'
            },
            adData:{
                exchangeAds:{
                    size:'0',
                    data:[]
                },
                donationRequestAds:{
                    size:'0',
                    data:[]
                },
                donationAds:{
                    size:'0',
                    data:[]
                },
            },
            auth:null,
            refreshing:false
        };
        this.handlerUserInfoField=this.handlerUserInfoField.bind(this);
        this.handlerUserInfoSeccus=this.handlerUserInfoSeccus.bind(this);

    }

    handlerUserInfoField() {
        return this.setState({userInfo: this.state.userInfoProblem, refreshing:false});
    }

    handlerUserInfoSeccus(result) {
        let exchangeAds = {size : result.exchangeAds.length, data: result.exchangeAds};
        let donationRequestAds = {size : result.donationRequestAds.length, data: result.donationRequestAds};
        let donationAds = {size : result.donationAds.length, data: result.donationAds};
        let adData = {exchangeAds,donationRequestAds,donationAds};
        this.setState({userInfo: result,adData, refreshing:false});
    }

    checkAuthentification(){
        cacheOperationService.getItemFromStorage("userId")
            .then((auth)=>{
                    if (auth) {
                        this.setState({auth:true})
                    }else
                        this.setState({auth:false})
            }
            );
    }

    logout() {
        cacheOperationService.deleteItemFromStorage("userId")
            .then((result)=>{
                    if (result) {
                        cacheOperationService.deleteItemFromStorage("profileInformation")
                            .then((result)=>{
                                    if (result) {
                                        SendBirdService.disconnectUser();
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({routeName: 'Profil'})],
                                        });
                                        this.props.navigation.dispatch(resetAction);
                                    }else
                                        alert('error with logout');
                                }
                            );
                    }else
                        alert('error with logout');
                }
            );


    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        ProfileService.getUserInfo(this.handlerUserInfoSeccus,this.handlerUserInfoField).then();
    };

    async componentDidMount(){
        this.checkAuthentification();
        await ProfileService.getUserInfo(this.handlerUserInfoSeccus,this.handlerUserInfoField);

    }

    render() {
        if(this.state.auth === null)
            return null;
        if(!this.state.auth)
            return(<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                    <LoginSignupScreen routename={'Profil'} navigation={this.props.navigation}/>
                </View>);
        else
            return (
                <View
                   style={styles.container}>
                    <ProfileInformation navigation={this.props.navigation} userInfo={this.state.userInfo}/>
                    <AdsProfile adData={this.state.adData} navigation={this.props.navigation}/>
                    <View style={{alignItems:'center'}}>
                        <TouchableHighlight style={styles.publishButton} onPress={()=> this.logout()}>
                            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center',}}>
                                <Icon size={26} name= 'sign-out' type='font-awesome' color='#eee' underlayColor={'#00000000'}

                                />
                                <Text style={styles.textPublier}> Déconnexion </Text>
                            </View>
                        </TouchableHighlight>
                     </View>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    publishButton: {
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
        borderRadius:10,
        paddingHorizontal:8,
        marginVertical: 10,

    },
    textPublier: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginVertical: 10,
        marginHorizontal:10
    },
});