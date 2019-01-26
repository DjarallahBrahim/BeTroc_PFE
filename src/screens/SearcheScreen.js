import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Main from "../components/Components_Annonce/Components_Search_Annonce/Main";

export default class SearcheScreen extends React.Component {
    static navigationOptions = {
        title: 'Recherche',
    };

    render() {
        const navigation = this.props.navigation.getParam("navigation", {});
        const currentUser = this.props.navigation.getParam("currentUser", 0);
        return (
            <View style={styles.container}>
               <Main currentUser={currentUser} navigation={navigation}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
    }
});