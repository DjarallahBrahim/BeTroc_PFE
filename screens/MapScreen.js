import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };

    render() {
        return (
            <View style={styles.container}>
                {/*<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>*/}
                    {/*<Text> this is Map Screen </Text>*/}
                {/*</ScrollView>*/}
                <Text> this is Map Screen </Text>
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

