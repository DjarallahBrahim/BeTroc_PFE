import React from 'react';
import {
    View,
    SafeAreaView,
    Platform,
 } from "react-native";
import { Icon } from 'react-native-elements'
import { SearchBar } from 'react-native-elements'

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
            <SafeAreaView>
                <View  style={{marginTop: Platform.OS === 'android' ? 30 : null,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'}} >
                    <Icon
                        iconStyle={{marginRight:8}}
                        size={24}
                        name='feedback'
                        color='#ef345f'
                        underlayColor={'#00000000'}
                        onPress={() => {}}
                    />
                    <SearchBar
                        containerStyle={{width:"80%"}}
                        lightTheme
                        searchIcon={<Icon
                            size={24}
                            name='done'
                            color={this.state.query ==='' ? '#F8F8F8': '#f50'}
                            underlayColor={'#00000000'}
                            onPress={() => this.Onsubmit()}
                            />
                        }
                        cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}

                        onChangeText={this.handleQueryChange}
                        onCancel={this.handleSearchCancel}
                        onClear={this.handleSearchClear}
                        value={this.state.query}
                        keyboardType="default"
                        returnKeyType="done"
                    />
                    <Icon
                        iconStyle={{marginLeft:8}}
                        size={26}
                        name='filter-list'
                        color={'#ef345f'}
                        underlayColor={'#00000000'}
                        onPress={() => this.Onsubmit()}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
