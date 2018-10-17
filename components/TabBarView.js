import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

export default class TabBarView extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar =props =>
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'pink' }}
    />;


    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

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
    scene: {
        flex: 1,
    },
    tab: {
        borderBottomColor: "#000"
    } ,
});
