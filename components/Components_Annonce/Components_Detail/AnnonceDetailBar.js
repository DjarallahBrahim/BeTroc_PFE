import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Icon} from "react-native-elements";
import Colors from "../../../constants/Colors";

export default class AnnonceDetailBar extends React.Component {

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.tabsContainer}>
                        <View
                            style={[
                                styles.tabContainer,
                            ]}
                            >
                            <Icon
                                size={26}
                                name= 'subdirectory-arrow-right'
                                color={Colors.tintColor}
                                underlayColor={'#00000000'}

                            />
                            <Text  style={styles.tabText}>
                                {this.props.etat}
                            </Text>

                        </View>
                        <View
                            style={[
                                styles.tabContainer,
                            ]}
                        >
                            <Icon
                                size={30}
                                name= 'playlist-add'
                                color={Colors.tintColor}
                                underlayColor={'#00000000'}

                            />
                            <Text  style={styles.tabText}>
                                {this.props.type}
                            </Text>

                        </View>
                        <View
                            style={[
                                styles.tabContainer,
                            ]}
                            >

                            <Icon
                                size={26}
                                name= 'access-time'
                                color={Colors.tintColor}
                                underlayColor={'#00000000'}

                            />
                            <Text  style={styles.tabText}>
                                20min
                            </Text>
                        </View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        borderBottomWidth:0.5,
        borderBottomColor:'#c6c6c6'
    },
    tabsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',


    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 3,
        margin:8,

    },
    tabText: {
        color: '#1b1b1b',
        textAlign: 'center',
        fontSize: 13,
        marginLeft:8
    },
});