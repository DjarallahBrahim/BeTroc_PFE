import React from 'react';
import {
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from 'react-native';
import {Icon} from "react-native-elements";
import Colors from "../../constants/Colors";

export default class Publierbutton extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.contact}
                    onPress={()=>{alert('You will contact him soon :) ')}}
                >
                    <View style={{flex:1,flexDirection:'row', alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Icon
                            size={26}
                            name= 'globe'
                            type='font-awesome'
                            color='#eee'
                            underlayColor={'#00000000'}
                            iconStyle={{transform: [{ rotate: '-45deg'}]}}
                        />
                        <Text style={styles.text}> Publier </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    contact: {
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
        opacity:0.8,
        borderRadius:10
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginVertical: 15,
        marginHorizontal:10
    },
});