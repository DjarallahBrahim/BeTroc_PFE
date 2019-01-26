import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from 'react-native';
import Main from "../components/Components_MapScreen/Main";
import Colors from "../constants/Colors";
import {NavigationActions, StackActions} from "react-navigation";
import {Icon} from "react-native-elements";

export default class MapScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Map',
            headerRight: (
                <TouchableHighlight
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Map'})],
                        });
                        navigation.dispatch(resetAction);
                    }}>

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

    render() {
        return (
            <View style={styles.container}>
               <Main navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

