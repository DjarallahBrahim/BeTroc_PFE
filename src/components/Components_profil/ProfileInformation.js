import React from 'react';
import {
    Image, Modal,
    StyleSheet,
    Text, TextInput, TouchableHighlight, TouchableOpacity,
    View,
} from 'react-native';
import {Icon} from 'react-native-elements'
import serverURL from '../../Services/ServerURL'

export default class ProfileInformation extends React.Component {
    static navigationOptions = {
        title: 'ProfileInformation',
    };


    state={
        usernamepPomptVisible:false,
        emailPomptVisible:false
    }
    render() {
        return (
            <View
                style={{flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                    <TouchableHighlight style = {
                        {
                            position:'absolute',
                            left:'58%',
                            top:-5,
                            width:45,
                            height:45,
                            alignItems:'center',
                            borderRadius:45/2,
                            marginVertical:5,
                            padding:5,
                            justifyContent:'center'}}
                                        onPress={()=> this.props.navigation.navigate('updateUserProfilInfo',
                                            {dataUser:this.props.userInfo, navigation:this.props.navigation})}
                                        >
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='black'
                            size={22}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style = {
                        {
                            position:'absolute',
                            left:'40%',
                            bottom:0,
                            width:45,
                            height:45,
                            alignItems:'center',
                            borderRadius:45/2,
                            marginVertical:5,
                            padding:5,
                            justifyContent:'center'}}
                                        onPress={()=> this.props.showActionSheet()}
                    >
                        <Icon
                            name='camera'
                            type='font-awesome'
                            color='black'
                            size={22}
                        />
                    </TouchableHighlight>
                    <Image source={{uri: this.props.userInfo.profileImage ?
                            `${serverURL}/api/downloadImage/${this.props.userInfo.profileImage.name}`
                                :
                            'http://chittagongit.com//images/person-png-icon/person-png-icon-29.jpg'}}
                           resizeMode="cover"
                           style={{width:150, height:150, marginHorizontal:5, marginVertical:5, borderRadius:150/2}}/>
                </View>
                <View style={styles.containerInformation}>

                    <Text style={{fontSize:17, color:'#000', fontWeight:'bold',paddingHorizontal:5, marginVertical:3}} >
                        {this.props.userInfo.username} </Text>
                   <Text style={{fontSize:17, color:'#000', fontWeight:'bold',paddingHorizontal:5, marginVertical:3}} >
                        {this.props.userInfo.email} </Text>


                    <Text style={{fontSize:15, color:'#c0c0c0', fontWeight:'400',paddingHorizontal:5, marginVertical:3}} >
                        annonces: {this.props.userInfo.nb_annonce} </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerInformation: {
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:5,
    },
});