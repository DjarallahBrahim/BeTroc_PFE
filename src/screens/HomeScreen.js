import React from 'react';
import {
    View,
    Text, StyleSheet, Button
} from "react-native";

import Searchbar from "../components/Components_Home/SearchBar";
import { Divider } from 'react-native-elements'
import TabsBarView from "../components/Components_Home/TabsBarView";
import Colors from "../constants/Colors";
import * as ApiData from "../ApiData/ApiData";
import Spinner from 'react-native-loading-spinner-overlay';
import ProfileService from "../Services/ProfileService";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


  constructor(props) {
        super(props);
        this.state = {
            query: "",
            spinner:true,
            refreshing:false
        };

        this.onRefresh=this.onRefresh.bind(this);
    }


    handlerSpinner() {
        this.setState({
            spinner: !this.state.spinner
        });

    }

    onRefresh () {
        this.setState({refreshing: false});

        ApiData.generateData().then((result)=> {

            setTimeout(()=> this.setState({data:result}), 500);
        });
    };

    componentDidMount(){
        ApiData.generateData().then((result)=> {

            setTimeout(()=> this.setState({data:result, spinner: !this.state.spinner}), 500);
        });
    }


    getInput = (query) => {
        this.setState(state => ({ ...state, query: query || "" }));
    };


    render() {
        return (
            <View style={styles.container}>

                <View style={{backgroundColor: Colors.tintColor}}>
                    <Searchbar submitSearch={this.getInput}/>
                </View>


                {
                !this.state.spinner ?
                    <TabsBarView  data={this.state.data} navigation={this.props.navigation} refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>
                    :
                    null
                }

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
