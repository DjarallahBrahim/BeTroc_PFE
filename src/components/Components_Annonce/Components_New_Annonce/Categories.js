import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image, ScrollView
} from 'react-native';

export default class Categories extends React.Component {


    constructor(props){
        super(props);
        this.state={}
    }

    _handlerCategory(buttonTitleHandler,handlerCategory, id, category, subCategory){
        const catg={};
        catg.title= category;
        catg.subCategory = subCategory;
        catg.id=id;
        handlerCategory(catg);
        buttonTitleHandler(subCategory);

    }

    render() {
        const dataCategories = this.props.navigation.getParam("data", {});
        const handlerCategory = this.props.navigation.getParam("handlerCategory", {});
        const navigation = this.props.navigation.getParam("navigation", {});
        const buttonTitleHandler = this.props.navigation.getParam("buttonTitleHandler", {});
        return (
            <ScrollView>
                {dataCategories.length > 0 ?
                    dataCategories.map((category, key)=>
                        <View key={key} style={styles.container}>
                            <View style={styles.categorietitle}>
                                <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: 15, marginBottom: 8}}/>
                                <Text style={{fontSize: 18, fontWeight: 'normal', color: "#999999"}}> {category.title} </Text>
                                <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: "100%", marginBottom: 8}}/>
                            </View>
                            {
                                category.subCategories.map((subCategory, index)=>
                                {
                                    console.log(subCategory.imgName);
                                    return(
                                    <View key={index} style={styles.subCategories}>
                                        <TouchableOpacity
                                            style={styles.iconContainer}
                                        onPress={()=>{
                                            this._handlerCategory(buttonTitleHandler,handlerCategory,category.id, category.title,subCategory.title);
                                            navigation.pop();
                                        }}>
                                            <Image
                                                source={{uri:subCategory.imgName}}
                                                style={{width: 30, height: 30}}
                                            />

                                        </TouchableOpacity>
                                        <Text
                                            onPress={()=>{
                                                this._handlerCategory(buttonTitleHandler,handlerCategory,category.id,category.title,subCategory.title);
                                                navigation.pop();
                                            }}
                                            style={{
                                            flex:1,
                                            fontSize: 18,
                                            fontWeight: 'normal',
                                            color: "black",
                                            marginHorizontal: 5
                                        }}>{subCategory.title}</Text>
                                </View>)
                                })
                            }
                        </View>
                    ): <View> <Text> No Internet Connection </Text></View>
                }

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