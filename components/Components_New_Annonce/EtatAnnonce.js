import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Colors from "../../constants/Colors";
import ModalSelector from "react-native-modal-selector";
import { Icon } from 'react-native-elements'

export default class EtatAnnonce extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            textInputValue: ''
        }
    }

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
            // etc...
            // Can also add additional custom keys which are passed to the onChange callback
            { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
        ];

        return (
            <View style={{
                flex:1,
                backgroundColor: '#fff',
                padding:5,
                marginTop:15,
                borderRadius:10
            }}>

                <ModalSelector
                    data={data}
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} >

                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent: 'space-between',
                        backgroundColor: '#fff',
                    }}>
                    <TextInput
                        style={{fontSize:18,fontWeight: '500', color: Colors.grey1}}
                        editable={false}
                        placeholder="État du produit"
                        value={"sam"}
                        underlineColorAndroid={"transparent"}/>
                    <Icon

                        name='angle-right'
                        type='font-awesome'
                        color={Colors.tintColor}
                        size={30}
                    />
                    </View>
                </ModalSelector>


            </View>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingVertical:8,
        paddingHorizontal:6,
        marginTop:15,
        borderRadius:10,
        backgroundColor: 'white',
        fontSize:19,
        fontWeight: '500',
        color: Colors.grey2
    },
    inputAndroid: {
        paddingVertical:8,
        paddingHorizontal:6,
        marginTop:15,
        borderRadius:10,
        backgroundColor: 'white',
        //fontSize:19,
        //fontWeight: '500',
        color: Colors.grey2
    },
    icon:{
        borderLeftWidth: 0,
        borderLeftColor: 'transparent',
        borderTopWidth: 2,
        borderTopColor: Colors.tintColor,
        borderRightWidth: 2,
        borderRightColor: Colors.tintColor,
        width: 13,
        height: 13,
        transform: [{ translateY: 4 },{ rotate: '135deg' }],
    }
});