import React from 'react';
import {
    View,
    SafeAreaView,
    Platform,
    Text, StyleSheet
} from "react-native";
import { Icon } from 'react-native-elements'
import { SearchBar } from 'react-native-elements'
import Colors from '../../constants/Colors';
import TextInput from "react-native-paper/src/components/TextInput";

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
                        padding: 10,
                        height:50,
                        backgroundColor: 'white',
                    }}>
                        <Icon name="search"
                              size={20}
                              style={{ marginRight: 10 }}
                              onPress={this.Onsubmit}/>
                        <TextInput
                            onChangeText={this.handleQueryChange}
                            underlineColorAndroid="transparent"
                            placeholder="Recherche"
                            placeholderTextColor="grey"
                            style={{ flex: 1,  backgroundColor: 'white' }}
                        />
                        <Icon name="filter-list"
                              size={20}
                              style={{ marginLeft: 10 }}
                              onPress={()=>{

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
        alignItems: 'center'
    },
    safeArea: {
        justifyContent: 'center',
        alignItems: 'center'
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