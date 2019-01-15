import React from 'react';
import {
    ScrollView,
    StyleSheet, Text, View, TouchableHighlight
} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Categoriebutton from "../components/Components_Annonce/Components_New_Annonce/Categoriebutton";
import TypeAnnonce from "../components/Components_Annonce/Components_New_Annonce/TypeAnnonce";
import EtatAnnonce from "../components/Components_Annonce/Components_New_Annonce/EtatAnnonce";
import Imagefield from "../components/Components_Annonce/Components_New_Annonce/Imagefield";
import TitleDescription from "../components/Components_Annonce/Components_New_Annonce/TitleDescription";
import Adresseproduct from "../components/Components_Annonce/Components_New_Annonce/Adresseproduct";
import Spinner from 'react-native-loading-spinner-overlay';
import {Icon} from "react-native-elements";
import Colors from "../constants/Colors";
import * as UploadAnnonceService from "../Services/UploadAnnonceService";
import {StackActions, NavigationActions} from 'react-navigation';
import Estimation from "../components/Components_Annonce/Components_New_Annonce/Estimation";
import * as cacheOperationService from "../Services/CacheOperationService";
import LoginSignupScreen from "./LoginSignupScreen";
import ProfileService from "../Services/ProfileService";

export default class AddAnnonceScreen extends React.Component {
    static navigationOptions = {
        title: 'Nouvelle annonce',
    };


    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            adLocation: '',
            category: 0,
            typeAd: "Don",
            etatProduit: "PERFECT",
            imgUrl: [],
            estimatedPrice: '',
            spinner: false,
            auth: null


        };
        this.handlerAdress = this.handlerAdress.bind(this);
        this.handlerCategory = this.handlerCategory.bind(this);
        this.handlerType = this.handlerType.bind(this);
        this.handlerEtat = this.handlerEtat.bind(this);
        this.handlerImage = this.handlerImage.bind(this);
        this.handlerDeletImage = this.handlerDeletImage.bind(this);
        this.handlerDescription = this.handlerDescription.bind(this);
        this.handlerTitel = this.handlerTitel.bind(this);
        this.handlerEstimation = this.handlerEstimation.bind(this);
        this.uploadAnnonce = this.uploadAnnonce.bind(this);
        this.handlerSpinner = this.handlerSpinner.bind(this);



    }

    handlerAdress(adLocation) {
        this.setState({adLocation: adLocation})
    }

    handlerCategory(category) {
        this.setState({category: category.id})
    }

    handlerType(typeAd) {
        this.setState({typeAd: typeAd});
    }

    handlerEtat(etatProduit) {
        this.setState({etatProduit: etatProduit});
    }

    handlerImage(uri) {
        this.setState({imgUrl: [...this.state.imgUrl, uri]});

    }

    handlerDeletImage(key) {
        this.state.imgUrl.splice(key, 1);

    }

    handlerDescription(description) {
        this.setState({description: description});
    }

    handlerTitel(title) {
        this.setState({title: title});
    }

    handlerEstimation(estimatedPrice) {
        this.setState({estimatedPrice: estimatedPrice});
    }

    handlerSpinner() {
        this.setState({
            spinner: !this.state.spinner
        });

    }

    uploadAnnonce() {
        if (UploadAnnonceService.formValidation(this.state)) {


            this.handlerSpinner();
            const data = {
                "title": this.state.title,
                "description": this.state.description,
                "category": this.state.category,
                "state": this.state.etatProduit,
                "address": this.state.adLocation
            };
            UploadAnnonceService.postImages(this.state.imgUrl, data)
                .then(
                    result => {
                        if (result) {
                            if (this.state.typeAd === 'Don') {
                                UploadAnnonceService.uploadDonAd(result)
                                    .then((status) => {
                                        status ? this.handlerUploadSeccus() : this.handlerUploadField();
                                    })
                                    .catch();
                            }
                            else if (this.state.typeAd === 'Échange') {
                                result.estimatedPrice = this.state.estimatedPrice;
                                UploadAnnonceService.uploadEchangeAd(result)
                                    .then((status) => {
                                        status ? this.handlerUploadSeccus() : this.handlerUploadField();
                                    })
                                    .catch();
                            }
                            else if (this.state.typeAd === 'Demande') {
                                UploadAnnonceService.uploadDemandeAd(result)
                                    .then((status) => {
                                        status ? this.handlerUploadSeccus() : this.handlerUploadField();
                                    })
                                    .catch();
                            }
                            else {
                                this.handlerSpinner();
                                alert('No type Ad to send it')
                            }
                        }
                        else {
                            this.handlerSpinner();
                            alert('Poblème avec notre serveur')
                        }
                    }
                )
                .catch()
        } else
            alert('veuillez remplir tous les champs');
    }

    handlerUploadField() {
        this.handlerSpinner();
        setTimeout(() => alert('Erreur avec l\'envoi d\'annonce'), 500)
    }

    handlerUploadSeccus() {
        this.handlerSpinner();

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Plus'})],
        });
        this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate('Home');

    }

    checkAuthentification() {
        cacheOperationService.getItemFromStorage("userId")
            .then((auth) => {
                    if (auth) {
                        this.setState({auth: true})
                    } else
                        this.setState({auth: false})
                }
            );
    }

    componentDidMount() {
        this.checkAuthentification();
    }


    render() {
        if (this.state.auth === null)
            return null;
        if (!this.state.auth)
            return (<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <LoginSignupScreen routename={'Plus'} navigation={this.props.navigation}/>
            </View>);
        else
            return (

                <ScrollView style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                        textStyle={{color: "white", fontSize: 17, lineHeight: 22}}
                    />
                    <KeyboardAwareScrollView
                        automaticallyAdjustContentInsets={false}
                        keyboardShouldPersistTaps='always'
                        scrollEventThrottle={10}
                        extraHeight={200}
                        resetScrollToCoords={{x: 0, y: 0}}
                        contentContainerStyle={styles.container}>
                        <Categoriebutton handlerCategory={this.handlerCategory} navigation={this.props.navigation}/>
                        <TypeAnnonce handlerType={this.handlerType}/>
                        {this.state.typeAd !== 'Demande' ?
                            <EtatAnnonce handlerEtat={this.handlerEtat}/>
                            : null
                        }

                        <Imagefield handlerDeletImage={this.handlerDeletImage} handlerImage={this.handlerImage}
                                    navigation={this.props.navigation}/>

                        <TitleDescription handlerTitel={this.handlerTitel}
                                          handlerDescription={this.handlerDescription}/>
                        {this.state.typeAd === 'Échange' ?
                            <Estimation handlerEstimation={this.handlerEstimation} handlerAdress={this.handlerAdress}
                            /> : null
                        }
                        {this.state.typeAd !== 'Demande' ?
                            <Adresseproduct address={this.state.adLocation} handlerAdress={this.handlerAdress}
                                            navigation={this.props.navigation}
                            /> : null
                        }

                        <TouchableHighlight style={styles.publishButton} onPress={() => this.uploadAnnonce()}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon size={26} name='globe'
                                      type='font-awesome' color='#eee'
                                      underlayColor={'#00000000'}
                                      iconStyle={{transform: [{rotate: '-45deg'}]}}
                                />
                                <Text style={styles.textPublier}> Publier </Text>
                            </View>
                        </TouchableHighlight>

                    </KeyboardAwareScrollView>
                </ScrollView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e8e8',
        margin: 5,
        flex: 1
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    publishButton: {
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
        opacity: 0.8,
        borderRadius: 10
    },
    textPublier: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginVertical: 15,
        marginHorizontal: 10
    },
});

