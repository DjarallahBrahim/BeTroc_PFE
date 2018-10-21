import React, { Component } from 'react';
import {
    StyleSheet,         // CSS-like styles
    Text,               // Renders text
    TouchableOpacity,   // Pressable container
    View,                // Container component
    Image
} from 'react-native';
import { Icon } from 'react-native-elements'

export default class Tabs extends Component {

    // Initialize State
    state = {
        // First tab is active by default
        activeTab: 0
    }

    // Pull children out of props passed from App component
    render({ children } = this.props) {
        return (
            <View style={styles.container}>
                {/* Tabs row */}
                <View style={styles.tabsContainer}>
                    {/* Pull props out of children, and pull title out of props */}
                        {children.map(({ props: { title } }, index) =>
                            <TouchableOpacity
                                style={[
                                    // Default style for every tab
                                    styles.tabContainer,
                                    // Merge default style with styles.tabContainerActive for active tab
                                    index === this.state.activeTab ? styles.tabContainerActive : []
                                ]}
                                // Change active tab
                                onPress={() => this.setState({ activeTab: index }) }
                                // Required key prop for components generated returned by map iterator
                                key={index}>

                                <Icon
                                    size={26}
                                    name= {index=== 0 ?'swap-vert': index=== 2 ? 'favorite-border' : 'playlist-add'}
                                    color={ index === this.state.activeTab ? '#FFFFFF' : '#ef345f'}
                                    underlayColor={'#00000000'}

                                />
                                <Text  style={[
                                            // Default style for every tab
                                            styles.tabText,
                                            // Merge default style with styles.tabContainerActive for active tab
                                            index === this.state.activeTab ? styles.tabTextSelected : []
                                        ]}
                                            // Change active tab
                                               onPress={() => this.setState({ activeTab: index }) }
                                            // Required key prop for components generated returned by map iterator
                                               key={index}>
                                    {title}</Text>

                            </TouchableOpacity>
                        )}
                </View>
                        {/* Content */}
                <View style={styles.contentContainer}>
                    {children[this.state.activeTab]}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Component container
    container: {
        flex: 1,                            // Take up all available space
    },
    // Tabs row container
    tabsContainer: {
        flexDirection: 'row',               // Arrange tabs in a row
    },
    // Individual tab container
    tabContainer: {
        flex: 1,                             // Take up equal amount of space for each tab
        flexDirection: 'row',                // Arrange tabs in a row
        alignItems: 'center',                // Center all the items tabs in a row
        justifyContent: 'center',            // Put all the item in one line
        paddingVertical: 3,                  // Vertical padding
        backgroundColor:'#FFFFFF',           // BackGround color for the tab button
        margin:8,                            // Margin for each button
        borderRadius:15                      // Radius for each button

    },
    // Active tab container ===> changin the colro
    tabContainerActive: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ef345d',
    },
    // Tab text default
    tabText: {
        color: '#ef345d',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
    },
    // Tab text Selected
    tabTextSelected: {
        color: '#FFFFFF',
        // fontFamily: 'Avenir',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
    },
    // Content container
    contentContainer: {
        flex: 1                             // Take up all available space
    }
});