import React from 'react';
import {
    StyleSheet,
     TextInput,

} from 'react-native';

export default class KeyWord extends React.Component {
    static navigationOptions = {
        title: 'KeyWord',
    };

    render() {
        return (
                <TextInput
                    textAlign={'center'}
                    style={styles.keyword}
                    onChangeText={this.props.handlerKeyWord}
                    placeholder={'Recherche par mot clé'}
                    underlineColorAndroid="transparent"
                    autoCapitalize = 'none'
                    ref={(input) => { this.secondTextInput = input; }}
                />
        );
    }

    componentDidMount(){
        this.secondTextInput.focus()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyword:{
        borderRadius: 10,
        fontSize:17,
        color:'#000',
        fontWeight:'400',
        paddingHorizontal:10,
        paddingVertical:10,
        marginVertical:10,
        backgroundColor:'white',
        marginHorizontal:20


    }
});