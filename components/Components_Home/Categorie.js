import React, {Component} from "react";
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
            <View style={styles.container}>
                <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 10}}>
                    One Category for you !
                </Text>

                <View style={{height: 130, marginTop: 13}}>
                    <FlatList
                        horizontal={true}
                        data={this.props.data}
                        renderItem={({item}) => <CardList data={item}/>}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}>

                    </FlatList>
                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            backgroundColor: 'white',
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 15,
            marginRight:10,
            marginLeft:10,
            marginTop:5,
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowRadius: 5,
            shadowOpacity: 0.5,
            elevation: 3
        }

});