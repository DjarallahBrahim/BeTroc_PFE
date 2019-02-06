import React from 'react';
import {
    Image, Linking, StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import SendBirdService from "../../Services/chatService/SendBirdService";
import serverURL from '../../Services/ServerURL'
import ActionSheet from 'react-native-actionsheet';
import ProfileService from "../../Services/ProfileService";

export default class RowDemandeAd extends React.Component {

    constructor(){
        super();

        this.state={
            //data:this.props.data || null
            picker:false
        }
    }
    jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handlerStartChat(item){
        if(item)
            this.props.navigation.navigate('ChatScreen', {channelUrl: item.url, currentUser:this.props.currentUser})
    }


    fetchEmailToContact(id){
        ProfileService.getUserEmail(id).then((email)=>{
            if(email)
                 Linking.openURL(`mailto:${email}?subject=Betroc operation`)
            else
                alert("Problème avec notre service de contact")
        })
    }

    render() {
        const optionArray = [
            'Email',
            'Messagerie (bientôt disponible)',
            'Cancel',
        ];

        const data = this.props.data;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{flex: 3}}
                    onPress={()=>
                    // if (this.props.currentUser>0) {
                    //     SendBirdService.createGroupOneToOne(this.props.currentUser, data.user.id, `${this.props.typeAnnonce}_${data.id}`)
                    //         .then((result)=> this.handlerStartChat(result));
                    // }else{
                    //     console.log(this.props.currentUser)
                    // }
                    this.showActionSheet(this.props.currentUser, data.user.id)}>
                <View style={{flex: 3}}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '500',
                        color: '#1c1c1c'
                    }}>{data.title.toLowerCase()}</Text>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '400',
                        color: '#b0b0b0'
                    }}>{this.jsUcfirst(data.user.name)}</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '300',
                        color: '#c3c3c3'
                    }}>{data.description}</Text>
                </View>
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '90%'
                }}>
                    <View/>
                    <TouchableOpacity
                        style={{
                            borderRadius: 30,
                            backgroundColor: '#ebebeb',
                            width: 60,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={()=>
                            // if (this.props.currentUser>0) {
                            //     SendBirdService.createGroupOneToOne(this.props.currentUser, data.user.id, `${this.props.typeAnnonce}_${data.id}`)
                            //         .then((result)=> this.handlerStartChat(result));
                            // }else{
                            //     console.log(this.props.currentUser)
                            // }
                            this.showActionSheet(this.props.currentUser, data.user.id)
                        }>
                        <Image
                            source={{uri: `${serverURL}/api/downloadImage/${data.subCategory.imgName}`}}
                            style={{width: 45, height: 45}}
                        />
                    </TouchableOpacity>

                </View>
                <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={'Moyen de contact'}
                    options={optionArray}
                    cancelButtonIndex={2}
                    onPress={index => {
                        if(index === 0){
                            this.fetchEmailToContact(data.user.id);
                        }else if(index === 1){
                            alert("Ce service sera bientôt disponible !");
                            // if (this.props.currentUser>0) {
                            //     SendBirdService.createGroupOneToOne(this.props.currentUser, data.user.id, `${this.props.typeAnnonce}_${data.id}`)
                            //         .then((result)=> this.handlerStartChat(result));
                            // }else{
                            //     alert('Vous n\'êtes connecté au service de messagerie')
                            // }
                        }else
                            return;
                    }}
                />
            </View>
        );
    }

    showActionSheet = () => {
        //To show the Bottom ActionSheet
        this.ActionSheet.show();
    };

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:15,
        marginHorizontal:8,
        marginVertical:10,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowColor: 'black',
        elevation: 2.5,

    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});