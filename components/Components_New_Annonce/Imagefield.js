import React from 'react';
import {
    Image,
    StyleSheet, Text, TouchableHighlight,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from "../../constants/Colors";

export default class Imagefield extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:15, color: Colors.grey1, marginBottom:5}}> Photos: </Text>
                <TouchableHighlight style={styles.viewStyle} onPress={()=> alert("Pic soon")}>
                        <Icon
                        name='camera'
                        type='evilicon'
                        size={60}
                        color='#000'/>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection:"column",
        marginTop:15,

    },
    textStyle:{
        fontSize:18,
        color:'#a5a5a5'
    },
    viewStyle:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:"white",
        height:80,
        width:80,
        borderRadius:12}
});