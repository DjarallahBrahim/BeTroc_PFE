import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import MainLogin from "../components/Components_Auth/Components_Login/MainLogin";
import LoginScreen from "../components/Components_Auth/Components_Login/LoginScreen";

export default class AuthentificationScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <LoginScreen navigation={this.props.navigation}/>
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