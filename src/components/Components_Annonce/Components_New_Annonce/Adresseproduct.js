import React from 'react';
import {
    StyleSheet,
    TextInput, TouchableHighlight,
    View,
} from 'react-native';
import Colors from "../../../constants/Colors";
import { Icon } from 'react-native-elements'
export default class Adresseproduct extends React.Component {


    _onChangeInputAddress(title){
        this.props.handlerAdress(title);
    }

    render() {

        return (
            <View style={styles.container}>
                <Icon

                    name='map-marker'
                    type='font-awesome'
                    color={Colors.tintColor}
                    size={25}
                    iconStyle={{marginHorizontal:10, backgroundColor:'transparent'}}
                    onPress={() => this.props.navigation.navigate("MapLocation",
                        {locationHandler: this.props.handlerAdress, navigation:this.props.navigation})} />

                <TouchableHighlight  style={{flex:1}} onPress={()=>{this.props.navigation.navigate("MapLocation",
                    {locationHandler: this.props.handlerAdress, navigation:this.props.navigation})}} underlayColor="white">

                <TextInput
                    style={{flex:1}}
                    editable={false}
                    onChangeText={(text) => {this._onChangeInputAddress(text)}}
                    placeholder={"Address"}
                    placeholderTextColor={Colors.grey2}
                    returnKeyType="done"
                    onKeyPress={this.handleKeyDown}
                    underlineColorAndroid="transparent"
                    autoCapitalize = 'none'
                    value ={this.props.address===''?'':this.props.address}
                />
                </TouchableHighlight>
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
        marginVertical:15,
    }
});