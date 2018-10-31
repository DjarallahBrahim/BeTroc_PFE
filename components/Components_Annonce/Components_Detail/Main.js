import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ImageProduit from "./ImageProduit";
import AnnonceDetailBar from "./AnnonceDetailBar";

export default class Main extends React.Component {
    static navigationOptions = {
        title: 'Main',
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <ImageProduit/>
                    <AnnonceDetailBar/>
                </ScrollView>
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