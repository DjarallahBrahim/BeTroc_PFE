import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class EmptySpace extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

