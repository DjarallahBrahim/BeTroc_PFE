import React from 'react';
import {
    View,
    SafeAreaView,
    Platform,
    TextInput, StyleSheet
} from "react-native";
import { Icon } from 'react-native-elements'
import { SearchBar } from 'react-native-elements'
import Colors from '../../constants/Colors';

export default class Searchbar extends React.Component {

    state = {
        searchInput:'',
        clearInput:false
    }

    constructor(props) {
        super(props);
        this.state = {
            query: "",
        };

    }

    handleQueryChange = query =>
        this.setState(state => ({ ...state, query: query || "" }));

    handleSearchCancel = () => this.handleQueryChange("");

    handleSearchClear = () => this.handleQueryChange("");

    Onsubmit = () => {
        const { submitSearch } = this.props;
        submitSearch(this.state.query);
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View  style={styles.container}>

                    <View style={{
                        flex:1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        height:30,
                        backgroundColor: '#910d08',
                        borderRadius:20,
                        marginHorizontal:7,
                        marginVertical:5
                    }}>
                        <Icon name="search"
                              size={18}
                              style={{ marginRight: 10, marginTop:5 }}
                              color={"rgba(225,225,225,0.8)"}
                              onPress={this.Onsubmit}/>
                        <TextInput
                            onChangeText={this.handleQueryChange}
                            underlineColorAndroid="transparent"
                            placeholder="Recherche"
                            placeholderTextColor="rgba(225,225,225,0.8)"

                            style={{height:30 ,flex: 1, marginHorizontal: 5,fontSize:13, backgroundColor: '#910d08',color:"white" }}
                        />
                        <Icon name="filter-list"
                              size={18}
                              color={"rgba(225,225,225,0.8)"}
                              onPress={()=>{
                                    this.props.navigation.navigate('SearcheScreen',{navigation:this.props.navigation})
                                   }
                              } //TODO add filter Screen
                         />
                    </View>

                </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? 30 : null ,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    safeArea: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:5
    },
    viewIcon: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textIcon: {
        fontSize:9,
        color: '#95a5a6'
    },

});