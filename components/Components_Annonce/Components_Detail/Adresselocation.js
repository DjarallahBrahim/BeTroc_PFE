import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Icon} from "react-native-elements";

export default class Adresselocation extends React.Component {


    render() {
        return (
            <View style={{flex:1, flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor:'#00000000',
                padding:10,
                marginHorizontal:10}}>
                <Icon
                    size={26}
                    name= 'location-on'
                    color='#F07818'
                    underlayColor={'#00000000'}
                />
                <Text  style={styles.tabText}>
                    20min :
                </Text>
            <View style={styles.location}>
                <Text
                    style={styles.input}> 30A chemin valois; Harnes, France
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
