import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Imagefield from "./Imagefield";

export default class Main extends React.Component {


    render() {
        return (
            <View style={styles.container}>
              <Imagefield/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});