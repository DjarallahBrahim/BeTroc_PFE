import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Main from "../components/Components_Annonce/Components_Detail/Main";

export default class Annoncedetailscreen extends React.Component {
    static navigationOptions = {
        title: 'Annoncedetailscreen',
    };

    render() {
        const data = this.props.navigation.getParam("data", {});
        return (
            <View style={styles.container}>
               <Main data={data}/>
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