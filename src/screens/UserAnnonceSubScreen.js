import React from 'react';
import {
    Alert, FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight, TouchableOpacity,
    View,
} from 'react-native';
import CategoriesService from "../Services/CategoriesService";
import serverURL from "../Services/ServerURL";
import {NavigationActions, StackActions} from "react-navigation";
import ProfileService from "../Services/ProfileService";


export default class UserAnnonceSubScreen extends React.Component {
    static navigationOptions = {
        title: 'Vos annonces',
    };

    constructor(){
        super();
        this.handlerfieldDelete = this.handlerfieldDelete.bind(this);
        this.handlerSeccusDelete = this.handlerSeccusDelete.bind(this);
    }

    componentDidMount(){
        const categoriesService = new  CategoriesService;
        categoriesService.getCategoriesHandler()
            .then((categories)=> this.setState({categoriesAreReady:1,dataCategories:categories }));
    }

    deleteAnnonceRequest(idAd, type) {
        Alert.alert(
            'Supprimer',
            'êtes-vous sûr ?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Deleting Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.fetchDeleteRequest(type, idAd)},
            ],
            { cancelable: false }
        );
    }

    fetchDeleteRequest(type, idAd) {
        if (type === 'Don')
            ProfileService.deleteDonAD(idAd, this.handlerSeccusDelete,
                this.handlerfieldDelete).then().catch();
        else if (type === 'Echange')
            ProfileService.deleteEchangeAD(idAd, this.handlerSeccusDelete,
                this.handlerfieldDelete).then().catch();
        else if (type === 'Demande')
            ProfileService.deleteDemandeAD(idAd, this.handlerSeccusDelete,
                this.handlerfieldDelete).then().catch();
    }

    handlerfieldDelete(){
        alert('L\'annonce n\'était pas supprimé');
    }

    handlerSeccusDelete(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Profil'})],
        });
        this.props.navigation.dispatch(resetAction);
    }


    renderItem(item, type, key) {
        return (
            <View key={key} style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.subCategories}>
                        <TouchableOpacity
                            onPress={() => {
                                this.navigatetoDetailScreen(type, item);
                            }}
                            style={styles.iconContainer}>
                            <Image
                                source={{uri: `${serverURL}/api/downloadImage/` + item.subCategory.imgName}}
                                style={{width: 30, height: 30}}
                            />

                        </TouchableOpacity>
                        <Text
                            onPress={() => {
                                this.navigatetoDetailScreen(type, item);
                            }}

                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: "black",
                                marginHorizontal: 5
                            }}>{item.title}</Text>
                    </View>
                    <TouchableHighlight
                        onPress={() => {
                            this.deleteAnnonceRequest(item.id, type);
                        }}
                        underlayColor="#ede"
                    >

                        <Text style={{color: '#ff3e33'}}>supprimer</Text>

                    </TouchableHighlight>
                </View>
                <View style={styles.categorietitle}>
                    <View style={{borderBottomWidth: 0.6, borderBottomColor: "#c1c1c1", width: 15, marginBottom: 8}}/>
                    <View style={{borderBottomWidth: 0.6, borderBottomColor: "#c1c1c1", width: "100%", marginBottom: 8}}/>
                </View>
            </View>
        )
    }

    navigatetoDetailScreen(type, item) {
        if(type !== 'Demande')
            this.props.navigation.navigate('AnnonceDetail',
                {
                    'navigation': this.props.navigation, 'typeAnnonce': type,
                    'data': item
                });
        else
            Alert.alert(
                'Description',
                item.description,
                [
                    {text: 'OK', onPress: () => {}},
                ],

            );
    }

    render() {
        const adData = this.props.navigation.getParam("data", {});
        const type = this.props.navigation.getParam("typeAd", {});
        console.log(type);
        return (
            <View style={{flex:1, backgroundColor:'white', height:'100%'}}>
                <FlatList
                          data={adData.data}
                          renderItem={({item, index}) =>
                              this.renderItem(item, type, index)
                          }

                          listKey={(item2, index) => 'D' + index.toString()}
                          keyExtractor={(item, index) => 'D' + index.toString()}>

                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems:"center",
        flexDirection: 'row',
        paddingHorizontal:"2%"
    },
    categorietitle: {
        flexDirection:"row",
        backgroundColor: '#fff',
        marginTop:5,
        marginHorizontal:'40%'
    },
    subCategories: {
        flexDirection:"row",
        alignItems:"center",
        marginVertical:10,
        // marginHorizontal:5
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