import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Categorie from "./Categorie";
import DemandeAdType from "./DemandeAdType";
import * as ApiData from "../../ApiData/ApiData";

export default class  extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            data: this.props.data,
            refreshing: false,
            page:0
            ,
        };
        this._onRefresh = this._onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.onEndReachedCalledDuringMomentum=true
    }



    _onRefresh () {
        this.setState({ refreshing: true },()=>
            this._fetchDataAd());
    }

    onEndReached = (title) => {
        this.setState({ page: this.state.page+1 });
        };

    _fetchDataAd(){
        ApiData.generateData()
            .then((data)=> {
                if(data)
                     this.setState({data:data.type[this.props.typeAnnonce], refreshing: false});
                else

                this.setState({refreshing: false},()=> alert('Nous considéron un problème technique, merci de patienter!'));

            });
    }

    render() {
        const navigation=this.props.navigation;
        const data = this.state.data;
        const typeAnnonce  = this.props.typeAnnonce;
        return (
            <FlatList
                onRefresh={() => this._onRefresh()}
                refreshing={this.state.refreshing}
                data={Object.keys(data)}
                renderItem={({item,index}) =>
                      typeAnnonce!=='Demande'?
                          <Categorie onEndReached={this.onEndReached} typeAnnonce={typeAnnonce}
                                               navigation={navigation}
                                               categorie={ data[item]} />
                          :<DemandeAdType navigation={navigation} typeAnnonce={typeAnnonce}   categorie={data[item]}/>

                }
                listKey={(item2, index) => 'D' + index.toString()}
                keyExtractor={(item, index) => 'D' + index.toString()}>
            </FlatList>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});