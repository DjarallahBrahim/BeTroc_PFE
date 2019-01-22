import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList, TouchableHighlight,
} from "react-native";
import CardList from "./CardList";
import {Divider} from "react-native-elements";
import Colors from "../../constants/Colors";
import {Dimensions} from 'react-native';
import ShowMoreButton from "./ShowMoreButton";
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

export default class Categorie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: this.props.categorie
        };
    }



    render() {
        console.log("Categories Render");
        const {navigation, typeAnnonce} = this.props;
        const categorie = this.props.categorie;
        return (
            <View style={styles.container}>
                {
                    Object.keys(categorie).map((title, index) =>
                        categorie[title].length > 0 ?
                            <View key={index} style={{flex: 1}}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems:'center'

                                }}>
                                    <Text style={{fontSize: 20, fontWeight: '500', color: '#9a9c9e'}}>
                                        {title}
                                    </Text>
                                    <TouchableHighlight style={{
                                                            borderRadius: 8,
                                                            paddingHorizontal: 15,
                                                            backgroundColor: Colors.tintColor,
                                                            marginTop: 5,
                                                            marginRight: 5,
                                                            justifyContent: 'center',
                                                            alignItems:'center'
                                                        }}
                                                        onPress={() => navigation.navigate("ShowMoreScreen",
                                                            {
                                                                category: title,
                                                                typeAnnonce: typeAnnonce,
                                                                navigation: navigation,
                                                                currentUser:this.props.currentUser
                                                            })}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: 16,
                                                fontWeight: '400',

                                            }}>
                                            Plus
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={{height: 180, width:'100%'}}>
                                    <FlatList
                                        style={{flex:1}}
                                        horizontal={true}
                                        data={categorie[title]}
                                        renderItem={({item, index}) => this.renderCardList(typeAnnonce, navigation, item, index)}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                    </View>
                            </View>
                            :
                            null
                    )
                }
            </View>
        );
    }

    renderCardList(typeAnnonce, navigation, item, index) {
        return <CardList key={index}
                         currentUser={this.props.currentUser}
                         typeAnnonce={typeAnnonce}
                         navigation={navigation} data={item}/>;
    }
}


const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
            marginBottom: 10,
            marginRight: 0,
            marginLeft: 5,
            // shadowColor: '#000000',
            // shadowOffset: {
            //     width: 0,
            //     height: 2
            // },
            // shadowRadius: 5,
            // shadowOpacity: 0.1,
            // elevation: 3
        }


});