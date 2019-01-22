import React from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet, Text,
    View,
} from 'react-native';
import Tabs from './tabs';
import Categorie from "./Categorie";
import Colors from "../../constants/Colors";
import DemandeAdType from "./DemandeAdType";
import * as ApiData from "../../ApiData/ApiData";

export default class TabsBarView extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructor TabsBarView");
        this.categories = ["Echange", "Demande", "Don"];
        this.state={
            data: null,
            refreshing: false,

        };
        this._onRefresh = this._onRefresh.bind(this);
        //this.onEndReachedCalledDuringMomentum= true
    }

    _onRefresh () {
            this.setState({ refreshing: true },
                        function() {
                            ApiData.generateData()
                                    .then((result)=> {this.setState({data:result, refreshing: false})
                                    });
            });
        }

    onEndReached = ({ distanceFromEnd }) => {

        if(!this.onEndReachedCalledDuringMomentum){
            console.log('onEndReached');
           // this.fetchData();
            this.onEndReachedCalledDuringMomentum = true;
        }
    };

    componentDidMount(){
        console.log("ComponentDidMount TabsBarView");
        ApiData.generateData().then((result)=> {
            this.setState({data:result, spinner: !this.state.spinner});

        });
    }

    render() {
        console.log("Render TabsBarView");
        const {navigation} = this.props;
        let data = this.state.data;
        return (
            <View style={styles.container}>
                <Tabs>
                    {
                        this.categories.map( (typeAnnonce, index)=>
                            <View key={index} title={typeAnnonce} style={styles.content}>

                                {data ?<FlatList
                                    extraData={this.state}
                                    onRefresh={() => this._onRefresh()}
                                    refreshing={this.state.refreshing}
                                    data={Object.keys(data.type[typeAnnonce])}
                                    renderItem={({item,index}) =>
                                            this.renderTabBarContent(typeAnnonce, navigation, data, item,index)
                                        }
                                    listKey={(item2, index) => 'D' + index.toString()}
                                    keyExtractor={(item, index) => 'D' + index.toString()}>
                                </FlatList>:null}
                            </View>
                         )
                    }
                    </Tabs>
            </View>
        );
    }

    renderTabBarContent(typeAnnonce, navigation, data, item, index) {
        return typeAnnonce !== "Demande" ?
            <Categorie typeAnnonce={typeAnnonce}
                       currentUser={this.props.currentUser}
                       key={index}
                       navigation={navigation}
                       categorie={data.type[typeAnnonce][item]}/>
            :
            <DemandeAdType navigation={navigation}
                           currentUser={this.props.currentUser}
                           typeAnnonce={typeAnnonce}
                           key={index}
                           categorie={data.type[typeAnnonce][item]}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    text: {
        marginHorizontal: 20,
        color: '#e74c3c',
        textAlign: 'center',
        fontSize: 18,
    },
});