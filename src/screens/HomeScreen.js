import React from 'react';
import {
    View,
    Text, StyleSheet, Button
} from "react-native";
import Searchbar from "../components/Components_Home/SearchBar";
import TabsBarView from "../components/Components_Home/TabsBarView";
import Colors from "../constants/Colors";
import * as ApiData from "../ApiData/ApiData";
import Spinner from 'react-native-loading-spinner-overlay';
import fetchDataAd from "../Services/fetchDataAd";


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,

    };


  constructor(props) {
        super(props);
      this.state = {
            query: "",
            spinner: true,
            data: false,
            demandeData:{
                "Categories": {
                    "Animaux":[],
                    "Bricolage": [],
                    "Habits":[],
                    "Maison":[],
                    "Multimédia": [],
                    "Loisir":[],
                }
            },
            echangeData:{
                "Categories": {
                    "Animaux":[],
                    "Bricolage": [],
                    "Habits":[],
                    "Maison":[],
                    "Multimédia": [],
                    "Loisir":[],
                }
            },
            donData:{
                "Categories": {
                    "Animaux":[],
                    "Bricolage": [],
                    "Habits":[],
                    "Maison":[],
                    "Multimédia": [],
                    "Loisir":[],
                }
            },
            page:0,
            idUser:0,
          currentUser:0
        };
    }

    getInput = (query) => {
      console.log(query);
        this.setState(state => ({ ...state, query: query || "" }));
    };

    componentDidMount(){
        this.fetchDataAd();
        this.getCurrentUSer();
    }

    getCurrentUSer() {
        fetchDataAd.getUserAuth().then((idUser) => {
            if (idUser)
                this.setState({currentUser: idUser});
            else
                console.log(`[HomeScreen.js] no user founded`);
        });
    }

    fetchDataAd() {
        ApiData.generateData(undefined,undefined ,this.state.page).then((result) => {
            if (result) {
                let demandeData = result.type["Demande"];
                let echangeData = result.type["Echange"];
                let donData = result.type["Don"];
                this.setState({data: true, demandeData, echangeData, donData,},this.handlerSpinner);

            }else{
                this.handlerSpinner()
            }
        }).catch(()=> this.handlerSpinner())
    }

    handlerSpinner() {
        this.setState({
            spinner: !this.state.spinner
        });

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{backgroundColor: Colors.tintColor}}>
                    <Searchbar backButton={false}
                               currentUser={this.state.currentUser}
                               navigation={this.props.navigation}
                               submitSearch={this.getInput}/>
                </View>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{color: "white", fontSize: 17, lineHeight: 22}}
                />

                    <TabsBarView currentUser={this.state.currentUser}
                                 navigation={this.props.navigation}
                                 demandeData={this.state.demandeData}
                                 echangeData={this.state.echangeData}
                                 donData={this.state.donData}/>


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
