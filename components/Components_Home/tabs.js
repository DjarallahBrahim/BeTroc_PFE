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

    state = {
        activeTab: 0
    }

    render({ children } = this.props) {
        return (
            <View style={styles.container}>
                <View style={styles.tabsContainer}>
                        {children.map(({ props: { title } }, index) =>
                            <TouchableOpacity
                                style={[
                                    styles.tabContainer,
                                    index === this.state.activeTab ? styles.tabContainerActive : []
                                ]}
                                onPress={() => this.setState({ activeTab: index }) }
                                key={index}>

                                <Icon
                                    size={26}
                                    name= {index=== 0 ?'swap-vert': index=== 2 ? 'favorite-border' : 'playlist-add'}
                                    color={ index === this.state.activeTab ? '#FFFFFF' : '#F07818'}
                                    underlayColor={'#00000000'}

                                />
                                <Text  style={[
                                            styles.tabText,
                                            index === this.state.activeTab ? styles.tabTextSelected : []
                                        ]}
                                               onPress={() => this.setState({ activeTab: index }) }
                                               key={index}>
                                    {title}</Text>

                            </TouchableOpacity>
                        )}
                </View>
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
        elevation: 3
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
        borderRadius:15,                      // Radius for each button
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 3
    },
    // Active tab container ===> changin the colro
    tabContainerActive: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#F07818',
    },
    // Tab text default
    tabText: {
        color: '#F07818',
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