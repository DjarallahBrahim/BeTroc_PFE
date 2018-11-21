import React from 'react';
import {
    StyleSheet, Text, TouchableHighlight,
    View,
} from 'react-native';

export default class Imagefield extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>images: </Text>
                <TouchableHighlight style={styles.viewStyle}><Text>dza</Text></TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection:"row",
        alignItems:'center',

    },
    textStyle:{
        fontSize:18,
        color:'#a5a5a5'
    },
    viewStyle:{
        height:40,
        width:40,
        backgroundColor:'#858585'
    }
});