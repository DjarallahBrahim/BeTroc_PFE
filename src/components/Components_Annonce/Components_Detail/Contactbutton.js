import React from 'react';
import {
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from 'react-native';
import {Icon} from "react-native-elements";
import Colors from "../../../constants/Colors";

export default class Contactbutton extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.publier}
                    onPress={()=>{alert('You will contact him soon :) ')}}
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