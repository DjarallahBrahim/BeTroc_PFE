import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from "../../constants/Colors";
import Categories from "./Categories";

export default class Categoriebutton extends React.Component {


    render() {
        const {navigation} = this.props;

        return (
            <TouchableHighlight style={styles.container}
                                onPress={() => {
                                    this.props.navigation.navigate('Categorie')
                                }} >
                <View style={styles.viewStyle}>
                <Icon
                    name='puzzle-piece'
                    type='font-awesome'
                    color={Colors.tintColor}
                    size={25}
                    onPress={() => {
                        this.props.navigation.navigate('Categorie')
                    }} />
                <Text  style={{fontSize:19,fontWeight: '500', color: Colors.grey2}}> Catégorie </Text>
                <Icon

                    name='angle-right'
                    type='font-awesome'
                    color={'transparent'}
                    size={30}
                    onPress={() => this.props.navigation.navigate('Categorie')} />

                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding:5,
        borderRadius:10
    },
    viewStyle: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    }
});