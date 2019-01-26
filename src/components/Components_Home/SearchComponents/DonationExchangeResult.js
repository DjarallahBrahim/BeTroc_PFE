import React from 'react';
import {
    FlatList, Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CardList from "../CardList";
import RowDemandeAd from "../RowDemandeAd";
import emoji from '../../../../assets/images/suspicious.png'
export default class DonationExchangeResult extends React.Component {
    static navigationOptions = {
        title: 'Resultat',
    };

    render() {
        const data = this.props.navigation.getParam("data", {});
        const navigation = this.props.navigation.getParam("navigation", {});
        const currentUser = this.props.navigation.getParam("currentUser", 0);
        const typeAnnonce = this.props.navigation.getParam("typeAnnonce", 'Don');
        return (
            data.content.length>0 ?
                    <FlatList numColumns={typeAnnonce !== 'Demande'?2:1}
                              data={data.content}
                              renderItem={({item, index})=>this.renderItems(index, currentUser, navigation, item, typeAnnonce)}
                              listKey={(item2, index) => 'D' + index.toString()}
                              keyExtractor={(item, index) => 'D' + index.toString()}


                    />
                :
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-start'}}>
                    <Image source={emoji} style={{width:150, height:150, marginVertical:50}}/>
                    <Text style={{fontSize:18, fontWeight:'400'}}>Opps aucun résultat correspondant à votre recherche</Text>
                </View>
        );
    }

    renderItems(index, currentUser, navigation, item, typeAnnonce) {
        return typeAnnonce !== 'Demande' ?
            <CardList currentUser={currentUser} key={index} typeAnnonce={typeAnnonce}
                                                          navigation={navigation} data={item}/>
            :
            <RowDemandeAd key={index} currentUser={currentUser} typeAnnonce={typeAnnonce} navigation={navigation} data={item}/>;

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});