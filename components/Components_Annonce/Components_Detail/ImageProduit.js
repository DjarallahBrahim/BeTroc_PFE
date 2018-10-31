import React from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

export default class ImageProduit extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.imgUrl}}
                       style={{  width: '100%', height: 270, resizeMode: 'cover' }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },

});


