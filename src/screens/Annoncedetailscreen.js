import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import MainTMP from "../components/Components_Annonce/Components_Detail/MainTMP";

export default class Annoncedetailscreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const data = this.props.navigation.getParam("data", {});
        const navigation = this.props.navigation.getParam("navigation", {});
        const typeAnnonce = this.props.navigation.getParam("typeAnnonce", {});
        return (
            <View style={styles.container}>
                <MainTMP typeAnnonce={typeAnnonce} navigation={navigation} data={data}/>
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