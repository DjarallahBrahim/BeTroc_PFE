import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from "react-native";

import Searchbar from "../components/SearchBar";

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
        console.log(query);
        this.setState(state => ({ ...state, query: query || "" }));
    }
    render() {
        return (
            <View>
            <Searchbar submitSearch={this.getInput}/>
                <Text>{this.state.query}</Text>
            </View>
        );
    }
}
