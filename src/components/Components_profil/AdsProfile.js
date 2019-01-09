import React from 'react';
import {
    Dimensions, FlatList,
    StyleSheet,
    Text, TouchableHighlight,
    View,Animated
} from 'react-native';

import * as cacheOperationService from "../../Services/CacheOperationService";
import AdPanel from "./AdPanel";

export default class AdsProfile extends React.Component {



    render() {

         return (
             <View style={styles.container}>
                <AdPanel size={this.props.adData.exchangeAds.size}
                         data={this.props.adData.exchangeAds.data}
                         navigation={this.props.navigation}
                        type={'Echange'}/>
                 <AdPanel size={this.props.adData.donationAds.size}
                          type={'Don'}
                          data={this.props.adData.donationAds.data}
                          navigation={this.props.navigation}/>
                 <AdPanel size={this.props.adData.donationRequestAds.size}
                          type={'Demande'}
                          data={this.props.adData.donationRequestAds.data}
                          navigation={this.props.navigation}/>
             </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        marginHorizontal:5,
        marginVertical:15,
    },container2: {
        backgroundColor: 'white',
        overflow:'hidden'
    },titleContainer : {
        flexDirection: 'row'
    },
});