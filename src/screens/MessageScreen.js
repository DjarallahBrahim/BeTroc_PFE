import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import ListOfChat from "../components/Components_Chat/ListOfChat";
import fetchDataAd from "../Services/fetchDataAd";
import Spinner from "react-native-loading-spinner-overlay";
import LoginSignupScreen from "./LoginSignupScreen";
import Colors from "../constants/Colors";
import {NavigationActions, StackActions} from "react-navigation";
import {Icon} from "react-native-elements";

export default class MessageScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Messages',
            headerRight: (
                <TouchableHighlight
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Message'})],
                        });
                        navigation.dispatch(resetAction);
                    }}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 13, marginHorizontal: 5, color: Colors.tintColor}}>Actualiser</Text>
                        <Icon size={18}
                              iconStyle={{marginRight: 8}}
                              name='refresh'
                              type='font-awesome'
                              color={Colors.tintColor}
                              underlayColor={'#00000000'}
                        />
                    </View>
                </TouchableHighlight>
            ),
        }
    };

    constructor() {
        super();

        this.state = {
            currentUser: 0,
            spinner: true
        }
    }

    handlerSpinner() {
        this.setState({
            spinner: !this.state.spinner
        });

    }

    componentDidMount() {
        fetchDataAd.getUserAuth().then((idUser) => {
            this.setState({currentUser: idUser}, this.handlerSpinner)
        })
    }

    render() {
        return (

            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                {/*<ScrollView style={styles.container}>*/}
                {/*<Spinner*/}
                {/*visible={this.state.spinner}*/}
                {/*textContent={'Loading...'}*/}
                {/*textStyle={{color: "white", fontSize: 17, lineHeight: 22}}*/}
                {/*/>*/}
                {/*{this.state.currentUser ?*/}
                {/*<ListOfChat currentUser={this.state.currentUser} navigation={this.props.navigation}/>*/}
                {/*:*/}
                {/*<View style={{*/}
                {/*flex: 1,*/}
                {/*alignItems: 'center',*/}
                {/*justifyContent: 'center',*/}
                {/*}}>*/}
                {/*<LoginSignupScreen routename={'Profil'} navigation={this.props.navigation}/>*/}
                {/*</View>*/}
                {/*}*/}
                {/*</ScrollView>*/}
                <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}> Ce service sera bientôt disponible !</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
