import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, TouchableHighlight,

} from 'react-native';
import { Card } from "react-native-elements";

export default class CardList extends React.Component {


    renderCategorie() {
        const {data, navigation, typeAnnonce} = this.props;

        return (
            <Card title={null} containerStyle={styles.container}>
                <TouchableHighlight  onPress={() => navigation.navigate("AnnonceDetail",
                    {data: data,navigation:navigation,typeAnnonce:typeAnnonce})}
                                     >
                            <View style={{ alignItems:'center'}}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.imageStyle}
                                        resizeMode="cover"
                                        source={{ uri: 'http://vps628622.ovh.net:16233/api/downloadImage/'+data.images[0].name }}
                                    />
                                </View>
                                <Text style={{paddingVertical:8, fontWeight:'400'}}>{data.title}</Text>
                            </View>
                </TouchableHighlight>
            </Card>

        );
    }

    render() {
        return this.renderCategorie();
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        padding: 0,
        height:160,
        width:160,
        marginLeft: 5,
        borderRadius:10,
        borderColor: 'transparent',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowColor: 'black',
        elevation: 2.5,
    },
    containerStyle: {
        height: 200,
        width: 200
    },
    imageStyle: {
        height: 126,
        width: 159,


    },imageContainer: {
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow: 'hidden',
    },
    textStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});