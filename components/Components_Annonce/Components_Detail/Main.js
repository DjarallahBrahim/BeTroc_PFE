import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ImageProduit from "./ImageProduit";
import AnnonceDetailBar from "./AnnonceDetailBar";
import FormDetail from "./FormDetail";
import {Divider} from "react-native-elements";
import Mapview from "./Mapview";

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
                    <FormDetail/>
                    <Divider style={{ backgroundColor: '#95a5a6', marginTop:2 }} />
                    <Mapview/>
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