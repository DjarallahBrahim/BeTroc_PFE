import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Icon} from "react-native-elements";
import Colors from "../../../constants/Colors";

export default class Adresselocation extends React.Component {


    render() {
        const {adresse, time} = this.props;
        return (
            <View style={{flex:1, flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderColor:'#bab9b0',
                borderWidth:0.5,
                padding:10,
                marginHorizontal:5}}>
                <Icon
                    size={26}
                    name= 'location-on'
                    color={Colors.tintColor}
                    underlayColor={'#00000000'}
                />
            <View style={styles.location}>
                <Text
                    style={styles.input}> {adresse}
                </Text>

            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabText: {
        color: '#1b1b1b',
        textAlign: 'center',
        fontSize: 13,
        marginRight:10
    },
    input: {
        color: '#6f6f6f',
    },
    location:{
        flex: 1,


    }
});
