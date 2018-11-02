import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Hr from "react-native-hr-component";
import ImageProduit from "./ImageProduit";
import AnnonceDetailBar from "./AnnonceDetailBar";
import FormDetail from "./FormDetail";
import {Divider} from "react-native-elements";
import Mapview from "./Mapview";
import Adresselocation from "./Adresselocation";
import Contactbutton from "./Contactbutton";

export default class Main extends React.Component {
    static navigationOptions = {
        title: 'Main',
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <ImageProduit imgUrl={this.props.data["image"]}  />
                    <AnnonceDetailBar />
                    <FormDetail title={this.props.data["title"]}/>
                    <Hr lineColor="#D1D1D1" width={1.3} text="Location" textStyles={{
                        color:'#D1D1D1',
                        fontSize:18,
                        marginBottom:10,
                        marginTop:10
                    }}/>
                    <Mapview/>
                    <Adresselocation/>
                    <Contactbutton/>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    divider:{
        color:'#D1D1D1',
        fontSize:18,
        marginBottom:10,
        marginTop:10
    }
});