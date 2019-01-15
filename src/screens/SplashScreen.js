import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import fetchDataAd from "../Services/fetchDataAd";
import * as ApiData from "../ApiData/ApiData";

export default class SplashScreen extends React.Component {
    static navigationOptions = {
        title: 'Spalsh screen',
    };

    render() {
        return (
            <View style={styles.container}>

                <Text> this is SplashScreen Screen </Text>
            </View>
        );
    }

    componentDidMount(){
       // fetchDataAd.getAllData().then(()=>setTimeout(()=> this.props.navigation.navigate('Main'), 2000))
       //  ApiData.generateData().then((result)=> {
       //      this.props.navigation.navigate('Main', {data: result, tyga:2})
       //  });
        this.props.navigation.navigate('Main')

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});