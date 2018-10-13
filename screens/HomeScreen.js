import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
      headerTitleStyle: {
          textAlign:"center",
          flex:1
      },
      title: 'Home',
      headerStyle: {
          elevation: 1, //remove shadow on Android
          shadowOpacity: 0, //remove shadow on iOS
      },

  };

  render() {
    return (
      <View style={styles.container}>
        {/*<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>*/}
            {/*<Text> this is Home Screen </Text>*/}
        {/*</ScrollView>*/}
          <Text> this is Home Screen </Text>
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
