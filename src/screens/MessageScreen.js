import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ListOfChat from "../components/Components_Chat/ListOfChat";
import fetchDataAd from "../Services/fetchDataAd";
import Spinner from "react-native-loading-spinner-overlay";
import LoginSignupScreen from "./LoginSignupScreen";

export default class MessageScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
    button: 'click',
  };

  constructor(){
    super();

    this.state={
      currentUser:0,
        spinner:true
    }
  }

    handlerSpinner() {
        this.setState({
            spinner: !this.state.spinner
        });

    }

  componentDidMount(){
      fetchDataAd.getUserAuth().then((idUser)=> {
          this.setState({currentUser:idUser},this.handlerSpinner)
      })
  }
  render() {
    return (
      <ScrollView style={styles.container}>
          <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={{color: "white", fontSize: 17, lineHeight: 22}}
          />
          {this.state.currentUser ?
              <ListOfChat currentUser={this.state.currentUser} navigation={this.props.navigation}/>
              :
              <View style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
              }}>
                  <LoginSignupScreen routename={'Profil'} navigation={this.props.navigation}/>
              </View>
          }
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
