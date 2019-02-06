import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text, TouchableHighlight,
    View, Animated, Alert, ScrollView
} from 'react-native';
import {Icon} from 'react-native-elements'
import ProfileService from "../../Services/ProfileService";
import {NavigationActions, StackActions} from "react-navigation";

export default class AdPanel extends React.Component {

    constructor() {
        super();
        this.state = {

            animation: new Animated.Value(),
            minHeight: '',
            maxHeight: '',


        };
        this._setMaxHeight = this._setMaxHeight.bind(this)
        this.handlerfieldDelete = this.handlerfieldDelete.bind(this);
        this.handlerSeccusDelete = this.handlerSeccusDelete.bind(this);
    }

    generateTitleArray(ad) {
        let titleArray = [];
        ad.map((ad, index) => {
            titleArray.push(ad.title);
        });

        titleArray.length === 0 ? titleArray.push("Aucune annonce") : null;

        return titleArray;
    }

    _keyExtractor = (item, index) => index.toString();

    _setMinHeight(event) {
        if (this.state.minHeight === '') {
            this.setState({
                minHeight: event.nativeEvent.layout.height,
                animation: new Animated.Value(event.nativeEvent.layout.height),
            });
        }
    }

    _setMaxHeight(event, length) {
        if (this.state.maxHeight === '') {
            if (length === 0)
                length += 2;
            this.setState({
                maxHeight: event.nativeEvent.layout.height * length,
            });
        }
    }

    toggle() {
        //Step 1
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded  //Step 2
        });

        this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();  //Step 5
    }

    render() {
        return (
            <Animated.View style={[styles.container2, {height: this.state.animation}]}>

                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <TouchableHighlight
                                        // onPress={this.toggle.bind(this)}
                                        onPress={()=>{
                                            this.props.navigation.navigate("UserAnnonceSubScreen",
                                                {
                                                    data: this.props.data,
                                                    typeAd:this.props.type
                                                })
                                        }}
                                        style={{
                                            flex: 1, backgroundColor: 'white', borderRadius: 5,
                                            borderWidth: 0.7, borderColor: '#c0c0c0',
                                            paddingVertical: 5
                                        }}
                                        underlayColor="#ede">
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 8
                        }}>
                            <Text style={{fontSize: 14, fontWeight: '500'}}> {this.props.type}: {this.props.size}</Text>
                            <Icon
                                name='angle-down'
                                type='font-awesome'
                                size={25}
                            />
                        </View>
                    </TouchableHighlight>
                </View>

                {/*<View>*/}
                {/*<ScrollView style={{*/}
                    {/*padding: 10,*/}
                    {/*borderColor:'#9a9c9e',*/}
                    {/*borderWidth:1,*/}
                    {/*borderTopWidth:0*/}
                {/*}}*/}
                      {/*onLayout={(event) => this._setMaxHeight(event, this.props.data.length)}>*/}
                    {/*<FlatList*/}
                        {/*data={this.generateTitleArray(this.props.data)}*/}
                        {/*ListHeaderComponent={()=> <Text style={{color:'#b0b0b0'}}>titre</Text>}*/}
                        {/*renderItem={({item, index}) =>*/}
                            {/*this.itemRender(item, index)*/}
                        {/*}*/}
                        {/*keyExtractor={this._keyExtractor}*/}
                    {/*/>*/}
                {/*</ScrollView>*/}
                {/*</View>*/}
            </Animated.View>
        );
    }

    itemRender(item, index) {
        return <View style={{
            justifyContent: 'space-between',
            flex: 1,
            flexDirection: 'row',
            marginBottom:5,
            borderWidth:1,
            borderRadius:10,
            borderColor:'black'}}>
            <TouchableHighlight onPress={() => {
                if (item !== 'Aucune annonce')
                    this.props.navigation.navigate('AnnonceDetail',
                        {
                            'navigation': this.props.navigation, 'typeAnnonce': this.props.type,
                            'data': this.props.data[index]
                        })
            }}
                                style={{marginVertical: 5, paddingHorizontal: 5,}}
                                underlayColor="#ede">

                <Text style={{fontSize: 13, color: '#000'}}>{item}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
                this.deleteAnnonceRequest(index, this.props.type);
            }}
                                style={{marginVertical: 5, paddingHorizontal: 5,}}
                                underlayColor="#ede">
                {item !== 'Aucune annonce' ?
                    <Text style={{color: '#ff3e33'}}>supprimer</Text> : <View/>
                }

            </TouchableHighlight>
        </View>;
    }

    deleteAnnonceRequest(index, type) {
        Alert.alert(
            'Supprimer',
            'êtes-vous sûr ?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Deleting Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.fetchDeleteRequest(type, index)},
            ],
            { cancelable: false }
        );




    }

    fetchDeleteRequest(type, index) {
        if (type === 'Don')
            ProfileService.deleteDonAD(this.props.data[index].id, this.handlerSeccusDelete,
                this.handlerfieldDelete).then().catch();
        else if (type === 'Echange')
            ProfileService.deleteEchangeAD(this.props.data[index].id, this.handlerSeccusDelete,
                this.handlerfieldDelete).then().catch();
        else if (type === 'Demande')
            ProfileService.deleteDemandeAD(this.props.data[index].id, this.handlerSeccusDelete,
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 5,
        marginVertical: 30
    },
    container2: {
        backgroundColor: 'white',
        overflow: 'hidden',
        marginVertical: 10
    }, titleContainer: {
        flexDirection: 'row'
    },
});