import React from 'react';
import {
    View,
    Text, StyleSheet, Button
} from "react-native";

import Searchbar from "../components/Components_Home/SearchBar";
import { Divider } from 'react-native-elements'
import TabsBarView from "../components/Components_Home/TabsBarView";
import * as apiData from "../ApiData/AnnonceData"
import Colors from "../constants/Colors";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


  constructor(props) {
        super(props);
        this.state = {
            query: "",
        };
    }


    getInput = (query) => {
        this.setState(state => ({ ...state, query: query || "" }));
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={{backgroundColor: Colors.tintColor}}>
                    <Searchbar submitSearch={this.getInput}/>
                </View>
                <TabsBarView data={apiData.annonceData} navigation={this.props.navigation} />
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
