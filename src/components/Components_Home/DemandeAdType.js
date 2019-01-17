import React from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import Colors from "../../constants/Colors";

export default class DemandeAdType extends React.Component {


    constructor(props) {
        super(props);
        this.categorie = this.props.categorie;

    }

    jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const {navigation,typeAnnonce} = this.props;
        return (
                Object.keys(this.categorie).map((titel, index) =>
                    this.categorie[titel].length>0?
                        <View key={index} style={{flex:1, paddingHorizontal:10}}>
                            <Text style={{fontSize: 20, fontWeight: '500', marginTop:5, color:'#9a9c9e'}}>
                                {titel}
                            </Text>
                        <FlatList

                            data={this.categorie[titel]}
                            renderItem={({item,index}) =>
                                <View style={styles.container} key={index}>
                                <View style={{flex: 3}}>
                                    <Text style={{fontSize: 17, fontWeight: '500', color: '#1c1c1c'}}>{this.jsUcfirst(item.user.name)}</Text>
                                    <Text style={{fontSize: 18, fontWeight: '400', color: '#b0b0b0'}}>{item.title.toLowerCase()}</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: '300',
                                        color: '#c3c3c3'
                                    }}>{item.description}</Text>
                                </View>
                                <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', height: '90%'}}>
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

                                    {/*<TouchableOpacity*/}
                                        {/*style={{*/}
                                            {/*backgroundColor: Colors.tintColor,*/}
                                            {/*borderRadius: 7,*/}
                                            {/*paddingVertical: 3,*/}
                                            {/*paddingHorizontal: 10,*/}
                                            {/*marginBottom: 5*/}
                                        {/*}}*/}
                                        {/*onPress={() => {*/}
                                            {/*alert("category")*/}
                                        {/*}}>*/}
                                        {/*<Text style={{color: 'white', fontWeight: '500', fontSize: 13}}>contact</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                </View>
                            </View>}
                            keyExtractor={(item, index) => index.toString()}>
                        </FlatList>
                        </View>:null
                )
            )
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