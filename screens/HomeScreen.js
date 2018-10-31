import React from 'react';
import {
    View,
    Text, StyleSheet, Button
} from "react-native";

import Searchbar from "../components/Components_Home/SearchBar";
import { Divider } from 'react-native-elements'
import TabsBarView from "../components/Components_Home/TabsBarView";


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
            <View style={styles.container}>
                <React.Fragment>
                    <Searchbar submitSearch={this.getInput}/>
                    <Divider style={{ backgroundColor: '#95a5a6', marginTop:2 }} />
                </React.Fragment>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('AnnonceDetail')
                    }}
                    title="Detail screen"
                />
                <TabsBarView/>
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