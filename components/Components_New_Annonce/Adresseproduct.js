import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TextInput,
    View,Image
} from 'react-native';
import Colors from "../../constants/Colors";
import { Icon } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default class Adresseproduct extends React.Component {


    GooglePlacesInput = () => {

    }

    render() {

        return (
                <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    styles={{
                        poweredContainer: {
                            borderWidth: 0,
                            borderRadius: 20,
                        },
                        textInputContainer: {
                            backgroundColor: 'white',
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            alignItems:'center',
                            justifyContent:'center',
                            marginVertical:15,
                            padding:0,
                            borderRadius: 20,
                        },
                        textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16,
                            borderWidth: 0,
                            borderRadius: 20,
                            marginTop:0,
                            padding:0
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        },
                        listView:{
                            marginBottom:15,
                            marginTop:-10
                        }
                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyD17M1AhK8jBaOiUMqXwvnWdUSPMw2O2vE',
                        language: 'en', // language of the results
                        types: '(cities)' // default: 'geocode'
                    }}
                    renderRightButton={()=> <Icon

                        name='angle-right'
                        type='font-awesome'
                        color={Colors.tintColor}
                        size={30}
                        iconStyle={{marginHorizontal:5}}
                        onPress={() => this.props.navigation.navigate("Categorie")} />
                    }
                    enablePoweredByContainer={false}
                />


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent: 'space-between',
        backgroundColor: 'red',
        marginTop:15,
        borderRadius:10,
        paddingHorizontal:5
    }
});