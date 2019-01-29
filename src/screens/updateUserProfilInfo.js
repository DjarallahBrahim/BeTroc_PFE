import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableHighlight, TouchableWithoutFeedback,
    View,
} from 'react-native';
import {Keyboard} from 'react-native'
import Colors from "../constants/Colors";
import ProfileService from "../Services/ProfileService";
import {NavigationActions, StackActions} from "react-navigation";
import serverURL from "../Services/ServerURL";

export default class updateUserProfilInfo extends React.Component {
    static navigationOptions = {
        title: 'Modifier vos information',
    };

    state={
        username:'',
        email:''
    };

    handlerUserName(oldUserName){
        if(this.state.username === oldUserName)
            alert("Vous n'avez pas changer votre user name")
        else if(this.state.username.trim().length>0)
             ProfileService.updateEUserName(this.state.username).then((message)=>alert(message));

        if(this.state.email.trim().length>0)
            console.log(this.state.email.trim());
    }


    handlerEmailUpdate(oldEmail, email){
        if(oldEmail !== email)
             if(email)
                ProfileService.updateEmail(email).then((result)=> alert(result))
             else
                 alert('Remplire un email valide')
        else
            alert("Vous n'avez utilisé le même email")
    }


    handlerPasswordUpdate(oldPassword, newPassword) {
        if(oldPassword !== newPassword && newPassword.length>5)
             ProfileService.updatePassword(newPassword,oldPassword).then((result)=> alert(result));
        else
            alert('Remplire un code valide (plus de 6 charcartères)')
    }


    render() {
       const data = this.props.navigation.getParam("dataUser", {});
        const navigation = this.props.navigation.getParam("navigation", {});
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
                style={{flexDirection:'column',paddingHorizontal:10, marginTop:50}}>
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                    <Image source={{uri: data.profileImage ?
                            `${serverURL}/api/downloadImage/${data.profileImage.name}`
                            :
                            'http://chittagongit.com//images/person-png-icon/person-png-icon-29.jpg'}}
                           resizeMode="cover"
                           style={{width:150, height:150, marginHorizontal:5, marginVertical:5, borderRadius:150/2}}/>
                </View>
                <View style={{marginTop:20}}>
                    <TextInput
                        textAlign={'center'}
                        style={{borderWidth:1, borderColor:Colors.grey2,borderRadius: 10,
                            fontSize:15, color:'#000',paddingHorizontal:10,paddingVertical:5, marginVertical:3}}
                        onChangeText={(text) => {this.setState({username: text})}}
                        placeholder={data.username}
                        underlineColorAndroid="transparent"
                        autoCapitalize = 'none'
                    />
                    <TextInput
                        textAlign={'center'}
                        style={{borderWidth:1, borderColor:Colors.grey2,borderRadius: 10,
                            fontSize:15, color:'#000',paddingHorizontal:10,paddingVertical:5, marginVertical:3}}
                        onChangeText={(text) => {this.setState({email: text})}}
                        placeholder={data.email}
                        underlineColorAndroid="transparent"
                        autoCapitalize = 'none'
                    />
                    <TextInput
                        textAlign={'center'}
                        secureTextEntry={true}
                        style={{borderWidth:1, borderColor:Colors.tintColor,borderRadius: 10,
                            fontSize:15, color:'#000',paddingHorizontal:10,paddingVertical:5, marginVertical:3}}
                        onChangeText={(text) => {this.setState({oldPassword: text})}}
                        placeholder={"l'ancien mot de passe"}
                        underlineColorAndroid="transparent"
                        autoCapitalize = 'none'
                    />
                    <TextInput
                        textAlign={'center'}
                        secureTextEntry={true}
                        style={{borderWidth:1, borderColor:Colors.tintColor,borderRadius: 10,
                            fontSize:15, color:'#000',paddingHorizontal:10,paddingVertical:5, marginVertical:3}}
                        onChangeText={(text) => {this.setState({newPassword: text})}}
                        placeholder={'Nouveau mot de passe'}
                        underlineColorAndroid="transparent"
                        autoCapitalize = 'none'
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, marginHorizontal:20}}>

                    <TouchableHighlight style={{
                        backgroundColor: Colors.tintColor,
                        borderRadius: 10}} onPress={() => navigation.pop()}>

                        <Text style={{color: 'white',
                            fontWeight: 'bold',
                            backgroundColor: 'transparent',
                            marginVertical: 15,
                            marginHorizontal: 10}}> Annuler </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{
                        backgroundColor: 'white',
                        opacity: 0.8,
                        borderRadius: 10}}
                                        onPress={() => {
                                            if(this.state.username && data.username)
                                                this.handlerUserName(data.username);

                                            if(data.email && this.state.email){
                                                this.handlerEmailUpdate(data.email, this.state.email)
                                            }
                                            if(this.state.newPassword)
                                                this.handlerPasswordUpdate(this.state.oldPassword, this.state.newPassword)

                                            const resetAction = StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({routeName: 'Profil'})],
                                            });
                                            navigation.dispatch(resetAction);
                                        }}>

                        <Text style={{color: 'black',
                            fontWeight: 'bold',
                            backgroundColor: 'transparent',
                            marginVertical: 15,
                            marginHorizontal: 10}}> Sauvegarder </Text>
                    </TouchableHighlight>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});