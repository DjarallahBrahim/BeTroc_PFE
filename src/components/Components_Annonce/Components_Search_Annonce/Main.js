import React from 'react';
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight, TouchableWithoutFeedback,
    View,
} from 'react-native';
import KeyWord from "./KeyWord";
import Categoriebutton from "../Commun/Categoriebutton";
import TypeAnnonce from "../Commun/TypeAnnonce";
import EtatAnnonce from "../Commun/EtatAnnonce";
import Colors from "../../../constants/Colors";
import {Divider} from "react-native-elements";

export default class Main extends React.Component {
    static navigationOptions = {
        title: 'Main',
    };

    constructor(){
        super();

        this.state={
            keyword:''
        }

        this.handlerKeyWord = this.handlerKeyWord.bind(this);
        this.handlerCategory = this.handlerCategory.bind(this);
        this.handlerType = this.handlerType.bind(this);
        this.handlerEtat = this.handlerType.bind(this);
    }

    handlerKeyWord(text){
        console.log(text);
        this.setState({keyword:text})
    }
    handlerCategory(category){
        console.log(category.id);
        this.setState({category:category.id})
    }
    handlerType(type){
        console.log(type);
        this.setState({typeAnnonce:type})
    }
    handlerEtat(etat){
        console.log(etat);
        this.setState({etat:etat})
    }

    render() {
        return (
            <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <KeyWord handlerKeyWord={this.handlerKeyWord}/>
                <Divider style={{ backgroundColor: '#c0c0c0', marginTop:10, height:2 }} />
                <Text style={{
                    textAlign:'center',
                    color: Colors.tintColor,
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    marginTop: 10,
                    marginHorizontal: 10}}> Filtrage avancé  </Text>
                <Categoriebutton handlerCategory={this.handlerCategory} navigation={this.props.navigation} marginHorizontal={20} marginTop={50} />
                <TypeAnnonce marginTop={30} marginBottom={20} handlerType={this.handlerType} marginHorizontal={20}/>
                <EtatAnnonce marginHorizontal={20} handlerEtat={this.handlerEtat}/>
                <Divider style={{ backgroundColor: '#c0c0c0', marginTop:50, height:2}} marginHorizontal={20}/>
                <TouchableHighlight style={{
                    backgroundColor: Colors.tintColor,
                    marginTop:80,
                    alignItems:'center',
                    marginHorizontal:20,
                    borderRadius: 10}} onPress={() => {}}>
                    <Text style={{color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: 'transparent',
                        marginVertical: 10,
                        marginHorizontal: 10}}> Lancer </Text>
                </TouchableHighlight>
            </View>
            </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',

    }
});