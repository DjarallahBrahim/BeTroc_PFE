import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

export default class ProfilScreen extends React.Component {
    static navigationOptions = {
        title: "Profil",
    };


    render() {
        return (
            <View style={styles.container}>

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

