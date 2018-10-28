import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import Main from "../components/Components_Auth/Components_Login/Main";
import {Actions} from "react-native-router-flux/index";

export default class ProfilScreen extends React.Component {
    static navigationOptions = {
        title: "Profil",
    };
    async logIn() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('255796728390540', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`).then();
            const { id, picture, name, birthday } = await response.json();

            setTimeout(() => {
                alert(
                    name + ' ' + id
                );
            }, 2000);


        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Auth')
                    }}
                    title="Auth-Screen"
                />
                <Button
                    onPress={this.logIn}
                    title="facebook"
                />
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

