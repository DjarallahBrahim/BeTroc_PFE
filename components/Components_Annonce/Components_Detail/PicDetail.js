import React from 'react';
import {View} from 'react-native';
import ImageView from 'react-native-image-view';

export default class PicDetail extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const navigation = this.props.navigation.getParam("navigation", {});
        const picDetail = this.props.navigation.getParam("picDetail", {});
        return (
            <View style={{flex: 1, backgroundColor: '#000'}}>
                <ImageView
                    images={[{
                        source: {
                            uri: picDetail,
                        },
                        title: 'Paris',
                        width: 806,
                        height: 720,
                        backgroundColor: '#000'

                    },]}
                    imageIndex={0}
                    isVisible={true}
                    backgroundColor={'#000'}
                    onClose={() => {
                        navigation.pop()
                    }}
                    animationType={'fade'}
                />
            </View>
        );
    }
}
