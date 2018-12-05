import React from 'react';
import {
    Button, Picker,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Imagefield from "./Imagefield";
import Categoriebutton from "./Categoriebutton";
import TypeAnnonce from "./TypeAnnonce";

export default class Main extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <TypeAnnonce/>
                <Categoriebutton navigation={this.props.navigation}/>
                <Imagefield/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        margin:15
    }
});