import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';

export default class RowDemandeAd extends React.Component {

    constructor(){
        super();

        this.state={
            //data:this.props.data || null
        }
    }
    jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        const data = this.props.data;
        return (
            <View style={styles.container}>
                <View style={{flex: 3}}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '500',
                        color: '#1c1c1c'
                    }}>{this.jsUcfirst(data.user.name)}</Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: '#b0b0b0'
                    }}>{data.title.toLowerCase()}</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '300',
                        color: '#c3c3c3'
                    }}>{data.description}</Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '90%'
                }}>
                    <View/>
                    <TouchableOpacity
                        style={{
                            borderRadius: 30,
                            backgroundColor: '#ebebeb',
                            width: 60,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            alert("category")
                        }}>
                        <Image
                            source={{uri: 'http://vps628622.ovh.net:16233/api/downloadImage/man.png_eafefe17-19dc-11e9-887c-f1d2369b0d9e.png'}}
                            style={{width: 45, height: 45}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:15,
        marginHorizontal:8,
        marginVertical:10,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowColor: 'black',
        elevation: 2.5,

    }
});