import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";
import CardList from "./CardList";
import {Divider} from "react-native-elements";
import Colors from "../../constants/Colors";
import { Dimensions } from 'react-native';

export default class Categorie extends Component {
    constructor(props) {
        super(props);
        this.categorie = this.props.categorie;

    }

    render() {
        const {navigation,typeAnnonce} = this.props;
        return (
            <View style={styles.container}>
                {
                    Object.keys(this.categorie).map((titel, index) =>
                        <View key={index} style={{flex:1}}>
                            <Text key={index} style={{fontSize: 24, fontWeight: '700', marginTop:10}}>
                                {titel}
                            </Text>
                            <View style={{height: 130 , marginTop: 8}}>
                                <FlatList
                                    horizontal={true}
                                    data={this.categorie[titel]}
                                    renderItem={({item,index}) => <CardList typeAnnonce={typeAnnonce} navigation={navigation} data={item}/>}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}>
                                </FlatList>
                            </View>
                        </View>

                    )
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: 'white',
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 15,
            marginRight:10,
            marginLeft:10,
            marginTop:5,
            // shadowColor: '#000000',
            // shadowOffset: {
            //     width: 0,
            //     height: 2
            // },
            // shadowRadius: 5,
            // shadowOpacity: 0.1,
            // elevation: 3
        }


});