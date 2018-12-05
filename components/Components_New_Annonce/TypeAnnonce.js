import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import {ButtonGroup, Icon} from 'react-native-elements'
import Colors from "../../constants/Colors";

export default class TypeAnnonce extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 2
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {
        const buttons = ['Don', 'Échange', 'Demande']
        const {selectedIndex} = this.state;

        return (
            <View style={styles.container}>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 40, borderRadius:20}}
                selectedButtonStyle={{backgroundColor:Colors.tintColor}}
            />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical:15
    },

});