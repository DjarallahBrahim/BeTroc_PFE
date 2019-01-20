import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, TouchableHighlight,

} from 'react-native';
import { Card } from "react-native-elements";
import ShowMoreScreen from "./ShowMoreScreen";

export default class ShowMoreButton extends React.Component {



    renderCategorie() {
        const {dataImg,dataTitle, navigation, typeAnnonce, category} = this.props;

        return (
            <Card title={null} containerStyle={styles.container}>
                <TouchableHighlight  onPress={() => navigation.navigate("ShowMoreScreen",
                    {category:category,typeAnnonce:typeAnnonce,navigation:navigation})}
                                     >
                            <View style={{ alignItems:'center'}}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.imageStyle}
                                        resizeMode="cover"
                                        source={{ uri: 'http://vps628622.ovh.net:16233/api/downloadImage/'+dataImg }}
                                    />
                                </View>
                                <Text style={{paddingVertical:8, fontWeight:'400'}}>{dataTitle}</Text>
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
        height: 80,
        width: 80,


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