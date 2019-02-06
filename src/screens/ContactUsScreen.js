import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableHighlight,
    View,
} from 'react-native';
import Colors from "../constants/Colors";
import {Icon} from "react-native-elements";
import {MailComposer} from "expo";
import {KeyboardAvoidingView} from 'react-native';
export default class ContactUsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(){
        super();

        this.state={
            email:'',
            title:'',
            message:''
        }
    }

    handlerEmailInformation(){
        if(this.state.email.length && this.state.title.length && this.state.message.length){
            MailComposer.composeAsync({
                recipients: ['djarallah.brahim@gmail.com'],
                subject: this.state.title.trim(),
                body: `De la part: ${this.state.email.trim()} \n\n\n message: \n ${this.state.message.trim()}`,
            }).then(({sent})=> alert(sent))
        }else
            alert('Erreur avec les champs')
    }
    render() {
        return (
            <View style={{flex:1, position:'relative'}}>
                {/*<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>*/}
                {/*<Text> this is Profil Screen </Text>*/}
                {/*</ScrollView>*/}
                <View style={{flex:0.5, backgroundColor:Colors.tintColor, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:25, fontWeight:'bold', color: 'white', marginBottom:1}}> CONTACTER-NOUS </Text>
                    <Image source={{uri:'http://chittagongit.com//images/person-png-icon/person-png-icon-29.jpg'}}
                           resizeMode="cover"
                           style={{width:150, height:150, marginHorizontal:5, marginVertical:5, borderRadius:150/2}}/>
                </View>

                <View style={{flex:0.5, backgroundColor:'#edeff1'}}>
                </View>
                <KeyboardAvoidingView style={styles.container} enabled>
                    <Text style={{fontSize:15, color: Colors.grey1, marginBottom:1}}> Titre </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text=>this.setState({title:text})}
                        multiline={true}
                        underlineColorAndroid='transparent'
                    />
                    <Text style={{fontSize:15, color: Colors.grey1, marginBottom:1}}> Email </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={text=>this.setState({email:text})}
                        multiline={true}
                        underlineColorAndroid='transparent'
                    />
                    <Text style={{fontSize:15, color: Colors.grey1, marginBottom:1}}> Message </Text>
                    <TextInput
                        style={styles.inputBody}
                        onChangeText={text=>this.setState({message:text})}
                        multiline={true}
                        underlineColorAndroid='transparent'
                    />
                    <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>

                        <Icon size={25}
                              name='send'
                              type='font-awesome'
                              iconStyle={{shadowOffset: {width: 0.5, height: 0.5},
                                  shadowColor: 'black',
                                  elevation: 2,
                              margin:10}}
                              color={'black'}
                              underlayColor={'#00000000'}
                              onPress={()=> this.handlerEmailInformation()}
                        />

                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: '#fff',
        justifyContent:'flex-start',
        position:'absolute',
        top:'35%',
        left:'5%',
        right:'5%',
        paddingVertical:10,
        paddingHorizontal:5,
        borderRadius:10,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowColor: 'black',
        elevation: 3,
    },
    input: {
       paddingHorizontal:10,
        paddingVertical:5,
        marginHorizontal:8,
        marginVertical:4,
        borderRadius:15,
        borderWidth:.5,
        borderColor:'#d0d2d4'
    },
    inputBody: {
        textAlignVertical: 'top',
        height:150,
        paddingHorizontal:10,
        paddingVertical:5,
        margin:8,
        borderRadius:15,
        borderWidth:.5,
        borderColor:'#d0d2d4'
    },
});