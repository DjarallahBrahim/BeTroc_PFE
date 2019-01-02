import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class MessageScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
    button: 'click',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
       <Text> Message SCREEN</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
