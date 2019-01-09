import React from 'react';
import {
    Button,
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from 'react-native';
import Colors from "../constants/Colors";

export default class LoginSignupScreen extends React.Component {


    render() {
        return (
            <View style={{alignItems:'center'}}>
                <Text style={{fontSize:16, paddingVertical:8, paddingHorizontal:10, fontWeight:'400'}}> Vous n'êtes pas connecté</Text>
                <Text style ={{fontSize:16, paddingVertical:8, paddingHorizontal:10, fontWeight:'500'}}>Connectez-vous pour voir le contenu.</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableHighlight style={styles.loginButton}
                                        onPress={() => {this.props.navigation.push('Auth', {routename:this.props.routename})}}>
                        <Text style={{fontSize:16, color:'white',paddingVertical:8, paddingHorizontal:10, fontWeight:'500'}}> Login-Screen</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.signupButton}
                                        onPress={() => {this.props.navigation.push('Singup', {routename:this.props.routename})}}>
                        <Text style={{fontSize:16, color:'white', fontWeight:'500',paddingVertical:8, paddingHorizontal:10,}}> Singup-Screen</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton:{
        justifyContent:'center',
        borderWidth:2,
        borderRadius:10,
        backgroundColor:Colors.tintColor,
        paddingVertical:5,
        paddingHorizontal:12,
        margin:5,
        borderColor:'white'
    },
    signupButton:{
        borderWidth:2,
        borderRadius:10,
        backgroundColor:'#1d8aee',
        paddingVertical:5,
        paddingHorizontal:8,
        margin:5,
        borderColor:'white'
    }
});