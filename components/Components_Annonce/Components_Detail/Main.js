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
import Adresselocation from "./Adresselocation";

export default class Main extends React.Component {
    static navigationOptions = {
        title: 'Main',
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <ImageProduit imgUrl={this.props.data["image"]}  />
                    <AnnonceDetailBar />
                    <FormDetail title={this.props.data["title"]}/>
                    <Divider style={{ backgroundColor: '#95a5a6', marginTop:2 }} />
                    <Mapview/>
                    <Adresselocation/>

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