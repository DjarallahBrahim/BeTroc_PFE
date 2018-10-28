import React, {Component} from 'react';
import { View} from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';


const SIZE = 46;

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
                    backgroundColor: !this.props.focused ? '#f2bd1a' : '#F07818',
                }}>
                <Icon name="plus" size={30} color="#F8F8F8"/>
            </View>
        );
    }
}

export {AddButton_ios};