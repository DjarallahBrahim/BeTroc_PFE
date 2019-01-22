import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from "../../../constants/Colors";
import RadioGroup from 'react-native-radio-buttons-group';

export default class EtatAnnonce extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    label: 'Comme neuf',
                    value: "PERFECT",
                    color:Colors.tintColor
                },
                {
                    label: 'Moyen',
                    value: "MEDIUM",
                    color:Colors.tintColor
                },
                {
                    label: 'À bricoler',
                    value: "BAD",
                    color:Colors.tintColor

                }
            ],
        };
    }
    onPress = (data, handlerEtat)=> {
        //this.setState({ data });
        let selectedButton = data.find(e => e.selected === true);
        selectedButton = selectedButton ? selectedButton.value : data[0].value;
        handlerEtat(selectedButton);
    };

    render() {


        return (
            <View  style={{
                marginTop:15,
                marginHorizontal:this.props.marginHorizontal
            }} >
                <Text style={{fontSize:15, color: Colors.grey1, marginBottom:5}}> État du produit: </Text>
            <View style={{
                backgroundColor: '#fff',
                padding:5,
                marginTop:5,
                borderRadius:10
            }}>

                <RadioGroup
                    radioButtons={this.state.data}
                    onPress={data => this.onPress(data, this.props.handlerEtat)}
                    flexDirection='row'
                />


            </View>
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