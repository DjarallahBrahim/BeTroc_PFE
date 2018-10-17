import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Tabs from './tabs';

export default class TabsBarView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Tabs>
                    {/* First tab */}
                    <View title="Èchange" style={styles.content}>
                        <Text style={styles.header}>
                            Welcome to React Native
                        </Text>
                        <Text style={styles.text}>
                            The best technology to build cross platform mobile apps with
                        </Text>
                    </View>
                    {/* Second tab */}
                    <View title="Demande" style={styles.content}>
                        <Text style={styles.header}>
                            Truly Native
                        </Text>
                        <Text style={styles.text}>
                            Components you define will end up rendering as native platform widgets
                        </Text>
                    </View>
                    {/* Third tab */}
                    <View title="Don" style={styles.content}>
                        <Text style={styles.header}>
                            Ease of Learning
                        </Text>
                        <Text style={styles.text}>
                            It’s much easier to read and write comparing to native platform’s code
                        </Text>
                    </View>

                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // App container
    container: {
        flex: 1,                            // Take up all screen
        backgroundColor: '#e8e8e8',         // Background color
    },
    // Tab content container
    content: {
        flex: 1,                            // Take up all available space
        justifyContent: 'center',           // Center vertically
        alignItems: 'center',               // Center horizontally
        backgroundColor: '#e8e8e8',         // Darker background for content area
    },
    // Content header
    header: {
        margin: 10,                         // Add margin
        color: '#ef345d',                   // White color
        // fontFamily: 'Avenir',            // Change font family
        fontSize: 26,                       // Bigger font size
    },
    // Content text
    text: {
        marginHorizontal: 20,               // Add horizontal margin
        color: '#e74c3c',                   // Text color
        textAlign: 'center',                // Center
        // fontFamily: 'Avenir',
        fontSize: 18,
    },
});