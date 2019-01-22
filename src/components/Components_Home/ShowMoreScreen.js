import React from 'react';
import { FlatList } from 'react-native';
import fetchDataAdApi from "../../Services/fetchDataAd";
import CardList from "./CardList";
import RowDemandeAd from "./RowDemandeAd";

export default class ShowMoreScreen extends React.Component {
    static navigationOptions = {
        title: 'Plus d\'annonces',
    };

    constructor(){
        super();
        this.state={
            categories:[],
            maxPage:0,
            page:0
        };
        this.category='';
        this.typeAnnonce='';
        this.navigation='';
        this.currentUser=0;

        this.onEndReached = this.onEndReached.bind(this);
        this.overThreshold=true


    }

    onEndReached () {
        if(this.state.page < this.state.maxPage )
            this.setState({page:this.state.page+1}, this.fetchDataWithPAge)
    };

    fetchDataWithPAge() {
        fetchDataAdApi.getAdsByTypeAndCategory(this.typeAnnonce, this.category, this.state.page).then((result) => {
            this.setState({categories: [...this.state.categories,...result.content], maxPage: result.totalPages})
        })
    }

    componentDidMount(){
        fetchDataAdApi.getAdsByTypeAndCategory(this.typeAnnonce,this.category).then((result)=> {
            if(result)
                this.setState({categories:[...result.content], maxPage:result.totalPages})
       })
    }



    render () {
        this.category = this.props.navigation.getParam("category", {});
        this.typeAnnonce = this.props.navigation.getParam("typeAnnonce", {});
        this.navigation = this.props.navigation.getParam("navigation", {});
        this.currentUser = this.props.navigation.getParam("currentUser", 0);
        const data = this.state.categories;
        return (
            this.state.categories.length>0 ?
                <FlatList numColumns={this.typeAnnonce !== 'Demande'?2:1}
                          data={data}
                          renderItem={({item, index})=>
                              this.renderAdItem(index, item)}
                          listKey={(item2, index) => 'D' + index.toString()}
                          keyExtractor={(item, index) => 'D' + index.toString()}
                          onScroll={(e) => this.onScrollHandler(e)}

                />
                :
                null
        );
    }

    onScrollHandler(e) {
        if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height + 20 > e.nativeEvent.contentSize.height) {
            if (!this.overThreshold) {
                this.onEndReached();
                this.overThreshold = true;
            }
        } else {
            if (this.overThreshold) this.overThreshold = false;
        }
    }

    renderAdItem(index, item) {
        return this.typeAnnonce !== 'Demande' ? <CardList currentUser={this.currentUser} key={index} typeAnnonce={this.typeAnnonce}
                                                          navigation={this.navigation} data={item}/>
            : <RowDemandeAd currentUser={this.currentUser} typeAnnonce={this.typeAnnonce} navigation={this.navigation} data={item}/>;
    }
}
