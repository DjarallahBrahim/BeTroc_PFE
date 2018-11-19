import React from 'react';
import {View} from 'react-native';
import ImageView from 'react-native-image-view';
import ZoomImage from 'react-native-zoom-image';
import {Easing} from 'react-native'; // import Easing if you want to customize easing function


export default class PicDetail extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        let styles = {
            img: {} // custom styles of original image component
        };
        const navigation = this.props.navigation.getParam("navigation", {});
        const picDetail = this.props.navigation.getParam("picDetail", {});
        return (
            <View style={{flex: 1, backgroundColor: '#000'}}>
                {/*<ImageView*/}
                    {/*images={[{*/}
                        {/*source: {*/}
                            {/*uri: picDetail,*/}
                        {/*},*/}
                        {/*title: 'Paris',*/}
                        {/*width: 806,*/}
                        {/*height: 720,*/}
                        {/*backgroundColor: '#000'*/}

                    {/*},]}*/}
                    {/*imageIndex={0}*/}
                    {/*isVisible={true}*/}
                    {/*backgroundColor={'#000'}*/}
                    {/*onClose={() => {*/}
                        {/*navigation.pop()*/}
                    {/*}}*/}
                    {/*animationType={'fade'}*/}
                {/*/>*/}

                <ZoomImage
                    source={{uri: picDetail}}
                    imgStyle={{width: 250, height: 230}}
                    style={styles.img}
                    duration={200}
                    enableScaling={false}
                    easingFunc={Easing.ease}
                />
            </View>
        );
    }
}
