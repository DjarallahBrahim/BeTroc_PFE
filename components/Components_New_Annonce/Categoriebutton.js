import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from "../../constants/Colors";

export default class Categoriebutton extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name='puzzle-piece'
                    type='font-awesome'
                    color={Colors.tintColor}
                    size={25}
                    onPress={() => this.props.navigation.navigate("Categorie")} />
                <Text onPress={() => this.props.navigation.navigate("Categorie")} style={{fontSize:18}}> categorie </Text>
                <Icon

                    name='angle-right'
                    type='font-awesome'
                    color={Colors.tintColor}
                    size={30}
                    onPress={() => this.props.navigation.navigate("Categorie")} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding:5,
        marginVertical:15,
        borderRadius:10
    }
});