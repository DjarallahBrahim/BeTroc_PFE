import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, TouchableHighlight,

} from 'react-native';


export default class CardList extends React.Component {


    renderCategorie() {
        const {data, navigation, typeAnnonce} = this.props;

        return (
            <View style={styles.container} >
                    <TouchableHighlight  onPress={() => navigation.navigate("AnnonceDetail",
                                                        {data: data,navigation:navigation,typeAnnonce:typeAnnonce})}
                                                        style={{flex: 2}}>
                        <Image source={{uri: data.imgUrl}}
                               style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}/>
                    </TouchableHighlight>
                <View style={{
                    flex: 1, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text>{data.title}</Text>
                </View>
            </View>

        );
    }

    render() {
        return this.renderCategorie();
    }
}

const styles = StyleSheet.create({
    container: {
        height: 130,
        width: 130,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 1,
    },
    containerStyle: {
        height: 200,
        width: 200
    },
    imageStyle: {
        height: 150,
        width: 150
    },
    textStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});