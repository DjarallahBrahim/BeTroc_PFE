import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button, TouchableHighlight
} from 'react-native';

export default class ProfilScreen extends React.Component {
    static navigationOptions = {
        title: "Profil",
    };


    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Auth',this.props.navigationOptions)
                    }}
                    title="Login-Screen"
                    style={{"marginTop": 10}}
                />
                <TouchableHighlight style={{"marginTop": 10}}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Singup', this.props.navigationOptions)
                    }}
                    title="Singup-Screen"

                />
                </TouchableHighlight>
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

