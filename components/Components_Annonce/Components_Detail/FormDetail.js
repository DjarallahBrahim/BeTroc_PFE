import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Icon} from "react-native-elements";

export default class FormDetail extends React.Component {
    static navigationOptions = {
        title: 'FormDetail',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 10, color:'black', marginTop:10}}>
                    {this.props.title}
                </Text>
                <Text style={{fontSize: 15, fontWeight: '700', paddingHorizontal: 10, color:'#6f6f6f', marginTop:20,}}>
                    One Description for you ! One Description for you ! One Description for you ! One Description for you !
                    One Description for you ! One Description for you !
                </Text>
                <View
                    style={styles.tabContainer}>
                    <Icon
                        size={26}
                        name= 'location-on'
                        color='#F07818'
                        underlayColor={'#00000000'}

                    />
                    <Text  style={styles.tabText}>
                        20min
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabContainer: {
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        backgroundColor:'#FFFFFF',
        marginTop: 20,


    },
    tabText: {
        color: '#1b1b1b',
        textAlign: 'center',
        fontSize: 13,
        marginLeft:8
    },
});