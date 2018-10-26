import React, {Component} from 'react';
import { View} from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';


const SIZE = 45;

class AddButton_ios extends Component {

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
                <Icon name="plus" size={26} color="#F8F8F8"/>
            </View>
        );
    }
}

export {AddButton_ios};