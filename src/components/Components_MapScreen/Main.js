import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import MapViewScreen from "./mapView";
import MapAdService from "../../Services/MapAdService";

export default class Main extends React.Component {
    static navigationOptions = {
        title: 'Main',
    };


    render() {
        return (
            <View style={styles.container}>
                <MapViewScreen navigation={this.props.navigation}/>
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