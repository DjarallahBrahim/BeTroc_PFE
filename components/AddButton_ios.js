import React, {Component} from 'react';
import { View} from "react-native";
import { Icon } from 'react-native-elements'
const SIZE = 50;

class AddButton_ios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#ef345f'
        }
    }
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
                    <Icon name='add' size={40} color="#F8F8F8"/>
             </View>
        );
    }
}

export {AddButton_ios};