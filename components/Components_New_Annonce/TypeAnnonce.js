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
            selectedIndex: 0
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {
        const buttons = ['Don', 'Échange', 'Demande']
        const {selectedIndex} = this.state

        return (
            <View style={styles.container}>
                <Text style={{fontSize:15, color: Colors.grey1, marginBottom:5}}> Type: </Text>
                <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                selectedButtonStyle={{backgroundColor:Colors.tintColor}}
                buttons={buttons}
                containerStyle={{height: 40,  backgroundColor:"transparent", borderColor:'transparent', marginLeft:0, marginRight:0, marginBottom:0, marginTop:0}}
                buttonStyle={{borderRadius:10, backgroundColor:'white',  marginHorizontal:3}}
                innerBorderStyle={{width:0, color:"transparent"}}
            />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:15,
    },

});