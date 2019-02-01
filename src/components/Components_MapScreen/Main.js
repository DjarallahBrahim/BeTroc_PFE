import React from 'react';
import {
    View,
} from 'react-native';
import MapViewScreen from "./mapView";

const SLIDER_1_FIRST_ITEM = 1;

export default class Main extends React.Component {
    static navigationOptions = {
        title: 'Main',
    };

    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            slider1Ref: null,
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
            }}>
                     <MapViewScreen navigation={this.props.navigation}/>
            </View>
        );
    }
}

