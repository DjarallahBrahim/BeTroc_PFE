import React from 'react';
import {
    Button, Picker,
    ScrollView,
    StyleSheet,
    Text,View,
    KeyboardAvoidingView,
} from 'react-native';
import Imagefield from "./Imagefield";
import Categoriebutton from "./Categoriebutton";
import TypeAnnonce from "./TypeAnnonce";
import EtatAnnonce from "./EtatAnnonce";
import TitleDescription from "./TitleDescription";
import Adresseproduct from "./Adresseproduct";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Publierbutton from "./Publierbutton";
export default class Main extends React.Component {


    render() {
        return (
            <ScrollView ref={(ref) => this.flatListRef = ref}
                        contentContainerStyle={{ flex: 1 }}
                        onContentSizeChange={(width, height) => this.flatListRef.scrollToEnd({ animated: false })}
            >
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={true}
                >
                    <Categoriebutton/>
                    <TypeAnnonce/>
                    <EtatAnnonce/>
                    <Imagefield/>
                    <TitleDescription/>
                    <Adresseproduct/>
                    <Publierbutton/>
                </KeyboardAwareScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:10
    }
});