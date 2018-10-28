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


    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Auth')
                    }}
                    title="Auth-Screen"
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

