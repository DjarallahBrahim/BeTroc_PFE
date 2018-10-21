import React, {Component} from 'react';
import { View} from "react-native";
import { Icon } from 'react-native-elements'


const SIZE = 45;

class AddButton_android extends Component {

    render() {
        return (
            <View
                underlayColor="#ef345f"
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: SIZE,
                    height: SIZE,
                    borderRadius: SIZE / 2,
                    backgroundColor: !this.props.focused ? '#ecc30b' : '#ef345f',
                }}>
                <Icon name="plus" size={30} color="#F8F8F8"/>
            </View>
        );
    }
}

export {AddButton_android};