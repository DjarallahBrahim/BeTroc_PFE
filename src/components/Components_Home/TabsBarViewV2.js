import React from 'react';
import {View, Animated, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Constants } from 'expo';
import {Icon} from 'react-native-elements'
import Colors from "../../constants/Colors";
import ExchageDonationAdType from "./ExchageDonationAdType";
import DemandeAdType from "./DemandeAdType";


export default class TabsBarViewV2 extends React.Component {

    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
            { key: 'third', title: 'third' },
        ],
        titles: ["Echange", "Demande", "Don"],
    };


    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? '#D6356C' : '#222')
                        ),
                    });
                    return (
                        <TouchableOpacity

                            style={[
                                styles.tabContainer,
                                i === this.state.index ? styles.tabContainerActive : []
                            ]}
                            onPress={() => this.setState({ index: i }) }
                            key={i}>

                            <Icon
                                size={26}
                                name= {i=== 0 ?'swap-vert': i=== 2 ? 'favorite-border' : 'playlist-add'}
                                color={ i === this.state.index ? '#FFFFFF' : Colors.tintColor}
                                underlayColor={'#00000000'}

                            />
                            <Text  style={[
                                styles.tabText,
                                i === this.state.index ? styles.tabTextSelected : []
                            ]}
                                   onPress={() => this.setState({ index: i }) }
                                   key={i}>
                                {this.state.titles[i]}</Text>

                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene= ({ route }) => {
    switch (route.key) {
        case 'first':
            return <ExchageDonationAdType askmoreData={this.props.askmoreData}
                                          navigation={this.props.navigation}
                                          typeAnnonce={'Echange'}
                                          data={this.props.echangeData}/>;
        case 'second':
            return <ExchageDonationAdType askmoreData={this.props.askmoreData}
                                          navigation={this.props.navigation}
                                          typeAnnonce={'Demande'}
                                          data={this.props.demandeData}/>;
        case 'third':
            return <ExchageDonationAdType askmoreData={this.props.askmoreData}
                                          navigation={this.props.navigation}
                                          typeAnnonce={'Don'}
                                          data={this.props.donData}/>;
        default:
            return null;
    }
};

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        borderRadius:10,
        backgroundColor:'red',
        marginHorizontal:5
    },
    tabContainerActive : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:Colors.tintColor,
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        backgroundColor:'#FFFFFF',
        margin:8,
        borderRadius:15,
        // shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 3
    },
    tabText: {
        color: Colors.tintColor,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
    },
    tabTextSelected: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
    },
});