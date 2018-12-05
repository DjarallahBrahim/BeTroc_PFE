import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image, ScrollView
} from 'react-native';
import {Avatar} from "react-native-elements";

export default class Categories extends React.Component {


    constructor(props){
        super(props);
        this.state={
            cat1:{
                title: "Voiture",
                categorie: {
                    subCatg:["Équipement auto","Équipement moto"],
                    imgUrl :[require("../../assets/images/categories/véhicules_Équipement_auto.png"),
                        require("../../assets/images/categories/véhicules_Équipement_moto.png")]
                },

            },
            cat2:{
                title: "Maison",
                categorie: {
                    "subCatg":["Meuble", "Électroménager", "Décor", "Vaisselle", "Équipement chambre" ],
                    "imgUrl":[  require("../../assets/images/categories/maison_meuble.png"),
                        require("../../assets/images/categories/maison_Électroménager.png"),
                        require("../../assets/images/categories/maison_décore.png"),
                        require("../../assets/images/categories/maison_Vaisselle.png"),
                        require("../../assets/images/categories/maison_Équipement_chambre.png")]
                },

            },
            cat3:{
                title: "Loisir",
                categorie: {
                    "subCatg":["DVD-CD", "Livres", "Vélos", "Sport et Hobbies", "Jouets" ],
                    "imgUrl":[  require("../../assets/images/categories/loisir_dvd.png"),
                        require("../../assets/images/categories/loisir_livres.png"),
                        require("../../assets/images/categories/loisir_vélos.png"),
                        require("../../assets/images/categories/loisir_sport.png"),
                        require("../../assets/images/categories/loisir_jouets.png")]
                },

            },


        }
    }
    render() {
        var data1 = this.state.cat1.categorie;
        var imgs1 = data1.imgUrl;
        var data2 = this.state.cat2.categorie;
        var imgs2 = data2.imgUrl;
        var data3 = this.state.cat3.categorie;
        var imgs3 = data3.imgUrl;
        return (
            <ScrollView>
                 <View style={styles.container}>
                <View style={styles.categorietitle}>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: 15, marginBottom: 8}}/>
                    <Text style={{fontSize: 18, fontWeight: 'normal', color: "#999999"}}>{this.state.cat1.title} </Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: "100%", marginBottom: 8}}/>
                </View>
                {
                    data1.subCatg.map((subCateg, index) =>
                        <View key={index} style={styles.subCategories}>
                            <TouchableOpacity
                                style={styles.iconContainer}>
                                <Image
                                    source={imgs1[index]}
                                    style={{width: 30, height: 30}}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'normal',
                                color: "black",
                                marginHorizontal: 5
                            }}>{subCateg}</Text>
                        </View>
                    )
                }
                <View style={styles.categorietitle}>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: 15, marginBottom: 8}}/>
                    <Text style={{fontSize: 18, fontWeight: 'normal', color: "#999999"}}>{this.state.cat2.title} </Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: "100%", marginBottom: 8}}/>
                </View>
                {
                    data2.subCatg.map((subCateg, index) =>
                        <View key={index} style={styles.subCategories}>
                            <TouchableOpacity
                                style={styles.iconContainer}>
                                <Image
                                    source={imgs2[index]}
                                    style={{width: 30, height: 30}}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'normal',
                                color: "black",
                                marginHorizontal: 5
                            }}>{subCateg}</Text>
                        </View>
                    )
                }
                <View style={styles.categorietitle}>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: 15, marginBottom: 8}}/>
                    <Text style={{fontSize: 18, fontWeight: 'normal', color: "#999999"}}>{this.state.cat3.title} </Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: "100%", marginBottom: 8}}/>
                </View>
                {
                    data3.subCatg.map((subCateg, index) =>
                        <View key={index} style={styles.subCategories}>
                            <TouchableOpacity
                                style={styles.iconContainer}>
                                <Image
                                    source={imgs3[index]}
                                    style={{width: 30, height: 30}}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'normal',
                                color: "black",
                                marginHorizontal: 5
                            }}>{subCateg}</Text>
                        </View>
                    )
                }

            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
    },
    categorietitle: {
        flexDirection:"row",
        backgroundColor: '#fff',
        marginTop:10
    },
    subCategories: {
        flexDirection:"row",
        alignItems:"center",
        marginVertical:10,
        marginHorizontal:5
    },
    categorieRow: {
        flexDirection:"column",
    },
    iconContainer: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:100,
        padding:5
    }
});