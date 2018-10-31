import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ImageProduit from "../components/Components_Annonce/Components_Detail/ImageProduit";

export default class Annoncedetailscreen extends React.Component {
    static navigationOptions = {
        title: 'Annoncedetailscreen',
    };

    render() {
        return (
            <View style={styles.container}>
               <ImageProduit/>
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