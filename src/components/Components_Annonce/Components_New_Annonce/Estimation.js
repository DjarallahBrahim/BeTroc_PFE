import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import Colors from "../../../constants/Colors";
import { Icon } from 'react-native-elements'

export default class TitleDescription extends React.Component {




    render() {
        const handlerEstimation = this.props.handlerEstimation;
        return (
            <View style={styles.container}>
                <Icon
                    name='euro'
                    type='font-awesome'
                    color={Colors.tintColor}
                    size={20}
                    iconStyle={{marginHorizontal:10, backgroundColor:'transparent'}}
                    onPress={() => this.props.navigation.navigate("MapLocation",
                        {locationHandler: this.props.handlerAdress, navigation:this.props.navigation})} />
                <TextInput
                    onChangeText={(text) => {handlerEstimation(text)}}
                    placeholder={"Estimation"}
                    placeholderTextColor={Colors.grey2}
                    returnKeyType="done"
                    onKeyPress={this.handleKeyDown}
                    underlineColorAndroid="transparent"
                    autoCapitalize = 'none'
                    keyboardType={'numeric'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:5,
        paddingVertical:10,
        backgroundColor: '#fff',
        borderRadius:10,
        marginTop:15,
    }
});