import React from 'react';
import {
    View,
    SafeAreaView,
    Platform,
    Text, StyleSheet
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
            <SafeAreaView style={styles.safeAreaw}>
                <View  style={styles.container}>
                    <View style={styles.viewIcon}>
                    <Icon
                        size={24}
                        name='feedback'
                        color='#ef345f'
                        underlayColor={'#00000000'}
                        onPress={() => {}}
                    />
                        {/*<Text style={styles.textIcon}>icon</Text>*/}
                    </View>
                    <SearchBar
                        containerStyle={{width:"80%", height: 50, borderRadius: 10,}}
                        inputContainerStyle={{height: '100%', }}
                        inputStyle={{ fontSize: 11}}
                        lightTheme
                        placeholder='Trouvez une annonce !'
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
                    <View style={styles.viewIcon}>
                        <Icon
                            iconStyle={{marginLeft:8}}
                            size={26}
                            name='filter-list'
                            color={'#ef345f'}
                            underlayColor={'#00000000'}
                            onPress={() => this.Onsubmit()}
                        />
                        {/*<Text style={styles.textIcon}>icon</Text>*/}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? 30 : 10,
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