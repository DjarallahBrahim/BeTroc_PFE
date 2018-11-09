import React, {Component} from 'react';
import { View} from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';
import Colors from "../../constants/Colors";


class Plusbutton extends Component {

    render() {
        return (
            <View>
                <Icon name="plus-square-o" size={45} color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}/>
            </View>
        );
    }
}

export {Plusbutton};