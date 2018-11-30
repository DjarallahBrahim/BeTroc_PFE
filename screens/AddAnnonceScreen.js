import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Main from '../components/Components_New_Annonce/main'
export default class AddAnnonceScreen extends React.Component {
  static navigationOptions = {
    title: 'New annonce',
  };

  render() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Main/>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
    }
});

