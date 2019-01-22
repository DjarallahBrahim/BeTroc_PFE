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

export default class updateUserProfilInfo extends React.Component {
    static navigationOptions = {
        title: 'Modifier vos information',
    };

    state={
        username:'',
        email:''
    };

    handlerUserName(){
        if(this.state.username.trim().length>0)
             console.log(this.state.username.trim());

        if(this.state.email.trim().length>0)
            console.log(this.state.email.trim());
    }



    render() {
       const data = this.props.navigation.getParam("dataUser", {});
        const navigation = this.props.navigation.getParam("navigation", {});

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
                style={{flexDirection:'column',paddingHorizontal:10, marginTop:50}}>
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                    <Image source={{uri:'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/43680926_1910295159059259_1909104016655122432_n.jpg?_nc_cat=111&_nc_ht=scontent-cdg2-1.xx&oh=cb1ba20a0686e058eb0cd5ba6113e547&oe=5C8BEA24'}}
                           resizeMode="cover"
                           style={{width:150, height:150, marginHorizontal:5, marginVertical:5, borderRadius:150/2}}/>
                </View>
                <View style={{marginTop:20}}>
                    <TextInput
                        textAlign={'center'}
                        style={{borderWidth:1, borderColor:Colors.tintColor,borderRadius: 10,
                            fontSize:17, color:'#000', fontWeight:'bold',paddingHorizontal:10,paddingVertical:5, marginVertical:3}}
                        onChangeText={(text) => {this.setState({username: text})}}
                        placeholder={data.username}
                        placeholderTextColor={'black'}
                        underlineColorAndroid="transparent"
                        autoCapitalize = 'none'
                    />
                    <TextInput
                        textAlign={'center'}
                        style={{borderWidth:1, borderColor:Colors.tintColor,borderRadius: 10,
                            fontSize:17, color:'#000', fontWeight:'bold',paddingHorizontal:10,paddingVertical:5, marginVertical:3}}
                        onChangeText={(text) => {this.setState({email: text})}}
                        placeholder={data.email}
                        placeholderTextColor={'black'}
                        underlineColorAndroid="transparent"
                        autoCapitalize = 'none'
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, marginHorizontal:20}}>

                    <TouchableHighlight style={{
                        backgroundColor: Colors.tintColor,
                        opacity: 0.8,
                        borderRadius: 10}} onPress={() => navigation.goBack()}>

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
                                        onPress={() => this.handlerUserName()}>

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