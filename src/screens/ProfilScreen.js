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
import ActionSheet from "react-native-actionsheet";
import {Permissions, ImagePicker, MailComposer} from 'expo';
import DialogInput from "react-native-dialog-input";
import Spinner from "react-native-loading-spinner-overlay";
import ContactUsScreen from "./ContactUsScreen";

export default class ProfilScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Profil',
            headerRight: (
                <View style={{flexDirection:'row'}}>
                <TouchableHighlight
                    style={{marginHorizontal:3}}
                    onPress={() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Profil'})],
                        });
                        navigation.dispatch(resetAction);
                    }}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Icon size={18}
                              iconStyle={{marginRight: 8}}
                              name='envelope-o'
                              type='font-awesome'
                              color={Colors.tintColor}
                              underlayColor={'#00000000'}
                        />
                    </View>
                </TouchableHighlight>
                    <TouchableHighlight
                        style={{marginHorizontal:3}}
                        onPress={() => {
                            navigation.navigate("ContactUsScreen");
                        }}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Icon size={18}
                                  iconStyle={{marginRight: 8}}
                                  name='refresh'
                                  type='font-awesome'
                                  color={Colors.tintColor}
                                  underlayColor={'#00000000'}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            ),
        }
    };

    constructor(){
        super();
        this.state={
            userInfo: {
                username: 'Please wait...',
                email: 'Please wait...',
                nb_annonce: 'Please wait...',
                profileImage: ''
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
            refreshing:false,
            isDialogVisible:false,
            spinner:false
        };
        this.handlerUserInfoField=this.handlerUserInfoField.bind(this);
        this.handlerUserInfoSeccus=this.handlerUserInfoSeccus.bind(this);
        this.showActionSheet=this.showActionSheet.bind(this);
        this.refrshScreen=this.refrshScreen.bind(this);

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

    //TODO Reade it hahah
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

    openGallery(){
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(()=>{
            ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            }).then((photo)=>{
                if (!photo.cancelled) {
                    this.handlerSpinner();
                    ProfileService.uploadImageProfile(photo.uri).then(()=>{
                        this.handlerSpinner();
                        this.refrshScreen()
                    }).catch((err)=> {
                        this.handlerSpinner();
                        alert(err);
                    });
                }
            });
        });
    }

    openCamera(){
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(()=>{
            ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            }).then((photo)=>{
                if (!photo.cancelled) {
                    this.handlerSpinner();
                    ProfileService.uploadImageProfile(photo.uri).then(()=>{
                        this.handlerSpinner();
                        this.refrshScreen()
                    }).catch((err)=> {
                        this.handlerSpinner();
                        alert(err);
                    });
                }
            });
        });
    }

    refrshScreen(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Profil'})],
        });
        this.props.navigation.dispatch(resetAction);
    }


    sendEmail(){
        MailComposer.composeAsync({
            recipients: ['djarallah.brahim@gmail.com'],
            subject: 'Attachment Test',
            body: 'Testing multiple Attachments',
        })
    }
    showActionSheet = () => {
        //To show the Bottom ActionSheet
        this.ActionSheet.show();
    };

    handlerSpinner() {
        this.setState({
            spinner: !this.state.spinner
        });

    }

    async componentDidMount(){
        this.checkAuthentification();
        await ProfileService.getUserInfo(this.handlerUserInfoSeccus,this.handlerUserInfoField);

    }

    render() {
        const optionArray = [
            'Camera',
            'Gallery',
            'Cancel',
        ];
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
                <ScrollView
                   style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                        textStyle={{color: "white", fontSize: 17, lineHeight: 22}}
                    />
                    <ProfileInformation showActionSheet={this.showActionSheet} navigation={this.props.navigation} userInfo={this.state.userInfo}/>
                    <AdsProfile adData={this.state.adData} navigation={this.props.navigation}/>
                    <View style={{alignItems:'center', flexDirection:'row', flex:1, justifyContent:'center'}}>
                        <TouchableHighlight style={styles.deleteButton} onPress={()=> this.handlerDeleteAccpount()}>
                            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center',}}>
                                <Icon size={26} name= 'trash-o' type='font-awesome' color='#eee' underlayColor={'#00000000'}

                                />
                                <Text style={styles.textDelete}> Supprimer Compte </Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.publishButton} onPress={()=> this.logout()}>
                            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center',}}>
                                <Icon size={26} name= 'sign-out' type='font-awesome' color='#eee' underlayColor={'#00000000'}

                                />
                                <Text style={styles.textPublier}> Déconnexion </Text>
                            </View>
                        </TouchableHighlight>

                     </View>
                    <ActionSheet
                        ref={o => (this.ActionSheet = o)}
                        title={'Changement photo de profile'}
                        options={optionArray}
                        cancelButtonIndex={2}
                        onPress={index => {
                            if(index === 0){
                                this.openCamera()
                            }else if(index === 1){
                               this.openGallery()
                            }else
                                return;
                        }}
                    />
                    <DialogInput isDialogVisible={this.state.isDialogVisible}
                                 title={"Supprimer votre compte ?"}
                                 message={"Êtes-vous sure ?"}
                                 hintInput ={"Entrez votre password"}
                                 submitInput={ (inputText) => {this.setState({isDialogVisible:false},()=>this.fetchDeletAccount(inputText))} }
                                 closeDialog={ () => {this.setState({isDialogVisible:false})}}>
                    </DialogInput>
                </ScrollView>
            );
    }

    handlerDeleteAccpount() {
        this.setState({isDialogVisible:true})
    }

    fetchDeletAccount(inputText) {
        ProfileService.deleteAccount(inputText).then((result)=>{
            if(result){
                this.logout();
            }
        })
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
        marginHorizontal:5

    },
    deleteButton: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius:10,
        paddingHorizontal:8,
        marginVertical: 10,
        marginHorizontal:5

    },
    textPublier: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginVertical: 10,
        marginHorizontal:10
    },
    textDelete: {
        color: "#b0b0b0",
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginVertical: 10,
        marginHorizontal:10
    },
});