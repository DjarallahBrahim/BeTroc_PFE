import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";
import CardList from "./CardList";

export default class Categorie extends Component {
    constructor(props) {
        super(props);
        this.setState.annonces = this.props.data;
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20, paddingBottom:10, marginBottom:15}}>
                <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                    One Category for you !
                </Text>

                <View style={{ height: 130, marginTop: 20 }}>
                    <FlatList
                        horizontal={true}
                        data= {this.props.data}
                        renderItem={({item}) => <CardList data = {item} />}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}>

                    </FlatList>
                </View>


            </View>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});