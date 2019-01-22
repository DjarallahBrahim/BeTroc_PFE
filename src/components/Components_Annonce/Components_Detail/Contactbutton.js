import React from 'react';
import {
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from 'react-native';
import {Icon} from "react-native-elements";
import Colors from "../../../constants/Colors";
import SendBirdService from "../../../Services/chatService/SendBirdService";

export default class Contactbutton extends React.Component {


    handlerStartChat(result){
        if(result)
            this.props.navigation.navigate('ChatScreen', {channelUrl: result.url, currentUser:this.props.currentUser})
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.publier}
                    onPress={()=>{
                        if (this.props.currentUser>0) {
                            console.log(this.props.currentUser, this.props.user.id);
                            SendBirdService.createGroupOneToOne(this.props.currentUser, this.props.user.id, `${this.props.typeAnnonce}_${this.props.user.id}`)
                                .then((result)=> this.handlerStartChat(result));
                        }else{
                            console.log(this.props.currentUser)
                        }
                    }
                    }
                >
                    <View style={{flex:1,flexDirection:'row', alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                            <Icon
                                size={26}
                                name= 'send'
                                color='#eee'
                                underlayColor={'#00000000'}
                                iconStyle={{transform: [{ rotate: '-45deg'}],  marginBottom:10}}
                            />
                            <Text style={styles.text}> Contact </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    publier: {
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
        borderRadius: 5,
        flex:0.5,
        marginTop:20,
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
        opacity:0.8
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginVertical: 15,
    },
});