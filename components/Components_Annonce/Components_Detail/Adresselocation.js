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
            <View style={styles.location}>
                <Text
                    style={styles.input}> 30A chemin valois; Harnes, France
                </Text>
                <Icon
                    size={26}
                    name= 'location-on'
                    color='#F07818'
                    underlayColor={'#00000000'}
                />
                <Text  style={styles.tabText}>
                    20min
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabText: {
        color: '#1b1b1b',
        textAlign: 'center',
        fontSize: 13,
        left:-15
    },
    input: {
        color: 'black',
    },
    location:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor:'#f0f0f0',
        padding:10,
        margin:10

    }
});