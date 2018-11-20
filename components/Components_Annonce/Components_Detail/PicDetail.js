import React from 'react';
import {View, Dimensions, Image} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
export default class PicDetail extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#000',
        },

    };

    render() {
              const navigation = this.props.navigation.getParam("navigation", {});
        const picDetail = this.props.navigation.getParam("picDetail", {});
        return (
            <View style={{flex: 1, backgroundColor: '#000', alignItems:'center', justifyContent: 'center',}}>
                <ImageZoom cropWidth={Dimensions.get('window').width}
                           cropHeight={Dimensions.get('window').height}
                           imageWidth={300}
                           imageHeight={300}
                           enableSwipeDown={true}
                           onSwipeDown={() => {navigation.pop()}}>
                    <Image style={{width:300, height:300,}}
                           source={{uri: picDetail}}/>
                </ImageZoom>
            </View>
        );
    }
}
