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
import SearchService from "../../../Services/SearchService";
import DonationExchangeResult from "../../Components_Home/SearchComponents/DonationExchangeResult";
import Searchbar from "../../Components_Home/SearchBar";

export default class Main extends React.Component {


    constructor(){
        super();

        this.state={
            keyword:'',
            etat:'PERFECT',
            category:'',
            typeAnnonce:'Don'
        };

        this.handlerKeyWord = this.handlerKeyWord.bind(this);
        this.handlerCategory = this.handlerCategory.bind(this);
        this.handlerType = this.handlerType.bind(this);
        this.handlerEtat = this.handlerEtat.bind(this);
        this.lancheSearch = this.lancheSearch.bind(this);
    }

    handlerKeyWord(text){
        console.log(text);
        this.setState({keyword:text})
    }

    handlerCategory(category) {
        this.setState({category: category.subCategory})
    }

    handlerType(type){
        console.log(type);
        this.setState({typeAnnonce:type})
    }
    handlerEtat(etat){
        console.log(etat);
        this.setState({etat:etat},()=> console.log(this.state.etat))
    }

    lancheSearch(){
        console.log(this.state.typeAnnonce,this.state.keyword,this.state.etat, this.state.category);

        if(this.state.typeAnnonce ==='Don') {
            SearchService.getDonationAds(this.state.keyword, this.state.etat, this.state.category).then((data) => {
                if (data) {
                    this.props.navigation.navigate('DonationExchangeResult',
                        {
                            'navigation': this.props.navigation,
                            'data': data
                        })
                }
            })
        }
        else if(this.state.typeAnnonce ==='Demande'){
            SearchService.getDonationRequestAds(this.state.keyword, this.state.category).then((data) => {
                if (data) {
                    this.props.navigation.navigate('DonationExchangeResult',
                        {
                            'navigation': this.props.navigation,
                            'data': data,
                            'typeAnnonce': this.state.typeAnnonce
                        })
                }
            })
        }else if(this.state.typeAnnonce ==='Échange'){
            SearchService.getExchangeAds(this.state.keyword, this.state.etat, this.state.category).then((data) => {
                if (data) {
                    this.props.navigation.navigate('DonationExchangeResult',
                        {
                            'navigation': this.props.navigation,
                            'data': data,
                            'currentUser': this.props.currentUser
                        })
                }
            })
        }else
            alert('Selectionner un type !')
    }


    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView>
            <View style={styles.container}>
                <View style={{backgroundColor: Colors.tintColor}}>
                    <Searchbar backButton={true}
                               currentUser={this.state.currentUser}
                               navigation={this.props.navigation}
                               getKeyword={this.handlerKeyWord}
                               search={this.lancheSearch}/>
                </View>

                <Text style={{
                    textAlign:'center',
                    color: Colors.tintColor,
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    marginTop: 10,
                    marginHorizontal: 10}}> Filtrage avancé  </Text>
                <Categoriebutton handlerCategory={this.handlerCategory} navigation={this.props.navigation} marginHorizontal={20} marginTop={30} />
                <TypeAnnonce marginTop={30} marginBottom={20} handlerType={this.handlerType} marginHorizontal={20}/>
                {
                    this.state.typeAnnonce !=='Demande' ?<EtatAnnonce marginHorizontal={20} handlerEtat={this.handlerEtat}/>
                        :
                        null
                }
                <Divider style={{ backgroundColor: '#c0c0c0', marginTop:50, height:2}} marginHorizontal={20}/>
                <TouchableHighlight
                    underlayColor="transparent"
                    style={{
                    flex:1,
                    backgroundColor: Colors.tintColor,
                    marginTop:30,
                    alignItems:'center',
                    marginHorizontal:20,
                    marginVertical:20,
                    borderRadius: 10}}
                                    onPress={() => this.lancheSearch()}>
                    <Text style={{color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: 'transparent',
                        marginVertical: 10,
                        fontSize:18,
                        marginHorizontal: 10}}> Lancer </Text>
                </TouchableHighlight>
            </View>
            </ScrollView>
            </TouchableWithoutFeedback>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        justifyContent:'center',

    }
});