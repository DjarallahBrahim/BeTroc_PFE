import React, {Component} from 'react';
import { View} from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';


class AddButton_ios extends Component {

    render() {
        return (
            <View>
                <Icon name="plus-square-o" size={35} color="#ccc"/>
            </View>
        );
    }
}

export {AddButton_ios};