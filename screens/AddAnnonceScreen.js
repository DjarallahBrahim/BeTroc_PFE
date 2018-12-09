import React from 'react';
import {
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    View,
} from 'react-native';
import Main from '../components/Components_New_Annonce/main'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Categoriebutton from "../components/Components_New_Annonce/Categoriebutton";
import TypeAnnonce from "../components/Components_New_Annonce/TypeAnnonce";
import EtatAnnonce from "../components/Components_New_Annonce/EtatAnnonce";
import Imagefield from "../components/Components_New_Annonce/Imagefield";
import TitleDescription from "../components/Components_New_Annonce/TitleDescription";
import Adresseproduct from "../components/Components_New_Annonce/Adresseproduct";
import Publierbutton from "../components/Components_New_Annonce/Publierbutton";
export default class AddAnnonceScreen extends React.Component {
  static navigationOptions = {
    title: 'New annonce',
  };

  render() {
    return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Categoriebutton/>
                    <TypeAnnonce/>
                    <EtatAnnonce/>
                    <Imagefield/>
                    <TitleDescription/>
                    <Adresseproduct/>
                    <Publierbutton/>

                </KeyboardAvoidingView>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e8e8',
        margin:5
    }
});

